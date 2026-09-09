---
url: "https://developers.glean.com/libraries/api-clients/java"
canonical: "https://developers.glean.com/libraries/api-clients/java"
title: "Java API Client | Glean Developer"
description: "Complete guide to using Glean's Java API client for enterprise applications"
fetched_at: "2026-09-01T13:23:04.181Z"
---
On this page

Glean's Java API client provides enterprise-ready integration for Java applications, with support for Spring Boot and traditional enterprise patterns.

[

### glean-api-client

Official Java client for Glean's Client API







](https://github.com/gleanwork/api-client-java)

## Installation[​](#installation "Direct link to Installation")

-   Maven
-   Gradle

```
<dependency>  <groupId>com.glean.api-client</groupId>  <artifactId>glean-api-client</artifactId>  <version>0.x.x</version></dependency>
```

```
implementation 'com.glean.api-client:glean-api-client:0.x.x'
```

## Quick Start[​](#quick-start "Direct link to Quick Start")

```
import com.glean.api_client.glean_api_client.Glean;import com.glean.api_client.glean_api_client.models.components.*;import java.util.List;public class GleanExample {  public static void main(String[] args) throws Exception {    Glean client = Glean.builder()        .apiToken(System.getenv("GLEAN_API_TOKEN"))        .serverURL(System.getenv("GLEAN_SERVER_URL"))        .build();    var response = client.client().chat().create()        .chatRequest(ChatRequest.builder()            .messages(List.of(                ChatMessage.builder()                    .fragments(List.of(                        ChatMessageFragment.builder()                            .text("What are our company values?")                            .build()))                    .build()))            .build())        .call();    if (response.chatResponse().isPresent()) {      System.out.println(response.chatResponse().get());    }  }}
```

## Core Features[​](#core-features "Direct link to Core Features")

### Chat API[​](#chat-api "Direct link to Chat API")

```
public class ChatService {  private final Glean client;    public ChatService(String apiToken, String serverURL) {    this.client = Glean.builder()        .apiToken(apiToken)        .serverURL(serverURL)        .build();  }    public String sendMessage(String message) throws Exception {    var response = client.client().chat().create()        .chatRequest(ChatRequest.builder()            .messages(List.of(                ChatMessage.builder()                    .fragments(List.of(                        ChatMessageFragment.builder()                            .text(message)                            .build()))                    .build()))            .build())        .call();            return response.chatResponse()        .map(chat -> chat.messages().stream()            .flatMap(msg -> msg.fragments().stream())            .map(fragment -> fragment.text().orElse(""))            .collect(Collectors.joining()))        .orElse("No response");  }}
```

### Search API[​](#search-api "Direct link to Search API")

```
public class SearchService {  private final Glean client;    public SearchService(String apiToken, String serverURL) {    this.client = Glean.builder()        .apiToken(apiToken)        .serverURL(serverURL)        .build();  }    public List<SearchResult> search(String query) throws Exception {    var response = client.client().search().query()        .searchRequest(SearchRequest.builder()            .query(query)            .pageSize(10L)            .build())        .call();            return response.searchResponse()        .map(SearchResponse::results)        .orElse(List.of());  }}
```

## Spring Boot Integration[​](#spring-boot-integration "Direct link to Spring Boot Integration")

### Configuration[​](#configuration "Direct link to Configuration")

```
@Configuration@ConfigurationProperties(prefix = "glean")public class GleanConfig {  private String apiToken;  private String serverURL;  // Getters and setters  public String getApiToken() { return apiToken; }  public void setApiToken(String apiToken) { this.apiToken = apiToken; }  public String getServerURL() { return serverURL; }  public void setServerURL(String serverURL) { this.serverURL = serverURL; }}@Configuration@EnableConfigurationProperties(GleanConfig.class)public class GleanAutoConfiguration {  @Bean  public Glean gleanClient(GleanConfig config) {    return Glean.builder()        .apiToken(config.getApiToken())        .serverURL(config.getServerURL())        .build();  }}
```

### REST Controller[​](#rest-controller "Direct link to REST Controller")

```
@RestController@RequestMapping("/api")public class GleanController {    private final Glean gleanClient;    public GleanController(Glean gleanClient) {    this.gleanClient = gleanClient;  }    @PostMapping("/chat")  public ResponseEntity<String> chat(@RequestBody Map<String, String> request) {    try {      String message = request.get("message");            var response = gleanClient.client().chat().create()          .chatRequest(ChatRequest.builder()              .messages(List.of(                  ChatMessage.builder()                      .fragments(List.of(                          ChatMessageFragment.builder()                              .text(message)                              .build()))                      .build()))              .build())          .call();                String responseText = response.chatResponse()          .map(chat -> chat.messages().stream()              .flatMap(msg -> msg.fragments().stream())              .map(fragment -> fragment.text().orElse(""))              .collect(Collectors.joining()))          .orElse("No response");                return ResponseEntity.ok(responseText);    } catch (Exception e) {      return ResponseEntity.status(500).body("Error: " + e.getMessage());    }  }}
```

## Authentication[​](#authentication "Direct link to Authentication")

### User-Scoped Tokens[​](#user-scoped-tokens "Direct link to User-Scoped Tokens")

```
Glean client = Glean.builder()    .apiToken("your-user-token")    .serverURL("https://your-server-id-be.glean.com")    .build();
```

### Configuration Properties[​](#configuration-properties "Direct link to Configuration Properties")

```
# application.ymlglean:  api-token: ${GLEAN_API_TOKEN}  server-url: ${GLEAN_SERVER_URL}
```

### OAuth Access Tokens[​](#oauth-access-tokens "Direct link to OAuth Access Tokens")

An OAuth access token is a bearer credential, so it goes in the same `apiToken` field:

```
Glean client = Glean.builder()    .apiToken(oauthAccessToken)    .serverURL("https://your-server-id-be.glean.com")    .build();
```

Tokens issued by the **Glean OAuth Authorization Server** (including tokens obtained via Dynamic Client Registration) are detected automatically and need no extra header.

Tokens issued by an **external identity provider** (Google, Okta, Azure, etc.) additionally require the `X-Glean-Auth-Type: OAUTH` header on each request. The builder has no per-request header option, so supply a custom HTTP client that adds it:

```
import com.glean.api_client.glean_api_client.utils.HTTPClient;import com.glean.api_client.glean_api_client.utils.SpeakeasyHTTPClient;import com.glean.api_client.glean_api_client.utils.Utils;import java.io.InputStream;import java.net.http.HttpRequest;import java.net.http.HttpResponse;HTTPClient oauthClient = new SpeakeasyHTTPClient() {  @Override  public HttpResponse<InputStream> send(HttpRequest request)      throws java.io.IOException, InterruptedException, java.net.URISyntaxException {    return super.send(Utils.copy(request)        .header("X-Glean-Auth-Type", "OAUTH")        .build());  }};Glean client = Glean.builder()    .apiToken(oauthAccessToken)    .serverURL("https://your-server-id-be.glean.com")    .client(oauthClient)    .build();
```

See the [OAuth authentication guide](/api-info/client/authentication/oauth) for identity-provider setup.

#### Complete Example: Authorization Code with PKCE[​](#complete-example-authorization-code-with-pkce "Direct link to Complete Example: Authorization Code with PKCE")

This example uses Spring Security's OAuth2 Client. Point `OAUTH_ISSUER` at the Glean OAuth Authorization Server or your IdP. For a confidential client, enable PKCE with an authorization-request customizer (it is on by default for public clients).

```
# application.ymlspring:  security:    oauth2:      client:        registration:          glean:            provider: glean            client-id: ${OAUTH_CLIENT_ID}            client-secret: ${OAUTH_CLIENT_SECRET}            authorization-grant-type: authorization_code            scope: openid,offline_access,SEARCH # SEARCH lets the token call /search; offline_access requests a refresh token            redirect-uri: '{baseUrl}/login/oauth2/code/{registrationId}'        provider:          glean:            issuer-uri: ${OAUTH_ISSUER}glean:  server-url: ${GLEAN_SERVER_URL}
```

```
// SecurityConfig.java - enable PKCE for a confidential clientimport org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;import org.springframework.security.config.annotation.web.builders.HttpSecurity;import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestCustomizers;import org.springframework.security.web.SecurityFilterChain;@Configurationpublic class SecurityConfig {  @Bean  SecurityFilterChain filterChain(HttpSecurity http, ClientRegistrationRepository repo)      throws Exception {    var resolver = new DefaultOAuth2AuthorizationRequestResolver(repo, "/oauth2/authorization");    resolver.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());    http.oauth2Login(login -> login        .authorizationEndpoint(endpoint -> endpoint.authorizationRequestResolver(resolver)));    return http.build();  }}
```

```
// SearchController.java - exchange the authorized client's token for a Glean callimport org.springframework.beans.factory.annotation.Value;import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;import com.glean.api_client.glean_api_client.Glean;import com.glean.api_client.glean_api_client.models.components.*;import java.util.List;@RestControllerpublic class SearchController {  @Value("${glean.server-url}")  private String serverURL;  @GetMapping("/search")  public List<SearchResult> search(      @RegisteredOAuth2AuthorizedClient("glean") OAuth2AuthorizedClient authorizedClient)      throws Exception {    String accessToken = authorizedClient.getAccessToken().getTokenValue();    // For external-IdP tokens, add a custom HTTPClient that sets    // X-Glean-Auth-Type: OAUTH (see "OAuth Access Tokens" above). Glean    // Authorization Server tokens need no extra header.    Glean glean = Glean.builder()        .apiToken(accessToken)        .serverURL(serverURL)        .build();    return glean.client().search().query()        .searchRequest(SearchRequest.builder()            .query("quarterly reports")            .pageSize(10L)            .build())        .call()        .searchResponse()        .map(SearchResponse::results)        .orElse(List.of());  }}
```

## Error Handling[​](#error-handling "Direct link to Error Handling")

```
public String safeChat(Glean client, String message) {  try {    var response = client.client().chat().create()        .chatRequest(ChatRequest.builder()            .messages(List.of(                ChatMessage.builder()                    .fragments(List.of(                        ChatMessageFragment.builder()                            .text(message)                            .build()))                    .build()))            .build())        .call();            return response.chatResponse()        .map(chat -> chat.messages().stream()            .flatMap(msg -> msg.fragments().stream())            .map(fragment -> fragment.text().orElse(""))            .collect(Collectors.joining()))        .orElse("No response");  } catch (Exception e) {    System.err.println("API error: " + e.getMessage());    return "Sorry, I couldn't process your request.";  }}
```

## Testing[​](#testing "Direct link to Testing")

### JUnit 5 with Mockito[​](#junit-5-with-mockito "Direct link to JUnit 5 with Mockito")

```
@ExtendWith(MockitoExtension.class)class ChatServiceTest {    @Mock  private Glean gleanClient;    @InjectMocks  private ChatService chatService;    @Test  void shouldSendMessageSuccessfully() {    String message = "Test message";    String expectedResponse = "Test response";        // Mock setup and test implementation    assertNotNull(expectedResponse);  }}
```

## Additional Resources[​](#additional-resources "Direct link to Additional Resources")

[

### GitHub Repository

Source code and examples







](https://github.com/gleanwork/api-client-java)[

### API Reference

Complete endpoint documentation







](/api/client-api)[

### Authentication Guide

Token creation and management







](/api-info/client/authentication/overview)[

### Maven Central

Maven repository







](https://central.sonatype.com/)
