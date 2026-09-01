---
url: "https://developers.glean.com/guides/agents/langchain"
canonical: "https://developers.glean.com/guides/agents/langchain"
title: "LangChain Integration | Glean Developer"
description: "Build AI agents using LangChain framework with Glean's search and chat capabilities"
fetched_at: "2026-09-01T13:23:01.613Z"
---
On this page

Glean's official LangChain integration enables you to build powerful AI agents that can search and reason over your organization's knowledge using Python and the LangChain framework.

[

### langchain-glean

Official LangChain integration for Glean's search and chat capabilities







](https://github.com/gleanwork/langchain-glean)

### Installation[​](#installation "Direct link to Installation")

-   pip
-   poetry
-   uv

```
pip install -U langchain-glean 
```

```
poetry add langchain-glean 
```

```
uv add langchain-glean 
```

### Configuration[​](#configuration "Direct link to Configuration")

#### API Tokens[​](#api-tokens "Direct link to API Tokens")

You'll need Glean [API credentials](/get-started/authentication), and specifically a [user-scoped API token](/api-info/client/authentication/glean-issued#available-scopes). API Tokens require the following scopes: `chat`, `search`, and `agents` (if using the Agents API). You should speak to your Glean administrator to provision these tokens.

#### Configure Environment Variables[​](#configure-environment-variables "Direct link to Configure Environment Variables")

Configure your Glean credentials by setting the following environment variables:

```
export GLEAN_SERVER_URL="https://your-server-id-be.glean.com"export GLEAN_API_TOKEN="your-glean-api-token"export GLEAN_ACT_AS="user@example.com"  # Optional: Email to act as when making requests
```

Find your server URL at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean).

### Usage Examples[​](#usage-examples "Direct link to Usage Examples")

#### Using the Retriever[​](#using-the-retriever "Direct link to Using the Retriever")

The `GleanSearchRetriever` allows you to search and retrieve documents from Glean:

```
from langchain_glean.retrievers import GleanSearchRetriever# Initialize the retriever (will use environment variables)retriever = GleanSearchRetriever()# Search for documentsdocuments = retriever.invoke("quarterly sales report")# Process the resultsfor doc in documents:    print(f"Title: {doc.metadata.get('title')}")    print(f"URL: {doc.metadata.get('url')}")    print(f"Content: {doc.page_content}")    print("---")
```

#### Building an Agent with Tools[​](#building-an-agent-with-tools "Direct link to Building an Agent with Tools")

The `GleanSearchTool` can be used in LangChain agents to search Glean:

```
from langchain_core.prompts import ChatPromptTemplatefrom langchain_openai import ChatOpenAIfrom langchain.agents import AgentExecutor, create_openai_tools_agentfrom langchain_glean.retrievers import GleanSearchRetrieverfrom langchain_glean.tools import GleanSearchTool# Initialize the retrieverretriever = GleanSearchRetriever()# Create the toolglean_tool = GleanSearchTool(    retriever=retriever,    name="glean_search",    description="Search for information in your organization's content using Glean.")# Create an agent with the toolllm = ChatOpenAI(model="gpt-4o")prompt = ChatPromptTemplate.from_messages([    ("system", "You are a helpful assistant with access to Glean search."),    ("user", "{input}")])agent = create_openai_tools_agent(llm, [glean_tool], prompt)agent_executor = AgentExecutor(agent=agent, tools=[glean_tool])# Run the agentresponse = agent_executor.invoke({"input": "Find the latest quarterly report"})print(response["output"])
```

#### RAG with LangChain Chains[​](#rag-with-langchain-chains "Direct link to RAG with LangChain Chains")

You can integrate the retriever with LangChain chains for more complex workflows:

```
from langchain_core.output_parsers import StrOutputParserfrom langchain_core.prompts import ChatPromptTemplatefrom langchain_core.runnables import RunnablePassthroughfrom langchain_openai import ChatOpenAIfrom langchain_glean.retrievers import GleanSearchRetriever# Initialize the retrieverretriever = GleanSearchRetriever()# Create a prompt templateprompt = ChatPromptTemplate.from_template(    """Answer the question based only on the context provided.Context: {context}Question: {question}""")# Initialize the language modelllm = ChatOpenAI(model="gpt-4o")# Format documents functiondef format_docs(docs):    return "\n\n".join(doc.page_content for doc in docs)# Create the chainchain = (    {"context": retriever | format_docs, "question": RunnablePassthrough()}    | prompt    | llm    | StrOutputParser())# Run the chainresult = chain.invoke("What were our Q2 sales results?")print(result)
```

### Advanced Usage[​](#advanced-usage "Direct link to Advanced Usage")

#### Search Parameters[​](#search-parameters "Direct link to Search Parameters")

You can customize your search by passing additional parameters:

```
# Search with additional parametersdocuments = retriever.invoke(    "quarterly sales report",    page_size=5,  # Number of results to return    disable_spellcheck=True,  # Disable spellcheck    max_snippet_size=200  # Maximum snippet size)
```

#### Custom Retriever Configuration[​](#custom-retriever-configuration "Direct link to Custom Retriever Configuration")

Configure the retriever with custom settings:

```
# Initialize with custom settingsretriever = GleanSearchRetriever(    server_url="https://your-server-id-be.glean.com",  # Override environment variable    api_token="your-api-token",  # Override environment variable    act_as="user@example.com",   # Override environment variable    page_size=10,               # Default number of results    max_snippet_size=300        # Default snippet size)
```

For the complete API documentation and implementation details, visit the [GitHub repository](https://github.com/gleanwork/langchain-glean).
