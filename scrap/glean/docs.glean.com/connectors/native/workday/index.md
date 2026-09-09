---
url: "https://docs.glean.com/connectors/native/workday/"
canonical: "https://docs.glean.com/connectors/native/workday/"
title: "Workday"
description: "Glean’s Workday connector enables you to index and search both people data and knowledge articles from your Workday instance. By integrating Workday with Glean, you can make HR org charts, employee profiles, and public help articles easily discoverable, supporting use cases like company directory lookups and policy searches. The connector supports both people data ingestion via custom reports and knowledge article indexing, with configuration options to control which data is included."
fetched_at: "2026-09-01T13:29:48.110Z"
---
On this page

Glean’s Workday connector enables you to index and search both people data and knowledge articles from your Workday instance. By integrating Workday with Glean, you can make HR org charts, employee profiles, and public help articles easily discoverable, supporting use cases like company directory lookups and policy searches. The connector supports both people data ingestion via custom reports and knowledge article indexing, with configuration options to control which data is included.

### Supported objects[​](#supported-objects "Direct link to Supported objects")

The Workday connector supports indexing two main types of content: people data (employee directory information) and knowledge articles (help articles). You can configure the connector to index either or both, depending on your needs.

| Object type | Description |
| --- | --- |
| People Data | Employee profiles, including name, email, job title, department, manager, photo, location, hire date, and phone number. No sensitive data such as salary is ingested. |
| Knowledge Articles | Public or audience-specific help articles, including content and metadata. |

## Setup the connector[​](#setup-the-connector "Direct link to Setup the connector")

1.  In [Glean Admin console](https://app.glean.com/admin/setup/apps), go to the **Connectors** → **Add connectors** and select the **Workday** connector.
    
2.  In the **Setup**, add a name and icon to your connector.
    
3.  In Glean, you need to provide the following details:
    
    -   Domain (host name)
    -   Tenant name
    -   Client ID
    -   Client secret
    -   Refresh token
    -   Custom reports API URL
    -   (Optional) Article audience IDs
4.  Follow the instructions in the [Workday Community article](https://community.workday.com/articles/6120#endpoint) to identify your Domain and Tenant name. Reference your service endpoint URL to extract these values. Here is an example service endpoint: `https://wd2-impl-services1.workday.com/ccx/service/tenant_name/Human_Resources/v44.0`
    
    In this example,
    
    -   **Domain:** `wd2-impl-services1.workday.com`
    -   **Tenant Name:** `tenant_name` (The segment directly following `/service/`)
5.  The Workday connector needs credentials of a Workday Integration System User to access the Workday Human Resources API. Perform the following steps to configure user accounts, permissions, and reports in Workday to enable the Glean connector.
    

### Phase 1: Integration User and Security Group setup[​](#phase-1-integration-user-and-security-group-setup "Direct link to Phase 1: Integration User and Security Group setup")

This phase creates the non-UI user account and security group required for Glean to log in and access data programmatically.

#### Step 1: Create Integration System User (ISU)[​](#step-1-create-integration-system-user-isu "Direct link to Step 1: Create Integration System User (ISU)")

1.  Sign in to Workday with an admin account. Search for and select the **Create Integration System User** task.
2.  Enter a username and password for the new ISU.
3.  **Uncheck** **Require New Password at Next Sign In** (the user is programmatic).
4.  Set **Session Timeout Minutes** to `0` to prevent early session termination.
5.  Check **Do Not Allow UI Sessions** for added security.

#### Step 2: Create and configure security group[​](#step-2-create-and-configure-security-group "Direct link to Step 2: Create and configure security group")

Create an Integration System Security Group and assign the user created in Step 1.

1.  Search for and select the **Create Security Group** task.
2.  Select **Integration System Security Group (Unconstrained)** from the **Type of Tenanted Security Group** dropdown.
3.  Add the new Integration System User to the Security Group's members.
4.  Click **Done**.

### Phase 2: Configure permissions and activate policies[​](#phase-2-configure-permissions-and-activate-policies "Direct link to Phase 2: Configure permissions and activate policies")

This phase grants the security group access to the necessary data domains and activates all policy changes.

#### Step 3: Grant domain security permissions[​](#step-3-grant-domain-security-permissions "Direct link to Step 3: Grant domain security permissions")

Grant the security group permission to read essential worker and knowledge base data.

1.  In the Workday app, search for **Security Group Membership and Access** and run the report.
    
2.  Search for and select the Security Group created in Step 2.
    
3.  Click the three dots (…), then select **Security Group → Maintain Domain Permissions for Security Group**.
    
4.  Under **Integration Permissions**, add the following domains and select **Permitting Get access** for each:
    
    | **Data domain (Required)** | **Data domain (If indexing photos / knowledge base)** |
    | --- | --- |
    | Worker Data: Workers | **Person Data: Personal Photo** (For photos) |
    | Worker Data: Current Staffing Information | **Help Article REST API** (For knowledge base articles) |
    
5.  Click **OK** and **Done** to save the changes.
    

#### Step 4: Activate security policy changes[​](#step-4-activate-security-policy-changes "Direct link to Step 4: Activate security policy changes")

1.  Search for and select the **Activate Pending Security Policy Changes** task.
2.  Describe your changes in the **Comment** field for auditing purposes, and click **OK**.
3.  On the next screen, check the **Confirm** box and click **OK**.

### Phase 3: Create API client and reports[​](#phase-3-create-api-client-and-reports "Direct link to Phase 3: Create API client and reports")

This phase generates the credentials and creates the custom report required for data ingestion.

#### Step 5: Create API client and refresh token[​](#step-5-create-api-client-and-refresh-token "Direct link to Step 5: Create API client and refresh token")

Create an API client for the ISU and generate the required refresh token.

1.  In the Workday app, search for and select the **Register API Client for Integrations** task.
2.  Enter **Glean Api Client** in the **Client Name** field.
3.  Under **Scopes (Functional Areas)**, select **Tenant Non-Configurable** and **Personal Data**.
    -   *If indexing Knowledge Base Articles, also select the **Help** scope.*
4.  Click **OK**. Save the displayed **Client ID** and **Client Secret** securely. These values you need to enter in the Glean Admin console.
5.  Click the three dots (…) next to the new API client name, then select **API Client > Manage Refresh Tokens for Integration**.
6.  Select the Integration System User created in Step 1, and click **Generate New Refresh Token**. Save this **Refresh Token** securely. You need to enter this value in the Glean Admin console.

#### Step 6: Create custom report for workers[​](#step-6-create-custom-report-for-workers "Direct link to Step 6: Create custom report for workers")

This step creates the report used to pull worker data, groups, and positions.

**Prerequisite:** Complete Step 4 before creating this report.

1.  Search for and select the **Create Custom Report** task.
    
2.  Fill the **Report Form**:
    
    -   **Report Name:** `Glean Get Workers`
    -   **Report Type:** `Advanced`
    -   Check **Enable as Web Service**
    -   **Connector:** `All Workers`
3.  **Add all required columns** and ensure the **Column Heading Override XML Alias** exactly matches the schema provided by Glean (refer to the documentation's alias table).
    
    Warning : Workday will show an alert if an alias is longer than 16 characters. Use a shorter alias if you see that warning.  
    You can copy the names from the table below to add the columns in the report. The “Column Heading Override XML Alias” is used to map the fields to the Glean People Data Schema. The “Format” and “Options” can be left empty.
    
    | **Business object** | **Field** | **Column heading override XML alias** | **Required** |
    | --- | --- | --- | --- |
    | Worker | Employee ID | id | Yes |
    | Worker | Workday ID | workdayId | Yes |
    | Worker | Employee Type | employeeType | No |
    | Worker | Hire Date | hireDate | No |
    | Worker | Public Primary Work Phone | phone | No |
    | Worker | Worker is Contingent Worker | isContingentWorker | Yes |
    | Worker | Cost Center - Name | department | No |
    | Worker | Location | location | No |
    | Preferred Name | First Name | preferredFirstName | Yes |
    | Preferred Name | Last Name | preferredLastName | Yes |
    | Preferred Name | Name in General Display Format | formattedName | Yes |
    | Public Email Addresses | Email Address | address | Yes |
    | Public Email Addresses | Is Primary Work | isPrimary | Yes |
    | Public Primary Work Address | Address - Formatted Line 1 | formattedAddress | No |
    | Public Primary Work Address | Postal Code | postalCode | No |
    | Public Primary Work Address | Country Region | countryRegion | No |
    | Public Primary Work Address | City | city | No |
    | Public Primary Work Address | Two-Digit Country ISO Code | countryCode | No |
    | Worker Primary Position | Business Title | jobTitle | No |
    | Manager - Level 01 | Employee ID | managerEmployeeId | No |
    | Manager - Level 01 | Worker is Contingent Worker | managerIsContingentWorker | No |
    
    important
    
    The `managerEmployeeId` and `managerIsContingentWorker` fields must be provided as a pair; both must either be present or absent for each worker in the report. If `managerEmployeeId` is provided without `managerIsContingentWorker`, the manager relationship may fail to resolve (for example, contingent-worker managers will not be correctly matched).
    
    note
    
    While only some of the above fields are mandatory to add the user in Glean, not including the remaining fields can impact the quality of the search results in Glean. It is recommended to include all the fields.
    
    You might also need to add **Group Column Headings**, these heading strings should be non empty. You can copy the names from the table below to add the columns in the report.
    
    | **Business object** | **Group column heading** | **Group column heading XML alias** |
    | --- | --- | --- |
    | Manager - Level 01 |  | managerGroup |
    | Preferred Name | Name | preferredNameData |
    | Public Email Addresses |  | workEmails |
    | Public Primary Work Address |  | publicPrimaryWorkAddressGroup |
    | Worker Primary Position |  | workerPrimaryPosition |
    
4.  In the **Filter** tab, configure date-based filters using "Hire Date" for pagination and the "Active Status" field to filter for active users.
    
5.  In the **Share** tab, share the report with the Integration System User created in Step 1 by adding the user to **Authorized Users**.
    

#### Step 7: Fetch custom report API URL[​](#step-7-fetch-custom-report-api-url "Direct link to Step 7: Fetch custom report API URL")

1.  Search for and select the **View Custom Report** task.
2.  Type the report name (`Glean Get Workers`), and click **OK**.
3.  Click the three dots (…) next to the report, then select **Web Service > View URLs**.
4.  Leave the start and end date empty, and click **OK**.
5.  Scroll to the bottom of the page, right-click on **JSON**, and select **Copy URL** to save the JSON API link.

#### Step 8: Fetch article audience IDs (If indexing knowledge base)[​](#step-8-fetch-article-audience-ids-if-indexing-knowledge-base "Direct link to Step 8: Fetch article audience IDs (If indexing knowledge base)")

1.  Search for and select the **View Article Audience** task.
2.  Select the desired audience (linked to help articles).
3.  Click the three dots (…) next to the audience, then select **Integration IDs > View IDs**.
4.  Copy the **Workday ID** from the new page.

### Final step: Configure the Glean connector[​](#final-step-configure-the-glean-connector "Direct link to Final step: Configure the Glean connector")

Open the Glean Workday setup page and enter the following collected information:

-   **Client ID, Client Secret, and Refresh Token** (from Step 5)
-   **Custom Reports API URL** (The JSON link from Step 7)
-   **Article Audience IDs** (The comma-separated list of IDs from Step 8)

## Use cases[​](#use-cases "Direct link to Use cases")

-   **Searchable Articles:** Users can search and access Workday Help articles directly from Glean.
-   **Direct Navigation:** Relevant articles appear in Glean search results with a direct link to the original article in Workday.
    -   Example search query: "Leave policy for remote employees"
-   **Natural Language Queries:** Glean can understand natural language questions and extract answers from relevant Workday articles. Sample queries include:
    -   "What are the clauses around reimbursement for business travel if I am travelling to LATAM countries?"
    -   "How do I submit a PTO request?", "What's the process for expense reimbursement?"

## Workday tools[​](#workday-tools "Direct link to Workday tools")

In addition to indexing Workday content, Glean provides tools that let teammates take actions in Workday directly from Glean Assistant and agents. A Glean admin must enable the Workday tools in the **admin console** before teammates can access them.

### Request Time Off[​](#request-time-off "Direct link to Request Time Off")

The Request Time Off tool submits a time-off request to Workday on behalf of the teammate. The tool collects the following information:

-   **Start date** and **end date** - the date range for the request, in `YYYY-MM-DD` format.
-   **Time-off type** - the leave category, for example PTO, sick leave, or personal day.
-   **Daily quantity** - the number of units of time off requested per day. The unit can be hours or days, depending on the time-off type configured in Workday. Values such as `0.5`, `1.5`, or `7.5` are supported, so employees can request partial-day time off.
-   **Comment** - the reason for the time-off request.

note

The Request Time Off tool works with the List Time Off Types tool, which retrieves the time-off types available to the teammate. Agents typically call List Time Off Types first to identify the correct type, then pass it to Request Time Off.

## Enable Knowledge article specific audience indexing[​](#enable-knowledge-article-specific-audience-indexing "Direct link to Enable Knowledge article specific audience indexing")

Optionally, you can index Knowledge articles visible to audiences you define into Glean. Perform the following steps to index these Knowledge articles:

1.  Select the **Crawl articles** checkbox.
2.  When selected, a text entry field appears.
3.  If you have not already, select the **Show setup instructions** of the connector's setup page.
4.  Follow step **8\. Fetch Article Audience Ids** of the setup instructions to fetch `audience_id` of public audience

Help articles which are visible to audiences defined by `audience_id` will be indexed.

warning

The articles with access to these `audience_id`s **will be visible to all the glean users** in your organization. Ensure `audience_id` for non-public audiences are not entered into setup. Only add `audience_id` for “Public” access policy. Please contact your account manager if public articles account for less than 50% of all your articles.

## Add Workday as people connector[​](#add-workday-as-people-connector "Direct link to Add Workday as people connector")

1.  In the Glean **Admin console**, navigate to **Settings** and select **People data**.
2.  Click **Manage connector**.
3.  Select Workday as the connector to sync people data from.
