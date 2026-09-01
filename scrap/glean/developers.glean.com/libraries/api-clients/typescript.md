---
url: "https://developers.glean.com/libraries/api-clients/typescript"
canonical: "https://developers.glean.com/libraries/api-clients/typescript"
title: "TypeScript API Client | Glean Developer"
description: "Complete guide to using Glean's TypeScript/JavaScript API client"
fetched_at: "2026-09-01T13:23:04.298Z"
---
On this page

Glean's TypeScript API client provides full type safety for integrating Glean's search and AI capabilities into web applications and Node.js services.

[

### @gleanwork/api-client

Official TypeScript/JavaScript client for Glean's Client API







](https://github.com/gleanwork/api-client-typescript)

## Installation[​](#installation "Direct link to Installation")

-   npm
-   yarn
-   pnpm

```
npm install @gleanwork/api-client
```

```
yarn add @gleanwork/api-client
```

```
pnpm add @gleanwork/api-client
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

```
import { Glean } from "@gleanwork/api-client";const client = new Glean({  apiToken: process.env.GLEAN_API_TOKEN,  serverURL: process.env.GLEAN_SERVER_URL,});const result = await client.client.chat.create({  messages: [{    fragments: [{ text: "What are our company values?" }]  }]});
```

## Core Features[​](#core-features "Direct link to Core Features")

### Chat API[​](#chat-api "Direct link to Chat API")

```
// Simple chatconst response = await client.client.chat.create({  messages: [{ fragments: [{ text: "Explain our Q4 strategy" }] }]});// Streaming responsesconst stream = await client.client.chat.createStream({  messages: [{ fragments: [{ text: "What are our priorities?" }] }]});console.log(stream);
```

### Search API[​](#search-api "Direct link to Search API")

```
const results = await client.client.search.query({  query: "quarterly business review",  pageSize: 10});results.results?.forEach(result => {  console.log(`Title: ${result.title}`);  console.log(`URL: ${result.url}`);});
```

## Framework Integrations[​](#framework-integrations "Direct link to Framework Integrations")

### Next.js API Route[​](#nextjs-api-route "Direct link to Next.js API Route")

```
// app/api/chat/route.tsimport { NextRequest, NextResponse } from 'next/server';import { Glean } from '@gleanwork/api-client';export async function POST(request: NextRequest) {  const { message } = await request.json();    const client = new Glean({    apiToken: process.env.GLEAN_API_TOKEN!,    serverURL: process.env.GLEAN_SERVER_URL!,  });  const response = await client.client.chat.create({    messages: [{ fragments: [{ text: message }] }]  });  const answer = response.messages    ?.flatMap((m) => m.fragments ?? [])    .map((f) => f.text ?? '')    .join('') ?? '';  return NextResponse.json({ answer });}
```

### React Component[​](#react-component "Direct link to React Component")

```
import React, { useState } from 'react';import { Glean } from '@gleanwork/api-client';type ChatComponentProps = {  apiToken: string;  serverURL: string;};export function ChatComponent({  apiToken,  serverURL,}: ChatComponentProps) {  const [input, setInput] = useState('');  const [response, setResponse] = useState('');  const client = new Glean({ apiToken, serverURL });  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {    e.preventDefault();    const result = await client.client.chat.create({      messages: [{ fragments: [{ text: input }] }],    });    const answer =      result.messages        ?.flatMap((m) => m.fragments ?? [])        .map((f) => f.text ?? '')        .join('') ?? '';    setResponse(answer);  };  return (    <form onSubmit={handleSubmit}>      <input        value={input}        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>          setInput(e.target.value)        }        placeholder="Ask a question..."      />      <button type="submit">Send</button>      {response && <div>{response}</div>}    </form>  );}
```

### Express.js[​](#expressjs "Direct link to Express.js")

```
import express from 'express';import { Glean } from '@gleanwork/api-client';const app = express();app.use(express.json());const client = new Glean({  apiToken: process.env.GLEAN_API_TOKEN!,  serverURL: process.env.GLEAN_SERVER_URL!,});app.post('/api/chat', async (req, res) => {  const { message } = req.body;    const response = await client.client.chat.create({    messages: [{ fragments: [{ text: message }] }]  });  const answer = response.messages    ?.flatMap((m) => m.fragments ?? [])    .map((f) => f.text ?? '')    .join('') ?? '';  res.json({ answer });});
```

## Authentication[​](#authentication "Direct link to Authentication")

### User-Scoped Tokens[​](#user-scoped-tokens "Direct link to User-Scoped Tokens")

```
const client = new Glean({  apiToken: "your-user-token",  serverURL: "https://your-server-id-be.glean.com"});
```

### Global Tokens with ActAs[​](#global-tokens-with-actas "Direct link to Global Tokens with ActAs")

```
const response = await client.client.chat.create(  { messages: [{ fragments: [{ text: "Hello" }] }] },  undefined,  undefined,  { fetchOptions: { headers: { "X-Glean-ActAs": "user@company.com" } } });
```

### OAuth Access Tokens[​](#oauth-access-tokens "Direct link to OAuth Access Tokens")

An OAuth access token is a bearer credential, so it goes in the same `apiToken` field — no separate option is needed:

```
const client = new Glean({  apiToken: oauthAccessToken,  serverURL: "https://your-server-id-be.glean.com",});
```

Tokens issued by the **Glean OAuth Authorization Server** (including tokens obtained via Dynamic Client Registration) are detected automatically. Tokens issued by an **external identity provider** (Google, Okta, Azure, etc.) additionally require the `X-Glean-Auth-Type: OAUTH` header on each request:

```
const response = await client.client.chat.create(  { messages: [{ fragments: [{ text: "Hello" }] }] },  undefined,  undefined,  { fetchOptions: { headers: { "X-Glean-Auth-Type": "OAUTH" } } },);
```

See the [OAuth authentication guide](/api-info/client/authentication/oauth) for identity-provider setup.

#### Complete Example: Authorization Code with PKCE[​](#complete-example-authorization-code-with-pkce "Direct link to Complete Example: Authorization Code with PKCE")

This example uses [`openid-client`](https://github.com/panva/openid-client) (v6) with Express. It runs the Authorization Code flow with PKCE, then passes the resulting access token to the Glean client. Point `OAUTH_ISSUER` at the Glean OAuth Authorization Server metadata (`https://your-server-id-be.glean.com/.well-known/oauth-authorization-server`) or your IdP's issuer.

```
import express from 'express';import session from 'express-session';import * as client from 'openid-client';import { Glean } from '@gleanwork/api-client';const app = express();app.use(session({ secret: 'change-me', resave: false, saveUninitialized: false }));let config: client.Configuration;async function init() {  config = await client.discovery(    new URL(process.env.OAUTH_ISSUER!),    process.env.OAUTH_CLIENT_ID!,    process.env.OAUTH_CLIENT_SECRET, // omit for a public client  );}app.get('/login', async (req, res) => {  // PKCE values must be generated per request and stored in the session.  const codeVerifier = client.randomPKCECodeVerifier();  const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);  (req.session as any).codeVerifier = codeVerifier;  const params: Record<string, string> = {    redirect_uri: 'http://localhost:3000/callback',    scope: 'openid offline_access SEARCH', // SEARCH lets the token call /search (a Glean scope); offline_access requests a refresh token    code_challenge: codeChallenge,    code_challenge_method: 'S256',  };  // state is only needed if the server doesn't advertise PKCE support  if (!config.serverMetadata().supportsPKCE()) {    const state = client.randomState();    (req.session as any).state = state;    params.state = state;  }  res.redirect(client.buildAuthorizationUrl(config, params).href);});app.get('/callback', async (req, res) => {  const currentUrl = new URL(req.url, `http://${req.headers.host}`);  const tokens = await client.authorizationCodeGrant(config, currentUrl, {    pkceCodeVerifier: (req.session as any).codeVerifier,    expectedState: (req.session as any).state, // undefined when PKCE is used  });  const glean = new Glean({    apiToken: tokens.access_token,    serverURL: process.env.GLEAN_SERVER_URL!,  });  const results = await glean.client.search.query(    { query: 'quarterly reports', pageSize: 10 },    undefined,    // Omit these headers when the token is from the Glean Authorization Server.    { fetchOptions: { headers: { 'X-Glean-Auth-Type': 'OAUTH' } } },  );  res.json(results);});init().then(() => app.listen(3000));
```

tip

Access tokens expire. Persist `tokens.refresh_token` and refresh with `client.refreshTokenGrant(config, refreshToken)` before expiry.

## Error Handling[​](#error-handling "Direct link to Error Handling")

```
import { GleanError, GleanDataError } from "@gleanwork/api-client/models/errors";try {  const response = await client.client.chat.create({    messages: [{ fragments: [{ text: "Hello" }] }]  });} catch (error) {  if (error instanceof GleanError) {    console.error(error.message);    console.error(error.statusCode);    console.error(error.body);  }  if (error instanceof GleanDataError) {    console.error(error.errorMessages);  }  throw error;}
```

## Testing[​](#testing "Direct link to Testing")

```
import { jest } from '@jest/globals';import { Glean } from '@gleanwork/api-client';jest.mock('@gleanwork/api-client');const MockedGlean = Glean as jest.MockedClass<typeof Glean>;test('chat service', async () => {  const mockCreate = jest.fn().mockResolvedValue({    messages: [{ fragments: [{ text: 'Test response' }] }]  });  MockedGlean.mockImplementation(() => ({    client: { chat: { create: mockCreate } }  } as any));  // Test your code here});
```

## Additional Resources[​](#additional-resources "Direct link to Additional Resources")

[

### GitHub Repository

Source code and examples







](https://github.com/gleanwork/api-client-typescript)[

### API Reference

Complete endpoint documentation







](/api/client-api)[

### Web SDK

Frontend integration components







](/libraries/web-sdk/overview)[

### Authentication Guide

Token creation and management







](/api-info/client/authentication/overview)
