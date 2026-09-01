---
url: "https://docs.glean.com/administration/protect/sensitive-findings/restrict-content-via-sensitivity-labels"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/restrict-content-via-sensitivity-labels"
title: "Restrict O365 content via sensitivity labels"
fetched_at: "2026-09-01T13:29:14.170Z"
---
On this page

Glean Protect+

SharePoint and OneDrive allow users to assign sensitivity labels to drive items, and each label has an associated priority level. These priority levels, which can be adjusted in Microsoft Purview, indicate the sensitivity of the document; a higher priority level reflects greater sensitivity. This feature ensures that documents with redlisted sensitivity labels are not indexed and do not appear in Glean's search results (SERP).

> This feature is currently not configurable from the Glean Admin Console. To enable it, contact your Glean account team or Solutions Engineer, who will configure the sensitivity-label redlist for your deployment using the steps in this document.

## Key features[​](#key-features "Direct link to Key features")

1.  **Non-visible redlisted documents:** Documents with redlisted sensitivity labels will not be visible in Glean experiences like Search and Chat.
2.  **Configurable redlist:** Admins can configure which sensitivity labels should be redlisted for SharePoint and OneDrive with help from Glean support engineer.

## How to enable this feature[​](#how-to-enable-this-feature "Direct link to How to enable this feature")

Reach out to Glean representative, who will enable this feature for your tenant.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Grant permissions[​](#grant-permissions "Direct link to Grant permissions")

1.  Go to the Azure app setup page where you registered service instance for SharePoint.
2.  Find the app connected to the existing sharepoint instance and add `SensitivityLabels.Read.All` graph API application permissions.
3.  Grant admin consent.

### Share redlist of sensitive labels with Glean[​](#share-redlist-of-sensitive-labels-with-glean "Direct link to Share redlist of sensitive labels with Glean")

1.  Share sensitivity label priority numbers which should be redlisted for each of SharePoint and OneDrive with Glean representative.

## FAQs[​](#faqs "Direct link to FAQs")

### Can the redlist be configured to include more labels?

Yes, admins can update the configuration with help of Glean support to include additional sensitivity labels.

### How quickly sensitivity are labels processed and updated?

Glean requires an initial full crawl to identify and clear existing documents that already have sensitivity labels applied. Once this initial crawl completes, Glean syncs all subsequent changes in real-time.

Redlisted sensitivity labels process quickly and do not require additional full crawls; these updates typically reflect within Glean search results within a few hours.

### Does Glean support reading IRM encrypted documents?

No, the current scope of is only to redlist items with configured sensitivity labels. If you are interested in indexing IRM encrypted documents then reach out to your CSM.
