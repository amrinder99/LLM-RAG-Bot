import os
from langchain_community.vectorstores import Chroma
from langchain_openai import AzureOpenAIEmbeddings, AzureChatOpenAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS  

load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  

# Load environment variables
azure_openai_api_key = os.getenv("AZURE_OPENAI_API_KEY")
azure_openai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
azure_openai_model = os.getenv("AZURE_OPENAI_MODEL")
azure_openai_api_version = os.getenv("AZURE_OPENAI_API_VERSION")

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
You are AMY, a highly capable digital assistant designed to resolve technical issues using provided context. Your task is to carefully analyze both the context and the user's query, then generate an accurate and helpful solution based on the relevant information.

Rules for your operation:

1. Provide responses strictly based on the context available. If the query is not related to context, politely inform the user that you lack the necessary data to give a proper answer.
2. Offer clear, concise, and professional responses that fully address the user's query without unnecessary details.
3. Only include information directly relevant to solving the user's issue. Omit any irrelevant or unnecessary details, and avoid mentioning specific sources.

Context: {context}
Question: {question}

Step-by-step solution output format:
1. [Explain the problem].
2. [Sub-problems].
3. [Sub-solutions].
4. [Conclusion].
'''

Use the context to deliver a clear and precise solution
"""

# Function to process query and return response
def process_query(query_text):
    
    # converting query to vector
    embedding_function = AzureOpenAIEmbeddings(
        deployment=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"),  
        openai_api_key=os.getenv("AZURE_OPENAI_API_KEY"), 
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),  
        openai_api_type="azure",
        openai_api_version="2023-05-15"
    )

    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_relevance_scores(query_text, k=3)
    # if len(results) == 0 or results[0][1] < 0.7:
    #     return {"response": "Unable to find matching results.", "sources": []}

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    # Setting LLM
    llm = AzureChatOpenAI(
        api_key=azure_openai_api_key,
        azure_endpoint=azure_openai_endpoint,
        api_version=azure_openai_api_version,
        deployment_name=azure_openai_model
    )

    # Method to get the response
    response = llm.invoke(prompt)
    response_text = response.content

    sources = [doc.metadata.get("source", None) for doc, _score in results]
    formatted_response = {"response": response_text, "sources": sources}

    return formatted_response

# Route to handle POST request
@app.route('/query', methods=['POST'])
def query():
    try:
        data = request.get_json()
        query_text = data.get('message')

        if not query_text:
            return jsonify({"error": "Query text is required"}), 400

        # Process the query
        response = process_query(query_text)
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True)
