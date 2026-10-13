---
url: "https://docs.glean.com/connectors/native/workfront/about"
canonical: "https://docs.glean.com/connectors/native/workfront/about"
title: "Adobe Workfront overview"
description: "What the Adobe Workfront connector indexes, its permission model, and how crawling keeps content fresh."
fetched_at: "2026-10-13T08:50:24.146Z"
---
On this page

Adobe Workfront is an enterprise work management platform that helps teams plan, execute, and deliver projects across marketing, IT, and other business functions. The Glean Adobe Workfront connector brings this data into Glean for permission-aware search and AI assistance, so teams can quickly find project details, track task status, review issues, and access documents without leaving Glean.

To connect, see [Setup](/connectors/native/workfront/setup).

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The Adobe Workfront connector indexes core work management data from the following object types.

### Projects[​](#projects "Direct link to Projects")

-   Project name, description, and status
-   Planned start and completion dates
-   Project owner and sponsor
-   Priority, condition, and completion percentage
-   Associated portfolio and program
-   Created by, created at, and updated at metadata

### Tasks[​](#tasks "Direct link to Tasks")

-   Task name, description, and status
-   Planned start and completion dates, duration
-   Assigned users and role assignments
-   Priority, completion percentage, and task number
-   Parent task hierarchy
-   Created by, created at, and updated at metadata

### Issues[​](#issues "Direct link to Issues")

-   Issue name, description, and status
-   Priority, severity, and entry date
-   Assigned users
-   Associated project and resolution object
-   Created by, created at, and updated at metadata

### Documents[​](#documents "Direct link to Documents")

-   Document name and description
-   Document versions (including version-specific metadata)
-   Document content (text extraction for search)
-   Associated object (project, task, or issue)
-   Created by, created at, and updated at metadata

### Portfolios[​](#portfolios "Direct link to Portfolios")

-   Portfolio name, description, and owner
-   Associated programs and projects
-   Created by, created at, and updated at metadata

### Programs[​](#programs "Direct link to Programs")

-   Program name, description, and owner
-   Associated portfolio and projects
-   Created by, created at, and updated at metadata

### Notes[​](#notes "Direct link to Notes")

-   Note text and author
-   Associated objects (projects, tasks, issues)
-   Indexed as comments on their parent objects

## Limitations[​](#limitations "Direct link to Limitations")

-   The connector indexes only the Adobe Workfront content accessible to the configured admin user. If the admin user cannot view a project or object, Glean cannot index that data.
-   The connector does not currently index some Adobe Workfront objects, including time-tracking entries, resource pools, and custom forms.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

### How permissions are enforced[​](#how-permissions-are-enforced "Direct link to How permissions are enforced")

The Adobe Workfront connector mirrors Adobe Workfront's permissions model at multiple levels:

-   **Access levels**: Glean maps each user's Adobe Workfront access level and license type to determine which object types they can view, including forbidden-action overrides.
-   **Object-level sharing**: The connector fetches per-object access rules (ACLs) for each supported entity type (user, group, team, role, and company).
-   **Inherited permissions**: Child objects such as tasks, issues, and documents inherit access rules from their parent projects and portfolios.
-   **Implicit role permissions**: Object owners, assignees, sponsors, and creators receive appropriate access automatically.
-   **Group and team membership**: Users inherit permissions based on their Adobe Workfront group and team memberships.

To support this model, the connector crawls Adobe Workfront identity objects (users, groups, teams, roles, and companies) and maps them to Glean's permission system.

Glean evaluates permissions at query time so that users see only items they can access.

### Data access model[​](#data-access-model "Direct link to Data access model")

-   The connector uses Adobe Workfront APIs with access scoped to the configured admin user.
-   Glean stores indexed content within your organization's deployment. No connector data leaves your environment.

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

The Adobe Workfront connector uses a combination of periodic crawls and event-driven updates to keep your index fresh.

### Full crawls[​](#full-crawls "Direct link to Full crawls")

-   Full crawls periodically re-enumerate all supported objects accessible to the admin user. The default schedule varies by scope and is configurable.
-   **Full and incremental**: Users, roles, companies, portfolios, programs, projects, tasks, issues, documents, and document versions support both full and incremental crawls.
-   **Full only**: Glean refreshes groups, teams, access-level privileges, notes, and permissions during full crawls only.

### Incremental crawls[​](#incremental-crawls "Direct link to Incremental crawls")

-   Incremental crawls fetch newly created or recently updated objects since the last crawl.
-   The connector also uses Adobe Workfront journal entries as a change feed to detect which objects changed and re-crawl them.

### Event subscriptions[​](#event-subscriptions "Direct link to Event subscriptions")

-   A configuration flag controls event subscriptions. To enable event subscriptions for your connector, contact [Glean Support](https://support.glean.com).
-   When enabled, the connector subscribes to create, update, and delete events for projects, tasks, issues, documents, document versions, portfolios, programs, and notes.
-   Glean receives events in near-real-time, reducing the delay between changes in Adobe Workfront and their appearance in search results.

## Use cases and example queries[​](#use-cases-and-example-queries "Direct link to Use cases and example queries")

Once enabled and crawls have completed, users can ask Glean natural-language questions or perform keyword searches across Adobe Workfront content. Example use cases include:

-   **Project status and details**
    
    -   "What is the status of the Q3 Marketing Campaign project?"
    -   "Show me all active projects in the IT portfolio."
-   **Task tracking**
    
    -   "What tasks are assigned to me in the Website Redesign project?"
    -   "What are the overdue tasks in the product launch?"
-   **Issue management**
    
    -   "Open issues in the Mobile App project."
    -   "Who is assigned to the login page bug?"
-   **Document search**
    
    -   "Find the brand guidelines document."
    -   "Latest version of the Q4 budget spreadsheet."
-   **Portfolio and program oversight**
    
    -   "What projects are in the Digital Transformation portfolio?"
    -   "Show me all programs under the Marketing portfolio."

Because Glean combines Adobe Workfront with other enterprise sources (for example, Google Drive, Slack, and Jira), users can also ask cross-system questions such as, "Show me all tasks related to the product launch that were discussed in Slack last week," subject to permissions.
