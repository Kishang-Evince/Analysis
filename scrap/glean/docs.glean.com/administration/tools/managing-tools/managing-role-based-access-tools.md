---
url: "https://docs.glean.com/administration/tools/managing-tools/managing-role-based-access-tools"
canonical: "https://docs.glean.com/administration/tools/managing-tools/managing-role-based-access-tools"
title: "Managing tool access"
description: "Admins can restrict which agent creators can add or configure specific tools by user or department while preserving end-user execution in shared agents."
fetched_at: "2026-09-01T13:29:14.855Z"
---
On this page

Role-based access to tools lets admins decide which agent creators can add and configure specific tools in the agent builder. You can target access by people or by department, giving you precise control over who can wire sensitive or domain‑specific tools into your organization’s agents. This reduces risk, prevents clutter, and keeps teams focused on the tools that matter to them.

End users can still run tools inside shared agents they use. This feature limits who can add or configure tools in agents, not who can execute agent‑run tools at runtime. End‑user execution within shared agents remains permission‑aware and unaffected.

This access setting applies across all tool types in the Tools admin experience, including **Glean Provided Tools**, **Custom Tools**, and **Vendor Provided Tools**. It also affects which tools are available through **Glean MCP servers**.

Benefits of using tools are as follows:

-   Security: For custom tools that embed credentials or administrative capabilities, limit access to approved creators only, reducing blast radius from misuse.
    
-   Usability and guardrails: Reduce noise for non‑targeted teams and prevent accidental or experimental misuse. For example, expose GitHub tools to engineering and Salesforce tools to sales.
    
-   Governance: Align tool availability with internal policies and compliance without slowing down teams that genuinely need access to tools.
    

## Configuration steps[​](#configuration-steps "Direct link to Configuration steps")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Admin access to Glean.
-   Identify the tools that you want to restrict, for example, custom tools with credentials, or department‑specific tools.
-   Decide the scope of access: people, departments, or both.

### Steps[​](#steps "Direct link to Steps")

To control who can add or configure a tool in an agent:

1.  Navigate to **Admin console → Platform → Tools**.
2.  Select the tool pack you want to configure, then open **Configuration**.
3.  Under **Enable tools**, click **Edit settings**.
4.  Expand **Agents**.
5.  In **Access**, select the teammates or departments that can add or configure each tool.
6.  Click **Save**.

Repeat these steps for any additional tool packs that require restricted access.

### Verification steps[​](#verification-steps "Direct link to Verification steps")

Verify the configuration by using the following ways:

-   Ask a creator who is included in the policy to open the agent builder and confirm they can add or configure the restricted tool.
-   Ask a creator who is excluded to confirm the restricted tool is hidden or disabled for them in the builder.
-   Run a shared agent that already uses the tool to validate that end users can still execute the tool as before, this is subject to tool credentials and downstream app permissions.

### Troubleshooting steps[​](#troubleshooting-steps "Direct link to Troubleshooting steps")

-   **Issue**: Agent creator cannot find a specific tool in the builder.
    
    -   **Resolution**: Confirm they are included as a person or in a department that is allowed to add or configure that tool. If they must have access, add them or their department and ask them to refresh the builder.

-   **Issue**: End users report they cannot run a tool in a shared agent.
    
    -   **Resolution**: This feature does not block runtime execution. Check the agent configuration, connected account or credential validity, and downstream app permissions.
-   **Issue**: Admin cannot see access controls for tools.
    
    -   **Resolution**: Contact your account team to enable the feature or to confirm the latest location of the controls.

## Set access for individual tools (advanced settings)[​](#set-access-for-individual-tools-advanced-settings "Direct link to Set access for individual tools (advanced settings)")

The steps above set access for an entire tool pack. You can also manage access tool by tool within an external pack, such as a third-party MCP server, a connector, or a custom OpenAPI pack. This is useful when a single pack contains tools everyone can use and restricted tools for specific teams.

### Open a tool pack's advanced settings[​](#open-a-tool-packs-advanced-settings "Direct link to Open a tool pack's advanced settings")

1.  In the **Admin console**, open a **Glean MCP server** and go to **Add tools**.
2.  On the **External Tools** tab, find the tool pack you want to configure.
3.  In that pack's row, select the **Tool advanced settings** icon.

The window organizes the pack's tools into two groups, **Write tools** and **Read tools**. Write tools are expanded by default. Select **Read tools** to expand that group. Each group shows a tool count and an **Access** column.

### Set access for each tool[​](#set-access-for-each-tool "Direct link to Set access for each tool")

1.  For each tool, use the **Access** dropdown to choose who can access it. You can select **All teammates**, **Specific teammates**, or **Specific departments**. The default is **All teammates**.
2.  To apply one tool's access to the rest of its group, set the first tool, then select **Copy to write tools** or **Copy to read tools**.
3.  To return every tool in the pack to the default, select **Reset to default**. This resets access for all tools back to **All teammates**.
4.  Select **Save**.

note

Changes you make here are reflected in the [MCP Gateway](/administration/platform/mcp/mcp-gateway), and changes you make in the [MCP Gateway](/administration/platform/mcp/mcp-gateway) are reflected here.

For more help, contact the [Glean support team](https://support.glean.com).
