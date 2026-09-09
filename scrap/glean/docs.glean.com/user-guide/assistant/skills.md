---
url: "https://docs.glean.com/user-guide/assistant/skills"
canonical: "https://docs.glean.com/user-guide/assistant/skills"
title: "Skills"
description: "Teach Glean domain-specific expertise with reusable, composable Skills."
fetched_at: "2026-09-01T13:30:39.445Z"
---
On this page

Skills are reusable packages of instructions, templates, and tools that teach Glean how to execute specific tasks with domain expertise. Instead of prompting from scratch every time, a Skill captures the structure, decision logic, and know-how behind a task and pairs that knowledge with the tools needed for execution.

General-purpose AI models are powerful but can struggle with domain-specific workflows like account planning, Salesforce analysis, and contract reviews. Skills close this gap by making expertise repeatable, composable, and loaded only when relevant.

Skills follow the open Agent Skills standard. This means you can bring compatible Skills from any source that follows the standard into Glean and layer in your own organization's ways of working.

Available skills can also be reused in auto mode agents, so you can apply the same task-specific guidance in both Glean Assistant and auto mode agents.

## Key concepts[​](#key-concepts "Direct link to Key concepts")

### Glean Skills[​](#glean-skills "Direct link to Glean Skills")

Glean Skills are built-in Skills that Glean runs under the hood to power Assistant capabilities. You won't see them in the Skills library or **Shared** tab. Instead, when Assistant invokes a Glean Skill while answering you, the Skill appears as an intermediate step you can click into to see what it did.

### Personal Skills[​](#personal-skills "Direct link to Personal Skills")

Create your own Skills tailored to your workflows. Personal Skills are visible only to you and can be enabled, disabled, edited, or deleted at any time from **Settings → Skills**.

### Shared Skills[​](#shared-skills "Direct link to Shared Skills")

Skills that teammates share with you, or that your organization publishes for a team or the whole company. Shared Skills appear in a separate **Shared** area so you can tell them apart from your own. You can use a Skill someone shares with you without recreating it, and you stay on the owner's latest version as they make updates. See [Sharing Skills](#sharing-skills).

### Automatic Skill routing[​](#automatic-skill-routing "Direct link to Automatic Skill routing")

Glean automatically evaluates your query against available Skill descriptions and determines whether a Skill is relevant. If it is, Glean loads the relevant portions of the Skill to inform its response. You can also explicitly reference a Skill by name in your prompt. Skill routing works best in thinking mode.

### Interoperability[​](#interoperability "Direct link to Interoperability")

Skills that follow the Agent Skills standard can be imported directly into Glean. You can also import Skills from public and private GitHub repositories using a URL.

## Getting started[​](#getting-started "Direct link to Getting started")

### Accessing Skills[​](#accessing-skills "Direct link to Accessing Skills")

Go to **Settings → Skills** in your Glean instance. You'll see two tabs:

-   **Personal** - Skills you've created.
-   **Shared** - Skills teammates or your organization have shared with you.

### Uploading a Skill[​](#uploading-a-skill "Direct link to Uploading a Skill")

1.  Click **Add** in the top-right corner of the Skills page.
2.  Choose **Upload a Skill** and select a `.zip`, `.md`, or `.skill` file.
3.  The Skill appears under the **Personal** tab once uploaded.

If you upload a Skill with the same name as an existing one, Glean prompts you to replace the existing Skill instead of creating a duplicate.

### Importing a Skill from GitHub[​](#importing-a-skill-from-github "Direct link to Importing a Skill from GitHub")

You can import a Skill directly from a public GitHub repository or a private repository that your GitHub account can access. Glean fetches the Skill, validates it, and records the source so the Skill can stay in sync with upstream changes.

1.  Go to **Settings → Skills** and click **\+ Add Skill**.
2.  Select **Import from GitHub**.
3.  Paste a GitHub URL. Supported formats include:
    -   A repository root URL (for example, `https://github.com/org/repo`)
    -   A subtree path (for example, `https://github.com/org/repo/tree/main/skills/my-skill`)
    -   A direct link to a SKILL.md file (for example, `https://github.com/org/repo/blob/main/SKILL.md`)
4.  Click **Preview**. Glean fetches the Skill and shows the parsed name, description, file tree, and SKILL.md content.
5.  Review the preview and click **Import**.
6.  The Skill appears under your Skills with an **Imported from GitHub** badge.

Glean imports the SKILL.md file along with any bundled supporting files such as templates, reference materials, and scripts. A single Skill can contain up to 100 files across up to 6 directory levels.

note

Use a branch or tag URL when importing. Commit permalink URLs that point to a specific commit aren't supported because they can't stay in sync with upstream changes.

note

Private repository imports require GitHub authorization. If prompted, connect your GitHub account and grant Glean access. Glean can import only repositories and paths that your GitHub account can read.

### Import multiple skills from a directory[​](#import-multiple-skills-from-a-directory "Direct link to Import multiple skills from a directory")

If a GitHub URL points to a directory that contains more than one Skill, Glean discovers every Skill under that path and imports them together. This is a fast way to bring in a shared Skill library in one step instead of importing each Skill on its own.

Glean treats each subfolder that has its own `SKILL.md` as a separate skill. For example, a `skills/` directory might contain several skills:

```
skills/├── account-planning/│   └── SKILL.md├── meeting-prep/│   ├── SKILL.md│   └── templates/└── earnings-analysis/    └── SKILL.md
```

To import them:

1.  Go to **Settings → Skills** and click **\+ Add Skill**.
2.  Select **Import from GitHub**.
3.  Paste the URL of the directory that contains the Skills (for example, `https://github.com/org/repo/tree/main/skills`).
4.  Click **Preview**. Glean lists each Skill it finds under that path, along with its parsed name and description.
5.  Review the discovered Skills and click **Import**.
6.  Each Skill appears under your Skills as a separate entry, with its own **Imported from GitHub** badge.

note

If a Skill in the directory can't be imported, Glean skips it and imports the others, so one invalid Skill doesn't block the rest. A Skill is skipped if its SKILL.md is missing the required `name` or `description` frontmatter, or if the Skill exceeds the size limit.

Multi-Skill import works the same way as single-Skill import, with a few differences:

-   A URL that points to one Skill, such as a Skill folder or a direct SKILL.md link, imports a single Skill.
-   A URL that points to a directory of Skill folders imports all of them at once.
-   Skills you've already imported from the same source URL aren't imported again. Sync those Skills instead to pull in upstream changes.

Each imported Skill is independent. It keeps its own source link and sync status, and you can enable, edit, share, or delete it separately.

### Keeping imported Skills up to date[​](#keeping-imported-skills-up-to-date "Direct link to Keeping imported Skills up to date")

When you import a Skill from GitHub, Glean records the source URL and the commit it was imported from. Glean automatically checks the source repository for upstream changes about once a day and pulls any updates into your imported Skill.

Each imported Skill shows one of the following sync statuses:

-   **Up to date**: The Skill matches the latest content in the source repository as of the most recent sync.
-   **Sync failed**: Glean couldn't reach the source. This can happen if the repository or file was moved, renamed, deleted, or your GitHub authorization no longer has access to it.

To check for updates before the next automatic daily refresh, open the Skill's three-dot menu and click **Refresh**. **Refresh** appears only for Skills imported from GitHub.

Sync is one-way: changes flow from GitHub into Glean, not the other way around. If you edit an imported Skill in Glean, those changes stay in Glean and aren't pushed back to the source repository.

### Creating a Skill via chat[​](#creating-a-skill-via-chat "Direct link to Creating a Skill via chat")

You can create Skills directly by chatting with Glean:

1.  Describe the workflow you want to turn into a Skill. For example, "Create a Skill for writing weekly status updates."
2.  Glean asks clarifying questions about the task, then scaffolds the Skill in canvas.
3.  Review the generated Skill, make any edits, and save it. The Skill appears under the **Personal** tab in **Settings → Skills**.

### Using a Skill in chat[​](#using-a-skill-in-chat "Direct link to Using a Skill in chat")

There are multiple ways to use Skills:

-   **Automatic:** Ask Glean a question related to a Skill's domain. If a relevant Skill exists, Glean automatically loads and uses it. Use thinking mode for best results.
-   **Explicit:** Reference a Skill by name in your prompt (for example, "Use my account planning Skill to build a plan for Acme Corp").
-   **Slash command:** Type `/` in the composer to see your available Skills and invoke one directly (for example, `/my-skill-name`).
-   **From the composer:** Click `+` in the composer and select a Skill to view it or invoke it directly.

### Managing your Skills[​](#managing-your-skills "Direct link to Managing your Skills")

From **Settings → Skills**, use the toggle and the three-dot menu on each Skill card to:

-   **Enable/Disable** - Toggle Skills on or off.
-   **Edit** - Update Skill instructions at any time.
-   **Share** - Share a Skill with teammates, departments, or groups. See [Sharing Skills](#sharing-skills).
-   **Replace** - Re-upload a Skill to update its contents.
-   **Refresh** - Check for updates from GitHub before the next daily refresh. This action appears only for Skills imported from GitHub.
-   **Delete** - Remove Skills you no longer need.
-   **Download** - Export any Skill as a `.zip` file for portability.

### Admin controls[​](#admin-controls "Direct link to Admin controls")

Admins can enable or turn off Skills for their organization through **Feature rollouts** in the Admin Console, and can enable or turn off GitHub import separately.

-   Whether Skills are turned on, and for whom.
-   Whether you can share Skills, and who you can share them with.
-   Which Skills are published to a team or the whole organization.

Admins turn Skills on or off, and can pilot them with a test group, from **Admin console → Skills → Setup**. See [Roll out Skills to a test group](/administration/managing-skills/skills-roles#roll-out-skills-to-a-test-group).

Admins can also set up roles and configure sharing for Skills. See [Set up Skills and manage roles](/administration/managing-skills/skills-roles) and [Share Skills](/administration/managing-skills/share-skills).

## Sharing Skills[​](#sharing-skills "Direct link to Sharing Skills")

Once you've built a Skill that works well, you can share it with teammates so they benefit from the same expertise without sending files back and forth or maintaining stale copies.

note

Your administrator controls whether you can share Skills and who you can share them with. If sharing options are unavailable, your admin hasn't enabled sharing for your account.

### Share a Skill[​](#share-a-skill "Direct link to Share a Skill")

1

Open the share dialog

Go to **Settings → Skills**, find the Skill you want to share, click its three-dot menu, and select **Share**.

2

Choose who to share with

Under **People with access**, add individual teammates, departments, or groups. You can also use **Copy link** to send a direct link to anyone who has access.

3

Set a permission level

Choose a permission level for each recipient:

-   **Viewer** - Can use the Skill.
-   **Editor** - Can use and edit the Skill.

You are the Skill's **Owner** by default. Owner can't be assigned from the share dialog.

4

Optionally allow company-wide access

Under **General access**, switch from **Restricted to people with access** to **Anyone at \[Company\] with the link can view** to let anyone in the organization find and use the Skill. This option requires admin permission.

Recipients are notified by email when you share a Skill with them, and again when you update a Skill they've added - so they always have your latest version. Admins can publish Skills to the whole organization from the [Admin console](/administration/managing-skills/share-skills).

### Use Skills shared with you[​](#use-skills-shared-with-you "Direct link to Use Skills shared with you")

Skills that teammates share with you appear in the **Shared** tab of **Settings → Skills**, separate from the Skills you've created.

-   **Add a shared Skill** to start using it. Adding a Skill keeps it available in chat and keeps you on the owner's latest version.
-   Skills your **organization publishes** may already be enabled for you, depending on how your admin set them up.
-   You'll receive an email when a Skill you've added is updated, so you can review what changed.

### When Skill names overlap[​](#when-skill-names-overlap "Direct link to When Skill names overlap")

If a Skill shared with you has the same name as one of your Personal Skills, your Personal Skill takes precedence. Glean keeps both available and adjusts the name of the shared Skill so you can tell them apart.

## Skill file format[​](#skill-file-format "Direct link to Skill file format")

A Skill is structured as a folder containing:

-   **SKILL.md** (required): The main instructions file with YAML frontmatter (`name` and `description` fields) and natural language instructions.
-   **Additional files** (optional): Templates, examples, scripts, and reference materials.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

| Use case | Description |
| --- | --- |
| **Account planning** | Upload a Skill that encodes your organization's account planning best practices. Glean uses it to generate standardized, high-quality account plans grounded in Salesforce, Gong, and internal docs. |
| **Meeting prep and follow-up** | Create a Skill that pulls from your calendar, email, Slack, and CRM to generate meeting prep briefs or draft follow-up emails with the right tone and context. |
| **Domain-specific analysis** | Teach Glean your team's methodology for financial analysis, legal review, or technical documentation so outputs follow your standards consistently. |
| **Knowledge base article creation** | Use a Skill to standardize how support articles are written, ensuring consistent formatting, tone, and completeness from resolved tickets. |
| **Daily briefings** | Build a personal Skill that synthesizes your calendar, email, Slack, and task list into a morning brief you can reference throughout the day. |

## Skills vs. Agents[​](#skills-vs-agents "Direct link to Skills vs. Agents")

Skills and Agents are complementary features. Here's how to think about when to use each:

|  | Skills | Agents |
| --- | --- | --- |
| **What they are** | Reusable packages of instructions and expertise for specific tasks | End-to-end workflows triggered by events or schedules |
| **When to use** | When you want consistent, reusable expertise applied to a task on demand | When you want to automate a full process that runs autonomously |
| **Example** | A market research Skill that applies consistent methodology every time | An agent that runs monthly, builds a market report using a Skill, and emails it to leadership |

Skills are foundational building blocks that Agents (and Glean) can invoke. They work together - you don't have to choose one over the other.

## Permissions and data access[​](#permissions-and-data-access "Direct link to Permissions and data access")

Skills operate within Glean's existing permission model. Glean will only access data that you have permission to view. No new data access is granted by enabling Skills.

## Tips for writing effective Skills[​](#tips-for-writing-effective-skills "Direct link to Tips for writing effective Skills")

-   If a Skill isn't triggering when you expect it to, Skill routing depends on how well the Skill's name and description match the user's query. Try refining the Skill's description to include clearer keywords and, optionally, negative examples (cases where the Skill should not be used).
-   Skills work best with advanced reasoning models. We recommend using **thinking mode** in Glean for the best Skill routing and execution quality.

## Current limitations[​](#current-limitations "Direct link to Current limitations")

-   **Skill routing in non-thinking mode**: Skill routing works in non-thinking mode, but is most reliable in thinking mode. Use thinking mode for the best routing and execution quality.
-   **GitHub access follows source permissions**: Importing or refreshing Skills from private GitHub repositories requires an active GitHub authorization with access to the source repository.
-   **GitHub sync is one-way**: Changes flow from GitHub into Glean, not from Glean back to GitHub. If you edit an imported Skill in Glean, those changes stay in Glean.

## FAQ[​](#faq "Direct link to FAQ")

### What models work best with Skills?

Skills work best with advanced reasoning models. We recommend using thinking mode in Glean for the best Skill routing and execution quality.

### Can I bring Skills from other platforms into Glean?

Yes. Skills that follow the open Agent Skills standard can be uploaded directly into Glean via `.zip` or `.md` file, or imported from a public or private GitHub repository.

### Will Skills see my company's data?

Skills operate within Glean's existing permission model. Glean will only access data that you have permission to view. Enabling Skills doesn't grant new data access.

### Can I share a Skill with my team?

Yes, if your admin has enabled sharing for your account. From **Settings → Skills**, open the Skill's three-dot menu and select **Share**, then add teammates, departments, or groups as a **Viewer** or **Editor**. Sharing with your entire organization requires admin permission. See [Sharing Skills](#sharing-skills).

### Why did a new Skill appear that I didn't create?

Your organization can publish Skills for your team or company. Published Skills may be enabled for you automatically and appear in the **Shared** area of **Settings → Skills**.

### How does Glean decide when to use a Skill?

Glean evaluates your query against available Skill descriptions and determines whether a Skill is relevant. If it is, Glean loads the relevant portions of the Skill to inform its response. This routing happens automatically in thinking mode.

### What file formats are supported for Skill upload?

You can upload Skills as `.md` (single markdown file) or `.zip` / `.skill` (archive containing SKILL.md and optional supporting files like templates, examples, and scripts). You can also import a Skill directly from a public or private GitHub repository by pasting a URL.

### Is there a size limit for Skills?

Yes. A Skill can contain up to 100 files. The maximum upload size is 10 MB for `.zip` files and 16 MB uncompressed.

### Can I import a Skill from GitHub?

Yes. Go to **Settings → Skills**, click **\+ Add Skill**, and select **Import from GitHub**. Paste a supported URL - a repository root, a subtree path, or a direct SKILL.md link - and Glean imports the Skill with all bundled supporting files.

### How does Glean keep imported Skills up to date?

Glean records the source URL and commit for each imported Skill, then checks the source repository for upstream changes about once a day and automatically pulls any new content. Sync is one-way, from GitHub into Glean. To check sooner, open the Skill's three-dot menu and click **Refresh**.

### How often does Glean refresh Skills imported from GitHub?

Glean refreshes imported Skills about once a day. The daily refresh automatically pulls upstream changes from the source repository into Glean. To refresh sooner, open the Skill's three-dot menu and click **Refresh**.

### Does GitHub sync work both ways?

No. Sync is one-way from GitHub into Glean. Changes you make to an imported Skill in Glean aren't pushed back to the source repository.

### Can I use a GitHub commit permalink to import a Skill?

No. Commit permalink URLs point to a fixed commit and can't stay in sync with upstream changes. Use a branch or tag URL instead.

### Does GitHub import replace admin governance for Skills?

No. GitHub import is a way to bring Skills into Glean from a repository. Governance controls - including admin enablement, sharing, and publishing - remain separate and continue to apply to imported Skills.

### Can I import from a private GitHub repository?

Yes. You can import from private GitHub repositories that your GitHub account can access. If prompted, connect your GitHub account and grant Glean access before previewing or importing the Skill.

### Can I import multiple Skills from GitHub at once?

Yes. If you paste a URL to a directory that contains multiple Skills, each in its own folder with a SKILL.md, Glean discovers every Skill under that path and imports them together as separate Skills. See [Importing multiple Skills from a directory](#import-multiple-skills-from-a-directory).

### What happens if one Skill in a directory can't be imported?

Glean imports the Skills it can and skips the ones it can't, so one invalid Skill doesn't block the others. A Skill is skipped if its SKILL.md is missing the required `name` or `description` frontmatter, or if the Skill exceeds the size limit.

### Will this affect my existing experience?

For most users, no - Skills only run when they're relevant to your query, so non-Skill queries are unaffected. If your organization has a large number of Skills enabled, Assistant may take slightly longer to evaluate which Skill (if any) to apply, since it reads each Skill's name and description to decide. The impact is small in practice but scales with the number of Skills available.
