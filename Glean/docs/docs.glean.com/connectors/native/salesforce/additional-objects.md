---
url: "https://docs.glean.com/connectors/native/salesforce/additional-objects"
canonical: "https://docs.glean.com/connectors/native/salesforce/additional-objects"
title: "Additional objects concepts"
description: "Learn how Glean indexes additional Salesforce objects, custom fields, and EmailMessage comments"
fetched_at: "2026-10-13T08:50:12.890Z"
---
On this page

Glean has the ability to crawl additional native objects which are not crawled by default and custom Salesforce objects, which can be set in the **Admin console** under the Salesforce connector and object tab. Glean requires the object name, permission model, and mapping of fields for Title and Owner and optional filters.

-   If adding a new native object, the integration account configured to use Salesforce must either be a full administrator or be configured with the following permissions (either the Profile or the User under Setup)
    -   Object Permissions for the new native object – view all + read access to all fields

## Index emails as comments[​](#index-emails-as-comments "Direct link to Index emails as comments")

Configure every parent object whose `EmailMessage` records you want Glean to crawl. If you configure `Case`, Glean automatically schedules the `EmailMessage` crawl. Salesforce creates `EmailMessage` records for non-Case parents only when your Salesforce org uses [Enhanced Email](https://help.salesforce.com/s/articleView?id=sf.emailadmin_enhanced_email_considerations.htm&language=en_US&type=5). If you want emails from non-Case parents and your connector does not include `Case`, add `EmailMessage` as an additional native object. Glean stores each email as a comment on its parent record, not as a separate search result.

Glean resolves the parent record based on the Salesforce relationship fields:

-   For Cases, Glean uses `ParentId`
-   For other records, Glean uses `RelatedToId` and `RelatedTo.Type`

Glean skips an `EmailMessage` record when it has no parent ID, has no parent type, or points to a parent object that the connector does not crawl.

## Schema[​](#schema "Direct link to Schema")

Glean requires the field names of the Salesforce API, which will be utilized to populate document metadata and present it on the Glean user interface. The field name for the Native or Custom Object is found in the **Field Name** column under **Field & Relationships**.

Custom objects typically conclude with **the suffix \_\_c**. Below is an example of Salesforce API field names associated with one of our test custom objects.

## Document title[​](#document-title "Direct link to Document title")

The **Field Name** will populate the title for the documents seen on Glean under search results.

## Document owner[​](#document-owner "Direct link to Document owner")

By default, it is the `OwnerID`.

## Custom facets[​](#custom-facets "Direct link to Custom facets")

As an option, provide all the fields that are wanted as a facet (a way to filter a search) and/or as an indexable field

-   Indexable fields types:
    -   Textarea
    -   String
    -   Email
    -   Picklist
    -   multipicklist

**Notes:**

-   All salesforce API fields that are specified as custom properties with type "indexable field types" will be searchable within Glean
-   Indexable fields are the ones whose content is searchable on Glean
-   Types are inferred from the Salesforce object schema. Each native object has a predefined type, and for each custom object, you specify the type while setting it up
-   Glean adds configured fields as facets. The facet representation depends on the Salesforce field type.
