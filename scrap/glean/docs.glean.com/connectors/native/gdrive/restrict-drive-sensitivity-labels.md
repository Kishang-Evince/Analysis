---
url: "https://docs.glean.com/connectors/native/gdrive/restrict-drive-sensitivity-labels"
canonical: "https://docs.glean.com/connectors/native/gdrive/restrict-drive-sensitivity-labels"
title: "Restrict Google Drive content based on sensitivity labels"
description: "Learn how to restrict Google Drive content from indexing and crawling using sensitivity labels"
fetched_at: "2026-09-01T13:29:28.024Z"
---
On this page

Many organizations store highly sensitive documents in Google Drive, such as legal contracts, HR records, and executive strategy files. They want users to benefit from Glean search without ever surfacing this sensitive content in Glean, even if users can access it directly in Drive.

Restrict Google Drive content based on sensitivity labels lets Glean admins:

-   Use Google Drive labels (for example, a `Sensitivity` label) to mark documents that are too sensitive for Glean.
-   Configure an exclusion list of label choices in the Glean Admin console.
-   Ensure that any Google Drive file with one of those label choices is excluded from Glean crawling and indexing and does not appear in indexed Glean search results or other index-based experiences.

The feature works at the Google Drive connector level and targets Glean admins and security teams.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   **Glean admins, IT, and security**: Need a central, policy-based control to prevent sensitive Drive content from being indexed in Glean.
-   **Solution architects and onboarding teams**: Need a repeatable pattern to connect Google Drive while respecting existing sensitivity labels and reducing rollout risk.
-   **Support and customer-facing teams**: Need a clear way to diagnose why specific Drive documents do or do not appear in Glean, especially when label-based exclusions are enabled.
-   **End users**: Indirectly benefit from search that avoids exposing highly sensitive Drive content.

Users often classify content with Drive labels (for example, `Sensitivity = Highly confidential`). They need a way to ensure that documents with specific label values never appear in Glean search or other index-based features, without turning off the Google Drive connector entirely or managing large exception lists.

Glean reads Google Drive labels during crawling. Admins provide a list of Drive label selection choice IDs in the Google Drive connector configuration. When Glean crawls content, it excludes any document that has one of those selection IDs from crawling and indexing. Those documents do not appear in indexed Glean experiences.

## How it works[​](#how-it-works "Direct link to How it works")

1.  Google Drive labels carry sensitivity information
    
    Workspace admins define labels and label choices in Google Drive. For example, a `Sensitivity` label might have choices such as `Public`, `Internal`, `Confidential`, and `Highly confidential`.
    
2.  Glean crawls Drive labels
    
    When you enable label crawling in the Google Drive connector, Glean reads label metadata for each document during crawling. When you enable this option, Glean runs a full crawl so documents gain label metadata used by downstream features and rules.
    

Glean reads a document's labels as the document's owner. Drive labels have their own read permissions, separate from the document they mark. If the owner cannot view the label, Glean does not receive the label metadata, so Glean does not exclude the document even when its label choice identifier appears in the exclusion list. To make label-based exclusion reliable, make the label readable to everyone in your organization..

3.  Admins configure a label-based exclusion list in Glean
    
    In the Google Drive connector's **Manage data** view, under **Exclusion rules → Labels**, admins enter a comma-separated list of Drive label selection choice IDs they want to exclude (for example, the IDs for `Highly confidential`).
    
4.  Glean excludes matching documents from crawling and indexing
    
    When the connector crawls content, any document that has one of the configured label selection choice IDs is excluded by the connector's exclusion rules. Glean does not index those documents, and they do not appear in index-backed Glean experiences.
    
5.  Scope: crawling and indexing only
    
    These label-based exclusions apply only to crawling and indexing. The configuration does not change the connector's data fetching behavior.
    

At a high level: Google Drive labels define which documents are sensitive, and Glean respects that configuration by never indexing documents with the specified label choices.

## Requirements[​](#requirements "Direct link to Requirements")

### Google Workspace[​](#google-workspace "Direct link to Google Workspace")

-   Drive labels are set up and deployed in your organization. For example, you have a `Sensitivity` label with choices such as `Confidential` or `Highly confidential`.
-   Every user whose files you want to exclude can read the label. Glean reads labels as the file's owner, so any owner who cannot view the label prevents Glean from excluding their files.
-   You can use the Drive label admin interface to:
    -   Confirm label and label choice definitions.
    -   Look up selection choice IDs for specific label choices.

warning

Drive labels have their own read permissions, separate from the documents they mark. Glean reads a file's labels as the file's owner during crawling. If a file's owner cannot view the label, Glean never sees the label and does not exclude the file — even when its label choice identifier appears in the exclusion list, and even after a full crawl completes. To make label-based exclusion work across all files, make the label readable to everyone in your organization. Granting view access is sufficient. Crawling does not require permissions to apply or edit label values.

### Glean[​](#glean "Direct link to Glean")

-   A Google Drive connector is configured or ready to be configured in the Glean admin console.
-   The workspace feature flag is enabled. A Glean solutions engineer or account team member typically enables this flag.
-   The Google Drive connector is authorized with the Drive labels scope:
    -   `https://www.googleapis.com/auth/drive.admin.labels.readonly`
-   In the Google Drive connector setup:
    -   The **Drive labels** option is checked so that Glean can crawl Drive labels.

## Set up instructions[​](#set-up-instructions "Direct link to Set up instructions")

Perform the following steps to restrict Google Drive content from indexing and crawling using sensitivity labels:

### Step 1: Enable Drive label crawling in Glean[​](#step-1-enable-drive-label-crawling-in-glean "Direct link to Step 1: Enable Drive label crawling in Glean")

1.  In the Glean admin console, go to **Connectors** → **Google Drive**.
    
2.  In the Setup, check the **Drive labels** option. Make sure:
    
    -   The **Drive labels** option is checked so Glean can crawl Drive labels and use them for filters and facets.
    -   The labels scope `https://www.googleapis.com/auth/drive.admin.labels.readonly` is authorized on the Google side for the Glean client ID. You can follow the **Show setup instructions** link in the connector configuration if you need the exact steps.
    
3.  Click **Save**.
    

After you enable the Drive labels option, Glean runs a full crawl so documents get updated label metadata.

### Step 2: Identify label selection choice IDs in Google Drive[​](#step-2-identify-label-selection-choice-ids-in-google-drive "Direct link to Step 2: Identify label selection choice IDs in Google Drive")

Drive stores label choices as internal selection choice IDs. You must use these IDs, not the label display names, when you configure exclusions in Glean.

1.  Find the selection choice IDs for the label choices you want to exclude (for example, `Highly confidential`). Selection choice IDs are short alphanumeric strings such as `14062C758B` or `2494F0CD7C`. For the step-by-step retrieval method, see [Retrieve label IDs from Google Drive](/connectors/native/gdrive/retrieving-labels).
2.  Collect these selection choice IDs into a comma-separated list. You will use this list to configure the exclusion rules.

### Step 3: Configure label-based exclusions in the connector[​](#step-3-configure-label-based-exclusions-in-the-connector "Direct link to Step 3: Configure label-based exclusions in the connector")

1.  In the Glean admin console, go to **Connectors** → **Google Drive** → **Manage data (Optional)**.
    
2.  In the **Exclusion rules** section, scroll to **Labels**.
    
3.  In the input named **Enter a comma-separated list of label selection choice IDs**, paste your list of IDs. For example:
    
    -   `14062C758B, 2494F0CD7C`
    
4.  Select **Save** to apply your changes.
    

From this point onward:

-   Any Google Drive document that has any of these selection choice IDs in its labels is excluded from data crawling and indexing.
-   The connector uses the same exclusion engine it applies for folders, shared drives, or Google Groups.
-   These rules are optional and apply only to data crawling and indexing. Data fetching behavior does not change.

note

Exclusions take effect on the next full crawl of Google Drive. Applying a label to a file does not change the file's modified time, so incremental crawls may not re-fetch it. Changes to the exclusion list are applied as documents are crawled. A full crawl takes several days depending on your data volume. Matching documents are removed from the index as they are crawled.

### Step 4: Validate the configuration[​](#step-4-validate-the-configuration "Direct link to Step 4: Validate the configuration")

You can validate the setup with a small set of test documents. This step helps admins, solution architects, and security teams confirm that the configuration behaves as expected.

1.  In Google Drive, create test documents:
    -   At least one test file with a label choice that you configured as excluded.
    -   At least one similar test file that does not use an excluded label choice.
2.  Wait for the next crawl or trigger a crawl in the Glean admin console, depending on your environment and controls.
3.  In Glean:
    -   Search for unique text that appears in the redlisted test document.
    -   Search for unique text that appears in the non-redlisted test document.

You should observe the following:

-   The non-redlisted document appears in indexed search results and related index-based features.
-   The redlisted document does not appear in indexed search results or other features that use index-only Drive content.

If the redlisted document appears after the expected crawl and indexing time, use the troubleshooting steps below.

## FAQs[​](#faqs "Direct link to FAQs")

### Why do highly sensitive documents still appear in Glean?

If documents that you expect to exclude still appear in Glean, check these areas:

1.  Drive labels enabled in Glean In the Google Drive connector setup, confirm that the **Drive labels** option is checked and that you authorized the label scope to the Glean client ID.
2.  Correct selection choice IDs configured In **Exclusion rules → Labels**, verify that the IDs match the actual Drive label selection choice IDs, not just label display names.
3.  Crawl and indexing completed Confirm that a crawl has run since you:
    -   Enabled Drive labels.
    -   Modified the label selection choice IDs in the exclusion list.
    -   Changed labels on the document in Google Drive.

If the problem persists after a full crawl and indexing cycle, collect details such as the file, its labels in Drive, and recent crawl status, then contact support or your Glean representative.

### Why isn't a document excluded even though its label choice ID is in the exclusion list?

The most common cause is label read permission issues. Glean reads a file's labels as the file's owner, and Drive labels have their own read permissions, separate from the documents they mark. If the file's owner cannot view the label, Glean never receives the label metadata, so the file is not excluded even with a matching choice ID and a completed full crawl.

To fix this, make the label readable to everyone in your organization. View access is sufficient, and permissions to apply or edit label values is not required for crawling. After you update the label permissions, the exclusion applies on the next full crawl.

## See also[​](#see-also "Direct link to See also")

-   [Retrieve label IDs from Google Drive](/connectors/native/gdrive/retrieving-labels)
-   [Crawling restrictions](/connectors/native/gdrive/restrictions)
