---
url: "https://docs.glean.com/administration/managing-agents/managing-agent-library"
canonical: "https://docs.glean.com/administration/managing-agents/managing-agent-library"
title: "Manage agent library"
description: "Learn to design a Library that avoids agent sprawl and makes high-quality agents easy to discover."
fetched_at: "2026-09-01T13:29:09.929Z"
---
On this page

As an admin or agent moderator, you control how the Agent Library is organized and which agents are promoted to different groups of users. You can:

-   Create and manage *categories*.
-   *Verify and brand* official agents.
-   Scope categories and agents to the right departments.
-   Preview how the Library looks for end users where supported.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you can create or manage categories in the Agent Library:

-   Agents must be enabled for your deployment. You must see the **Agents** entry in the left navigation in Glean.
-   Agent Library categories must be enabled for your tenant. If you do not see **Manage categories** as an admin or agent moderator, or if adding agents to a category returns an error, contact Glean Support to enable category management for your deployment.
-   Only users with the **Admin** or **Agent Moderator** role can create, edit, delete, or reorder categories. Members cannot manage categories even if they can run agents in them.

note

Changes to the Agent Library, including category creation, ordering, and verification, can take a few minutes to appear for end users because of client-side caching.

## Roles and permissions[​](#roles-and-permissions "Direct link to Roles and permissions")

Only *agent moderators* and *admins* can configure the shared Agent Library. Specifically, they can:

-   Edit and delete *categories*.
-   Add and remove agents from categories.
-   Mark agents as *verified / company-branded*.
-   Control which audiences see each category and its agents.

End users can browse categories and run agents but **cannot** create or manage categories, or change verification status.

note

Admins can create categories. For an agent moderator to create categories, they also need the **Create Collections** permission. To learn how to grant this permisison, see [Default Member permissions](/administration/identity/roles/manage-users). For more details on roles, see [User Roles](/administration/identity/roles/user-roles).

## Plan your categories[​](#plan-your-categories "Direct link to Plan your categories")

Categories are the main way to organize the Library for different parts of your company. They appear as filters or navigation in the Library and group related agents together—for example:

-   Sales
-   Marketing
-   Support
-   HR
-   All

### Best practices for categories[​](#best-practices-for-categories "Direct link to Best practices for categories")

To keep the Library simple and scannable:

-   Aim for around *5 core categories* per department. There is no hard limit, but too many categories can overwhelm users.
-   Use plain-language names that match how teams describe their work, for example, *"Account Management"* rather than internal project code.

## Create or edit categories[​](#create-or-edit-categories "Direct link to Create or edit categories")

From the admin or moderator view of the Library, you can typically:

note

Only admins and moderators can manage categories. End users cannot change shared categories.

### Create a category[​](#create-a-category "Direct link to Create a category")

To create a category:

1.  Click the **Agents** icon on the left navigation pane.
2.  Click **Manage categories**.
    
    ![Manage categories](/img/manage-category.png)
    
3.  Click **Add category**.
    
    ![Create categories](/img/create-category.png)
    
4.  Add the category name and click **Confirm**.
    
    ![Categories](/img/create-category-1.png)
    

### Edit a category[​](#edit-a-category "Direct link to Edit a category")

You can rename the category if its scope changes and also update its audience or the agents assigned to it. To edit the category:

1.  Click the **Agents** icon on the left navigation pane.
2.  Click **Manage categories**.
3.  From the list of the categories, select the category you want to edit. You are redirected to the **Category** page.
4.  In the **Category** page, you can edit the category name, add agents and departments based on the changed scope.
    
    ![edit categories](/img/edit-category.png)
    

### Delete a category[​](#delete-a-category "Direct link to Delete a category")

You can remove categories that are no longer needed to avoid clutter. Agents themselves remain available and will not appear under that category. To delete a category:

1.  Click the **Agents** icon on the left navigation pane.
2.  Click **Manage categories**.
3.  From the list of the categories, select the category you want to delete.
4.  Click on the **Delete** icon.

![](/assets/images/delete-category-d957826b017dc587f96eed71a0bea368.png)

### Control category order[​](#control-category-order "Direct link to Control category order")

You can reorder categories to control how they appear in the Library.

-   Move your *most important categories*, for example, "All" or "Sales" to the top.
-   Group related categories together so users can scan the list quickly.

The order you set determines the display order in the Library UI.

## Add agents to categories[​](#add-agents-to-categories "Direct link to Add agents to categories")

A single agent can belong to multiple categories without being duplicated. Adding an agent to a category does not change its underlying owner or behavior.

Typical workflows include:

-   Add key Sales agents to both *Sales* and *All (Company)*.
-   Add an HR agent to *HR* and *All (Company)* if everyone can benefit from it.
-   Add niche, team-specific agents only to that team's category.

## Verify and brand official agents[​](#verify-and-brand-official-agents "Direct link to Verify and brand official agents")

Verification and branding help users quickly recognize which agents are **officially reviewed and approved**.

### What "verified / by (Company)" means[​](#what-verified--by-company-means "Direct link to What \"verified / by (Company)\" means")

A *verified* or *company-branded* agent is:

-   Created or curated by an admin or moderator.
-   Considered trusted and official for the audiences it's shared with.
-   Labeled with a badge and often the company name in the Library list and on the agent's detail page.

This is the primary way to distinguish:

-   Official agents that represent your company's recommended workflows.
-   Individual agents created by users for local experiments or team-specific tasks.

### When to brand an agent[​](#when-to-brand-an-agent "Direct link to When to brand an agent")

Consider verifying and branding an agent if it:

-   Automates a critical or widely used process, for example, support triage, deal desk reviews, or onboarding.
-   The agent is reviewed for accuracy, safety, and data access.
-   Needs to appear prominently in categories like *All (Company)*.

Admins can also choose to keep some agents **unbranded** even when they are in categories—for example, experimental agents or workflows still in testing.

### Verify an agent from agent settings[​](#verify-an-agent-from-agent-settings "Direct link to Verify an agent from agent settings")

To mark an agent as official:

1.  Click **Agents** on the left navigation pane in the Glean app.
2.  Open the agent you want to verify and go to **Settings**.

![](/assets/images/agents-settings-0e0ba13347c6616bc08c3214136984a3.png)

3.  If your deployment supports verified agents, you will see a verification control such as **Indicate as verified agent**.
4.  Mark the agent as **verified**.
5.  Choose the author attribution shown to users, such as the individual creator or **by (Company)**.
6.  **Confirm** the change to update how the agent appears in the agent library.

![](/assets/images/confirm-verify-agent-4e4825452e5e20560d92ccdd7370d3e5.png)

After you verify an agent:

-   A **verified badge** appears in the Agent Library and on the agent detail view.
-   The agent can appear as an official, trusted workflow for the audiences you share it with.
-   Branding affects attribution in the Library, but it does **not** change the agent's underlying logic or sharing permissions.

![](/assets/images/verified-mark-f3c5154451b216b41d608610b68b9e36.png)

If you remove verified status later, the agent returns to its normal, non-verified presentation.

## Scope categories and agents to the right audiences[​](#scope-categories-and-agents-to-the-right-audiences "Direct link to Scope categories and agents to the right audiences")

You can control who sees a category and the agents inside it. Audience scoping helps ensure:

-   Users see relevant agents, not a noisy list of every agent in the company.
-   Sensitive or specialized agents are only visible to the right teams.

Typical scoping options include:

-   **Department** — such as Sales, Support, Marketing, or Engineering. Scope a category to one or more departments so only members of those departments see it in the Library.

When you scope a category to specific departments, users outside those departments don't see the category, even if they have access to individual agents inside it. A category left unscoped is visible to all audiences that can otherwise access the Library.

Scoping controls visibility only. It never grants access to an agent that a user isn't already shared on, and it doesn't change an agent's underlying sharing or permissions.
