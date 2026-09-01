---
url: "https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder"
canonical: "https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder"
title: "Create an agent with the headless builder"
description: "Build, test, and publish a headless Glean agent from your coding environment and optionally sync changes through GitHub pull requests."
fetched_at: "2026-09-01T13:29:16.857Z"
---
On this page

The headless builder lets you create, test, and publish Glean agents directly from your coding environment. A coding agent such as Claude Code or Cursor drives the flow using the Glean plugin, so you can go from zero to a working, tested agent without leaving your editor. If you want it, you can also route agent changes through a Git-based review loop.

This guide walks through installing the plugin, authenticating, building an agent, testing it, and optionally enabling Git-based application development lifecycle (ADLC) so agent changes flow through GitHub pull requests.

note

The headless builder and Git ADLC support **auto mode agents** only. You can't build workflow agents this way.

## Setup overview[​](#setup-overview "Direct link to Setup overview")

Before you begin building, here is a high-level overview of the process:

1.  Install: add the Glean plugin to your environment.
2.  Authenticate: sign in with your work email and verify the setup using `/glean_run`.
3.  Configure: confirm your local agent directory (`.glean/agents`).
4.  Build: create a Q&A agent with tools, sub-agents, and your preferred model.
5.  Test: preview and test the agent against real-world inputs.
6.  Share: save or publish the agent and distribute the generated web links.
7.  (Optional) Automate: enable Git ADLC for pull request-based reviews and syncing.

### Step 1: Install the Glean plugin[​](#step-1-install-the-glean-plugin "Direct link to Step 1: Install the Glean plugin")

Install the plug-in for your coding environment:

-   [Set up the Glean plug-in in Claude Code](/user-guide/mcp/glean-plugin-claude-code)
-   [Set up the Glean plug-in in Cursor](/user-guide/mcp/glean-plugin-cursor)

If `/glean_run` is already available, the plug-in is installed and you can continue.

warning

The headless builder works **only** through the Glean plugin's `/glean_run` chat command. Follow these rules exactly:

-   `/glean_run` is a slash command you type into your coding assistant's chat, not a callable tool. If your coding agent doesn't have `/glean_run`, then either the plugin install isn't finished or you're in a workspace where the plugin isn't enabled. Stop and complete the install steps above before continuing.
-   There's no Glean MCP server for this flow. Do **not** substitute a Glean MCP server or any of its tools (for example `find_skills`, `run_tool`, `read_skill_files`, or `setup`) for the `/glean_run` command. If `/glean_run` is unavailable, fix the install instead of working around it with MCP tools.
-   Use only the current marketplace and plug-in names in the host-specific installation pages linked above. Don't reuse beta names or substitute a different marketplace or plug-in name.

### Step 2: Authenticate and verify[​](#step-2-authenticate-and-verify "Direct link to Step 2: Authenticate and verify")

Run the setup command and verify your path. When prompted, enter your **work email**. You do not need to open **About Glean** or paste a server URL. Complete the browser sign-in if prompted, and continue.

Confirm, in order, that:

-   The plugin loads without errors
-   `/glean_run` is available
-   You can start creating an agent

The invocation pattern for early iterations is:

```
/glean_run agent_builder <your prompt>
```

### Step 3: Confirm the local agent directory[​](#step-3-confirm-the-local-agent-directory "Direct link to Step 3: Confirm the local agent directory")

Agents live as files on disk. The recommended default is to save agents under `.glean/agents/` in the current workspace, which is also what Git ADLC expects. Each agent gets its own folder:

```
.glean/agents/└── my_agent/    ├── spec.yaml         # main agent specification (contains the agent `id`)    ├── instructions.md   # system prompt / agent instructions    ├── skills/           # optional: one folder per skill, each with SKILL.md    └── subagents/        # optional: nested agents
```

warning

Don't edit the `id` field in `spec.yaml`. It links the folder to the live agent in Glean.

### Step 4: Build a Q&A agent[​](#step-4-build-a-qa-agent "Direct link to Step 4: Build a Q&A agent")

Work through one concrete example so you see the full shape of an agent: tools, sub-agents, and model choice. Use the `agent_builder` entry point and iterate until the agent behaves as expected. For example:

```
/glean_run agent_builder create an agent that summarizes new support issues from Slack and Zendesk/glean_run agent_builder run support_summary_agent with input high-priority login failures from this week/glean_run agent_builder save the created agent
```

Follow this loop:

-   Build an agent
-   Preview it on a real input
-   Validate and publish if it looks right

### Step 5: Preview, test, and publish[​](#step-5-preview-test-and-publish "Direct link to Step 5: Preview, test, and publish")

-   **Preview and test** the agent on a real input and confirm its behavior
-   **Save** to keep the generated files on disk, or **publish** to make the agent live
-   Share the web links so you can review the work in Glean

The agent URL has the form `https://<your-domain>.glean.com/chat/agents/<agent-id>`. The same `<agent-id>` appears as the `id` field at the top of `spec.yaml`.

### (Optional) Step 6: Enable Git ADLC[​](#optional-step-6-enable-git-adlc "Direct link to (Optional) Step 6: Enable Git ADLC")

Enable Git ADLC if you want agent changes to flow through GitHub pull requests and sync automatically back into Glean. When enabled:

-   **On pull request:** a draft preview is created for each changed agent, and the workflow comments with preview links so you can test it before merge.
-   **On merge:** the agent syncs into Glean as either `staged` or `published`. Staged agents are saved but remain hidden until you manually publish them from **Agent builder**. Published agents go live immediately.

#### Initial repo setup[​](#initial-repo-setup "Direct link to Initial repo setup")

1.  Add the workflow file `.github/workflows/glean-agent-sync.yml`:

```
name: Glean Agent Syncon:  pull_request:    types: [opened, synchronize, reopened]    paths:      - '.glean/agents/**'      - '.glean/common/**'  push:    branches: [<your-default-branch>]    paths:      - '.glean/agents/**'      - '.glean/common/**'  workflow_dispatch:    inputs:      agent_folder:        description: 'Agent folder to sync (e.g. my_agent). Leave empty to sync all.'        required: false        default: ''      is_draft:        description: 'Trigger draft preview (true) or merge commit sync (false)'        type: boolean        required: false        default: falsejobs:  sync:    runs-on: ubuntu-latest    permissions:      contents: read      pull-requests: write    steps:      - uses: actions/checkout@v4        with:          fetch-depth: 0      - uses: askscio/glean-agent-import-action@v1        with:          instance-url-fe: https://<your-glean-subdomain>.glean.com          instance-url-be: https://<your-glean-subdomain>-be.glean.com/          api-token: ${{ secrets.GLEAN_AGENT_SYNC_TOKEN }}          shared-root: .glean/common          default-sync-mode: staged
```

note

-   `fetch-depth: 0` is required. The action uses Git history to detect which agent folders changed.
-   Keep both `.glean/agents/**` and `.glean/common/**` in `paths` so shared-resource changes also trigger a sync.
    -   `default-sync-mode: staged` is the recommended default.

2.  Create the GitHub secret. This must be done by a Glean Agent Moderator.
    
    -   In Glean, navigate to **Admin console → API Tokens → Create token**, with the **AGENTS** scope
    -   In GitHub, navigate to **Settings → Secrets and variables → Actions → New repository secret**
    -   Name it exactly `GLEAN_AGENT_SYNC_TOKEN` and paste the token as the value
3.  (Optional but recommended) Open a test PR modifying `.glean/agents/` to trigger the check and enable it under **Settings → Branches → Branch protection → Require status checks to pass** before merging.
    

#### Add an agent to Git ADLC[​](#add-an-agent-to-git-adlc "Direct link to Add an agent to Git ADLC")

Place each agent in its own folder under `.glean/agents/`, commit, push, and open a pull request. The action runs automatically when the pull request touches `.glean/agents/**` or `.glean/common/**`, then comments with a draft preview link per changed agent. Review the preview, then merge. The agent syncs into Glean per its sync mode.

Shared skills, prompts, or sub-agents reused across agents should live once under `.glean/common/` and be referenced through symlinks. Symlinks that resolve outside the repo are rejected. When a shared file changes, every dependent agent re-syncs in the same run.

## Troubleshoot setup issues[​](#troubleshoot-setup-issues "Direct link to Troubleshoot setup issues")

-   **`/glean_run` not available after install:** Follow the [Glean plug-in troubleshooting guide](/user-guide/mcp/troubleshoot-glean-plugin). Finish the installation before continuing instead of configuring a Glean MCP server as a workaround.
-   **Cursor says setup is required:** enter your work email when prompted, complete the sign-in, and rerun `/glean_run agent_builder ...`.

## See also[​](#see-also "Direct link to See also")

-   [Create your first agent with Agent Builder](/agents/create-agents/create-your-first-agent)
-   [Create an agent using natural language](/agents/create-agent-natural-language)
-   [Agent builder](/agents/concepts/agent-builder)
