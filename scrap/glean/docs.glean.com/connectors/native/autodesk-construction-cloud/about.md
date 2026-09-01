---
url: "https://docs.glean.com/connectors/native/autodesk-construction-cloud/about"
canonical: "https://docs.glean.com/connectors/native/autodesk-construction-cloud/about"
title: "Autodesk Construction Cloud (ACC)"
description: "What the ACC connector indexes, its permission and visibility model, and how crawling keeps content fresh."
fetched_at: "2026-09-01T13:29:22.592Z"
---
On this page

Autodesk Construction Cloud (ACC) helps teams manage construction project information such as RFIs, issues, submittals, sheets, and related project content. The Glean Autodesk Construction Cloud connector brings this content into Glean so users can find project knowledge in search and use it in Assistant.

note

A Glean admin must configure this connector. End users can search ACC content in Glean after setup is complete and the initial crawl finishes.

To connect, see [Setup](/connectors/native/autodesk-construction-cloud/setup).

## What the connector indexes[​](#what-the-connector-indexes "Direct link to What the connector indexes")

The Autodesk Construction Cloud connector indexes content from the ACC account that you connect to Glean.

### Supported search content[​](#supported-search-content "Direct link to Supported search content")

**Projects**

-   Project name, number, and description
-   Project metadata such as status, type, phase, value, and dates
-   Project location details
-   Created and updated timestamps

**RFIs**

-   RFI number, title, and discipline
-   Status, priority, and category
-   Question, suggested answer, and official response
-   Comments and participants
-   Dates, impact fields, and location details
-   Attachments
-   Created, updated, and closed metadata

**Issues**

-   Issue ID, title, and status
-   Type, subtype, and root cause category
-   Description, response, and comments
-   Dates, location, and assignment details
-   Custom attributes
-   Linked documents
-   Created, updated, opened, and closed metadata

**Submittals**

-   Submittal number, title, and description
-   Status, state, priority, and specification details
-   Workflow and response fields
-   Due dates and schedule-related dates
-   Assignment and participant details
-   Custom attributes
-   Attachments
-   Created and updated metadata

**Sheets**

-   Sheet number and title
-   PDF content for full-text search
-   Tags and timestamps

note

Only published sheets are indexed.

### Attachments[​](#attachments "Direct link to Attachments")

The connector indexes supported attachments for RFIs, issues, submittals, and published sheets when Autodesk APIs make that content available to Glean.

### Identity and permissions data[​](#identity-and-permissions-data "Direct link to Identity and permissions data")

The connector also crawls project member information that Glean uses to build permissions and group membership for ACC content. This data supports access control, but project members are not indexed as standalone search documents.

### Limitations[​](#limitations "Direct link to Limitations")

The following ACC objects are not indexed:

-   Schedule
-   Meetings
-   Specifications
-   Companies
-   Draft sheets

## Authentication and permissions[​](#authentication-and-permissions "Direct link to Authentication and permissions")

Glean uses Autodesk OAuth to connect to ACC. The connector uses admin-granted access for the connected ACC account.

### Setup permissions[​](#setup-permissions "Direct link to Setup permissions")

You must have permissions to:

-   Authorize Autodesk access for the target ACC account
-   Add or configure connectors in Glean

### Access model[​](#access-model "Direct link to Access model")

Glean respects source permissions so users see only the ACC content that they are allowed to access.

At a high level, visibility depends on these layers:

-   ACC account access
-   Project membership
-   Product access such as Build or Docs
-   Object-level permissions in ACC

### Important visibility notes[​](#important-visibility-notes "Direct link to Important visibility notes")

-   Issues use a conservative visibility model. In practice, project admins and users, companies, or roles directly associated with an issue are the most reliable audience for that issue in Glean.
-   Submittal visibility expands as the workflow progresses. The connector automatically grants access to any user listed in the submittal’s activity history or assigned to the following fields:
    -   Manager or Subcontractor
    -   Watcher
    -   Workflow-Step assignee
    -   Ball-in-Court

As these fields populate throughout the submittal's lifecycle, visibility automatically extends to those users.

-   Access to closed submittals is configurable per deployment. By default, visibility is restricted to Project Admins, tool\-level Submittal Managers, and submittal's directly involved participants.
-   Only published sheets are indexed in this release.
-   Visibility for Draft RFIs is restricted to the RFI creator and the current Ball in Court assignee. Additionally, Glean can only crawl Draft RFIs that are visible to the Autodesk project admin.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

After you save the connector, Glean runs an initial crawl. After that, Glean continues to recrawl the source to keep indexed content fresh.

Freshness can vary by object type because Autodesk APIs do not support the same update pattern for every object.

In general:

-   RFIs and issues support more efficient update checks.
-   Some object types may require broader recrawls.
-   Published sheets may take longer to reflect updates than other indexed objects.
-   Glean respects Autodesk API rate limits and backs off automatically when needed.

Deleted or stale content is removed from Glean as part of the crawl lifecycle.
