---
url: "https://developers.glean.com/api/client-api/shortcuts/overview"
canonical: "https://developers.glean.com/api/client-api/shortcuts/overview"
title: "Shortcuts API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:54.845Z"
---
The Shortcuts API enables you to create and manage search shortcuts that provide quick access to frequently used queries and resources. Build custom shortcuts that help users navigate to important content and perform common searches more efficiently.

## Use Cases

### Quick Access Links

Create shortcuts that instantly navigate users to frequently accessed documents, dashboards, and resources without complex searches.

### Saved Searches

Enable users to save and quickly re-execute common search queries with predefined filters and parameters.

### Workflow Optimization

Streamline user workflows by providing one-click access to routine searches and frequently needed information.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/createshortcut`](/api/client-api/shortcuts/createshortcut) | [Create shortcut](/api/client-api/shortcuts/createshortcut)
Create a user-generated shortcut that contains an alias and destination URL.

 |
| POST | [`/rest/api/v1/deleteshortcut`](/api/client-api/shortcuts/deleteshortcut) | [Delete shortcut](/api/client-api/shortcuts/deleteshortcut)

Delete an existing user-generated shortcut.

 |
| POST | [`/rest/api/v1/getshortcut`](/api/client-api/shortcuts/getshortcut) | [Read shortcut](/api/client-api/shortcuts/getshortcut)

Read a particular shortcut's details given its ID.

 |
| POST | [`/rest/api/v1/listshortcuts`](/api/client-api/shortcuts/listshortcuts) | [List shortcuts](/api/client-api/shortcuts/listshortcuts)

List shortcuts editable/owned by the currently authenticated user.

 |
| POST | [`/rest/api/v1/updateshortcut`](/api/client-api/shortcuts/updateshortcut) | [Update shortcut](/api/client-api/shortcuts/updateshortcut)

Updates the shortcut with the given ID.

 |
