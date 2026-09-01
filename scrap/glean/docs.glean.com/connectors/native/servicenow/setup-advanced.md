---
url: "https://docs.glean.com/connectors/native/servicenow/setup-advanced"
canonical: "https://docs.glean.com/connectors/native/servicenow/setup-advanced"
title: "ServiceNow: Advanced setup"
description: "Learn how to set up the ServiceNow connector using Advanced setup steps."
fetched_at: "2026-09-01T13:29:40.347Z"
---
On this page

Use these steps if you require support for advanced user criteria or need to start the crawl in Proof of Concept (PoC) mode.

## Prerequisites and scope[​](#prerequisites-and-scope "Direct link to Prerequisites and scope")

-   **Required role:** The user setting up the connector must be a **ServiceNow Admin**.
-   **Custom configurations:** Glean supports additional configurations for **custom ServiceNow URLs** and **custom Knowledge Article templates**. If applicable, contact **Glean Support** to set these up after completing the steps below.

### Indexed content and permissions[​](#indexed-content-and-permissions "Direct link to Indexed content and permissions")

Glean indexes content from the following tables and doctypes in ServiceNow. Which types are indexed depends on the roles you grant and the selections you make in the final step (see [Enter details in Glean Admin Console](#enter-details-in-glean-admin-console)).

| Object type | ServiceNow table/scope |
| --- | --- |
| **ITSM Incidents** | incident table |
| **APM Business Applications** | `cmdb_ci_business_app table` |
| **SPM Entities** (Demands, Epics, Projects) | `dmn_demand`, `rm_epic, pm_project tables` |
| **Knowledge Articles** |  |
| **Service Catalog Items** |  |
| **News Articles** (Content Publishing application) |  |
| **Portal Content** (Content Publishing application) |  |
| **Quick Links** (Employee Center application) | `sn_ex_sp_quick_link` |
| **External Links** (Employee Center application) | `sn_ex_sp_external_link` |

-   **Default document types:** Knowledge Articles and Service Catalog items are indexed as part of the standard setup. News Articles, Portal Content, Quick Links, and External Links are selected by default. In the final step ([Enter details in Glean Admin Console](#enter-details-in-glean-admin-console)) you can deselect any you don't want Glean to index, or select only a custom subset. News Articles and Portal Content additionally require the ServiceNow Content Publishing application and the ACL setup in step 5. ITSM incidents, APM Business Applications, and SPM demands, epics, and projects are indexed only if you add the corresponding roles in step 3.
    
-   **Permissioning:** Glean supports **simple permissioning** for the ITSM, APM, and SPM object types listed above. Users with specific roles are granted access to all documents. If you require a customized role, reach out to **Glean Support**.
    

### Setup requirements[​](#setup-requirements "Direct link to Setup requirements")

-   **POC mode:** To start the crawl in POC mode, contact [Glean Support](https://support.glean.com).
-   **API configuration:** This setup requires you to implement a scripted REST API in ServiceNow.
-   **Service account:** The ServiceNow administrator must create a dedicated ServiceNow user with access limited only to the doctypes listed above.
-   **Administrator tool:** All steps in this advanced setup process must be performed by a **ServiceNow administrator**. If you have any questions during setup, contact **Glean Support**.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Perform the following steps to connect your ServiceNow instance with Glean:

1.  In Glean **Admin Console** go to **Connectors**.
2.  Click **Add connector** and select **ServiceNow**.
3.  Enter a name for your connector.
4.  Select **Advanced** in the **Select if you want to support advanced user criteria (also select advanced if you want to start crawl in POC mode)** step.

Perform the following steps in ServiceNow:

### 1\. Create an ACL to be used for the REST API[​](#1-create-an-acl-to-be-used-for-the-rest-api "Direct link to 1. Create an ACL to be used for the REST API")

1.  Elevate role to get `security_admin` role (this is found on the "System Administrator" header banner). Note that by default this is only set for the user account whose name is `admin`.
2.  Navigate to **Access Control (ACL)**, and create a new ACL with the following properties:
    -   Set type=`Rest_endpoint`
    -   Set protection policy=`Read only` (if possible)
    -   Set Name=`GleanSearch`
    -   Set Role=`knowledge_admin`, `catalog_admin`, `itil` (only if you want to index ITSM incidents as well)
    -   Set operation=`execute`

### 2\. Configure the body of the REST API[​](#2-configure-the-body-of-the-rest-api "Direct link to 2. Configure the body of the REST API")

The REST API provides the user criteria information for a given user.

1.  Navigate to **Scripted REST APIs**.
2.  Create a new API called `GleanSearch` and API ID `gleansearch`.
3.  Set Protection=`Read only`.
4.  Remove the existing default ACL and add the `GleanSearch` ACL as the default ACL.
5.  Create a new REST endpoint with the following settings:
    -   Name=`GetUserCriteria`
    -   HTTP method=`GET`
    -   Relative path=`/user_criteria`
    -   Protection policy=`Read only`
    -   Ensure **Requires Authentication** and **Requires Authorization** are checked
    -   Remove the default **Scripted REST external default** and set `GleanSearch`
    -   Verify that the resource path is `/api/<API_NAMESPACE>/gleansearch/user_criteria` (enter the **API namespace** value in the corresponding field).
6.  Add the following as the script:

```
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {    var queryParams = request.queryParams;    var userID = new String(queryParams.user);    return new sn_uc.UserCriteriaLoader.getAllUserCriteria(userID);})(request, response);
```

### 3\. Create a service account[​](#3-create-a-service-account "Direct link to 3. Create a service account")

Glean uses this account to fetch information from ServiceNow.

1.  Navigate to **Organization** → **Users** and click **New**.
2.  Set **User ID** to `gleansearch`.
3.  Set **Time zone** to `GMT`. This is required for new content updates to be picked up by Glean.
4.  Set **Email** to a valid company email address on a domain registered with your Glean deployment. Glean uses this email during OAuth authorization. If the service account does not have an email address, or if the email domain is not recognized, authorization can fail.
5.  Leave the remaining fields as-is. Click **Submit**.
6.  Open the `gleansearch` user you created.
7.  Click **Set Password** and choose a strong password.
8.  Click **Roles → Edit...** and add the following roles:
    -   `knowledge_admin`
    -   `user_criteria_admin`
    -   `user_admin`
    -   `catalog_admin`
    -   `snc_read_only`
9.  Only if it exists in your instance, also add:
    -   `snc_internal`
10.  If you want to index ITSM incidents as well, also add:
     -   `itil`
11.  If you want to index APM Business Applications, also add:
     -   `sn_apm.apm_user`
12.  If you want to index SPM documents (demands, projects, and epics), also add:
     -   `it_demand_user`
     -   `it_project_user`
     -   `scrum_user`
     -   `safe_scrum_user`
13.  If you have HR content in a non-global scope (for example, **Human Resources: Core** application scope), also add:
     -   `sn_hr_core.admin`
14.  If you want to index News Articles or Portal Content from [Content Publishing](https://www.servicenow.com/docs/bundle/yokohama-employee-service-management/page/product/employee-center/concept/ec-publish-content.html), add one of:
     -   `sn_cd.content_admin` (full administrative access to Content Publishing)
     -   `sn_cd.content_manager` (management access to Content Publishing)

**Glean accesses only the following tables**:

-   sys\_user
-   sys\_user\_has\_role
-   sys\_user\_group
-   sys\_user\_grmember
-   user\_criteria
-   kb\_knowledge
-   kb\_knowledge\_base
-   kb\_uc\_can\_read\_mtom
-   kb\_uc\_cannot\_read\_mtom
-   kb\_uc\_can\_contribute\_mtom
-   kb\_uc\_cannot\_contribute\_mtom
-   kb\_category
-   kb\_use
-   sc\_cat\_item
-   sc\_cat\_item\_user\_criteria\_mtom
-   sc\_cat\_item\_user\_criteria\_no\_mtom
-   sc\_category
-   sc\_catalog
-   sys\_audit\_delete (if provided access)
-   incident (if enabled)
-   cmdb\_ci\_business\_app (if enabled)
-   dmn\_demand (if enabled)
-   pm\_project (if enabled)
-   rm\_epic (if enabled)
-   sn\_cd\_audience (if enabled)
-   sn\_cd\_news\_article (if enabled)
-   sn\_cd\_content\_portal (if enabled)
-   sn\_cd\_content\_visibility (if enabled)
-   sn\_ex\_sp\_quick\_link (if enabled)
-   sn\_ex\_sp\_quick\_link\_user\_criteria\_mtom (if enabled)
-   sn\_ex\_sp\_external\_link (if enabled)
-   sn\_ex\_sp\_ext\_link\_user\_criteria\_mtom (if enabled)
-   sn\_ex\_sp\_ext\_link\_user\_criteria\_no\_mtom (if enabled)

### 4\. Provide access to `sys_audit_delete` table[​](#4-provide-access-to-sys_audit_delete-table "Direct link to 4-provide-access-to-sys_audit_delete-table")

This helps in faster updates to document permissions when identity data changes.

1.  Create a new role `read_access_sys_audit_delete`:
    -   Navigate to **User Administration → Roles**.
    -   Click **New** and enter the name `read_access_sys_audit_delete`.
    -   Save.
2.  Add an ACL rule that gives this role read access to the `sys_audit_delete` table:
    -   [Elevate](https://developer.servicenow.com/dev.do#!/learn/learning-plans/vancouver/citizen_developer/app_store_learnv2_aescreateappfromscratch_vancouver_elevating_privileges) to `security_admin` so you can create a new ACL.
    -   Navigate to **System Security → Access Control (ACL)**.
    -   Click **New** and enter the following:
        -   Type: `record`
        -   Operation: `read`
        -   Name: select the `sys_audit_delete` table
        -   Under **Requires role**, add `read_access_sys_audit_delete`
        -   Submit.
3.  Assign the role `read_access_sys_audit_delete` to the `gleansearch` user.

### 5\. Configure ACLs for News Articles or Portal Content (Content Publishing)[​](#5-configure-acls-for-news-articles-or-portal-content-content-publishing "Direct link to 5. Configure ACLs for News Articles or Portal Content (Content Publishing)")

This step is required only if you intend to index documents from the Content Publishing application. Access to these articles is controlled via audiences specified on each article. To enable Glean to access documents from the Content Publishing application, you need to create two new ACL rules:

#### 1\. Create a Table ACL for the News Article table[​](#1-create-a-table-acl-for-the-news-article-table "Direct link to 1. Create a Table ACL for the News Article table")

1.  [Elevate](https://developer.servicenow.com/dev.do#!/learn/learning-plans/vancouver/citizen_developer/app_store_learnv2_aescreateappfromscratch_vancouver_elevating_privileges) your role to `security_admin` so you can create a new ACL.
2.  Navigate to **System Security → Access Control (ACL)**.
3.  Click **New** and enter the following:
    -   Type: `record`
    -   Operation: `read`
    -   Name: select the `sn_cd_news_article` table
    -   Under **Requires role**, add either:
        -   The existing `sn_cd.content_manager` or `sn_cd.content_admin` role that was assigned to the `gleansearch` user, or
        -   A new custom role created in the Content Publishing application (if you prefer a custom role instead of the built-in ones)
    -   Click **Submit**.

#### 2\. Create a Record ACL for News Article records[​](#2-create-a-record-acl-for-news-article-records "Direct link to 2. Create a Record ACL for News Article records")

1.  [Elevate](https://developer.servicenow.com/dev.do#!/learn/learning-plans/vancouver/citizen_developer/app_store_learnv2_aescreateappfromscratch_vancouver_elevating_privileges) your role to `security_admin` so you can create a new ACL.
2.  Navigate to **System Security → Access Control (ACL)**.
3.  Click **New** and enter the following:
    -   Type: `record`
    -   Operation: `read`
    -   Name: select `sn_cd_news_article.*` (all fields)
    -   Under **Requires role**, add the same role used in the table ACL above
    -   Click **Submit**.

note

You can choose to either use the existing `sn_cd.content_manager` or `sn_cd.content_admin` roles, or create a new custom role in the Content Publishing application. If creating a custom role, ensure it's assigned to the gleansearch user and used in both ACL configurations above.

### 6\. Configure an OAuth application[​](#6-configure-an-oauth-application "Direct link to 6. Configure an OAuth application")

The OAuth authentication provides access tokens to Glean acting as the above user.

1.  Navigate to **System OAuth → Application Registry** and click **New**.
2.  Click **Create an OAuth API endpoint for external clients**.
3.  Set **Name** to `Glean Search OAuth`.
4.  Set **Refresh Token Lifespan** to `2,147,483,647`.
5.  Set **Access Token Lifespan** to `86,400`.
6.  Leave the remaining fields as-is. Click **Submit**.

### 7\. Validate system properties[​](#7-validate-system-properties "Direct link to 7. Validate system properties")

1.  Navigate to the System Properties list (**All → Enter sys\_properties.list**).
2.  Identify and note the system property `glide.knowman.apply_article_read_criteria` and its value.
3.  Identify and note the system property `glide.knowman.block_access_with_no_user_criteria` and its value.
4.  Check whether Knowledge Article templates are enabled and you want to index template-based articles:
    -   Navigate to **All → System Applications → All Available Applications → All**.
    -   Look for the plugin **Knowledge Management Advanced** (`com.snc.knowledge_advanced`) and check whether it is enabled.
    -   You can learn more about knowledge article templates [here](https://docs.servicenow.com/bundle/washingtondc-servicenow-platform/page/product/knowledge-management/concept/knowledge-article-templates.html).

## Enter details in Glean Admin Console[​](#enter-details-in-glean-admin-console "Direct link to Enter details in Glean Admin Console")

Enter the following information into the Glean admin console in the corresponding fields.

-   Domain Name: Accepts domain or domain url. Note, the domain url should not include any http prefixes, and should follow the format of `<domain>.service-now.com`. It is preferred to enter the domain url
    
-   User ID: `gleansearch`
    
-   **Password**: The password you chose in step 3.
    
-   Note: We STILL need a username/password to [fetch refresh token](https://docs.servicenow.com/bundle/xanadu-platform-security/page/administer/security/reference/r_OAuthAPIRequestParameters.html) which is then used to fetch access tokens.
    
-   **OAuth Client ID**: Client ID from the application in step 6.
    
-   **API Namespace**: Copy over the API namespace for the scripted REST API you created in step 2.
    
-   **OAuth Client Secret**: Client Secret from the application in step 6.
    
-   Set the **Apply article read criteria** box to mirror the system property `glide.knowman.apply_article_read_criteria`.
    
-   Set the **Block access with no user criteria** box to mirror the system property `glide.knowman.block_access_with_no_user_criteria`.
    
-   If you have Knowledge Article templates enabled in your instance, check the **Enable fetching template-based knowledge articles** box.
    
-   Under document types, review the selection. News Articles, Portal Content, Quick Links, and External Links are selected by default. Deselect any type you don't want Glean to index, or select only a custom subset.
    

Click **Authorize** in Glean, and log in as the Service Account you created in step 3 to authorize the OAuth application.
