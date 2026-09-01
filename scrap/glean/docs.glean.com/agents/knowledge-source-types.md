---
url: "https://docs.glean.com/agents/knowledge-source-types"
canonical: "https://docs.glean.com/agents/knowledge-source-types"
title: "Knowledge Source Types"
description: "When specifying company knowledge sources when creating a Glean AI App, you can specify connectors, containers, and documents."
fetched_at: "2026-09-01T13:29:17.186Z"
---
On this page

For a Glean Agent, you can specify connectors, containers, and documents as a company knowledge source at various steps and for various tools. Agents can use a mix of all these 3 categories to build a highly flexible knowledge base.

## Containers[​](#containers "Direct link to Containers")

Containers are like folders: they contain other containers or documents. The table below provides a list of connectors, containers, and document types supported by Glean.

| Connector | Container type | Document type |
| --- | --- | --- |
| Answers | board | answer |
| Box | folder | All objects |
| Clubhouse | epic | story |
| Coda | doc | page |
| Confluence | space\* | page, blogpost |
| Docebo | course | learningObject |
| Dropbox | folder | All objects |
| Egnyte | folder | All objects |
| Freshservice | solutions category | solution folder |
| Freshservice | solution folder | solutions article |
| Gdrive | folder, shared drive | All objects |
| Github | repo | commit, issue, pull |
| Github | dir | file, readme, dir |
| Highspot | Spot | Item |
| Jira | project | All objects |
| Monday | workspace | board |
| Onedrive | Folder | All objects |
| Sharepoint | Folder | All objects |
| Quip | folder | All objects |
| ServiceNow | Unindexed documents | Knowledge Article, Catalog Item, Incident, Demand, Epic |
| Simpplr | site | event, knowledge, news |
| Slack | channel | All objects except files and channel |
| Slack enterprise | channel | All objects except channel |
| Smartsheet | workspace | sheet, report, dashboard |
| Trello | workspace | board |
| Trello | board | card |

\*Note: Pages within spaces are not containers

## Do Glean Apps support nested containers?[​](#do-glean-apps-support-nested-containers "Direct link to Do Glean Apps support nested containers?")

Nested containers are containers that include another container. Nested containers are currently supported for 4 connectors:

-   Confluence
-   Google Drive
-   O365 Onedrive
-   O365 Sharepoint
