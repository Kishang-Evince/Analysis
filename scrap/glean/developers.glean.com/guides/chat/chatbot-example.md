---
url: "https://developers.glean.com/guides/chat/chatbot-example"
canonical: "https://developers.glean.com/guides/chat/chatbot-example"
title: "Simple Chatbot Example | Glean Developer"
description: "Build a basic chatbot using Glean's Chat API"
fetched_at: "2026-09-01T13:23:02.434Z"
---
On this page

This example demonstrates how to build a simple chatbot using Glean's Chat API with the official Python client. The chatbot can answer questions using your company's knowledge base.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   OAuth access token or Glean-issued API token with `CHAT` scope
-   Python 3.8+
-   Your Glean instance name

For a per-user chatbot, prefer OAuth. The Python client's `api_token` field accepts an OAuth access token through the same credential shape shown in this example. Use a Glean-issued token for global `X-Glean-ActAs`, or when no OAuth path exists. See [Client API authentication](/api-info/client/authentication/overview) before you deploy.

## Installation[​](#installation "Direct link to Installation")

```
pip install glean-api-client
```

## Basic Chat Example[​](#basic-chat-example "Direct link to Basic Chat Example")

```python
import osfrom glean.api_client import Glean, modelsdef send_chat_message(message_text):    """Send a message to Glean Chat and get the response."""    api_token = os.getenv("GLEAN_API_TOKEN")    server_url = os.getenv("GLEAN_SERVER_URL")        if not api_token:        raise ValueError("GLEAN_API_TOKEN environment variable is required")    if not server_url:        raise ValueError("GLEAN_SERVER_URL environment variable is required")        with Glean(api_token=api_token, server_url=server_url) as glean:        try:            response = glean.client.chat.create(                messages=[                    {                        "fragments": [                            models.ChatMessageFragment(                                text=message_text,                            ),                        ],                    },                ],            )                        if response.messages:                last_message = response.messages[-1]                if hasattr(last_message, 'fragments') and last_message.fragments:                    for fragment in last_message.fragments:                        if hasattr(fragment, 'text') and fragment.text:                            return fragment.text                        return "No response received"                    except Exception as e:            return f"Error: {str(e)}"def main():    """Simple interactive chatbot."""    print("Glean Chatbot - Type 'quit' to exit")    print("-" * 40)        while True:        user_input = input("\nYou: ").strip()                if user_input.lower() in ['quit', 'exit', 'q']:            print("Goodbye!")            break                if not user_input:            continue                print("Bot: ", end="", flush=True)        try:            response = send_chat_message(user_input)            print(response)        except ValueError as e:            print(f"Setup error: {e}")            breakif __name__ == "__main__":    main()
```

## Environment Setup[​](#environment-setup "Direct link to Environment Setup")

Create a `.env` file in your project directory:

```
GLEAN_API_TOKEN=your_oauth_or_glean_token_hereGLEAN_SERVER_URL=https://your-server-id-be.glean.com
```

## Running the Example[​](#running-the-example "Direct link to Running the Example")

1.  Set your environment variables:
    
    ```
    export GLEAN_API_TOKEN="your_oauth_or_glean_token_here"export GLEAN_SERVER_URL="https://your-server-id-be.glean.com"
    ```
    
2.  Run the chatbot:
    
    ```
    python chatbot.py
    ```
    
3.  Start asking questions:
    
    ```
    You: What is our vacation policy?Bot: Based on your company's HR documentation, here are the key points about vacation policy...You: Who should I contact about benefits?Bot: For benefits questions, you should reach out to...
    ```
    

## Streaming Chat Example[​](#streaming-chat-example "Direct link to Streaming Chat Example")

For real-time streaming responses:

```
import osfrom glean.api_client import Glean, modelsdef stream_chat_response(message_text):    """Stream chat response in real-time."""    api_token = os.getenv("GLEAN_API_TOKEN")    server_url = os.getenv("GLEAN_SERVER_URL")        if not api_token:        print("Error: GLEAN_API_TOKEN environment variable required")        return    if not server_url:        print("Error: GLEAN_SERVER_URL environment variable required")        return        with Glean(api_token=api_token, server_url=server_url) as glean:        try:            response_stream = glean.client.chat.create_stream(                messages=[                    {                        "fragments": [                            models.ChatMessageFragment(                                text=message_text,                            ),                        ],                    },                ],            )                        print("Bot: ", end="", flush=True)                        for chunk in response_stream:                if chunk:                    print(chunk, end="", flush=True)            print()                    except Exception as e:            print(f"Error during streaming: {e}")def main():    """Interactive streaming chatbot."""    print("Glean Streaming Chatbot - Type 'quit' to exit")    print("-" * 45)        while True:        user_input = input("\nYou: ").strip()                if user_input.lower() in ['quit', 'exit', 'q']:            print("Goodbye!")            break                if user_input:            stream_chat_response(user_input)if __name__ == "__main__":    main()
```

## Conversation History Example[​](#conversation-history-example "Direct link to Conversation History Example")

Maintain context across multiple messages:

```
import osfrom glean.api_client import Glean, modelsclass ConversationalChatbot:    def __init__(self):        self.chat_id = None        self.api_token = os.getenv("GLEAN_API_TOKEN")        self.server_url = os.getenv("GLEAN_SERVER_URL")                if not self.api_token:            raise ValueError("GLEAN_API_TOKEN environment variable is required")        if not self.server_url:            raise ValueError("GLEAN_SERVER_URL environment variable is required")        def send_message(self, user_message):        """Send a message with conversation history."""        with Glean(api_token=self.api_token, server_url=self.server_url) as glean:            try:                response = glean.client.chat.create(                    messages=[                        {                            "fragments": [                                models.ChatMessageFragment(                                    text=user_message,                                ),                            ],                        },                    ],                    chat_id=self.chat_id,                    save_chat=True,                )                                if hasattr(response, 'chat_id') and response.chat_id:                    self.chat_id = response.chat_id                                if response.messages:                    last_message = response.messages[-1]                    if hasattr(last_message, 'fragments') and last_message.fragments:                        for fragment in last_message.fragments:                            if hasattr(fragment, 'text') and fragment.text:                                return fragment.text                                return "No response received"                            except Exception as e:                return f"Error: {str(e)}"        def reset_conversation(self):        """Start a new conversation."""        self.chat_id = Nonedef main():    """Conversational chatbot with memory."""    print("Glean Conversational Chatbot")    print("Type 'quit' to exit, 'reset' to start new conversation")    print("-" * 55)        try:        chatbot = ConversationalChatbot()    except ValueError as e:        print(f"Setup error: {e}")        return        while True:        user_input = input("\nYou: ").strip()                if user_input.lower() in ['quit', 'exit', 'q']:            print("Goodbye!")            break        elif user_input.lower() == 'reset':            chatbot.reset_conversation()            print("Started new conversation!")            continue        elif not user_input:            continue                print("Bot: ", end="", flush=True)        response = chatbot.send_message(user_input)        print(response)if __name__ == "__main__":    main()
```

## Error Handling[​](#error-handling "Direct link to Error Handling")

Add robust error handling for production use:

```
import loggingfrom glean.api_client import Glean, modelsfrom glean.api_client.errors import GleanErrorlogging.basicConfig(level=logging.INFO)logger = logging.getLogger(__name__)def send_chat_message_with_retry(message_text, max_retries=3):    """Send chat message with retry logic."""    api_token = os.getenv("GLEAN_API_TOKEN")    server_url = os.getenv("GLEAN_SERVER_URL")        if not api_token:        return "Missing GLEAN_API_TOKEN"    if not server_url:        return "Missing GLEAN_SERVER_URL"        for attempt in range(max_retries):        try:            with Glean(api_token=api_token, server_url=server_url) as glean:                response = glean.client.chat.create(                    messages=[                        {                            "fragments": [                                models.ChatMessageFragment(                                    text=message_text,                                ),                            ],                        },                    ],                )                                if response.messages:                    last_message = response.messages[-1]                    if hasattr(last_message, 'fragments') and last_message.fragments:                        for fragment in last_message.fragments:                            if hasattr(fragment, 'text') and fragment.text:                                return fragment.text                                return "No response received"                        except GleanError as e:            logger.warning(f"Glean API error on attempt {attempt + 1}: {e}")            if attempt == max_retries - 1:                return f"Failed after {max_retries} attempts: {e}"                except Exception as e:            logger.error(f"Unexpected error: {e}")            return f"Unexpected error: {e}"        return "Failed to get response"
```

## Advanced Features[​](#advanced-features "Direct link to Advanced Features")

### Using Custom Agents[​](#using-custom-agents "Direct link to Using Custom Agents")

```
# Use a specific agent for specialized responseswith Glean(api_token=api_token, server_url=server_url) as glean:    response = glean.client.chat.create(        messages=[            {                "fragments": [                    models.ChatMessageFragment(                        text="Help me write a technical document",                    ),                ],            },        ],        agent_id="your-custom-agent-id",    )
```

## Next Steps[​](#next-steps "Direct link to Next Steps")

-   **Add conversation persistence**: Use the `chat_id` to maintain long-running conversations
-   **Implement user authentication**: Handle different user permissions
-   **Add file upload support**: Use `upload_files()` for document analysis
-   **Deploy as a web service**: Use Flask/FastAPI to create a web interface
-   **Integrate with Slack/Teams**: Build a bot for your team chat platform

## Related Documentation[​](#related-documentation "Direct link to Related Documentation")

-   [Chat API Reference](/api/client-api/chat/overview)
-   [Authentication Guide](/get-started/authentication)
-   [Python API Client](/libraries/api-clients/python)
