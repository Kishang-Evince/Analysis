---
url: "https://docs.glean.com/administration/agent-identity/gcp-bigquery"
canonical: "https://docs.glean.com/administration/agent-identity/gcp-bigquery"
title: "Set up GCP BigQuery service credential"
description: "Configure GCP service account impersonation so Glean agents can query BigQuery datasets."
fetched_at: "2026-09-01T13:28:58.618Z"
---
On this page

A GCP BigQuery service credential lets a Glean agent query BigQuery datasets as a service account rather than on behalf of an individual user. Glean uses service account impersonation to mint short-lived access tokens, so you never upload or manage long-lived service account keys.

Glean handles authentication automatically. Tokens are minted server-side, and the agent never sees a static key.

-   Authentication: Service account impersonation which are short-lived tokens and no key upload is required
-   Scope: The BigQuery projects, datasets, and tables the target service account can access
-   Access: Read-only

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring your agent, ensure you have the following:

-   An active GCP project with the BigQuery datasets the agent will query.
-   A dedicated service account created specifically for the agent, for example: `bq-reader@<your-gcp-project>.iam.gserviceaccount.com`.
-   The following IAM roles granted to that service account:
    -   *BigQuery Data Viewer* (`roles/bigquery.dataViewer`) on the projects or datasets the agent will query.
    -   *BigQuery Job User* (`roles/bigquery.jobUser`) on the project, so the agent can run queries.
-   The Glean query endpoint service account identity associated with your deployment, required to configure the impersonation relationship.
-   A Glean administrator who can create service credentials.
-   The GCP BigQuery template enabled for your deployment. If you don't see it in the list of templates, contact your Glean representative to turn it on.

## Step 1: Identify the Glean query endpoint service account[​](#step-1-identify-the-glean-query-endpoint-service-account "Direct link to Step 1: Identify the Glean query endpoint service account")

The Glean query endpoint runs as a specific GCP service account using the following format:

`query-endpoint@<your-glean-gcp-project>.iam.gserviceaccount.com`

Select your preferred method below to locate this service account:

-   Using the CLI
-   Using the GCP Console

Choose the command that matches your access level.

**Via `gcloud`** (requires IAM permissions on the Glean project):

```
gcloud iam service-accounts list \  --project="<YOUR_GLEAN_GCP_PROJECT>" \  --filter="email:query-endpoint@"
```

**Via `kubectl`** (requires cluster access to the GKE deployment):

```
kubectl get serviceaccount gke-qe \  --namespace=default \  -o jsonpath='{.metadata.annotations.iam\.gke\.io/gcp-service-account}'
```

1.  Open the Google Cloud Console and navigate to **[IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)** within your Glean GCP project.
2.  Search for the service account prefix: `query-endpoint@`.

## Step 2: Grant impersonation access on the target service account[​](#step-2-grant-impersonation-access-on-the-target-service-account "Direct link to Step 2: Grant impersonation access on the target service account")

To mint short-lived tokens, the Glean query endpoint service account must be granted the **Service Account Token Creator** (`roles/iam.serviceAccountTokenCreator`) role on the target service account.

Select your preferred configuration method:

-   Using the CLI
-   Using the GCP Console

Execute the following `gcloud` command to add the required IAM policy binding. Replace the placeholder variables with your specific service account identifiers.

```
# Set your service account variablesTARGET_SA="bq-reader@<your-gcp-project>.iam.gserviceaccount.com"QE_SA="query-endpoint@<YOUR_GLEAN_GCP_PROJECT>.iam.gserviceaccount.com"# Grant the Service Account Token Creator rolegcloud iam service-accounts add-iam-policy-binding "$TARGET_SA" \  --member="serviceAccount:$QE_SA" \  --role="roles/iam.serviceAccountTokenCreator"
```

1.  Open the Google Cloud Console and navigate to **[IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)** in the GCP project that owns the target service account.
2.  Select the checkbox next to your target service account (for example, `bq-reader@...`).
3.  If the info panel on the right is not visible, click **Show Info Panel** in the top-right corner.
4.  In the permissions panel, click **Grant Access**.
5.  In the **New principals** field, enter the full email address of your Glean query endpoint service account.
6.  In the **Select a role** dropdown, select **Service Account Token Creator**.
7.  Click **Save**.

## Step 3: Confirm the target service account permissions[​](#step-3-confirm-the-target-service-account-permissions "Direct link to Step 3: Confirm the target service account permissions")

Make sure the target service account has the BigQuery roles it needs:

-   *BigQuery Data Viewer* (`roles/bigquery.dataViewer`) on the projects or datasets the agent will query.
-   *BigQuery Job User* (`roles/bigquery.jobUser`) on the project, so the agent can run queries.

## Step 4: Create the service credential in Glean[​](#step-4-create-the-service-credential-in-glean "Direct link to Step 4: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
    
    ![Create service credentials](/img/independent-agent-create-service-creds.png)
    
2.  Click **Add**.
3.  Select **GCP BigQuery** under **Service credentials**.
4.  Fill in these fields:
    -   **Credential name**: A human-readable name for the credential, for example, "BigQuery Reader - my-project".
    -   **Description**: A brief description of what this credential is used for.
    -   **Service account email**: The full email address of the target service account, for example, `bq-reader@<your-gcp-project>.iam.gserviceaccount.com`.
    -   **Audience**: Which users or groups can attach this credential to agents.
5.  Select **Save**.

## Step 5: Attach the credential to an agent[​](#step-5-attach-the-credential-to-an-agent "Direct link to Step 5: Attach the credential to an agent")

Agent builders can attach the credential from the **Service credentials** tab in the agent builder. After you attach it, the agent can query BigQuery datasets using short-lived tokens minted through service account impersonation.

1.  Go to **Agents** in Glean.
    
2.  Select the agent to which you want to add the service credentials.
    
3.  In the **Tools** tab, select **Service credentials** and select the GCP BigQuery service credential you created.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

## Step 6 (optional): Set a BigQuery quota for the service account[​](#step-6-optional-set-a-bigquery-quota-for-the-service-account "Direct link to Step 6 (optional): Set a BigQuery quota for the service account")

To protect against runaway costs from agent queries, it is recommended to set a custom quota on the BigQuery usage of the service account:

1.  In the Google Cloud Console, go to **[IAM & Admin > Quotas](https://console.cloud.google.com/iam-admin/quotas)** in the project.
2.  Filter for **BigQuery API > Query usage per day per user**.
3.  Create a quota override scoped to the target service account, for example, 1 TB/day.

A project-level quota gives you a deterministic safety net that is independent of agent behavior.

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to run a simple query, for example, "list the tables in `<your-dataset>`." If it returns results, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

With a GCP BigQuery credential attached, the agent can query BigQuery data the target service account can access:

-   Run read-only SQL queries
-   Inspect schemas for accessible datasets and tables
-   Summarize query results

Glean mints a short-lived token for each request, and the agent can't exceed the IAM permissions granted to the target service account.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Impersonation, not keys: Glean mints short-lived tokens through impersonation, so there is no long-lived key to store, upload, or leak.
-   Injected server-side: the agent runtime never receives a static credential. Glean adds the token only to requests bound for Google APIs.
-   Least privilege: grant the target service account only the BigQuery roles the agent needs, on only the datasets it must reach.
-   Cost control: set a BigQuery quota on the service account to cap daily query spend.
-   Revocation: to cut off access, remove the **Service Account Token Creator** binding for the Glean query endpoint service account on the target service account.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Glean can't mint a token (permission denied on the token request)

The Glean query endpoint service account is missing the **Service Account Token Creator** role on the target service account. Re-grant it, following Step 2.

### The agent gets permission denied running a query

The target service account is missing a BigQuery role. Confirm it has *BigQuery Data Viewer* on the target datasets and *BigQuery Job User* on the project, following Step 3.

### A query runs but returns no data

The service account can authenticate and run jobs but can't read the target dataset or tables. Check dataset- and table-level permissions.

### You can't find the query-endpoint service account

You may be looking in the wrong project or lack access. Use the CLI or GCP Console methods in Step 1, or contact your Glean representative for the exact identity.

### The GCP BigQuery template isn't available

The template isn't enabled for your deployment. Contact your Glean representative to turn it on.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
-   [Service account impersonation](https://cloud.google.com/iam/docs/service-account-impersonation)
