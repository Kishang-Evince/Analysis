---
url: "https://docs.glean.com/administration/protect/ai-security/configuring-panw"
canonical: "https://docs.glean.com/administration/protect/ai-security/configuring-panw"
title: "Configuring Palo Alto Networks (PANW) AI Runtime Security"
fetched_at: "2026-09-01T13:29:13.599Z"
---
On this page

Glean Protect+

Glean integrates with Palo Alto Networks' AI Runtime Security (AIRS) to provide an additional layer of protection for AI agents, helping to detect and block malicious prompts. This guide outlines the steps to configure the PANW provider in Glean.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   You must have an active Palo Alto Networks AI Runtime Security account.
-   You must have the API token and the AI Runtime Security profile name provided by Palo Alto.
-   For more information, see Prisma AIRS AI Runtime API Intercept.

### Configuration Steps in Glean[​](#configuration-steps-in-glean "Direct link to Configuration Steps in Glean")

To configure the PANW provider in Glean, follow these steps:

1.  In the Glean Admin Console, navigate to **Glean Protect → AI security** and click the **Advanced Settings** tab.
2.  In the Advanced Settings tab, select Palo Alto Networks AI Runtime Security as the security provider.
3.  Enter the API key and AI Runtime Security profile name exactly as provided by Palo Alto.
4.  If your company uses a privately managed PANW instance, also enter its **Instance URL**. If not, leave this field blank.
5.  Click **Save** to apply the settings. The system will remember these settings for future agent runs.

### Creating a Security Profile in PANW Dashboard[​](#creating-a-security-profile-in-panw-dashboard "Direct link to Creating a Security Profile in PANW Dashboard")

Before generating the API key, you first need to create a security profile in the PANW Prisma AIRS dashboard.

1.  Log in to the PANW Prisma AIRS dashboard and navigate to **AI Runtime - API Intercept**.
2.  Click on **Manage → Security Profiles -> Create New Security Profile**.
3.  Configure the profile as follows (recommended for Glean Guardrails integration):
    -   Prompt Injection Detection: Enabled → Tool: Allow
    -   Contextual Grounding: Disabled
    -   Toxic Content Detection: Enabled → Moderate: Allow, High: Allow
    -   Custom Topic Guardrails: Disabled
    -   Malicious Code Detection: Enabled → Tool: Allow
    -   Malicious URL Detection: Enabled → Tool: Allow
    -   Sensitive Data Detection: Disabled
    -   Database Security Detection: Disabled
    -   AI Agent Protection: Disabled
    -   Latency Configuration: 1 second, Tool: Allow
4.  Click **Create** to save the profile.
5.  You will now see the new security profile listed, which can be edited if needed.

### Creating an API Key in PANW Dashboard[​](#creating-an-api-key-in-panw-dashboard "Direct link to Creating an API Key in PANW Dashboard")

Next, create an API key that will be used to integrate with Glean.

1.  In the Prisma AIRS dashboard, click **Manage → API Keys**.
2.  Click **Add New Application/API Key**.
3.  Copy the generated API key and securely store it.
    -   If API key rotation is enabled, ensure you periodically update the credentials in Glean according to the set frequency.
4.  Use this API key along with the security profile name when configuring the provider in Glean.
