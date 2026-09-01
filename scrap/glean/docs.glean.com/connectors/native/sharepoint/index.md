---
url: "https://docs.glean.com/connectors/native/sharepoint/"
canonical: "https://docs.glean.com/connectors/native/sharepoint/"
title: "SharePoint"
description: "Connect Glean to Microsoft SharePoint for indexed and real-time search, scoped to each user's permissions."
fetched_at: "2026-09-01T13:29:40.528Z"
---
On this page

![SharePoint logo](/img/connectors/icons/microsoft365.svg)SharePoint

# Make your SharePoint content searchable in Glean

Indexes your SharePoint sites, pages, files, and lists for org-wide search, with real-time search for content that must always be live and read and write tools for acting on it. Always scoped to each user's permissions.

SharePoint OnlineIndexing includedReal-time searchCertificate authPermission-awarePart of Microsoft 365

[Set up SharePoint](/connectors/native/sharepoint/new-setup)[Choose your setup](/connectors/native/sharepoint/choose-your-setup)

## Choose your path[​](#choose-your-path "Direct link to Choose your path")

[

### Choose your setup

Which of the two setups applies to your deployment, and how they compare.







](/connectors/native/sharepoint/choose-your-setup)[

### New setup

You're on a new Glean deployment, created on or after August 14, 2026. Connect SharePoint, set up indexing, and review the setup in the Admin console, with no app registration to prepare in Microsoft.







](/connectors/native/sharepoint/new-setup)[

### Previous setup

You're on an existing Glean deployment. Configure the indexing connector through the Microsoft 365 parent app registration.







](/connectors/native/sharepoint/setup)

## General information[​](#general-information "Direct link to General information")

[

### Overview

What the SharePoint connector indexes and how it fits into the Microsoft 365 suite.







](/connectors/native/sharepoint/about)

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

[

### Indexing connector

How Glean crawls SharePoint into its index for fast, ranked, org-wide search, and the permissions each capability needs.







](/connectors/native/sharepoint/set-up-indexing-connector)[

### Real-time search

Always-live results, fetched from SharePoint at query time with nothing stored in Glean's index. Enabled by the new setup, and enabled separately by an administrator on the previous setup.







](/connectors/native/sharepoint/real-time-access)[

### Read and write tools

Let Glean act in SharePoint on a user's behalf, scoped to that user's own permissions. Available upon connecting on the new setup, and set up separately on the previous setup.







](/tools/connector/microsoft-365#sharepoint)[

### Crawling restrictions

Control which SharePoint content Glean crawls using greenlists, redlists, and draft exclusions.







](/connectors/native/sharepoint/restrictions)

## Security[​](#security "Direct link to Security")

[

### API endpoints

The Microsoft APIs and endpoints the SharePoint connector calls.







](/connectors/native/sharepoint/security/api)[

### Permissions

How Glean reads SharePoint permissions and enforces them at query time.







](/connectors/native/sharepoint/security/permissions)

## Support[​](#support "Direct link to Support")

[

### Error codes

Look up connector error codes and what they mean.







](/troubleshooting/error-codes/)
