---
url: "https://developers.glean.com/api-info/indexing/datasource/category"
canonical: "https://developers.glean.com/api-info/indexing/datasource/category"
title: "Category | Glean Developer"
description: "Choosing the appropriate type enables enhanced ranking. Please contact us if you"
fetched_at: "2026-09-01T13:22:50.558Z"
---
On this page

Choosing the appropriate type enables enhanced ranking. Please contact us if you are unsure of how to categorize your datasource. If a datasource has multiple objectTypes which belong to different categories (such as Zendesk articles and Zendesk tickets), please set each category using `objectDefinitions.docCategory`. The category definitions below still apply.

## Datasource Category[​](#datasource-category "Direct link to Datasource Category")

| Category Name | Description |
| --- | --- |
| KNOWLEDGE\_HUB | Reference documentation that may be continually updated as a source of truth, such as Github READMEs, Confluence documents, or ServiceNow knowledge articles |
| PUBLISHED\_CONTENT | Blog posts published at a point in time, such as Brightspot posts or Confluence blog posts. Note that Confluence blog posts are different from other Confluence documents, which should be classified as KNOWLEDGE\_HUB. |
| COLLABORATIVE\_CONTENT | Documents that can be edited collaboratively, such as Google Drive, Dropbox, or Figma files |
| QUESTION\_ANSWER | Question-answer content such as Stack Overflow posts |
| TICKETS | Work item or issue trackers such as Asana tasks, Jira tickets, or Github issues |
| CODE\_REPOSITORY | Source code repositories such as Github repositories |
| CHANGE\_MANAGEMENT | Code change management systems such as pull or merge requests on Github |
| EMAIL | Email content such as Gmail or Outlook messages |
| MESSAGING | Chat message or conversational content such as Slack or Discord messages |
| CRM | Customer relationship management systems such as Sales Cloud |
| SSO | Single-sign-on services such as Azure SSO or GSuite SSO |
| ATS | Applicant tracking systems such as Greenhouse |
| PEOPLE | This should not be used, please instead use the /bulkindexemployees API to upload data about employees |
| ENTITY | Custom entities — structured, key-value objects rather than text documents (such as knowledge cards or project profiles). Used with entity datasources (`isEntityDatasource` set to `true`). |
| CALENDAR | Calendar datasources. Please contact us for guidance before using this category. |
| AGENTS | Agent datasources. Please contact us for guidance before using this category. |
| EXTERNAL\_SHORTCUT | This should not be used; please contact us for guidance |
| UNCATEGORIZED | This should not be used; please contact us for guidance |
