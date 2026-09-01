---
url: "https://developers.glean.com/api/client-api/chat/overview"
canonical: "https://developers.glean.com/api/client-api/chat/overview"
title: "Chat API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:52.791Z"
---
The Chat API enables you to build conversational experiences with Glean AI. Create interactive chat applications, manage conversation history, upload files for context, and leverage Glean's AI capabilities to provide intelligent responses based on your organization's knowledge.

## Use Cases

### AI-Powered Conversations

Build interactive chat applications that leverage Glean AI to provide intelligent responses based on your organization's indexed content.

### File-Enhanced Context

Upload and manage files within chat conversations to provide additional context for more accurate and relevant AI responses.

### Conversation Management

Create, retrieve, and manage chat histories to maintain context across sessions and provide personalized user experiences.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/chat#stream`](/api/client-api/chat/chat-stream) | [Chat](/api/client-api/chat/chat-stream)
Have a conversation with Glean AI.

 |
| POST | [`/rest/api/v1/chat`](/api/client-api/chat/chat) | [Chat](/api/client-api/chat/chat)

Have a conversation with Glean AI.

 |
| GET | [`/rest/api/v1/chat-files/{fileId}`](/api/client-api/chat/get-chat-file) | [Download a chat file](/api/client-api/chat/get-chat-file)

Download the raw content of a file generated or uploaded during a chat session (for example, an image produced by the assistant). Returns the file bytes with a Content-Type header matching the file's MIME type.

 |
| POST | [`/rest/api/v1/deleteallchats`](/api/client-api/chat/deleteallchats) | [Deletes all saved Chats owned by a user](/api/client-api/chat/deleteallchats)

Deletes all saved Chats a user has had and all their contained conversational content.

 |
| POST | [`/rest/api/v1/deletechatfiles`](/api/client-api/chat/deletechatfiles) | [Delete files uploaded by a user for chat](/api/client-api/chat/deletechatfiles)

Delete files uploaded by a user for Chat.

 |
| POST | [`/rest/api/v1/deletechats`](/api/client-api/chat/deletechats) | [Deletes saved Chats](/api/client-api/chat/deletechats)

Deletes saved Chats and all their contained conversational content.

 |
| POST | [`/rest/api/v1/getchat`](/api/client-api/chat/getchat) | [Retrieves a Chat](/api/client-api/chat/getchat)

Retrieves the chat history between Glean Assistant and the user for a given Chat.

 |
| POST | [`/rest/api/v1/getchatapplication`](/api/client-api/chat/getchatapplication) | [Gets the metadata for a custom Chat application](/api/client-api/chat/getchatapplication)

Gets the Chat application details for the specified application ID.

 |
| POST | [`/rest/api/v1/getchatfiles`](/api/client-api/chat/getchatfiles) | [Get files uploaded by a user for Chat](/api/client-api/chat/getchatfiles)

Get files uploaded by a user for Chat.

 |
| POST | [`/rest/api/v1/listchats`](/api/client-api/chat/listchats) | [Retrieves all saved Chats](/api/client-api/chat/listchats)

Retrieves all the saved Chats between Glean Assistant and the user. The returned Chats contain only metadata and no conversational content.

 |
| POST | [`/rest/api/v1/uploadchatfiles`](/api/client-api/chat/uploadchatfiles) | [Upload files for Chat](/api/client-api/chat/uploadchatfiles)

Upload files for Chat.

 |
