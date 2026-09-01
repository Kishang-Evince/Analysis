---
url: "https://docs.glean.com/connectors/native/servicenow/servicenow-custom-role"
canonical: "https://docs.glean.com/connectors/native/servicenow/servicenow-custom-role"
title: "Connecting ServiceNow With a Custom Role"
description: "In the case that we are unable to use a ServiceNow user with admin privileges, we should be able to recreate the same Glean experience with a user that has a custom role. The majority of steps will be the same as listed in the ServiceNow Connector Set-up Instructions except for the following:"
fetched_at: "2026-09-01T13:29:40.389Z"
---
In the case that we are unable to use a ServiceNow user with admin privileges, we should be able to recreate the same Glean experience with a user that has a custom role. The majority of steps will be the same as listed in the ServiceNow Connector Set-up Instructions except for the following:

1.  The User that will be fetching on behalf of does *not* need to be an admin (or have admin privileges). However, an admin (or a user with `security_admin` privileges) may be required to complete some of the following steps.
    
2.  Create the user that will be used. Let’s call this user `gleansearch`.
    
3.  Create a custom role. Let’s call this `CustomRole`.
    
4.  Click on the user (**Organizations → Users**) and then set `CustomRole` for the user `gleansearch` under Roles near the bottom of the page.
    
5.  When creating the ACL Rule (**System Security → Access Control (ACL)**) for the Scripted REST API, then set `CustomRole` as the role for the ACL Rule.
    
6.  Set the ACL Rule that requires the `CustomRole` for both the new Scripted REST API and the `/user_criteria` endpoint.
    
7.  In step 3, instead of setting roles for the user, provide read access to the necessary tables. As a security admin, you can do this by creating a new ACL Rule for each table, granting `CustomRole` the read record access. You also need to provide the read access for all fields of the table, which is done in a separate ACL Rule. Ultimately, you will create two ACL Rules for each of the following tables:
    
    1.  `sys_user`
    2.  `sys_user_role`
    3.  `sys_user_has_role`
    4.  `sys_user_group`
    5.  `sys_user_grmember`
    6.  `user_criteria`
    7.  `kb_knowledge`
    8.  `kb_knowledge_base`
    9.  `kb_uc_can_read_mtom`
    10.  `kb_uc_cannot_read_mtom`
    11.  `kb_uc_can_contribute_mtom`
    12.  `kb_uc_cannot_contribute_mtom`
    13.  `kb_category`
    14.  `kb_use`
    15.  `sc_cat_item`
    16.  `sc_cat_item_user_criteria_mtom`
    17.  `sc_cat_item_user_criteria_no_mtom`
    18.  `sc_category`
    19.  `sc_catalog`
    20.  `topic`
    21.  `sys_audit_delete` (if provided access)
    22.  `incident` (if enabled)
    23.  `cmdb_ci_business_app` (if enabled)
    24.  `dmn_demand` (if enabled)
    25.  `pm_project` (if enabled)
    26.  `rm_epic` (if enabled)
    
    Here’s what this could look like:
    
    -   ACL to read the table (e.g. `sys_user`)
    -   ACL to read the properties of the table (e.g. sys\_user.\*)

8.  Add the itil (Information Technology Infrastructure Library) role to the user gleansearch. This enables the user to read tables interaction (Interactions) and sc\_request (Requests)
9.  Follow the subsequent steps as described in the instructions and then you should be all done.
