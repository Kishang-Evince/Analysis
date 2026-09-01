---
url: "https://developers.glean.com/api/indexing-api/authentication-overview"
canonical: "https://developers.glean.com/api/indexing-api/authentication-overview"
title: "Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:55.672Z"
---
Manage authentication tokens for the Indexing API. The Indexing API requires authentication tokens to authorize access to your Glean instance.

## Use Cases

### Token Rotation

Implement secure token rotation policies to maintain API security and compliance with your organization's security requirements.

### Multi-Environment Setup

Manage separate authentication tokens for development, staging, and production environments to ensure proper access control.

### Service Integration

Authenticate third-party services and custom applications that need to index content into your Glean instance.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/index/v1/rotatetoken`](/api/indexing-api/rotate-token) | [Rotate token](/api/indexing-api/rotate-token) |
