---
url: "https://developers.glean.com/api/client-api/collections/overview"
canonical: "https://developers.glean.com/api/client-api/collections/overview"
title: "Collections API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:53.229Z"
---
The Collections API allows you to create and manage curated collections of documents and resources. Organize related content into themed collections, making it easier for users to discover and access relevant information within your organization.

## Use Cases

### Content Curation

Create organized collections of related documents, resources, and links to help users discover relevant content more efficiently.

### Knowledge Organization

Group documents by topic, project, or department to create structured knowledge repositories that improve content discoverability.

### Resource Management

Add, update, and remove items from collections to keep curated content current and maintain high-quality resource lists.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/addcollectionitems`](/api/client-api/collections/addcollectionitems) | [Add Collection item](/api/client-api/collections/addcollectionitems)
Add items to a Collection.

 |
| POST | [`/rest/api/v1/createcollection`](/api/client-api/collections/createcollection) | [Create Collection](/api/client-api/collections/createcollection)

Create a publicly visible (empty) Collection of documents.

 |
| POST | [`/rest/api/v1/deletecollection`](/api/client-api/collections/deletecollection) | [Delete Collection](/api/client-api/collections/deletecollection)

Delete a Collection given the Collection's ID.

 |
| POST | [`/rest/api/v1/deletecollectionitem`](/api/client-api/collections/deletecollectionitem) | [Delete Collection item](/api/client-api/collections/deletecollectionitem)

Delete a single item from a Collection.

 |
| POST | [`/rest/api/v1/editcollection`](/api/client-api/collections/editcollection) | [Update Collection](/api/client-api/collections/editcollection)

Update the properties of an existing Collection.

 |
| POST | [`/rest/api/v1/editcollectionitem`](/api/client-api/collections/editcollectionitem) | [Update Collection item](/api/client-api/collections/editcollectionitem)

Update the URL, Glean Document ID, description of an item within a Collection given its ID.

 |
| POST | [`/rest/api/v1/getcollection`](/api/client-api/collections/getcollection) | [Read Collection](/api/client-api/collections/getcollection)

Read the details of a Collection given its ID. Does not fetch items in this Collection.

 |
| POST | [`/rest/api/v1/listcollections`](/api/client-api/collections/listcollections) | [List Collections](/api/client-api/collections/listcollections)

List all existing Collections.

 |
