---
url: "https://docs.glean.com/troubleshooting/error-codes/azuredevops/azuredevops-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/azuredevops/azuredevops-2"
title: "AZUREDEVOPS_2"
description: "AZUREDEVOPS_2 Error Code"
fetched_at: "2026-09-01T13:30:10.431Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   Glean is unable to list Azure DevOps projects during connector validation.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   The Azure DevOps app user (service principal) is not added as a user in the Azure DevOps organization.
-   The app user does not have **Basic** access level and **Project Reader** (or equivalent) role in one or more projects that should be indexed.
-   The Azure DevOps organization name configured in Glean does not match the actual organization name in Azure DevOps.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try one or more of the following resolutions:

### Confirm the app user is added to the Azure DevOps organization[​](#confirm-the-app-user-is-added-to-the-azure-devops-organization "Direct link to Confirm the app user is added to the Azure DevOps organization")

-   In Azure DevOps, go to **Organization settings** → **Users**.
-   Verify that the service principal / app registration used for the Azure DevOps connector is listed as a user in the organization.

### Verify project-level access[​](#verify-project-level-access "Direct link to Verify project-level access")

For every project you want to index:

-   Ensure the app user is assigned:
    -   **Access level:** Basic
    -   **Project role:** Project Reader (or equivalent read-only role)
-   If the app user is not added to a project, Glean will not be able to list that project.

![](/img/connectors/native/azuredevops/azuredevops-add-app-user.png)

### Double-check the configured organization name[​](#double-check-the-configured-organization-name "Direct link to Double-check the configured organization name")

-   In the Glean Admin console, confirm that the **Azure DevOps organization name** matches the value in your Azure DevOps instance.
-   A mismatch can cause project listing to fail even if the credentials themselves are valid.

For more information, see [Azure DevOps connector setup](/connectors/native/azure-devops/).

If you continue to see this error, contact [Glean Support](https://support.glean.com).
