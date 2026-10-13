---
url: "https://docs.glean.com/tools/connector/workday"
canonical: "https://docs.glean.com/tools/connector/workday"
title: "Workday tools"
description: "Use Workday tools in Glean to retrieve Workday information and submit time-off requests from Glean Assistant and agents."
fetched_at: "2026-10-13T08:50:49.821Z"
---
On this page

With Workday tools, you can retrieve Workday information and submit time-off requests from Glean Assistant and agents without switching to Workday.

Tools that call Workday send requests with the signed-in teammate's OAuth token. **Get Direct Reports** and direct-report relationship checks also use manager mappings stored by Glean from Workday people data. Those results can lag changes made in Workday.

The tools listed on this page belong to the **Workday Tools** pack. Availability varies by deployment configuration.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

The Workday Tools pack includes the following tools.

### Time off[​](#time-off "Direct link to Time off")

-   List Time Off Types: Retrieves the time-off types available to the signed-in teammate, including the Workday ID/GUID required by Request Time Off.
-   Request Time Off: Sends a time-off request for the signed-in teammate to Workday and reports the status or error Workday returns.

Because Request Time Off writes to Workday, review the request before submitting it. For more information, see [Human-in-the-loop confirmations for write tools](/tools/human-in-the-loop-experience-for-tools).

### Goals[​](#goals "Direct link to Goals")

-   Fetch Goals For Self: Retrieves the signed-in teammate's goals matching a required Workday goal category name.
-   Fetch Organization Goals For Self: Retrieves organization goals matching a required Workday goal-period ID.
-   Fetch Goals For Direct Report: Retrieves a direct report's goals matching a required Workday goal category name.
-   Fetch Organization Goals For Direct Report: Retrieves a direct report's organization goals matching a required Workday goal-period ID.

### Performance and feedback[​](#performance-and-feedback "Direct link to Performance and feedback")

-   Fetch Review Template: Retrieves metadata and question sections for the Workday review template ID supplied to the tool. It does not list template IDs or return other section types. Question text and category may be unavailable if the secondary Workday lookup fails.
-   Get Feedback on Self for Self: Retrieves self-requested feedback for the signed-in teammate with a request date on or after the required start date.
-   Get Feedback on Worker for Self: Retrieves feedback about the signed-in teammate with a request date on or after the required start date. Glean excludes events Workday marks confidential.
-   Get Feedback on Self for Direct Report: Retrieves self-requested feedback for a direct report with a request date on or after the required start date. The tool requires the direct report's Workday worker ID returned by **Get Direct Reports** and an available Glean direct-report mapping. Glean excludes events Workday marks private.
-   Get Feedback on Worker for Direct Report: Retrieves feedback about a direct report with a request date on or after the required start date. The tool requires the direct report's Workday worker ID returned by **Get Direct Reports** and an available Glean direct-report mapping.

### Reporting[​](#reporting "Direct link to Reporting")

-   Get Direct Reports: Retrieves the workers who report directly to the signed-in manager.

Direct-report tools verify the manager-to-worker relationship before returning data. Glean checks direct-report relationships using manager mappings built from Workday people data. These mappings can lag Workday changes. A removed relationship may continue to pass Glean's local direct-report check until the stored mapping expires. Workday separately evaluates the authorized account's access when the tool calls Workday.

### Time off request inputs[​](#time-off-request-inputs "Direct link to Time off request inputs")

Request Time Off requires the following information:

-   **Start date** and **end date**: The requested date range, in `YYYY-MM-DD` format. The start date cannot be later than the end date.
-   **Time-off type**: The Workday ID/GUID returned by List Time Off Types, not the display name or category label.
-   **Daily quantity**: The number of units requested per day. The unit depends on the time-off type configured in Workday. You can enter fractional values such as `0.5`, `1.5`, or `7.5`.
-   **Comment**: The reason for the request.

Use List Time Off Types before Request Time Off to retrieve the correct Workday ID/GUID for the signed-in teammate.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Workday tools support several common workflow patterns:

-   Time-off planning: Retrieve the available time-off types, then prepare and submit a request for the signed-in teammate.
-   Goal review: Retrieve personal or organization goals before a check-in or planning session.
-   Manager check-ins: Retrieve goals or feedback for a direct report after Glean checks the relationship using manager mappings built from Workday people data. These mappings can lag Workday changes. A removed relationship may continue to pass Glean's local direct-report check until the stored mapping expires. Workday separately evaluates the authorized account's access when the tool calls Workday.
-   Performance-review preparation: Retrieve a review template and the feedback available to the signed-in teammate.
-   Team reporting: List a manager's direct reports for use in a later workflow step.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring Workday tools, make sure that:

-   You can access the Glean **Admin console** and configure tools.
-   Your organization has a Workday connector whose people sync completes successfully.
-   Workday people data includes the worker IDs and manager relationships required by the tools you plan to use.
-   Each teammate who will use the tools resolves to an active Workday identity with a Workday worker ID.
-   Direct-report tools require an available Glean manager mapping.
-   A Workday administrator can register a Workday API client and configure the required Workday permissions.

For RaaS-based people ingestion, include both `managerEmployeeId` and `managerIsContingentWorker` columns if you use direct-report tools. For each worker with a manager ID, provide the contingent-worker value. Workers without a manager can leave both values empty.

### Administrator steps[​](#administrator-steps "Direct link to Administrator steps")

1.  In Glean, go to **Admin console → Platform → Tools**, then add **Workday Tools** from the template library.
2.  Link the tools to the existing Workday connector instance.
3.  Select **OAuth User** and copy the **Callback URL** displayed in the authentication section.
4.  In Workday, create the **Register API Client** entry with the callback URL, then copy the client credentials, Authorization Endpoint, and Token Endpoint.
5.  Return to Glean, enter the exact values and scopes, and click **Save**.
6.  Use **Edit settings** under **Enable tools** to make the pack available to the relevant users and supported Glean surfaces.

For detailed Workday permission, OAuth, and enablement instructions, see [Workday tools setup](/administration/tools/setup-tools/workday-tools-setup).

### User authorization[​](#user-authorization "Direct link to User authorization")

Each teammate connects Workday before using a tool that requires Workday access. When prompted, select **Connect** and authorize using that teammate's own Workday account. Workday evaluates requests using the security context of the account used during authorization.

For reconnection issues, see [Troubleshooting tools authentication](/troubleshooting/tools-authentication).

## FAQ[​](#faq "Direct link to FAQ")

### Do users need to connect their own Workday account?

Yes. Each teammate must authorize Workday using their own Workday account before first use. Workday evaluates requests using the security context of the account used during authorization.

### Can I enable only some Workday tools from the pack?

Yes. Admins can turn individual Workday tools on or off and control their availability in Chat, Agents, and for specific audiences.

### Why should an agent call List Time Off Types first?

Request Time Off requires the Workday ID/GUID for the time-off type, not its display name. List Time Off Types returns the available types and their IDs/GUIDs for the signed-in teammate.

### Why can't a direct-report tool find a worker?

Confirm that the Workday connector syncs resolvable worker and manager data. If direct-report mappings remain unavailable after the people crawl completes, contact Glean Support.

### What happens after an agent submits a time-off request?

Glean sends the request to Workday and reports the status or error Workday returns.

### Does Glean validate the requested time-off dates?

When date validation is enabled, Glean sends the requested dates to Workday's `validTimeOffDates` endpoint and uses returned dates that also include a default daily quantity. If that endpoint returns an error, Glean uses the original requested date range. Glean then sends the resulting request to Workday and reports the status or error Workday returns.

### Do Workday tools use the Workday connector credentials?

No. The connector uses an Integration System User to index Workday data. Workday tools use OAuth for the signed-in teammate and have a separate authentication configuration.

## See also[​](#see-also "Direct link to See also")

-   [Workday tools setup](/administration/tools/setup-tools/workday-tools-setup)
-   [Workday connector setup](/connectors/native/workday/)
-   [Sync people data from Workday](/administration/identity/people-data/configuration/people-data-workday)
-   [Tools overview](/administration/tools)
-   [Tools authentication troubleshooting](/troubleshooting/tools-authentication)
