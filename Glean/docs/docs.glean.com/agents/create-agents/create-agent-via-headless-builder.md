---
url: "https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder"
canonical: "https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder"
title: "Create an agent with the headless builder"
description: "Build, test, and publish a headless Glean agent from your coding environment."
fetched_at: "2026-10-13T08:49:36.542Z"
---
On this page

The headless builder lets you create, test, and publish Glean agents from your coding environment. You can use it with Claude Code, Codex, or Cursor through the Glean plugin.

By the end of this guide, you will have a tested Auto mode agent that you can save or publish.

Auto mode only

The headless builder supports Auto mode agents. It does not support Workflow mode agents.

## Setup overview[​](#setup-overview "Direct link to Setup overview")

You will complete the following steps:

1.  **Install:** Add the Glean plugin to your coding environment.
2.  **Authenticate:** Sign in with your work email and verify the setup.
3.  **Configure:** Confirm the local agent directory.
4.  **Build:** Create an agent with tools, sub-agents, and your preferred model.
5.  **Test:** Preview and test the agent with representative inputs.
6.  **Share:** Save or publish the agent and share its generated link.

### Step 1: Install the Glean plugin[​](#step-1-install-the-glean-plugin "Direct link to Step 1: Install the Glean plugin")

Install the plugin for your coding environment. If `/glean_run` is already available, the plugin is installed and you can continue.

#### Claude Code[​](#claude-code "Direct link to Claude Code")

Run these commands inside Claude Code:

```
/plugin marketplace add gleanwork/claude-plugins/plugin install glean@glean-plugins/reload-plugins --force
```

#### Codex[​](#codex "Direct link to Codex")

Run these commands in your terminal:

```
codex plugin marketplace add gleanwork/codex-pluginscodex plugin add glean@glean-codex-plugins
```

#### Cursor[​](#cursor "Direct link to Cursor")

1.  Open **Cursor Settings → Marketplace**.
2.  Search for **Glean**.
3.  Click **Add to Cursor**.

warning

The headless builder works **only** through the Glean plugin's `/glean_run` chat command. Use the command for your coding environment throughout this guide:

-   `/glean_run` is a slash command you type into your coding assistant's chat, not a callable tool. If your coding agent doesn't have `/glean_run`, then either the plugin install isn't finished or you're in a workspace where the plugin isn't enabled. Stop and complete the install steps above before continuing.
-   There's no Glean MCP server for this flow. Do **not** substitute a Glean MCP server or any of its tools (for example `find_skills`, `run_tool`, `read_skill_files`, or `setup`) for the `/glean_run` command. If `/glean_run` is unavailable, fix the install instead of working around it with MCP tools.
-   Use the marketplace and plugin names shown above. Don't reuse beta names or substitute a different marketplace or plugin name.

### Step 2: Authenticate and verify[​](#step-2-authenticate-and-verify "Direct link to Step 2: Authenticate and verify")

Connect the plugin to your Glean instance:

-   **Claude Code:** Run `/glean_run setup my Glean`, enter your work email, and complete Glean OAuth in the browser.
-   **Codex:** Run `$glean_run setup my Glean`, enter your work email, and complete Glean OAuth in the browser.
-   **Cursor:** Run `/glean_run setup my Glean`, enter your work email, and complete Glean OAuth in the browser.

If setup fails, review the error message. If it states that company policy blocks the plugin, ask your Glean administrator to enable it.

Before continuing, confirm that:

-   The plugin loads without errors.
-   The appropriate Glean command is available in your coding environment.
-   You can start creating an agent.

In Claude Code and Cursor, use:

```
/glean_run <your prompt>
```

In Codex, use:

```
$glean_run <your prompt>
```

### Step 3: Confirm the local agent directory[​](#step-3-confirm-the-local-agent-directory "Direct link to Step 3: Confirm the local agent directory")

By default, the headless builder stores each agent in a separate folder under `.glean/agents/` in the current workspace. For details about the file structure, see the [Glean agent specification](https://developers.glean.com/guides/agents/specification):

```
.glean/agents/└── my_agent/    ├── spec.yaml         # main agent specification (contains the agent `id`)    ├── instructions.md   # system prompt / agent instructions    ├── skills/           # optional: one folder per skill, each with SKILL.md    └── subagents/        # optional: nested agents
```

warning

Don't edit the `id` field in `spec.yaml`. It links the folder to the live agent in Glean.

### Step 4: Build a Q&A agent[​](#step-4-build-a-qa-agent "Direct link to Step 4: Build a Q&A agent")

Create a Q&A agent to learn how the headless builder handles tools, sub-agents, and model selection. Test and refine the agent until it behaves as expected. For example:

```
/glean_run create a Glean agent that summarizes new support issues from Slack and Zendesk/glean_run run support_summary_agent with input high-priority login failures from this week/glean_run save the created Glean agent
```

### Step 5: Preview, test, and publish[​](#step-5-preview-test-and-publish "Direct link to Step 5: Preview, test, and publish")

-   Preview and test: Run the agent with a representative input and confirm its behavior.
-   Save or publish: Save the generated files locally, or publish the agent to make it available in Glean.
-   Share: Share the generated agent link with the intended users or reviewers.

The agent URL has the form `https://<your-domain>.glean.com/chat/agents/<agent-id>`. The same `<agent-id>` appears as the `id` field at the top of `spec.yaml`.

## Troubleshoot setup issues[​](#troubleshoot-setup-issues "Direct link to Troubleshoot setup issues")

-   **`/glean_run` not available after install:** Confirm that the plugin is installed and the Glean MCP connection is configured. Finish the setup before continuing.
-   **Cursor says setup is required:** enter your work email when prompted, complete the sign-in, and rerun `/glean_run ...`.

## See also[​](#see-also "Direct link to See also")

-   [Glean agent specification](https://developers.glean.com/guides/agents/specification)
-   [Create your first agent with Agent Builder](/agents/create-agents/create-your-first-agent)
-   [Create an agent using natural language](/agents/create-agent-natural-language)
-   [Manage agent changes through Git](/agents/create-agents/configure-git-adlc)
-   [Agent builder](/agents/concepts/agent-builder)
