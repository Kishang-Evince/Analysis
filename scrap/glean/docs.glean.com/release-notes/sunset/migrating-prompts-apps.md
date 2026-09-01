---
url: "https://docs.glean.com/release-notes/sunset/migrating-prompts-apps"
canonical: "https://docs.glean.com/release-notes/sunset/migrating-prompts-apps"
title: "Migrating prompts and apps to Agents"
fetched_at: "2026-09-01T13:29:54.621Z"
---
On this page

If you have an existing deployment with prompts or apps, Glean will not enable the agents feature immediately. Instead, Glean will provide a transition period and a migration path for your existing prompts and apps.

The rollout consists of the following phases, which you can control up until the deadlines specified below:

-   **Phase 1: Glean Agents Preview**
    
    -   You will be able to preview the ability to create agents with a small set of users. Only **Admins** and users that are given the **Agent moderator** role will be able to access agents.
    -   Existing prompt and app functionality is unchanged for all users in your deployment.
    -   Timeline: You can choose any date between **May 20, 2025** and **July 15, 2025**
-   **Phase 2: Glean Agents Launch**
    
    -   Agents will become broadly available in your deployment and access will be governed by the new controls listed below.
    -   All existing advanced prompts and apps will be automatically migrated to become agents
    -   The Prompt Library will only contain simple prompts and we will offer users the ability to convert their simple prompt into an agent.
    -   Timeline: You can choose any date between **May 20, 2025** and **July 15, 2025**
        -   We will automatically launch Agents on July 15, 2025 if you do not launch it before this date.
-   **Phase 3: Prompt Library Sunset**
    
    -   The Prompt library and all simple prompts will be removed from your deployment.
    -   Timeline: You can choose any date between **May 20, 2025** and **Aug 5, 2025**
        -   We will automatically sunset the Prompt library on Aug 5, 2025 if you do not turn it off before this date.

## Changes to roles and access control[​](#changes-to-roles-and-access-control "Direct link to Changes to roles and access control")

We are providing more granular access controls for managing who can create and share agents. Additionally, we're introducing a new **Agent moderator** role so you can delegate responsibility for managing the contents of the Agent library.

### Changes to member roles[​](#changes-to-member-roles "Direct link to Changes to member roles")

<table style="border:1px solid black;border-collapse:collapse"><tbody><tr><td style="border:1px solid black;font-weight:bold;padding-left:8px" colspan="1" rowspan="1"><p style="font-weight:bold">Old roles</p></td><td style="border:1px solid black;font-weight:bold" colspan="1" rowspan="1"><p style="font-weight:bold">New roles</p></td><td style="border:1px solid black;font-weight:bold" colspan="1" rowspan="1"><p style="font-weight:bold">When this change happens</p></td></tr><tr><td style="border:1px solid black;padding-left:8px" colspan="1" rowspan="1"><p><span style="font-style:italic">There is no Prompt or App moderator role today.</span></p><p></p><p><span style="font-style:italic">Only Admins could manage the contents of the Prompt and App libraries.</span></p></td><td style="border:1px solid black" colspan="1" rowspan="1"><p><span style="font-weight:bold">Agent moderator</span></p><p><span>Create, edit, delete, view, or share anyone's agent.</span></p></td><td style="border:1px solid black" colspan="1" rowspan="1"><p><span style="font-weight:bold">Phase 1</span></p><p></p><p><span>Admins have to explicitly assign the </span><span style="font-weight:bold">Agent moderator</span><span> role. No user will get this role automatically.</span></p></td></tr><tr><td style="border:1px solid black;padding-left:8px" colspan="1" rowspan="2"><p><span style="font-weight:bold">App and tool creator</span><span><br><br>Create, edit, and delete their own apps and tools. View anyone's app and tool configurations and edit apps if given editor access.</span></p></td><td style="border:1px solid black" colspan="1" rowspan="1"><p><span style="font-weight:bold">Tool creator</span></p><p><span>Create, edit, and delete their own tools. View anyone's tool configurations.</span></p></td><td style="border:1px solid black" colspan="1" rowspan="2"><p><span style="font-weight:bold">Phase 2</span></p><p></p><p><span>All users who previously had the </span><span style="font-weight:bold">App and tool creator</span><span> role will automatically get the new </span><span style="font-weight:bold">Tool creator</span><span> and </span><span style="font-weight:bold">Agent creator</span><span> roles.</span></p></td></tr><tr><td style="border:1px solid black;padding-left:8px" colspan="1" rowspan="1"><p><span style="font-weight:bold">Agent creator</span></p><p><span>Create, edit, and delete their own agents.</span></p></td></tr></tbody></table>

### Changes to controls for broad access to creation and sharing[​](#changes-to-controls-for-broad-access-to-creation-and-sharing "Direct link to Changes to controls for broad access to creation and sharing")

<table style="border:1px solid black;border-collapse:collapse"><tbody><tr><td style="border:1px solid black;padding:8px" colspan="1" rowspan="1"><p><span style="font-weight:bold">Old control</span></p></td><td style="border:1px solid black;padding:8px" colspan="1" rowspan="1"><p><span style="font-weight:bold">New control</span></p></td><td style="border:1px solid black;padding:8px" colspan="1" rowspan="1"><p><span style="font-weight:bold">When this change happens</span></p></td></tr><tr><td style="border:1px solid black;padding:8px" colspan="1" rowspan="1"><p><span style="font-style:italic">All users are allowed to create prompts. &nbsp;There is no admin control for this.</span></p></td><td style="border:1px solid black;padding:8px" colspan="1" rowspan="2"><p><span>Default member permission<br></span><span style="font-weight:bold">Can create new agents: &nbsp;On / Off</span></p><p></p></td><td style="border:1px solid black;padding:8px" colspan="1" rowspan="2"><p><span style="font-weight:bold">Phase 2</span></p><p></p><p><span>This permission defaults to </span><span style="font-weight:bold">On</span></p></td></tr><tr><td style="border:1px solid black;padding:8px" colspan="1" rowspan="1"><p><span style="font-style:italic">There is no admin control that allows all users to create apps.</span></p></td></tr><tr><td style="border:1px solid black;padding:8px" colspan="1" rowspan="1"><p><span>There is an admin control for:</span></p><p><span style="font-weight:bold">Who can share prompts: &nbsp;All users / Only admins</span></p></td><td style="border:1px solid black;padding:8px" colspan="1" rowspan="2"><p><span>Default member permission:<br></span><span style="font-weight:bold">Can share and publish agents: &nbsp;On / Off</span></p></td><td style="border:1px solid black;padding:8px" colspan="1" rowspan="2"><p><span style="font-weight:bold">Phase 2</span></p><p></p><p><span>This permission defaults to </span><span style="font-weight:bold">Off</span></p></td></tr><tr><td style="border:1px solid black;padding:8px" colspan="1" rowspan="1"><p><span style="font-style:italic">All users who could create apps are allowed to share them. &nbsp;There is no admin control for this.</span></p></td></tr></tbody></table>

### Examples of possible configurations[​](#examples-of-possible-configurations "Direct link to Examples of possible configurations")

These new roles and default member permissions will provide you with a range of options for how broadly you want to enable creation and sharing of agents in your deployment.

<table style="border:1px solid black;border-collapse:collapse"><tbody><tr><td style="border:1px solid black;padding:8px"><p><strong>Desired outcome</strong></p></td><td style="border:1px solid black;padding:8px"><p><strong>Configuration</strong></p></td></tr><tr><td style="border:1px solid black;padding:8px"><p>Let a small set of users create and share agents</p></td><td style="border:1px solid black;padding:8px"><ul><p>Assign the <strong style="font-weight:bold">Agent creator</strong> role to a small set of users</p><p>Set the default member permissions:</p></ul><ul><li><strong style="font-weight:bold">Can create new agents: Off</strong></li><li><strong style="font-weight:bold">Can share and publish agents: On</strong></li></ul></td></tr><tr><td style="border:1px solid black;padding:8px"><p>Let all users create agents and tightly control which agents are shared to the library</p></td><td style="border:1px solid black;padding:8px"><ul><p>Assign the <strong style="font-weight:bold">Agent moderator</strong> role to a small set of users</p><p>Set the default member permissions:</p></ul><ul><li><strong style="font-weight:bold">Can create new agents: On</strong></li><li><strong style="font-weight:bold">Can share and publish agents: Off</strong></li></ul><ul><p>Agent creators will need to ask an agent moderator to share their agent</p></ul></td></tr><tr><td style="border:1px solid black;padding:8px"><p>Let all users create and share agents</p></td><td style="border:1px solid black;padding:8px"><p>Set the default member permissions:</p><ul><li><strong style="font-weight:bold">Can create new agents: On</strong></li><li><strong style="font-weight:bold">Can share and publish agents: On</strong></li></ul></td></tr></tbody></table>

## Prompt library sunsetting user experience[​](#prompt-library-sunsetting-user-experience "Direct link to Prompt library sunsetting user experience")

In Phase 1, Admins and Agent moderators will see a preview of this warning banner at the top of the Prompt library. It will not be shown to normal users.

In Phase 2, all users will see the warning banner.

In Phase 1, Admins and Agent moderators will see a button at the top of all simple prompts that will convert it into an agent. This generates a new agent that will appear in the Agent library and does not remove the prompt from the Prompt library.

Apps and advanced prompts will be automatically migrated to become agents in Phase 2. However, if you would like to preview the migration, you can choose to manually convert an app or advanced prompt into an agent. This creates a copy of the original app or advanced prompt and you will need to either delete the original or the generated agent before initiating Phase 2. Otherwise, you will end up with duplicate agents after the migration.

In Phase 2, users will see the warning banner at the top of simple prompts they own.

-   If the user has the permission to create agents, then they will see the button to convert the prompt into an agent.
-   If not, then they will see a message informing them that they need to ask an admin to convert the prompt for them. (Admins and Agent moderators will continue to see the convert button on all simple prompts.)

## Summary of product changes in each phase of the rollout[​](#summary-of-product-changes-in-each-phase-of-the-rollout "Direct link to Summary of product changes in each phase of the rollout")

<table style="border:1px solid black"><tbody><tr><td style="border:1px solid black"></td><td style="border:1px solid black;font-weight:bold">Simple Prompts</td><td style="border:1px solid black;font-weight:bold">Advanced Prompts</td><td style="border:1px solid black;font-weight:bold">Apps</td><td style="border:1px solid black;font-weight:bold">Agents</td></tr><tr><td style="border:1px solid black;font-weight:bold;padding-left:8px" rowspan="2">Phase 1:<br>Glean Agents Preview</td><td style="border:1px solid black" colspan="2"><p>All users will continue to have access to simple and advanced prompts in the Prompt library.<br>Admins and Agent moderators will see a preview of the warning banner on the Prompt library. Normal users will not see the warning banner.</p></td><td style="border:1px solid black">All users will continue to have access to apps in the App library.</td><td style="border:1px solid black"><p>Only Admins and Agent moderators will be able to create agents. These will appear in a new Agent library.<br>Normal users will not have access to agents.</p></td></tr><tr><td style="border:1px solid black;background-color:#e6b8af;padding-left:8px" colspan="2">Prompt library<br>(all users)</td><td style="border:1px solid black;background-color:#c9daf8">App library<br>(all users)</td><td style="border:1px solid black;font-weight:bold;background-color:#d9ead3"><p>Agent library<br>(only Admins &amp; Agent moderators)</p></td></tr><tr><td style="border:1px solid black;font-weight:bold;padding-left:8px" rowspan="2">Phase 2:<br>Glean Agents Launch</td><td style="border:1px solid black"><p>All users will continue to have access to simple prompts in the Prompt library.<br>All users will see the warning banner on the Prompt library.</p></td><td style="border:1px solid black" colspan="3"><p>All advanced prompts and apps will be automatically migrated to become agents and will now appear in the Agent library.<br><br>All agents created in phase 1 will continue to be available in the Agent library.<br><br>The App library will be removed from your deployment.<br><br>All users who previously had the App and <span class="glossary-term-trigger" tabindex="0" data-tooltip-id="glossary-tip-tool">tool</span> creator role will automatically get the new Tool creator and Agent creator roles.</p></td></tr><tr><td style="border:1px solid black;background-color:#e6b8af;padding-left:8px">Prompt library<br>(all users)</td><td style="border:1px solid black;font-weight:bold;background-color:#d9ead3" colspan="3"><p>Agent library<br>(all users)</p></td></tr><tr><td style="border:1px solid black;font-weight:bold;padding-left:8px" rowspan="2">Phase 3:<br>Prompt Library Sunset</td><td style="border:1px solid black">All simple prompts and the Prompt library will be removed from your deployment.</td><td style="border:1px solid black" colspan="3">No changes</td></tr><tr><td style="border:1px solid black;padding-left:8px">N/A</td><td style="border:1px solid black;font-weight:bold;background-color:#d9ead3" colspan="3"><p>Agent library<br>(all users)</p></td></tr></tbody></table>

## Admin controls[​](#admin-controls "Direct link to Admin controls")

You can initiate Phase 1 and Phase 2 of the rollout by going to [Admin Console > Platform > Agents](https://app.glean.com/admin/setup/agents).

You can change the date that is shown in the warning banner on the Prompt library if you want to remove the Prompt library prior to Aug 5, 2025. Please note that you will need to go to [Admin Console > Platform > Assistant > Settings](https://app.glean.com/admin/setup/gleanassistant?tab=settings) and manually turn off the Prompt library on that date.

When you click on "Launch agents" the rollout may take a few minutes. You do not need to keep the page open while the migration of your existing advanced prompts and apps happens. The page will show you a confirmation once the migration has successfully completed. Please contact Glean Support if the migration fails.

You will also be able to download a JSON files of the following:

-   **All simple prompts**
-   **All advanced prompts**
    -   This option will be removed after Glean Agents are launched since the migration converts advanced prompts into agents in place, and the old advanced prompts are no longer in our system.
-   **All apps**
    -   This option will continue to be available after Glean Agents are launched because we will retain a backup of the apps in our system.

Notes:

-   We will automatically launch Agents on July 15, 2025 if you do not launch it before this date.
-   We will automatically sunset the Prompt library on Aug 5, 2025 if you do not turn it off before this date.
