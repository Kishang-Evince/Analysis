---
url: "https://developers.glean.com/api/client-api/answers/overview"
canonical: "https://developers.glean.com/api/client-api/answers/overview"
title: "Answers API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:52.183Z"
---
The Answers API enables you to create, manage, and retrieve user-generated answers to frequently asked questions. These answers help build a comprehensive knowledge base that improves search results and provides instant responses to common queries within your organization.

## Use Cases

### Knowledge Base Creation

Build and maintain a comprehensive repository of questions and answers to help users find information quickly and efficiently.

### FAQ Management

Create, update, and organize frequently asked questions with detailed answers to reduce support tickets and improve self-service.

### Search Enhancement

Improve search results by providing curated answers that appear prominently when users search for related topics.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/createanswer`](/api/client-api/answers/createanswer) | [Create Answer](/api/client-api/answers/createanswer)
Create a user-generated Answer that contains a question and answer.

 |
| POST | [`/rest/api/v1/deleteanswer`](/api/client-api/answers/deleteanswer) | [Delete Answer](/api/client-api/answers/deleteanswer)

Delete an existing user-generated Answer.

 |
| POST | [`/rest/api/v1/editanswer`](/api/client-api/answers/editanswer) | [Update Answer](/api/client-api/answers/editanswer)

Update an existing user-generated Answer.

 |
| POST | [`/rest/api/v1/getanswer`](/api/client-api/answers/getanswer) | [Read Answer](/api/client-api/answers/getanswer)

Read the details of a particular Answer given its ID.

 |
| POST | [`/rest/api/v1/listanswers`](/api/client-api/answers/listanswers) | [List Answers](/api/client-api/answers/listanswers)

List Answers created by the current user.

 |
