---
url: "https://docs.glean.com/connectors/native/outlook/"
canonical: "https://docs.glean.com/connectors/native/outlook/"
title: "Outlook"
description: "Search your Microsoft Outlook email and calendar in Glean. Everything you need to set up and use the read-only, certificate-based Outlook connector."
fetched_at: "2026-09-01T13:29:37.289Z"
---
On this page

![Outlook logo](/img/connectors/icons/microsoft365.svg)Outlook

# Search your Outlook email and calendar in Glean

Set up the Outlook connector once and Glean builds a permission-aware index of your organization's email and calendar, and can also fetch live results. Access is read-only and scoped to each user's own Outlook permissions.

Email and calendarIndexed by defaultCertificate authRead-onlyPermission-awarePart of Microsoft 365

[Set up Outlook](/connectors/native/outlook/new-setup)[Outlook overview](/connectors/native/outlook/about)

## Choose your path[​](#choose-your-path "Direct link to Choose your path")

Glean connects to Outlook with a read-only, certificate-based Microsoft Entra app. Which path is yours depends on your Glean deployment, not on when you personally connect Outlook.

[

Onboarding

### New setup

You're on a new Glean deployment, created on or after August 14th, 2026. Register the single-tenant Azure app, grant the read-only Microsoft Graph permissions, upload the certificate, and Glean builds a permission-aware index of your email and calendar.







](/connectors/native/outlook/new-setup)[

### Previous setup

You're on an existing Glean deployment. Even if you're connecting Outlook for the first time, keep the setup you have to manage permissions, crawl restrictions, and indexing scope.







](/connectors/native/outlook/setup)

Not sure which is yours? [Choose your Outlook setup](/connectors/native/outlook/choose-your-setup).

## Authentication[​](#authentication "Direct link to Authentication")

Outlook authenticates through a Microsoft Entra app. Choose the option that matches how you connect.

[

### Certificate for indexing and real-time access

Set up certificate authentication that covers both native indexing and real-time access.







](/connectors/native/outlook/certificate-native-federated)[

### Certificate for data crawling and indexing

Set up certificate authentication for native indexing.







](/connectors/native/outlook/native)[

### Certificate for real-time access

Set up certificate authentication for real-time access.







](/connectors/native/outlook/certificate-federated)[

### Client ID and secret for real-time access

Set up a client ID and secret for real-time access.







](/connectors/native/outlook/federated)
