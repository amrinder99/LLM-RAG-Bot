from langchain_community.document_loaders import DirectoryLoader
from langchain.document_loaders import UnstructuredWordDocumentLoader  # For .docx files
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_openai import AzureOpenAIEmbeddings  # Use Azure OpenAI Embeddings
from langchain_community.vectorstores import Chroma
import openai
from dotenv import load_dotenv
import os
import shutil
import nltk
# nltk.download('all')

load_dotenv()

CHROMA_PATH = "chroma"
DATA_PATH = "data/docs"  


def main():
    generate_data_store()


def generate_data_store():
    documents = load_documents()
    chunks = split_text(documents)
    save_to_chroma(chunks)


def load_documents():
    # For .docx files, we use UnstructuredWordDocumentLoader
    loader = DirectoryLoader(DATA_PATH, glob="*.docx", loader_cls=UnstructuredWordDocumentLoader)
    documents = loader.load()
    return documents


def split_text(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=100,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")

    document = chunks[10]
    print(document.page_content)
    print(document.metadata)

    return chunks


def save_to_chroma(chunks: list[Document]):
    # Clear out the database first.
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

    # Creating a new DB from the documents, using Azure OpenAI embeddings.
    db = Chroma.from_documents(
        chunks,
        AzureOpenAIEmbeddings(
            deployment=os.environ['AZURE_OPENAI_DEPLOYMENT_NAME'], 
            openai_api_key=os.environ['AZURE_OPENAI_API_KEY'],
            azure_endpoint=os.environ['AZURE_OPENAI_ENDPOINT'],
            openai_api_version="2023-05-15",  
        ),
        persist_directory=CHROMA_PATH,
    )
    # db.persist()
    print(f"Saved {len(chunks)} chunks to {CHROMA_PATH}.")


if __name__ == "__main__":
    main()
