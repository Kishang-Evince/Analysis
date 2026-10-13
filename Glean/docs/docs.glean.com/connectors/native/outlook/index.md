---
url: "https://docs.glean.com/connectors/native/outlook/"
canonical: "https://docs.glean.com/connectors/native/outlook/"
title: "Outlook"
description: "Set up the Outlook connector to index and search Microsoft Outlook email with read-only access"
fetched_at: "2026-10-13T08:50:08.952Z"
---
On this page

![Outlook logo](/img/connectors/icons/microsoft365.svg)Outlook

# Search your Outlook email in Glean

Connect Outlook to index your organization's email and fetch live email results. Access is read-only and scoped to each user's Outlook permissions. Calendar event indexing uses the separate Outlook Calendar connector.

EmailIndexed by defaultCertificate authRead-onlyPermission-awarePart of Microsoft 365

[Set up Outlook](/connectors/native/outlook/new-setup)[Outlook overview](/connectors/native/outlook/about)

For calendar events and supported meeting transcripts, use the separate Outlook Calendar connector. See [Outlook Calendar](/connectors/native/outlook-calendar/).

If your calendar integration crawls events through Outlook Calendar or an existing Teams-based calendar connection, Glean uses organizer-owned events by default. Glean may not index meetings from organizers whose calendars it doesn't crawl. See [Understand calendar crawl coverage](/connectors/native/outlook/about#calendar-event-crawling).

## Choose your path[​](#choose-your-path "Direct link to Choose your path")

Glean connects to Outlook with a read-only, certificate-based Microsoft Entra app. Which path is yours depends on your Glean deployment, not on when you personally connect Outlook.

[

Onboarding

### New setup

You're on a new Glean deployment, created on or after August 14th, 2026. Register the single-tenant Azure app, grant the read-only Microsoft Graph permissions, upload the certificate, and Glean builds a permission-aware index of your email.







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
