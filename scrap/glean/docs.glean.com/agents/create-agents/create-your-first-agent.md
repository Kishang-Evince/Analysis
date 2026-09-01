---
url: "https://docs.glean.com/agents/create-agents/create-your-first-agent"
canonical: "https://docs.glean.com/agents/create-agents/create-your-first-agent"
title: "Create your first agent with Agent Builder"
description: "Build a simple web page summarizer agent and learn the end-to-end Agent Builder workflow from draft to save."
fetched_at: "2026-09-01T13:29:16.825Z"
---
On this page

This example guides you through building a *web page summarizer* agent using Glean Agent Builder. You will configure workflow of the agent, validate its performance and, deploy it to production.

The web page summarizer agent will do the following tasks:

-   Collects a web page URL.
-   Reads the page content.
-   Returns a formatted summary with headings and bullets.

The workflow includes:

-   An **Input form** trigger to collect the web page URL from the users.
-   A **Read document** tool to store content in memory.
-   A **Respond** tool to generate the summary.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

-   Glean Agents are enabled for your organization.
-   You have permission to create agents.
-   You can access the Agent Library from the left navigation in Glean.

## Step 1: Create a new agent[​](#step-1-create-a-new-agent "Direct link to Step 1: Create a new agent")

1.  In Glean, open **Agents** from the left navigation.
2.  Select **Create agent**.
3.  In the creation modal, there are two main options:
    -   **Build with Natural Language:** describe your agent in plain language and let Glean generate steps automatically.
    -   **Start from Scratch:** configure each step yourself using the visual builder.

For this example, select **Start from scratch** so you can see how triggers and tools connect.

tip

Use **Build with Natural Language** when you want Glean to draft the workflow for you. You can refine the workflow later.

After you choose **Start from scratch**, you will land in the **Agent Builder**. Following are the primary tools you will use to configure your agent:

-   **Canvas** for the trigger and steps flow.
-   **Step configuration panel** on the right for inputs and instructions.
-   **Agent settings** (gear icon) for name, description, goal, and default models.
-   **Open Panel** for natural‑language edits and step changes.
-   **Preview** to test your draft without publishing.

## Step 2: Collect a web page URL[​](#step-2-collect-a-web-page-url "Direct link to Step 2: Collect a web page URL")

Your agent needs a way to collect the URL to summarize. You use an **Input form** trigger so the user can paste in a web page link.

1.  In the trigger area, choose **Input form** as the trigger type.
2.  Add a **text field** to the form.
3.  Set **Field name** to something descriptive, such as `web page` (this will become the field `[[ web page ]]`).
4.  (Optional) Add a **description** like “Enter the full URL of the web page you want to summarize.” This description appears when users run the agent.

When users runs the agent, they will see this input form first and provide the URL as `[[ web page ]]`.

## Step 3: Read the web page[​](#step-3-read-the-web-page "Direct link to Step 3: Read the web page")

Next, instruct the agent to read the content at that URL and store it in memory.

1.  Add a new step after the trigger.
2.  For **Select step**, choose the **Read document** tool.
3.  In the **Choose how to set the document or URLs** setting, select **Manual** for this example.
4.  In **Documents and URLs**, reference the field you created by entering `[[ web page ]]` so the tool uses the user‑provided URL.

When the agent runs:

-   It reads the web page located at `[[ web page ]]`.
-   It stores the content in **memory**, making it available to later steps (such as the response step).

## Step 4: Generate the summary[​](#step-4-generate-the-summary "Direct link to Step 4: Generate the summary")

Now, tell the agent how to summarize the page.

1.  Add another step after **Read document** and choose the **Respond** tool.
    
2.  In the **Instructions** field, enter summary guidance, for example:
    

```
Generate a summary for the webpage:- Create an "Overview" heading and provide a one-paragraph introduction.- Create a "Layout" heading and summarize the page layout in a short bullet list.
```

3.  Click **Enhance prompt** within the instructions field to have Glean improve the wording using best‑practice prompting patterns.
    
    -   The enhanced version appears in place and usually tightens structure, clarifies expectations, and makes it easier for the model to follow your instructions consistently.
    -   If you prefer your original text, use **Undo** to revert the change.

At this point, your workflow is:

1.  Ask for a web page URL.
2.  Read and store the page content.
3.  Respond with a structured summary.

## Step 5: Choose a model (optional)[​](#step-5-choose-a-model-optional "Direct link to Step 5: Choose a model (optional)")

Glean’s **Model Hub** lets you choose from multiple LLMs and set them per‑agent or per‑step.

In this example:

1.  Open **Agent settings** (gear icon in the top right).
2.  Under **Agent models**, choose a default model that balances quality and speed for summarization.
3.  If needed, open each step and use the **model selector** embedded directly in the step configuration to override the default for that step, for example, a more capable model for the **Respond** step if you need richer formatting or more nuanced summaries.

tip

Start with a single default model. As you gain confidence, tune models per step to balance quality and cost.

## Step 6: Preview and troubleshoot[​](#step-6-preview-and-troubleshoot "Direct link to Step 6: Preview and troubleshoot")

Before sharing your agent, use **Preview** to confirm that it behaves as expected.

1.  In the top right of Agent Builder, select **Preview**.
2.  In the preview panel:
    -   Enter a real web page URL that starts with `https://` (for this example).
    -   Run the agent.

As the agent runs, Agent Builder highlights the **currently executing step** in the flow so you can see where the agent is in the process and debug issues more easily.

If something does not look right:

-   Use **Reset Preview** to start over with a new URL.
-   Use **Try Again** to re‑run the last input and compare different model outputs.

### Use debug mode for deeper troubleshooting[​](#use-debug-mode-for-deeper-troubleshooting "Direct link to Use debug mode for deeper troubleshooting")

Agent Builder includes a **debug mode** that shows which steps ran, along with the **inputs and outputs** of each step.

Use debug mode when:

-   A step fails or produces unexpected output.
-   You need to see the raw responses from tools (for example, from Read document).
-   You’re tuning instructions and want to inspect how changes affect intermediate data.

This combination of **Preview**, **step highlighting**, and **debug view** makes it easier to diagnose issues before publishing.

## Step 7: Name, save, and manage versions[​](#step-7-name-save-and-manage-versions "Direct link to Step 7: Name, save, and manage versions")

After you are okay with the behavior of your agent:

1.  In the upper left, select the default name, for example, **Untitled Agent** and rename it to something descriptive, such as **Web Page Summarizer**.
2.  Select **Save** in the upper right to make your current draft the **live** version.

Behind the scenes:

-   All changes are saved as a **draft** until you save.
-   Each save creates a new **version** you can restore later.

## Step 8: Refine the workflow[​](#step-8-refine-the-workflow "Direct link to Step 8: Refine the workflow")

As you iterate on your agent, you can adjust its structure and instructions.

### Reorder and restructure steps[​](#reorder-and-restructure-steps "Direct link to Reorder and restructure steps")

Agent Builder lets you **reorder steps using drag and drop** directly in the flow, including moving steps between branches where applicable.

Use this to:

-   Insert new steps between existing ones.
-   Move steps earlier or later in the flow.
-   Simplify complex branches by reorganizing them visually.

### Edit using the natural language panel[​](#edit-using-the-natural-language-panel "Direct link to Edit using the natural language panel")

Instead of changing every configuration field manually, you can:

1.  Click **Open Panel** in the upper left of Agent Builder.
2.  In the natural language panel:
    -   Ask Glean to **add steps** (“After reading the document, add a Think step that identifies the three main themes.”).
    -   Request **edits** (“Shorten the response and focus only on the key sections for a busy reader.”).
    -   Rearrange or delete steps conversationally.

You can switch between **conversational edits** and **manual configuration** without leaving Agent Builder.

## Feature recap[​](#feature-recap "Direct link to Feature recap")

You used these Agent Builder capabilities:

-   **Visual canvas** to build a step‑by‑step workflow.
-   **Input form** and **Read document** to collect and store content.
-   **Respond** and **Enhance prompt** to shape output.
-   **Preview** and **Debug** to test safely.
-   **Drafts and version history** to save and iterate with confidence.

## Next steps[​](#next-steps "Direct link to Next steps")

After you have created this first agent:

-   Explore **Create an agent using natural language** to see how to start directly from plain‑language instructions and refine the generated steps.
-   Try **Create a more powerful agent** for a more complex, multi‑step workflow that combines additional tools and branching logic.

## See also[​](#see-also "Direct link to See also")

-   [Agent builder](/agents/concepts/agent-builder)
-   [Create an agent using natural language](/agents/create-agent-natural-language)
-   [Agent drafts and versions](/agents/concepts/agents-draft-version)
