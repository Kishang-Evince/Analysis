---
url: "https://docs.glean.com/administration/oauth/static-client-token-example"
canonical: "https://docs.glean.com/administration/oauth/static-client-token-example"
title: "Get tokens with a static OAuth client"
description: "Complete the authorization code flow with PKCE by using a static OAuth client"
fetched_at: "2026-09-01T13:29:10.676Z"
---
On this page

You can obtain access and refresh tokens from the Glean OAuth Authorization Server by using a static OAuth client.

These examples use the authorization code flow with Proof Key for Code Exchange (PKCE), a localhost redirect URI, and `client_secret_post` so you can inspect each step of the exchange.

When you call the Glean Client API with an OAuth access token, include the header `Authorization: Bearer <token>`.

info

If your static client uses a different token endpoint authentication method, adjust the token and refresh requests to match your client configuration.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following setup steps:

-   Enable the Glean OAuth Authorization Server. See [Glean OAuth Authorization Server](/administration/oauth/authorization-server).
-   Create a static OAuth client. See [Static OAuth clients](/administration/oauth/static-client-registration).
-   Register the redirect URI `http://127.0.0.1:9090/oauth/callback` on your static client.

In the examples below, copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

## Examples[​](#examples "Direct link to Examples")

See the following examples for Bash and TypeScript to learn how to get tokens with a static OAuth client.

Important

These examples are not production code. They only show how to complete the OAuth authorization code flow and make a basic client API request. In production, follow best practices for credential storage, token management, redirect handling, and error handling.

-   Bash
-   TypeScript

### Prerequisites[​](#prerequisites-1 "Direct link to Prerequisites")

Install the following tools before you run the Bash example:

-   `bash`
-   `curl`
-   `jq`
-   `openssl`
-   `nc`

### 1\. Set up variables[​](#1-set-up-variables "Direct link to 1. Set up variables")

Register the redirect URI `http://127.0.0.1:9090/oauth/callback`:

```
export CLIENT_ID='YOUR_STATIC_CLIENT_ID'export CLIENT_SECRET='YOUR_STATIC_CLIENT_SECRET'export GLEAN_BACKEND_URL='https://tenant_id-be.glean.com'export REDIRECT_URI='http://127.0.0.1:9090/oauth/callback'export CALLBACK_CAPTURE='/tmp/glean-oauth-callback.request'
```

### 2\. Discover OAuth metadata[​](#2-discover-oauth-metadata "Direct link to 2. Discover OAuth metadata")

Discover the OAuth metadata for the Glean OAuth Authorization Server:

```
export OAUTH_METADATA=$(curl -fsS "$GLEAN_BACKEND_URL/.well-known/oauth-authorization-server")export AUTHORIZATION_ENDPOINT=$(jq -r '.authorization_endpoint' <<<"$OAUTH_METADATA")export TOKEN_ENDPOINT=$(jq -r '.token_endpoint' <<<"$OAUTH_METADATA")export ISSUER=$(jq -r '.issuer' <<<"$OAUTH_METADATA")echo "issuer=$ISSUER"echo "authorization_endpoint=$AUTHORIZATION_ENDPOINT"echo "token_endpoint=$TOKEN_ENDPOINT"echo "code challenge methods:"jq -r '.code_challenge_methods_supported[]?' <<<"$OAUTH_METADATA"echo "token endpoint auth methods:"jq -r '.token_endpoint_auth_methods_supported[]?' <<<"$OAUTH_METADATA"
```

### 3\. Generate PKCE values[​](#3-generate-pkce-values "Direct link to 3. Generate PKCE values")

Generate the PKCE values:

```
b64url() {  openssl base64 -A | tr '+/' '-_' | tr -d '='}export STATE=$(openssl rand -base64 32 | tr -d '\n=' | tr '+/' '-_' | cut -c1-43)export CODE_VERIFIER=$(openssl rand -base64 64 | tr -d '\n=' | tr '+/' '-_' | cut -c1-86)export CODE_CHALLENGE=$(  printf '%s' "$CODE_VERIFIER" | openssl dgst -binary -sha256 | b64url)
```

### 4\. Start a localhost callback listener[​](#4-start-a-localhost-callback-listener "Direct link to 4. Start a localhost callback listener")

Before you open the authorization URL, create a response file for the callback:

```
cat > /tmp/glean-oauth-callback.response <<'EOF'HTTP/1.1 200 OKContent-Type: text/plain; charset=utf-8Connection: closeOAuth callback captured. You can return to the terminal.EOFrm -f "$CALLBACK_CAPTURE"nc -l 127.0.0.1 9090 < /tmp/glean-oauth-callback.response > "$CALLBACK_CAPTURE"
```

If you do not want to use `nc`, you can use any local listener that accepts one request on `127.0.0.1:9090` and writes the raw HTTP request to `"$CALLBACK_CAPTURE"`. For example, you can use `python -m http.server 9090` to start a simple HTTP server.

### 5\. Open the authorization URL[​](#5-open-the-authorization-url "Direct link to 5. Open the authorization URL")

Open the authorization URL:

```
export AUTHORIZE_URL=$(  jq -rn \    --arg endpoint "$AUTHORIZATION_ENDPOINT" \    --arg client_id "$CLIENT_ID" \    --arg redirect_uri "$REDIRECT_URI" \    --arg state "$STATE" \    --arg code_challenge "$CODE_CHALLENGE" \    '$endpoint + "?" + (      [        ["response_type", "code"],        ["client_id", $client_id],        ["redirect_uri", $redirect_uri],        ["state", $state],        ["code_challenge", $code_challenge],        ["code_challenge_method", "S256"]      ]      | map("\(.[0])=\(.[1] | @uri)")      | join("&")    )')printf '%s\n' "$AUTHORIZE_URL"
```

This code opens the URL in your browser. On macOS, you can also run `open $AUTHORIZE_URL`.

Sign in and complete the consent flow in your browser. Glean should redirect back to `http://127.0.0.1:9090/oauth/callback?...`, and the `nc` process should exit after writing the request to `"$CALLBACK_CAPTURE"`.

### 6\. Extract the authorization code[​](#6-extract-the-authorization-code "Direct link to 6. Extract the authorization code")

Extract the authorization code:

```
# Extract the authorization code from the callback requesturldecode() {  local data="${1//+/ }"  printf '%b' "${data//%/\\x}"}export REQUEST_LINE=$(sed -n '1s/\r$//p' "$CALLBACK_CAPTURE")export QUERY_STRING="${REQUEST_LINE#GET /oauth/callback?}"export QUERY_STRING="${QUERY_STRING%% HTTP/*}"export RAW_CODE=$(printf '%s\n' "$QUERY_STRING" | tr '&' '\n' | sed -n 's/^code=//p')export RAW_STATE=$(printf '%s\n' "$QUERY_STRING" | tr '&' '\n' | sed -n 's/^state=//p')export RAW_ERROR=$(printf '%s\n' "$QUERY_STRING" | tr '&' '\n' | sed -n 's/^error=//p')export AUTH_CODE=$(urldecode "$RAW_CODE")export RETURNED_STATE=$(urldecode "$RAW_STATE")export RETURNED_ERROR=$(urldecode "$RAW_ERROR")if [ -n "$RETURNED_ERROR" ]; then  echo "OAuth error: $RETURNED_ERROR" >&2  exit 1fiif [ "$RETURNED_STATE" != "$STATE" ]; then  echo "state mismatch" >&2  exit 1fiprintf 'Captured auth code prefix: %s\n' "${AUTH_CODE:0:16}"
```

### 7\. Exchange the code for tokens[​](#7-exchange-the-code-for-tokens "Direct link to 7. Exchange the code for tokens")

Exchange the authorization code for tokens using `client_secret_post`:

```
export TOKEN_RESPONSE=$(  curl -fsS -X POST "$TOKEN_ENDPOINT" \    -H 'Content-Type: application/x-www-form-urlencoded' \    --data-urlencode 'grant_type=authorization_code' \    --data-urlencode "code=$AUTH_CODE" \    --data-urlencode "redirect_uri=$REDIRECT_URI" \    --data-urlencode "client_id=$CLIENT_ID" \    --data-urlencode "client_secret=$CLIENT_SECRET" \    --data-urlencode "code_verifier=$CODE_VERIFIER")jq . <<<"$TOKEN_RESPONSE"export ACCESS_TOKEN=$(jq -r '.access_token' <<<"$TOKEN_RESPONSE")export REFRESH_TOKEN=$(jq -r '.refresh_token // empty' <<<"$TOKEN_RESPONSE")
```

### 8\. Call the Chat API[​](#8-call-the-chat-api "Direct link to 8. Call the Chat API")

Use the access token to make a simple client API request:

```
export CHAT_RESPONSE=$(  curl -fsS -X POST "$GLEAN_BACKEND_URL/rest/api/v1/chat" \    -H "Authorization: Bearer $ACCESS_TOKEN" \    -H 'Content-Type: application/json' \    -d '{      "messages": [{"fragments": [{"text": "Who is on the executive team?"}]}]    }')jq . <<<"$CHAT_RESPONSE"
```

### 9\. Inspect the access token[​](#9-inspect-the-access-token "Direct link to 9. Inspect the access token")

Decode the JWT locally so you can inspect the claims:

```
jwt_b64url_decode() {  local input="$1"  case $((${#input} % 4)) in    2) input="${input}==" ;;    3) input="${input}=" ;;    1)      echo "invalid base64url input" >&2      return 1      ;;  esac  printf '%s' "$input" | tr '_-' '/+' | openssl base64 -d -A}export JWT_HEADER_B64=$(cut -d '.' -f1 <<<"$ACCESS_TOKEN")export JWT_PAYLOAD_B64=$(cut -d '.' -f2 <<<"$ACCESS_TOKEN")echo "jwt header:"jwt_b64url_decode "$JWT_HEADER_B64" | jq .echo "jwt claims:"jwt_b64url_decode "$JWT_PAYLOAD_B64" | jq .
```

note

This does not verify the signature.

### 10\. Use the refresh token[​](#10-use-the-refresh-token "Direct link to 10. Use the refresh token")

Use the refresh token to obtain a new access token:

```
if [ -z "$REFRESH_TOKEN" ]; then  echo "No refresh token was returned"  exit 1fiexport REFRESH_RESPONSE=$(  curl -fsS -X POST "$TOKEN_ENDPOINT" \    -H 'Content-Type: application/x-www-form-urlencoded' \    --data-urlencode 'grant_type=refresh_token' \    --data-urlencode "refresh_token=$REFRESH_TOKEN" \    --data-urlencode "client_id=$CLIENT_ID" \    --data-urlencode "client_secret=$CLIENT_SECRET")jq . <<<"$REFRESH_RESPONSE"export REFRESHED_ACCESS_TOKEN=$(jq -r '.access_token' <<<"$REFRESH_RESPONSE")export REFRESHED_REFRESH_TOKEN=$(jq -r '.refresh_token // empty' <<<"$REFRESH_RESPONSE")
```

### Prerequisites[​](#prerequisites-2 "Direct link to Prerequisites")

Complete the following prerequisites before you run the TypeScript example:

-   Install Node 24 or later. This example runs directly with `node` and does not require any external packages.
-   If you are using an earlier Node version, run the script with `node --experimental-strip-types`.

### 1\. Save the script[​](#1-save-the-script "Direct link to 1. Save the script")

Save the following script as `oauth-static-client.ts`:

```
import { createHash, randomBytes } from 'node:crypto';import { createServer } from 'node:http';import process from 'node:process';type OAuthMetadata = {  authorization_endpoint: string;  token_endpoint: string;  issuer: string;  code_challenge_methods_supported?: string[];  token_endpoint_auth_methods_supported?: string[];};type TokenResponse = {  access_token: string;  refresh_token?: string;  [key: string]: unknown;};const CLIENT_ID = process.env.CLIENT_ID ?? 'YOUR_STATIC_CLIENT_ID';const CLIENT_SECRET = process.env.CLIENT_SECRET ?? 'YOUR_STATIC_CLIENT_SECRET';const GLEAN_BACKEND_URL =  process.env.GLEAN_BACKEND_URL ?? 'https://tenant_id-be.glean.com';const REDIRECT_URI =  process.env.REDIRECT_URI ?? 'http://127.0.0.1:9090/oauth/callback';function base64Url(input: Buffer): string {  return input.toString('base64url');}function decodeJwtPart(part: string): unknown {  if (!part) {    throw new Error('Missing JWT segment');  }  return JSON.parse(Buffer.from(part, 'base64url').toString('utf8'));}async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {  const response = await fetch(url, init);  const text = await response.text();  if (!response.ok) {    throw new Error(`Request to ${url} failed (${response.status}): ${text}`);  }  return JSON.parse(text) as T;}async function waitForOAuthCallback(  redirectUri: string,  expectedState: string,): Promise<string> {  const redirectUrl = new URL(redirectUri);  const port = Number.parseInt(redirectUrl.port || '80', 10);  return await new Promise<string>((resolve, reject) => {    const server = createServer((req, res) => {      try {        const callbackUrl = new URL(          req.url ?? '/',          `${redirectUrl.protocol}//${redirectUrl.host}`,        );        if (callbackUrl.pathname !== redirectUrl.pathname) {          res.writeHead(404).end('Not found\n');          return;        }        const error = callbackUrl.searchParams.get('error');        if (error) {          throw new Error(`OAuth error: ${error}`);        }        const returnedState = callbackUrl.searchParams.get('state');        if (returnedState !== expectedState) {          throw new Error('State mismatch');        }        const code = callbackUrl.searchParams.get('code');        if (!code) {          throw new Error('Missing authorization code in callback');        }        res.writeHead(200, {          'Content-Type': 'text/plain; charset=utf-8',        });        res.end('OAuth callback captured. You can return to the terminal.\n');        server.close(() => resolve(code));      } catch (error) {        res.writeHead(400, {          'Content-Type': 'text/plain; charset=utf-8',        });        res.end('OAuth callback failed. Check the terminal for details.\n');        server.close(() => reject(error));      }    });    server.on('error', reject);    server.listen(port, redirectUrl.hostname, () => {      console.log(`Listening for callback at ${redirectUri}`);    });  });}function logJwt(accessToken: string): void {  const [headerB64, payloadB64] = accessToken.split('.');  console.log('\nJWT header:');  console.log(JSON.stringify(decodeJwtPart(headerB64 ?? ''), null, 2));  console.log('\nJWT claims:');  console.log(JSON.stringify(decodeJwtPart(payloadB64 ?? ''), null, 2));}async function callChatApi(accessToken: string): Promise<unknown> {  return await fetchJson<unknown>(`${GLEAN_BACKEND_URL}/rest/api/v1/chat`, {    method: 'POST',    headers: {      Authorization: `Bearer ${accessToken}`,      'Content-Type': 'application/json',    },    body: JSON.stringify({      messages: [        {          fragments: [            {              text: "Who is on the executive team?"            }          ]        }      ]    }),  });}async function main(): Promise<void> {  if (    CLIENT_ID === 'YOUR_STATIC_CLIENT_ID' ||    CLIENT_SECRET === 'YOUR_STATIC_CLIENT_SECRET' ||    GLEAN_BACKEND_URL === 'https://tenant_id-be.glean.com'  ) {    throw new Error(      'Set CLIENT_ID, CLIENT_SECRET, and GLEAN_BACKEND_URL before you run this script.',    );  }  const metadata = await fetchJson<OAuthMetadata>(    `${GLEAN_BACKEND_URL}/.well-known/oauth-authorization-server`,  );  console.log(`issuer=${metadata.issuer}`);  console.log(`authorization_endpoint=${metadata.authorization_endpoint}`);  console.log(`token_endpoint=${metadata.token_endpoint}`);  console.log('\ncode challenge methods:');  for (const method of metadata.code_challenge_methods_supported ?? []) {    console.log(method);  }  console.log('\ntoken endpoint auth methods:');  for (const method of metadata.token_endpoint_auth_methods_supported ?? []) {    console.log(method);  }  const state = base64Url(randomBytes(32));  const codeVerifier = base64Url(randomBytes(64));  const codeChallenge = base64Url(    createHash('sha256').update(codeVerifier).digest(),  );  const authorizeUrl = new URL(metadata.authorization_endpoint);  authorizeUrl.searchParams.set('response_type', 'code');  authorizeUrl.searchParams.set('client_id', CLIENT_ID);  authorizeUrl.searchParams.set('redirect_uri', REDIRECT_URI);  authorizeUrl.searchParams.set('state', state);  authorizeUrl.searchParams.set('code_challenge', codeChallenge);  authorizeUrl.searchParams.set('code_challenge_method', 'S256');  console.log('\nOpen this URL in your browser:\n');  console.log(authorizeUrl.toString());  const authCode = await waitForOAuthCallback(REDIRECT_URI, state);  console.log(`\nCaptured auth code prefix: ${authCode.slice(0, 16)}`);  // This example uses client_secret_post for token endpoint authentication.  const tokenResponse = await fetchJson<TokenResponse>(metadata.token_endpoint, {    method: 'POST',    headers: {      'Content-Type': 'application/x-www-form-urlencoded',    },    body: new URLSearchParams({      grant_type: 'authorization_code',      code: authCode,      redirect_uri: REDIRECT_URI,      client_id: CLIENT_ID,      client_secret: CLIENT_SECRET,      code_verifier: codeVerifier,    }).toString(),  });  console.log('\nToken response:');  console.log(JSON.stringify(tokenResponse, null, 2));  const chatResponse = await callChatApi(tokenResponse.access_token);  console.log('\nChat response:');  console.log(JSON.stringify(chatResponse, null, 2));  logJwt(tokenResponse.access_token);  if (!tokenResponse.refresh_token) {    console.log('\nNo refresh token was returned');    return;  }  const refreshResponse = await fetchJson<TokenResponse>(    metadata.token_endpoint,    {      method: 'POST',      headers: {        'Content-Type': 'application/x-www-form-urlencoded',      },      body: new URLSearchParams({        grant_type: 'refresh_token',        refresh_token: tokenResponse.refresh_token,        client_id: CLIENT_ID,        client_secret: CLIENT_SECRET,      }).toString(),    },  );  console.log('\nRefresh response:');  console.log(JSON.stringify(refreshResponse, null, 2));}main().catch((error) => {  const message = error instanceof Error ? error.message : String(error);  console.error(message);  process.exit(1);});
```

### 2\. Set your environment variables[​](#2-set-your-environment-variables "Direct link to 2. Set your environment variables")

Set your environment variables:

```
export CLIENT_ID='YOUR_STATIC_CLIENT_ID'export CLIENT_SECRET='YOUR_STATIC_CLIENT_SECRET'export GLEAN_BACKEND_URL='https://tenant_id-be.glean.com'
```

### 3\. Run the script[​](#3-run-the-script "Direct link to 3. Run the script")

For Node 24 or later, run the script:

```
node oauth-static-client.ts
```

For Node versions earlier than Node 24, run the script with the `--experimental-strip-types` flag:

```
node --experimental-strip-types oauth-static-client.ts
```

The script does the following:

-   Prints the authorization URL.
-   Starts a localhost callback listener.
-   Exchanges the authorization code for tokens.
-   Calls the Chat API.
-   Decodes the access token locally.
-   Uses the refresh token if one is returned.

After you obtain an access token, send it as a bearer token when you call the Glean Client API. Include the header `Authorization: Bearer <token>`.

## See also[​](#see-also "Direct link to See also")

-   [Static OAuth clients](/administration/oauth/static-client-registration)
-   [Glean OAuth Authorization Server](/administration/oauth/authorization-server)
-   [OAuth Overview](/administration/oauth/oauth-overview)
-   [Client API authentication overview](https://developers.glean.com/api-info/client/authentication/overview)
-   [OAuth 2.0 Authorization Framework (RFC 6749)](https://datatracker.ietf.org/doc/html/rfc6749)
