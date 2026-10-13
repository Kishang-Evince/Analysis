---
url: "https://docs.glean.com/administration/protect/sensitive-findings/restrict-content-via-sensitivity-labels"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/restrict-content-via-sensitivity-labels"
title: "Restrict O365 content via sensitivity labels"
description: "Exclude SharePoint and OneDrive items from indexing based on their Microsoft Purview sensitivity labels"
fetched_at: "2026-10-13T08:49:29.972Z"
---
On this page

Glean Protect+

SharePoint and OneDrive users can assign sensitivity labels to drive items, and each label has an associated priority level. Administrators set these priority levels in Microsoft Purview to indicate how sensitive a document is. A higher priority level reflects greater sensitivity. This feature ensures that documents with redlisted sensitivity labels are not indexed and do not appear in Glean's search results (SERP).

note

To turn this feature on, contact your Glean account team. You can't configure this feature from the **Admin console**. Once approved by your account team, follow the steps in this document to collect the information Glean needs, then Glean configures the sensitivity-label redlist for your deployment.

## Key features[​](#key-features "Direct link to Key features")

1.  **Non-visible redlisted documents:** Documents with redlisted sensitivity labels are not visible in Glean experiences like Search and Chat.
2.  **Configurable redlist:** Glean configures which sensitivity labels are redlisted, and can apply a different redlist to SharePoint and OneDrive.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Grant permissions[​](#grant-permissions "Direct link to Grant permissions")

1.  Go to the Azure app setup page where you registered the service instance for SharePoint.
2.  Find the app connected to the existing SharePoint instance and add the `SensitivityLabels.Read.All` Graph API application permission.
3.  Grant admin consent.

### Find the priority number of each label[​](#find-the-priority-number-of-each-label "Direct link to Find the priority number of each label")

Glean identifies labels by priority number, so collect that number for every label you want to redlist.

1.  In the Microsoft Purview portal, go to **Information Protection → Labels**.
2.  Find each label you want to redlist and record the value in the **Priority** column. The least restrictive label shows `0 - lowest` and sits at the top of the list; the most restrictive label has the highest number and sits at the bottom.

For details about how Purview assigns and displays priority, see [Learn about sensitivity labels](https://learn.microsoft.com/en-us/purview/sensitivity-labels).

### Share the redlist with Glean[​](#share-the-redlist-with-glean "Direct link to Share the redlist with Glean")

Send your Glean account team the label name and priority number for every label you want to redlist, grouped by source. Glean configures SharePoint and OneDrive separately, so list each source even when the labels are the same. The label name lets Glean confirm that the configuration matches your intent.

For example:

-   SharePoint: Confidential (`3`), Highly Confidential (`4`)
-   OneDrive: Highly Confidential (`4`)

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Can the redlist be configured to include more labels?

Yes. Send the additional label names and priority numbers to your Glean account team, and Glean updates the configuration.

### What happens if label priorities change in Purview?

Glean matches the priority numbers in your configuration. If you reorder labels or assign new priority numbers in Purview, a priority number can point to a different label than it did before. Review the redlist with your Glean account team after you change label priorities.

### How quickly are sensitivity labels processed and updated?

On first setup, a full crawl must run and complete before Glean removes documents that are already indexed. Glean reads sensitivity labels during crawling, so earlier crawls did not collect them. On a large SharePoint or OneDrive corpus, this crawl can take several days.

After that crawl, Glean applies redlist and label changes as documents are crawled. Adding a priority number removes matching documents that Glean has already indexed. Removing a priority number, or changing a label on an individual document, applies after Glean crawls the affected documents again.

### Does this feature apply to Teams messages?

No. This feature applies to items that Glean crawls from SharePoint and OneDrive, including files stored in Teams channels. It does not apply to the text of Teams chat or channel messages.

### Does Glean index documents protected by Information Rights Management (IRM)?

No. This feature only redlists items that carry the sensitivity labels you configure. To discuss indexing documents encrypted with Information Rights Management (IRM), contact your Glean account team.
