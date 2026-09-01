---
url: "https://docs.glean.com/tools/connector/confluence/create-space"
canonical: "https://docs.glean.com/tools/connector/confluence/create-space"
title: "Create space"
description: "Creates a new Confluence space for teams, projects, or knowledge domains"
fetched_at: "2026-09-01T13:29:59.258Z"
---
On this page

The *Confluence create space* tool creates a new Confluence space. This is a write tool that creates a space using the space key, name, and optional description you provide. Space keys must be unique.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean tool must be enabled for your instance and the Confluence tools must be available.
-   The connected account must have permission to create spaces in the target Confluence instance.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Space key | String | Unique identifier for the space in Confluence. Must be unique across all spaces. |
| Name | String | Display name for the new space. |
| Description → plain → representation | String | Representation format of the description. Must be 'plain'. |
| Description → plain → value | String | The plain text description of the space. Example: "This space is used for project documentation." |
| Metadata | Object | Optional provider-specific metadata for the space. |
| Type | String | Type of space (e.g., personal, global). |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Create a new Confluence space called 'Product Launch 2024' with the key PROD2024."
    
-   "Set up a new space for our Engineering Team with space key ENGTEAM."
    
-   "Create a Confluence space named 'Marketing Resources' with key MKTRES."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Space key already exists error

-   **Possible cause:** The space key matches an existing Confluence space key. Confluence requires space keys to be unique.
-   **Fix:** Choose a different, unique space key and run the tool again. Verify the key is not already in use by checking existing spaces in Confluence.

### Space key already exists error persists after changing the key

-   **Possible cause:** The new key may still conflict with an existing space you cannot see, or there may be an issue with the tool configuration.
-   **Fix:** Verify the space key is truly unique in Confluence. If the problem persists, contact your Glean admin to review the Confluence connection and tool configuration.

### Permission or authentication errors

-   **Possible cause:** The connected account does not have permission to create spaces, or the Confluence tools are not fully configured.
-   **Fix:** Ask an admin to verify that the connected account has space creation permissions in Confluence and that the Confluence tools are properly configured.

## FAQs[​](#faqs "Direct link to FAQs")

### Can I use this tool to update or delete spaces?

No. This tool only creates spaces. To update or delete spaces, use separate Confluence space management tools if available.

### What happens if I try to create a space with a duplicate key?

Confluence will return an error stating that a space already exists with that key. Space keys must be unique across the entire Confluence instance. Choose a different key and try again.
