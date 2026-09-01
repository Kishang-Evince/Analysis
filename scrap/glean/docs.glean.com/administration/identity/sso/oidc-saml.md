---
url: "https://docs.glean.com/administration/identity/sso/oidc-saml"
canonical: "https://docs.glean.com/administration/identity/sso/oidc-saml"
title: "About OIDC & SAML"
description: "Security Assertion Markup Language (SAML) and OpenID Connect (OIDC) are the two supported protocols for SSO integration in Glean."
fetched_at: "2026-09-01T13:29:07.891Z"
---
On this page

Single Sign-On (SSO) is a fundamental feature for enhancing enterprise security and user experience; enabling secure access to multiple corporate applications for employees using a single set of credentials.

Glean supports both SAML and OIDC protocols for SSO integration, with OIDC being the preferred option due to its modern architecture, fine-grained control over permissions, and efficient directory information synchronization.

Most SSO and Identity Providers (IdPs), including Microsoft Entra ID, Okta, and Google Workspace, support the use of both protocols when setting up SSO.

* * *

## Understanding SAML[​](#understanding-saml "Direct link to Understanding SAML")

SAML is an XML-based standard for securely exchanging authentication and authorization data between IdPs and service providers. It is particularly suited for enterprise environments due to its robustness and comprehensive control over authentication and authorization processes.

### Key Features[​](#key-features "Direct link to Key Features")

-   **Compatibility**: SAML has a long-standing presence and is often the default or only supported protocol for older systems and applications.
-   **Established Trust Framework**: SAML is prevalent in sectors with existing federations or trust frameworks, making it a straightforward choice for entities needing to participate in these ecosystems.

## Understanding OIDC[​](#understanding-oidc "Direct link to Understanding OIDC")

OIDC, built on the OAuth 2.0 framework, adds an authentication layer, facilitating user identity verification using JSON Web Tokens (JWT) for secure user information transfer.

### Key Features[​](#key-features-1 "Direct link to Key Features")

-   **Modern and Lightweight**: OIDC uses JSON and RESTful APIs, making it a streamlined and modern solution suited for new web-based applications.
-   **Fine-Grained Access Control**: OIDC allows for nuanced control over permissions and data shared with the SaaS application.
-   **Interoperability**: OIDC's simplicity promotes easier integration with a broad array of applications and services.

## Differences Between SAML and OIDC[​](#differences-between-saml-and-oidc "Direct link to Differences Between SAML and OIDC")

### Protocol and Data Format[​](#protocol-and-data-format "Direct link to Protocol and Data Format")

### SAML

Uses XML, which is secure and extensible but can be verbose, leading to larger payloads.

### OIDC

Employs JSON, providing a compact and web-friendly format, conducive to faster processing and improved performance.

### Integration and Flexibility[​](#integration-and-flexibility "Direct link to Integration and Flexibility")

### SAML

Widely supported by legacy and enterprise-specific applications due to its established presence.

### OIDC

Offers more straightforward and flexible integration options, particularly for modern web-based applications, thanks to RESTful APIs.

### Ability to Fetch and Synchronize Information[​](#ability-to-fetch-and-synchronize-information "Direct link to Ability to Fetch and Synchronize Information")

### SAML

Updates information based on the SAML assertion token, which is only refreshed upon user login or re-authentication, potentially leading to delays in reflecting changes.

### OIDC

Allows for asynchronous data synchronization based on granted permissions, enabling continuous updates without requiring user re-authentication, ensuring data remains current and accurate.

## Glean's Recommendation[​](#gleans-recommendation "Direct link to Glean's Recommendation")

While both SAML and OIDC are valuable in the enterprise SSO landscape, OIDC's detailed permission controls make it Glean's preferred option for organizations to integrate with the platform.
