---
url: "https://docs.glean.com/connectors/native/procore/about"
canonical: "https://docs.glean.com/connectors/native/procore/about"
title: "Procore overview"
description: "What the Procore connector indexes, its permission model, and how crawling keeps content fresh."
fetched_at: "2026-09-01T13:29:38.976Z"
---
On this page

Procore is an industry-leading construction project management platform that centralizes mission‑critical workflows such as RFIs, submittals, daily logs, drawings, and specifications across complex projects. The Glean Procore connector brings this data into Glean for permission‑aware search and AI assistance, so project teams, field staff, and back‑office users can quickly find the latest project status, RFIs, submittals, and logs without leaving Glean.

For an overview of the Procore connector and its benefits, see the [Procore integration page](https://www.glean.com/connectors/procore).

To connect, see [Setup](/connectors/native/procore/setup).

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The Procore connector indexes core construction data from the following Procore tools (objects).

### Projects[​](#projects "Direct link to Projects")

-   Title and project description
-   Address and location (country, state)
-   Project number and type
-   Stage, work scope, sector, and delivery method
-   Project value and roles
-   Created by, created at, and updated at metadata

### RFIs (Requests for Information)[​](#rfis-requests-for-information "Direct link to RFIs (Requests for Information)")

-   RFI number, subject, and project stage
-   Questions and answers
-   Status and due date
-   RFI manager and `ball in court`
-   Responsible contractor and distribution list
-   Location, specification reference, and cost code
-   Schedule impact, cost impact, and cost impact value
-   Created by, created at, updated at, and closed date
-   Assignees
-   Attachments

### Submittals[​](#submittals "Direct link to Submittals")

-   Submittal number, title, and description
-   Submittal type and submittal manager
-   Responsible contractor and `ball in court`
-   Specification section (label and description)
-   Final due date, due date, submit‑by date, issue date, received date
-   Required on site date, lead time, and any scheduled task references
-   Cost code and location
-   Approvers (response, type, user, comments, attachments)
-   Status and updated at metadata
-   Created by and created at
-   Attachments

### Specifications[​](#specifications "Direct link to Specifications")

-   Division
-   Set
-   Number and description
-   Issued date and received date
-   Revision and updated at metadata
-   Revision PDFs (with text extraction for search)

### Drawings (metadata)[​](#drawings-metadata "Direct link to Drawings (metadata)")

-   Drawing set
-   Drawing number and title
-   Discipline
-   Status and obsolete flag
-   Drawing date and received date
-   Revision number

> The connector indexes drawing metadata; drawing binaries themselves are not rendered in Glean. When Procore exposes drawing revision PDFs for Specifications, Glean extracts text content for search.

### Daily Logs[​](#daily-logs "Direct link to Daily Logs")

The connector indexes multiple Daily Log “sub‑tools,” including:

-   **Weather**: date, weather conditions (sky, precipitation, temperature, wind, ground), calamity notes, comments, vendor, status, attachments, created by and created at
-   **Manpower**: company, location, number of workers, total man hours, notes, status, attachments, created by and created at
-   **Notes**: comments, status, attachments, created by and created at
-   **Delivery**: delivery from, contents, delivery time, tracking number, status, updated at, attachments, created by and created at

### Attachments[​](#attachments "Direct link to Attachments")

The Procore connector indexes attachments for key objects where supported by the Procore APIs:

-   RFIs – attached documents and images
-   Submittals – attachments, including documents routed for approval
-   Daily Logs (Weather, Manpower, Notes, and Delivery) – attachments
-   Specification revisions – PDFs, with text content extracted for search

## Limitations[​](#limitations "Direct link to Limitations")

-   Only Procore content accessible via the configured Procore application and service account is indexed. If the service account cannot see a project or tool, that data will not appear in Glean.
-   Permissions are modeled primarily via Procore’s project‑centric permission templates and tool‑level permissions. Highly custom, non‑template permissions require an explicit admin choice during setup (see [Permissions and security](#permissions-and-security)).
-   Some Procore tools and objects — for example, certain change order or punch list workflows — are currently not supported.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

### How permissions are enforced[​](#how-permissions-are-enforced "Direct link to How permissions are enforced")

The Procore connector mirrors Procore’s own project‑centric permissions model as closely as possible:

-   **Project‑level permissions** – users see only the projects they can access in Procore.
-   **Tool‑level permissions** – visibility for RFIs, Submittals, Daily Logs, Specifications, and Drawings follows Procore tool permissions and permission templates.
-   **Template‑based permissions** – Procore permission templates assigned to users govern which tools and records Glean will surface for them. These are adhered to by default.
-   **Custom and non‑template permissions** – ad‑hoc, non‑template permission assignments can be honored by enabling the **Read access for custom permissions** toggle during setup, as described in [Setup](/connectors/native/procore/setup#2-configure-custom-permissions).

Glean evaluates permissions at query time so that users only see items they are allowed to access in Procore.

### Data access model[​](#data-access-model "Direct link to Data access model")

-   The connector uses Procore’s APIs with **read‑only** access, through the Developer Managed Service Account configured in your Procore Developer App.
-   Indexed content is stored within your organization’s Glean deployment; no connector data leaves your environment, and Glean enforces least‑privilege read access.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

The Procore connector uses a combination of periodic crawls and event‑driven updates (where supported by Procore’s APIs) to keep your index fresh.

### Full crawls[​](#full-crawls "Direct link to Full crawls")

-   A full crawl is run approximately **once every seven days** by default.
-   Full crawls re‑enumerate projects and all supported objects (RFIs, Submittals, Daily Logs, Specifications, Drawings) that are accessible to the service account.

### Incremental crawls[​](#incremental-crawls "Direct link to Incremental crawls")

-   Incremental crawls run approximately **every six hours**.
-   They fetch newly created or recently updated projects, RFIs, Submittals, Daily Logs, Specifications, and Drawings since the last incremental crawl.

## Use cases and example queries[​](#use-cases-and-example-queries "Direct link to Use cases and example queries")

Once enabled and crawls have completed, users can ask Glean natural‑language questions or perform keyword searches across Procore content. Example use cases include:

-   **Project staffing and membership**
    
    -   “Who are the project members of Hospital Tower?”
-   **Open RFIs and routing**
    
    -   “What are the due dates for open RFIs on the Hospital Tower project?”
    -   “Who is the responsible contractor for RFI 245?”
-   **Submittal tracking**
    
    -   “Show me open submittals for the Hospital Tower project.”
-   **Specifications and materials**
    
    -   “Construction‑related specifications for Hospital Tower.”
    -   “What are the composition and materials for the concrete mix design specifications in Hospital Tower?”
-   **General discovery and context**
    
    -   “Hospital Tower project”
    -   “Structured steel bolted RFI”
    -   “Flooring”
-   **Daily logs**
    
    -   “Daily logs Mon Nov 17”

Because Glean combines Procore with other enterprise sources (for example, Google Drive, Slack, and Jira), users can also ask cross‑system questions such as, “Show me all RFIs related to Hospital Tower that were mentioned in last week’s Slack discussions,” subject to permissions.
