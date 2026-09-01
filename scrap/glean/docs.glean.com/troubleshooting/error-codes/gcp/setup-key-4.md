---
url: "https://docs.glean.com/troubleshooting/error-codes/gcp/setup-key-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gcp/setup-key-4"
title: "SETUP-KEY-4"
description: "SETUP-KEY-4 Error Code"
fetched_at: "2026-09-01T13:30:14.904Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

-   The org constraint doesn't match the policy specification required by Glean

## Resolution[​](#resolution "Direct link to Resolution")

-   From the error message on the validation page, note the constraint name and the required spec. From the example error message below, we can infer the constraint name to be constraints/iam.disableServiceAccountKeyCreation and the required policy spec to be `{"rules":[{"enforce": false}]}`
    
-   Create a yaml (say its located at /tmp/policy.yaml) file with the below configuration:
    
    ```
    name: projects/PROJECT_ID/policies/iam.disableServiceAccountKeyCreationspec:rules:    - enforce: false
    ```
    
-   Execute the below command with credentials sufficient to modify org constraints in your organizations:
    

```
gcloud org-policies set-policy /tmp/policy.yaml
```

-   Reupload the owner key

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
