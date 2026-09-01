---
url: "https://docs.glean.com/administration/tools/setup-tools/code-writer-tools-setup"
canonical: "https://docs.glean.com/administration/tools/setup-tools/code-writer-tools-setup"
title: "Code Writer tool setup"
description: "Enable the Code Writer tool and configure GitHub or Bitbucket Cloud authentication in Glean."
fetched_at: "2026-09-01T13:29:15.062Z"
---
On this page

Use the Code Writer tool to let Glean and agents propose code changes and open draft pull requests in GitHub or Bitbucket Cloud without leaving Glean. Code Writer creates or updates pull requests in your connected repositories, while your existing reviewers, branch protection rules, and CI pipelines stay in control.

Setup differs by provider. Complete the section for the provider you use:

-   [Set up Code Writer with GitHub](#set-up-code-writer-with-github)
-   [Set up Code Writer with Bitbucket Cloud](#set-up-code-writer-with-bitbucket-cloud)

Then complete [Control who can use Code Writer](#control-who-can-use-code-writer), which applies to both providers.

## Set up Code Writer with GitHub[​](#set-up-code-writer-with-github "Direct link to Set up Code Writer with GitHub")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before setting up the Code Writer tool for GitHub:

-   The GitHub connector is set up and crawling the repositories where Code Writer will propose changes.
-   You or a GitHub admin can install the Glean GitHub App in the relevant organizations.
-   You can access the Glean **Admin console**.
-   For Glean-billed customers, Code Writer uses the same Vertex AI configuration as Glean. For bring-your-own keys, Code Writer works only with a compatible Bedrock instance in the same project where Glean runs. Third-party Anthropic keys are not used for Code Writer.
-   To use Code Writer from Slack, Glean in Slack must be installed and configured for your workspace.

note

Code Writer is available on both GCP and AWS.

See [Set up the GitHub connector](/connectors/native/github/setup) for connector requirements.

### Install the Glean GitHub App[​](#install-the-glean-github-app "Direct link to Install the Glean GitHub App")

Code Writer uses a central GitHub App to read and write code. If you have not already done so, install the Glean GitHub App in your GitHub organization.

1.  In GitHub, open your organization settings.
2.  Install the **[Glean GitHub App](https://github.com/apps/glean-github-app-oauth)** for the organization that hosts your repositories.
3.  Grant read and write access to the repositories where Code Writer can open pull requests. You can limit the installation to a subset of repositories to restrict where Code Writer runs.

### Create the GitHub tool configuration[​](#create-the-github-tool-configuration "Direct link to Create the GitHub tool configuration")

1.  Open the **Admin console**.
2.  Go to **[Tools](https://app.glean.com/admin/tools)**.
3.  Click **\+ Add**.
4.  Select **Code generation (GitHub)**.
5.  Enter the configuration details:
    -   **Instance name**: Give this configuration a clear name.
    -   **Connector instance**: Choose the GitHub connector instance that contains the repositories where Code Writer should propose changes.
6.  In the **Authenticate** step, select **Central OAuth**. GitHub supports Central OAuth only.
7.  Click **Save**.

Central OAuth uses the default OAuth app for a shared service identity. It is suitable for narrow, well-scoped use cases where a single service account owns changes. All Code Writer tools run under the configured service identity in GitHub.

note

User OAuth is not currently supported for Code Writer with GitHub.

### Configure commit signing (optional)[​](#configure-commit-signing-optional "Direct link to Configure commit signing (optional)")

To make commits from Code Writer appear as **verified** in GitHub:

1.  In the Code generation configuration, find `GPG commit signing (optional)`.
2.  Upload the private signing key for Code Writer to use.
3.  Confirm that the UI shows **Commits will be signed**.

## Set up Code Writer with Bitbucket Cloud[​](#set-up-code-writer-with-bitbucket-cloud "Direct link to Set up Code Writer with Bitbucket Cloud")

### Prerequisites[​](#prerequisites-1 "Direct link to Prerequisites")

Before setting up the Code Writer tool for Bitbucket Cloud:

-   The Bitbucket connector is set up and crawling the repositories where Code Writer will propose changes.
-   You have administrator access to the relevant Bitbucket Cloud workspace.
-   You can create or manage an OAuth consumer in the Bitbucket Cloud workspace.
-   You are ready to link a Bitbucket connector instance when you create the Code Writer tool configuration.

See [Bitbucket](/connectors/native/bitbucket/) for connector requirements and setup instructions.

### Create a Bitbucket OAuth consumer[​](#create-a-bitbucket-oauth-consumer "Direct link to Create a Bitbucket OAuth consumer")

Code Writer requires an OAuth consumer with write scopes. If you already have an OAuth consumer for the Bitbucket connector, create a separate consumer for Code Writer with the additional write permissions.

1.  In Bitbucket Cloud, open the workspace settings.
2.  Go to **Apps and features → OAuth consumers**.
3.  Click **Add consumer**.
4.  Enter a name for the consumer, such as `Glean Code Writer`.
5.  In the **Callback URL** field, enter the callback URL shown in the **Admin console** when you configure **Code generation (Bitbucket)**.
6.  Under **Permissions**, select only the scopes that Glean lists for **Code generation (Bitbucket)** in the **Admin console**. Bitbucket selects the remaining related scopes for you because they are a subset of `pullrequest:write`.
7.  Click **Save**.
8.  Copy the **Key** (client ID) and **Secret** (client secret). You will enter them in the **Admin console** in the next section.

### Create the Bitbucket tool configuration[​](#create-the-bitbucket-tool-configuration "Direct link to Create the Bitbucket tool configuration")

1.  Open the **Admin console**.
    
2.  Go to **[Tools](https://app.glean.com/admin/tools)**.
    
3.  Click **\+ Add**.
    
4.  Select **Code generation (Bitbucket)**.
    
5.  Enter the configuration details:
    
    -   **Instance name**: Give this configuration a clear name.
    -   **Connector instance**: Choose the Bitbucket connector instance that contains the repositories where Code Writer should propose changes.
6.  In the **Authenticate** step, select **Custom** and enter the credentials from the OAuth consumer you created:
    
    | Field | Value |
    | --- | --- |
    | **Client ID** | The **Key** from your Bitbucket OAuth consumer |
    | **Client Secret** | The **Secret** from your Bitbucket OAuth consumer |
    
    Glean autofills the remaining fields: **Authorization URL** (`https://bitbucket.org/site/oauth2/authorize`), **Token URL** (`https://bitbucket.org/site/oauth2/access_token`), and **Scopes**. You don't need to change them.
    
7.  Click **Save**.
    

### First-time user authentication[​](#first-time-user-authentication "Direct link to First-time user authentication")

Each user authenticates the tool the first time it is invoked. After the initial authentication, the OAuth credentials refresh automatically, and users do not need to authenticate again on every run.

## Control who can use Code Writer[​](#control-who-can-use-code-writer "Direct link to Control who can use Code Writer")

In the **Enable tools** section:

1.  Choose which users or groups can access Code Writer:
    -   All users
    -   Specific groups or departments
    -   Pilot groups for initial rollout
2.  Save your changes.

These access controls apply across Glean, agents that include Code Writer tool steps, and Glean in Slack.

## Security and governance[​](#security-and-governance "Direct link to Security and governance")

To help security and compliance teams evaluate Code Writer:

-   **Scope**: Code Writer can only access repositories included in the configured connector and granted to the authentication identity for the provider. This identity is the Glean GitHub App for GitHub or the OAuth consumer for Bitbucket Cloud.
-   **Identity**: For GitHub, Code Writer tools run as the configured Central OAuth service identity, and User OAuth is not supported. For Bitbucket Cloud, Code Writer tools run under the configured OAuth consumer, and each user authenticates on first use.
-   **Audit trail**: All changes land as branches and pull requests in your source control system, so your existing reviewers, branch protection rules, and CI pipelines remain in control.

## See also[​](#see-also "Direct link to See also")

-   [About Code Writer](/administration/assistant/features/code-writer)
-   [Add Code Writer to an agent](/tools/glean/code-writer)
-   [Use Code Writer with Glean in Slack](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-code-writer)
-   [Generate code in Assistant](/user-guide/assistant/code-generation)
-   [Set up the GitHub connector](/connectors/native/github/)
-   [Bitbucket](/connectors/native/bitbucket/)
