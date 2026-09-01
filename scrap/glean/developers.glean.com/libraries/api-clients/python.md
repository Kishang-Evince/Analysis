---
url: "https://developers.glean.com/libraries/api-clients/python"
canonical: "https://developers.glean.com/libraries/api-clients/python"
title: "Python API Client | Glean Developer"
description: "Complete guide to using Glean's Python API client for building search and chat applications"
fetched_at: "2026-09-01T13:23:04.089Z"
---
On this page

Glean's Python API client provides a Pythonic interface to Glean's Client API, making it easy to integrate enterprise search and AI capabilities into your Python applications.

[

### glean-api-client

Official Python client for Glean's Client API







](https://github.com/gleanwork/api-client-python)

info

**Authentication Required**: You'll need a [Client API token](/api-info/client/authentication/overview) to use this library.

## Installation[​](#installation "Direct link to Installation")

-   pip
-   poetry
-   uv

```
pip install glean-api-client
```

```
poetry add glean-api-client
```

```
uv add glean-api-client
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

1

Set up environment variables

```
export GLEAN_SERVER_URL="https://your-server-id-be.glean.com"export GLEAN_API_TOKEN="your-token-here"
```

2

Basic usage

```
from glean.api_client import Gleanimport oswith Glean(    api_token=os.getenv("GLEAN_API_TOKEN"),    server_url=os.getenv("GLEAN_SERVER_URL"),) as client:    response = client.client.chat.create(        messages=[{            "fragments": [{"text": "What are our company values?"}]        }],        timeout_millis=30000    )    print(response)
```

## Core Features[​](#core-features "Direct link to Core Features")

### Chat API[​](#chat-api "Direct link to Chat API")

Build conversational AI applications:

```
# Simple chatresponse = client.client.chat.create(    messages=[{"fragments": [{"text": "Explain our Q4 strategy"}]}])# Streaming chat: create_stream returns the streamed response as textresponse = client.client.chat.create_stream(    messages=[{"fragments": [{"text": "What are our priorities?"}]}])print(response)
```

### Search API[​](#search-api "Direct link to Search API")

Integrate enterprise search:

```
results = client.client.search.query(    query="quarterly business review",    page_size=10)for result in results.results:    print(f"Title: {result.title}")    print(f"URL: {result.url}")
```

### Agents API[​](#agents-api "Direct link to Agents API")

Execute pre-built agents:

```
response = client.client.agents.run(    agent_id="your-agent-id",    input={"query": "Analyze sales performance"})
```

## Framework Integrations[​](#framework-integrations "Direct link to Framework Integrations")

### FastAPI[​](#fastapi "Direct link to FastAPI")

```
from fastapi import FastAPIfrom glean.api_client import Gleanfrom pydantic import BaseModelapp = FastAPI()class ChatRequest(BaseModel):    message: str@app.post("/chat")async def chat_endpoint(request: ChatRequest):    with Glean(        api_token=os.getenv("GLEAN_API_TOKEN"),        server_url=os.getenv("GLEAN_SERVER_URL"),    ) as client:        response = client.client.chat.create(            messages=[{"fragments": [{"text": request.message}]}]        )        return {"response": str(response)}
```

### Django[​](#django "Direct link to Django")

```
from django.http import JsonResponsefrom glean.api_client import Gleanimport jsondef chat_view(request):    data = json.loads(request.body)    message = data.get('message')        with Glean(        api_token=os.getenv("GLEAN_API_TOKEN"),        server_url=os.getenv("GLEAN_SERVER_URL"),    ) as client:        response = client.client.chat.create(            messages=[{"fragments": [{"text": message}]}]        )            return JsonResponse({'response': str(response)})
```

### Streamlit[​](#streamlit "Direct link to Streamlit")

```
import streamlit as stfrom glean.api_client import Gleanst.title("Company Knowledge Assistant")user_input = st.text_input("Ask a question:")if user_input:    with Glean(        api_token=os.getenv("GLEAN_API_TOKEN"),        server_url=os.getenv("GLEAN_SERVER_URL"),    ) as client:        response = client.client.chat.create(            messages=[{"fragments": [{"text": user_input}]}]        )        st.write(response)
```

## Authentication[​](#authentication "Direct link to Authentication")

### User-Scoped Tokens[​](#user-scoped-tokens "Direct link to User-Scoped Tokens")

```
client = Glean(    api_token="your-user-token",    server_url="https://your-server-id-be.glean.com")
```

### Global Tokens with ActAs[​](#global-tokens-with-actas "Direct link to Global Tokens with ActAs")

```
response = client.client.chat.create(    messages=[{"fragments": [{"text": "Hello"}]}],    http_headers={"X-Glean-ActAs": "user@company.com"})
```

### OAuth Access Tokens[​](#oauth-access-tokens "Direct link to OAuth Access Tokens")

An OAuth access token is a bearer credential, so it goes in the same `api_token` field:

```
client = Glean(    api_token=oauth_access_token,    server_url="https://your-server-id-be.glean.com",)
```

Tokens issued by the **Glean OAuth Authorization Server** (including tokens obtained via Dynamic Client Registration) are detected automatically. Tokens issued by an **external identity provider** (Google, Okta, Azure, etc.) additionally require the `X-Glean-Auth-Type: OAUTH` header on each request:

```
response = client.client.chat.create(    messages=[{"fragments": [{"text": "Hello"}]}],    http_headers={"X-Glean-Auth-Type": "OAUTH"})
```

See the [OAuth authentication guide](/api-info/client/authentication/oauth) for identity-provider setup.

#### Complete Example: Authorization Code with PKCE[​](#complete-example-authorization-code-with-pkce "Direct link to Complete Example: Authorization Code with PKCE")

This example uses [Authlib](https://docs.authlib.org/) with Flask. Setting `code_challenge_method` enables PKCE; Authlib stores the verifier and state in the session and verifies them on the callback. Point `OAUTH_METADATA_URL` at the Glean OAuth Authorization Server metadata (`https://your-server-id-be.glean.com/.well-known/oauth-authorization-server`) or your IdP's discovery document.

```
import osfrom flask import Flask, jsonify, url_forfrom authlib.integrations.flask_client import OAuthfrom glean.api_client import Gleanapp = Flask(__name__)app.secret_key = os.urandom(24)oauth = OAuth(app)oauth.register(    name="glean",    client_id=os.environ["OAUTH_CLIENT_ID"],    client_secret=os.environ.get("OAUTH_CLIENT_SECRET"),  # omit for a public client    server_metadata_url=os.environ["OAUTH_METADATA_URL"],    client_kwargs={        "scope": "openid offline_access SEARCH",  # SEARCH lets the token call /search (a Glean scope); offline_access requests a refresh token        "code_challenge_method": "S256",   # enable PKCE    },)@app.route("/login")def login():    return oauth.glean.authorize_redirect(url_for("callback", _external=True))@app.route("/callback")def callback():    token = oauth.glean.authorize_access_token()  # verifies state + PKCE, exchanges code    with Glean(        api_token=token["access_token"],        server_url=os.environ["GLEAN_SERVER_URL"],    ) as glean:        results = glean.client.search.query(            query="quarterly reports",            page_size=10,            # Omit this header when the token is from the Glean Authorization Server.            http_headers={"X-Glean-Auth-Type": "OAUTH"},        )        titles = [r.title for r in (results.results or [])]    return jsonify({"titles": titles})if __name__ == "__main__":    app.run(port=5000)
```

tip

Access tokens expire. The `token` dict includes `refresh_token` when you request the `offline_access` scope; use it to obtain new access tokens before expiry.

## Error Handling[​](#error-handling "Direct link to Error Handling")

```
from glean.api_client import Glean, errorsimport oswith Glean(    api_token=os.getenv("GLEAN_API_TOKEN"),    server_url=os.getenv("GLEAN_SERVER_URL"),) as client:    try:        response = client.client.search.query(            query="quarterly business review",            page_size=10,        )        print(response)    except errors.GleanDataError as e:        # 403 Permission Denied, 422 Invalid Query        print(f"Data error: {e}")    except errors.GleanError as e:        # Base error for all other API errors (400, 401, 408, 429, 5XX)        print(f"API error: {e}")
```

## Testing[​](#testing "Direct link to Testing")

### Unit Testing with Mocks[​](#unit-testing-with-mocks "Direct link to Unit Testing with Mocks")

```
import pytestfrom unittest.mock import patch, MagicMock@pytest.fixturedef mock_glean_client():    with patch('your_app.Glean') as mock:        client_instance = MagicMock()        mock.return_value.__enter__.return_value = client_instance        yield client_instancedef test_chat_service(mock_glean_client):    mock_response = MagicMock()    mock_response.text = "Test response"    mock_glean_client.client.chat.create.return_value = mock_response        result = send_message("Hello")    assert result == "Test response"
```

## Additional Resources[​](#additional-resources "Direct link to Additional Resources")

[

### GitHub Repository

Source code and examples







](https://github.com/gleanwork/api-client-python)[

### API Reference

Complete endpoint documentation







](/api/client-api)[

### Authentication Guide

Token creation and management







](/api-info/client/authentication/overview)[

### LangChain Integration

Use with LangChain framework







](/guides/agents/langchain)
