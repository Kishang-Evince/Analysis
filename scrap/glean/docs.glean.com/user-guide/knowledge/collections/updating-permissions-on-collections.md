---
url: "https://docs.glean.com/user-guide/knowledge/collections/updating-permissions-on-collections"
canonical: "https://docs.glean.com/user-guide/knowledge/collections/updating-permissions-on-collections"
title: "Update permissions on Collections"
description: "How to control who has access to edit contents within a Collection"
fetched_at: "2026-09-01T13:30:40.910Z"
---
On this page

Deprecated

Collections are an easy way to organize related documents across all your tools and any URL from the web by a single topic. When you want to use Collections as a source of truth on a particular topic, you may want to restrict which users can edit contents of that Collection. Here's how you can control who has edit access over a single Collection.

note

[Projects](/user-guide/knowledge/projects/how-projects-work) are replacing Collections. Existing Collections automatically migrate to Projects with all content and permissions preserved.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

You must be an owner or editor of a Collection to change its permissions.

## Who Can Change Permissions[​](#who-can-change-permissions "Direct link to Who Can Change Permissions")

1.  **Owners:** Owners can add or remove other owners and editors, ensuring that the right people have the appropriate level of access.
    
    -   The creator of a collection is automatically assigned as the Owner and has the ability to manage permissions.
    -   The company's overall Collection Moderator has Owner rights to all Collections by default.
2.  **Editors:** Editors can add or remove other editors from the Collection
    

**Note:** All Collections will always be viewable by the entire company. You can restrict any individual from viewing a specific Collection.

* * *

## How to Change Permissions[​](#how-to-change-permissions "Direct link to How to Change Permissions")

If you're the an owner or editor of a Collection

1.  **Open the Collection**: Navigate to the collection for which you want to change permissions.
    
2.  **Click the Share Button**: Locate and click the Share button on the collection page.
    
3.  **Manage Permissions**: In the sharing settings, you can:
    
    -   Add individual owners and editors.
    -   Change the permission level of the entire company from editors to viewers.
    -   Remove access for specific users or departments.
4.  New permissions are auto-saved. Click 'Done' to exit.
    

* * *

## How Permissions on Child Collections Work[​](#how-permissions-on-child-collections-work "Direct link to How Permissions on Child Collections Work")

Child Collections (Collections created under a top parent Collection) automatically inherit the permissions of their parent Collection. This means:

-   **Inherited Permissions**: Any permissions set on the parent Collection will apply to the child Collection.
-   **Adding Permissions**: Owners and editors of the child Collection can add new editors or owners to the child collection.
-   **Non-Removable Inherited Permissions**: Inherited permissions cannot be removed from the child collection.
