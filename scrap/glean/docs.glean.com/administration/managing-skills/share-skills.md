---
url: "https://docs.glean.com/administration/managing-skills/share-skills"
canonical: "https://docs.glean.com/administration/managing-skills/share-skills"
title: "Share Skills"
description: "Share Skills with departments, organizations, or specific groups and control who can access them."
fetched_at: "2026-09-01T13:29:10.111Z"
---
On this page

Admins can share Skills with wider audiences beyond individual teammates. When you share a Skill at the department or organization level, you determine who can access the Skill and whether to automatically enable it for recipients.

## Share a Skill from the Admin console[​](#share-a-skill-from-the-admin-console "Direct link to Share a Skill from the Admin console")

Admins can share Skills from the **Admin console** management interface.

1.  Navigate to **Admin console → Skills**.
    
2.  Go to the **Manage** tab.
    
3.  Locate the Skill you want to share or manage.
    
4.  Click the context menu (three dots) and select **Share**.
    
5.  In the share dialog, configure the following:
    
    **People with access:**
    
    -   Add individual teammates, departments, or groups who should have access.
    -   The Skill creator is the **Owner** and can't be changed from this dialog.
    
    **General access:**
    
    -   Choose from the dropdown:
        -   **Restricted to people with access** — only the people, departments, and groups in **People with access** can use the Skill.
        -   **Anyone at \[Company\] with the link can view** — anyone in the organization can find and use the Skill.
    
    **Advanced settings (admins and Skills Moderators only):**
    
    -   **Auto-enable** — when checked, Assistant automatically triggers this Skill when relevant. Teammates can turn it off anytime.
6.  Click **Save**.
    

To modify access later, open the same dialog and update the people, general access, or **Auto-enable** settings. Changes take effect immediately, and teammates removed from the audience lose access on their next session. For the user-side sharing procedure, see [Sharing Skills](/user-guide/assistant/skills#sharing-skills).

note

Admins can also enable or disable **Auto-enable** for any Skill directly from the **Manage** tab's table without opening the share dialog.

## Modify access level[​](#modify-access-level "Direct link to Modify access level")

When sharing a Skill, you assign an access level to each recipient or group:

-   **Viewer** — can use the Skill.
-   **Editor** — can use and edit the Skill.

The Skill creator is the **Owner**. Owner is set automatically and can't be assigned from the share dialog.

To change someone's access level:

1.  Navigate to **Admin console → Skills → Manage**.
2.  Locate the Skill you want to modify access to.
3.  Click the context menu (three dots) for the Skill and select **Share**.
4.  Find the person or group in the **People with access** section.
5.  Click the dropdown next to their name showing their current access level.
6.  Select the new access level (**Viewer** or **Editor**).
7.  Click **Save**.

## Skill recipient experience[​](#skill-recipient-experience "Direct link to Skill recipient experience")

When a Skill is shared with users:

-   The Skill appears in the recipient's **Shared** tab under **Settings → Skills**.
-   If you selected **Auto-enable** when sharing, the Skill is automatically enabled and ready to use.
-   Recipients can see the Skill creator and the date the Skill was created.
-   Recipients can enable or disable any Skill at any time from their Skills settings, including auto-enabled Skills.
-   Recipients are notified by email when the Skill is shared with them and when the owner updates it. Glean sends at most one update email per Skill per day, so frequent edits don't generate multiple notifications.

## Sharing best practices[​](#sharing-best-practices "Direct link to Sharing best practices")

-   **Start restricted, then expand**: Share new Skills with a small group first, validate they work as expected, then expand to broader audiences
-   **Use auto-enable thoughtfully**: Auto-enable is useful for Skills that enhance core workflows, but avoid over-enabling to prevent Skill overload
-   **Document Skill purpose**: Ensure Skill descriptions clearly explain when and how the Skill should be used so recipients understand its value
-   **Review sharing regularly**: Periodically audit which Skills are shared at what scope to ensure alignment with current team structures and needs
