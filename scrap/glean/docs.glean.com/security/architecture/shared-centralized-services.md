---
url: "https://docs.glean.com/security/architecture/shared-centralized-services"
canonical: "https://docs.glean.com/security/architecture/shared-centralized-services"
title: "Shared and centralized services"
description: "Explains how Glean's central infrastructure securely supports and manages all customer instances."
fetched_at: "2026-09-01T13:29:55.393Z"
---
On this page

This section details the interactions between your company's Glean GCP project and Glean's central GCP project. This central infrastructure is owned and managed by the Glean team and is responsible for specific, secure, and limited interactions with your dedicated Glean instance.

## Web application delivery[​](#web-application-delivery "Direct link to Web application delivery")

The Glean web application, hosted at `https://app.glean.com`, is served from Glean’s central cloud infrastructure. Its purpose is to deliver static assets (JavaScript and CSS) to the user’s browser. After this initial load, subsequent user interactions and data exchanges occur directly with your company’s Query Endpoint (QE).

## Tenant resolution[​](#tenant-resolution "Direct link to Tenant resolution")

The first time a user logs in to Glean, the web application must determine the URL of your company's specific Glean server. To accomplish this, the JavaScript application makes an API call to a service. It provides the user's email domain, and the service responds with the Query Endpoint (QE) for your company's Glean instance. Once this URL is discovered, all future communication is directed to your company's Glean GCP instance. All subsequent API calls require authentication via your company's SSO provider.

## Anonymized analytics[​](#anonymized-analytics "Direct link to Anonymized analytics")

For aggregate analytics, **anonymized, non-PII logs** are sent from your company's Glean project to Glean's central server. All personally identifiable information (PII), such as user IDs, document URLs, and query terms, is sanitized through a hashing process at the time of log creation. This hashing allows for the correlation of tools within a search session without revealing any details about the user, query, or document.

The export of these logs is managed via a **GCP Log Sink**, which exports them from your company's GCP project to a BigQuery table in the Glean's GCP project.

## Glean on-call debug operations[​](#glean-on-call-debug-operations "Direct link to Glean on-call debug operations")

In specific production scenarios, the Glean on‑call team may request limited, time‑bound operational access to assist with break‑glass debugging. These operations are restricted to control‑plane tasks (for example, modifying system properties or inspecting configuration and application logs) and do not expose customer document content. Access is governed by explicit approvals, authentication via an approved control plane, cryptographic request validation, and comprehensive audit logging within your environment before execution proceeds.
