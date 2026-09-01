---
url: "https://docs.glean.com/troubleshooting/error-codes/gcp/setup-key-5"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gcp/setup-key-5"
title: "SETUP-KEY-5"
description: "SETUP-KEY-5 Error Code"
fetched_at: "2026-09-01T13:30:15.086Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   The org constraint doesn't allow certain values that are required to setup your Glean instance

## Resolution[​](#resolution "Direct link to Resolution")

-   From the reported error message, note the constraint name and the values that need to be allowed. As an example, from the attached screenshot of an error message, the constraint name inferred is constraints/iam.allowedPolicyMemberDomains and the value that Glean requires to be permitted by this constraint is C00vrnlo8 (Please note that for some constraints there might be more than 1 value that Glean requires to be allowed)
    
-   Create a yaml file (assume its located at /tmp/policy.yaml) with the below configuration:
    
    ```
    name: projects/PROJECT_ID/policies/iam.allowedPolicyMemberDomainsspec:    rules:        values:            allowedValues:                - C00vrnlo8
    ```
    
-   Execute the below command with credentials sufficient to modify org constraints in your organizations:
    
    ```
    gcloud org-policies set-policy /tmp/policy.yaml
    ```
    
-   Reupload the owner key
    

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
