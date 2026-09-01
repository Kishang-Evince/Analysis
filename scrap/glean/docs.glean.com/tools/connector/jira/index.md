---
url: "https://docs.glean.com/tools/connector/jira/"
canonical: "https://docs.glean.com/tools/connector/jira/"
title: "Jira tools"
description: "Jira tools let you search, create, and update Jira and Jira Service Management work directly from Glean, so teams can manage tickets without leaving their existing workflows."
fetched_at: "2026-09-01T13:30:02.670Z"
---
Jira tools let you search, create, and update Jira and Jira Service Management work directly from Glean, so teams can manage tickets without leaving their existing workflows. The Jira tools search Jira with JQL using natural language, create Jira issues, submit requests in Jira Service Management, and add comments to existing tickets, returning structured results in chat or guiding users through required fields when creating new work. Each user connects their own Jira account via OAuth, ensuring tools run with the right permissions and attribution, making Jira Tools an effective way to streamline engineering and IT support processes across Glean Agents and Glean Assistant.

note

Jira tools are supported only for *Jira Cloud instances*. Jira Server and Jira Data Center (on‑prem) instances are not supported for tools.

tip

When working with projects that contain thousands of issues, review [Handling large result sets](/tools/connector/jira/search-jql#handling-large-result-sets) in Search Jira with JQL for guidance on JQL filtering, time-based batching, and using the download link for complete datasets.

The following are the supported Jira tools that you can use to create workflows using Glean agents.

[

### Assign issue to user

Assigns a single Jira issue to a specific user







](/tools/connector/jira/assign-issue)[

### Get issue

Retrieves a single Jira issue by its ID or key







](/tools/connector/jira/get-issue)[

### Add watcher to issue

Adds a watcher to a Jira issue







](/tools/connector/jira/add-watcher)[

### Edit issue

Edits a Jira issue







](/tools/connector/jira/edit-issue)[

### List issue comments

Lists comments on a Jira issue







](/tools/connector/jira/list-comments)[

### Search Jira with JQL

Searches for Jira issues using JQL







](/tools/connector/jira/search-jql)[

### Create comment

Creates a comment on a Jira issue







](/tools/connector/jira/create-comment)[

### Create issue

Creates a Jira issue







](/tools/connector/jira/create-issue)[

### Create request

Creates new requests directly to Jira Service Management (JSM) from within Glean







](/tools/connector/jira/create-request)[

### Get all projects

Retrieves a list of Jira projects with optional filtering and pagination







](/tools/connector/jira/get-all-projects)[

### Get current user

Retrieves detailed information about the currently authenticated Jira user







](/tools/connector/jira/get-current-user)[

### Find users

Searches for Jira Cloud users by account details and status







](/tools/connector/jira/find-users)[

### List boards

Retrieves available Jira boards with filtering and pagination options







](/tools/connector/jira/list-boards)[

### Get all users

Retrieves a paginated list of all users from your Jira Cloud instance







](/tools/connector/jira/get-all-users)[

### Get issue types

Retrieves the list of issue types available in your Jira site







](/tools/connector/jira/get-issue-types)
