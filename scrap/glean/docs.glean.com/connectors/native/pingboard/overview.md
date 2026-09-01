---
url: "https://docs.glean.com/connectors/native/pingboard/overview"
canonical: "https://docs.glean.com/connectors/native/pingboard/overview"
title: "Pingboard overview"
description: "Learn how the Pingboard connector works with Glean."
fetched_at: "2026-09-01T13:29:38.063Z"
---
On this page

Pingboard is an employee directory and organizational chart platform that provides access to essential information about people, teams, and companies. The Pingboard connector for Glean enables organizations to index employee data from Pingboard, allowing users to search, discover, and connect with coworkers through Glean Work AI. The connector synchronizes fields such as employee names, titles, department, manager relationships, key dates, contact details, and profile avatars.

## Overview[​](#overview "Direct link to Overview")

-   Glean requires a service account for Pingboard to fetch relevant information to create People cards.
-   Authentication is done by creating a read-only service account client ID and secret pair in Pingboard.
-   It’s important to note that all data is stored in the GCP project in the customer's cloud account and no data leaves the customer environment.

## Integration features[​](#integration-features "Direct link to Integration features")

For Pingboard, Glean will capture the following content:

-   Employee name, title, department, manager ID, join date, birth date, updated date, time zone, nickname, bio, email, phone number and any avatar URLs.

## API usage[​](#api-usage "Direct link to API usage")

Glean will use the [Users](https://pingboard.docs.apiary.io/#reference/users) and [Groups](https://pingboard.docs.apiary.io/#reference/groups) APIs to generate People cards in Glean.
