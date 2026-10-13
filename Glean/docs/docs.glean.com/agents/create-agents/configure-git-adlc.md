---
url: "https://docs.glean.com/agents/create-agents/configure-git-adlc"
canonical: "https://docs.glean.com/agents/create-agents/configure-git-adlc"
title: "Manage agent changes through Git"
description: "Preview, review, and sync Auto mode agent changes through GitHub pull requests."
fetched_at: "2026-10-13T08:49:36.283Z"
---
On this page

Use Git-based Agent Development Lifecycle (ADLC) to preview and review Auto mode agent changes through GitHub pull requests before syncing them to Glean.

The workflow runs at the following points:

-   **When you open or update a pull request:** The workflow creates a draft preview for each changed agent and adds the preview links to the pull request.
-   **When you merge a pull request:** The workflow syncs each agent to Glean as either `staged` or `published`. Staged agents remain hidden until you publish them from **Agent builder**. Published agents become available immediately.

Limitation

Git ADLC supports **Auto mode agents** only. Workflow agents are not supported.

## Before you start[​](#before-you-start "Direct link to Before you start")

Before you begin, make sure that:

-   You have created an agent with the [headless builder](/agents/create-agents/create-agent-via-headless-builder) and saved it under `.glean/agents/`.
-   You can work with a Glean Agent Moderator who can create an API token with the `AGENTS` scope.
-   You have permission to create GitHub Actions secrets and workflows in the repository.

## Add the GitHub Actions workflow[​](#add-the-github-actions-workflow "Direct link to Add the GitHub Actions workflow")

Add `.github/workflows/glean-agent-sync.yml` to your repository:

```
name: Glean Agent Syncon:  pull_request:    types: [opened, synchronize, reopened]    paths:      - '.glean/agents/**'      - '.glean/common/**'  push:    branches: [<your-default-branch>]    paths:      - '.glean/agents/**'      - '.glean/common/**'  workflow_dispatch:    inputs:      agent_folder:        description: 'Agent folder to sync (e.g. my_agent). Leave empty to sync all.'        required: false        default: ''      is_draft:        description: 'Trigger draft preview (true) or merge commit sync (false)'        type: boolean        required: false        default: falsejobs:  sync:    runs-on: ubuntu-latest    permissions:      contents: read      pull-requests: write    steps:      - uses: actions/checkout@v4        with:          fetch-depth: 0      - uses: askscio/glean-agent-import-action@v1        with:          instance-url-fe: https://<your-glean-subdomain>.glean.com          instance-url-be: https://<your-glean-subdomain>-be.glean.com/          api-token: ${{ secrets.GLEAN_AGENT_SYNC_TOKEN }}          shared-root: .glean/common          default-sync-mode: staged
```

The settings in the example serve the following purposes:

-   Set `fetch-depth` to `0` because the action uses Git history to detect changed agent folders.
-   Include both `.glean/agents/**` and `.glean/common/**` in `paths` so shared-resource changes trigger a sync.
-   Set `default-sync-mode` to `staged` so merged agents remain hidden until you publish them.

## Create the GitHub secret[​](#create-the-github-secret "Direct link to Create the GitHub secret")

To complete these steps, you need access to the Glean **Admin console** and the GitHub repository settings.

1.  In Glean, navigate to **Admin console → API Tokens → Create token**.
2.  Create a token with the `AGENTS` scope.
3.  In GitHub, navigate to **Settings → Secrets and variables → Actions → New repository secret**.
4.  Enter `GLEAN_AGENT_SYNC_TOKEN` as the secret name and paste the token as its value.

## Test the workflow[​](#test-the-workflow "Direct link to Test the workflow")

1.  Open a pull request that modifies an agent under `.glean/agents/`.
2.  Wait for the workflow to comment with a draft preview link.
3.  Test the preview, then merge the pull request.
4.  Confirm that the agent syncs to Glean using the configured sync mode.

To prevent changes from being merged before the workflow completes, you can add the workflow as a required check under **Settings → Branches → Branch protection → Require status checks to pass**.

## Manage agents and shared resources[​](#manage-agents-and-shared-resources "Direct link to Manage agents and shared resources")

Place each agent in a separate folder under `.glean/agents/`. Commit your changes, push the branch, and open a pull request. The workflow runs when the pull request contains changes under `.glean/agents/**` or `.glean/common/**`.

For resources that are shared by multiple agents:

-   Store shared skills, agent instructions, and sub-agents under `.glean/common/`.
-   Reference shared resources through symlinks.
-   Make sure that symlinks do not resolve to locations outside the repository.

When a shared resource changes, the workflow synchronizes every agent that depends on it.

## See also[​](#see-also "Direct link to See also")

-   [Create an agent with the headless builder](/agents/create-agents/create-agent-via-headless-builder)
