from flask import Flask, request, jsonify
from langchain_openai import AzureChatOpenAI
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv
import asyncio
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app) 

# Fetch environment variables with default values
azure_openai_api_key = os.getenv("AZURE_OPENAI_API_KEY")
azure_openai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT") 
azure_openai_model = os.getenv("AZURE_OPENAI_MODEL") 
azure_openai_api_version = os.getenv("AZURE_OPENAI_API_VERSION") 

# Validate environment variables
if not azure_openai_api_key or not azure_openai_endpoint or not azure_openai_model:
    raise EnvironmentError("Missing required Azure OpenAI environment variables.")

# Set up LangChain with Azure OpenAI
llm = AzureChatOpenAI(
    api_key=azure_openai_api_key,
    azure_endpoint=azure_openai_endpoint,
    api_version=azure_openai_api_version,
    deployment_name=azure_openai_model
)

# Prompt template
template = '''You are AMY, a logical and analytical AI assistant capable of addressing both general and complex queries.
Your goal is to provide clear answers for general questions and break down complex problems into smaller steps when necessary.

Rules for you to follow:
1. For general queries, provide a straightforward answer without unnecessary detail.
2. For complex queries, break down the problem into logical steps and solve each step one by one.
3. Provide answers based on established knowledge and logical reasoning. If the answer is beyond your knowledge, politely inform the user.
4. Respond in a polite professional manner, keeping your answers brief and to the point.
5. If the query is simple or general provide a direct and concise answer otherwise provide step-by-step solution.

User Query: {input}

Step-by-step solution output format:
1. [Explain the problem].
2. [Sub-problems].
3. [Sub-solutions].
4. [Conclusion].
'''

prompt = PromptTemplate(input_variables=["input"], template=template)

# Flask route to handle chatbot queries
@app.route("/chat", methods=["POST"])
async def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        # Generate response from LLM
        formatted_prompt = prompt.format(input=user_input)
        response = await asyncio.to_thread(llm.invoke, formatted_prompt)  

        # Convert the response to string if it's not already
        response_text = response.content if hasattr(response, 'content') else str(response)

        return jsonify({"response": response_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
