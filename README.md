# LLM Chatbot Project along optional RAG model integration

Welcome to the **LLM Chatbot Project**! 🚀 This innovative project features two powerful Flask backends designed to tackle complex user queries using cutting-edge large language models (LLMs). 

## Project Overview

### 🌟 LLM Chatbot with LangChain

The first backend leverages the capabilities of **LangChain** along with **Azure OpenAI GPT-3.5 Turbo**. This dynamic duo is engineered to handle intricate and logical queries, providing users with seamless and intelligent responses.

### 🧠 RAG LLM for Enhanced Understanding

The second backend features an Retrieval-Augmented Generation (RAG) capability, which elevates the chatbot’s performance by integrating external knowledge sources. This implementation utilizes the GPT-3.5 Turbo 16k completion model, allowing the chatbot to handle more extensive context and provide richer, more accurate responses.

In this setup, documents serve as the primary source of context, ensuring that the chatbot can draw from a vast pool of information. By leveraging ChromaDB for efficient storage of embeddings and the Azure OpenAI Ada 002 model for generating these embeddings, the RAG LLM can retrieve relevant information in real time. This approach not only enhances the chatbot's understanding of user queries but also enriches the responses, making them more relevant and informative.

### 🎨 React UI

To enhance user experience, we’ve included a **React UI** that serves as the front-end interface for interacting with our chatbots. This intuitive design makes it easy for users to engage with the powerful LLMs behind the scenes.

## Project Structure

```
project-root/
│
├── LLM_Bot/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── ... (other backend files)
│
├── RAG_LLM/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── ... (other backend files)
│
└── Amy_UI/
    ├── src/
    ├── public/
    ├── package.json
    ├── .env.staging
    └── ... (other UI files)
```

## Getting Started

### 🚀 LLM Chatbot Leveraging LangChain

1. **Navigate to the `LLM_Bot` folder** in Visual Studio Code.
2. **Create a `.env` file** with your Azure OpenAI instance details:

   ```
   AZURE_OPENAI_DEPLOYMENT_NAME=<your-deployment-name>
   AZURE_OPENAI_API_KEY=<your-api-key>
   AZURE_OPENAI_ENDPOINT=<your-endpoint>
   AZURE_OPENAI_MODEL=<your-model>
   AZURE_OPENAI_API_VERSION=<your-api-version>
   ```
   
4. **Open the terminal** and run the following commands:
 
   ```
   activate venv llmBot
   pip install -r requirements.txt
   python main.py
   ```
   
6. The application will run on `http://127.0.0.1:5001/chat`. Feel free to change the port if necessary!

### 🎨 React UI

1. **Open the `Amy_UI` folder** in Visual Studio Code.
2. Install dependencies by running:

    ```
   npm install
    ```
    
4. Create a `.env.staging` file in the root directory and input the following URL for the environment variable:

    ```
   REACT_APP_MESSAGE_URL=http://127.0.0.1:5001/chat
    ```
    
6. Start the UI using:

    ```
   npm start
    ```
    

### 🧠 RAG LLM

1. **Navigate to the `RAG_LLM` folder** in Visual Studio Code.
2. Create a `.env` file and add your Azure OpenAI instance details:

    ```
   AZURE_OPENAI_DEPLOYMENT_NAME=<your-deployment-name>
   AZURE_OPENAI_API_KEY=<your-api-key>
   AZURE_OPENAI_ENDPOINT=<your-endpoint>
   AZURE_OPENAI_MODEL=<your-model>
   AZURE_OPENAI_API_VERSION=<your-api-version>
   ```
    
4. Open the terminal and run:

   ```
   activate venv llmBot
   pip install -r requirements.txt
   python main.py
   ```
   
6. This application will run on `http://127.0.0.1:5002/query`. Make sure to update the URL in `.env.staging` of the Amy UI to test the RAG LLM feature.


---

Dive in and explore the world of intelligent conversations powered by AI! If you have any questions or feedback, feel free to reach out at amrinderftw@gmail.com.✨
