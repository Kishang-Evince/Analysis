---
url: "https://docs.glean.com/troubleshooting/error-codes/azuredevops/azuredevops-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/azuredevops/azuredevops-3"
title: "AZUREDEVOPS_3"
description: "AZUREDEVOPS_3 Error Code"
fetched_at: "2026-09-01T13:30:10.593Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

Glean cannot list Azure DevOps repositories for authorized projects.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   The authorized Azure DevOps project does not contain any repositories.
-   The Azure DevOps app user (service principal) doesn't have **Read** access to repositories.
-   **Reader** group hasn't been granted **Read** access to repositories.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try one or more of the following resolutions:

### Verify project contents[​](#verify-project-contents "Direct link to Verify project contents")

-   Ensure the service principal has access to projects containing at least one repository.
-   If the project does not contain any repositories, uncheck the **Crawl Repositories** option in the configuration settings.

### Verify permissions in Azure DevOps[​](#verify-permissions-in-azure-devops "Direct link to Verify permissions in Azure DevOps")

Ensure the Azure DevOps app user (service principal) has permission to read the repositories:

1.  In Azure DevOps, navigate to **Organization Settings** > **Project Settings** > **Repositories**.
2.  Confirm that either the **Reader** group or Azure DevOps app user (service principal) has been granted **Read** access.

![](/img/connectors/native/azuredevops/azuredevops-add-repo-access.png)

For more information, see [Azure DevOps connector setup](/connectors/native/azure-devops/).

If you continue to see this error, contact [Glean Support](https://support.glean.com).
