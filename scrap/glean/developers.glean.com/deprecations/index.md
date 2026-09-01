---
url: "https://developers.glean.com/deprecations/"
canonical: "https://developers.glean.com/deprecations/"
title: "Deprecation List | Glean Developer"
description: "Track deprecated endpoints, fields, and parameters in Glean's APIs"
fetched_at: "2026-09-01T13:23:00.304Z"
---
# Deprecations

This page lists all deprecations related to Glean's public APIs. Each deprecation includes the date it was introduced, the removal date after which the property will no longer be available, and guidance on what to use instead. See [API Evolution & Deprecations](/deprecations/overview) for details on how our deprecation process works.

Filter deprecations:All upcomingRemoval date: 2026-10-15Removal date: 2027-01-15Removal date: 2027-04-15Removal date: 2027-07-15All past deprecations

## Removal date: 2026-10-15

POST`/api/index/v1/bulkindexemployees`

Indexing API

`POST /api/index/v1/bulkindexemployees`

Endpoint is deprecated

Deprecation introduced on 2026-02-03

POST`/api/index/v1/getdocumentcount`

Indexing API

`POST /api/index/v1/getdocumentcount`

Endpoint is deprecated

Deprecation introduced on 2026-02-03

POST`/api/index/v1/getdocumentstatus`

Indexing API

`POST /api/index/v1/getdocumentstatus`

Endpoint is deprecated

Deprecation introduced on 2026-02-03

POST`/api/index/v1/getusercount`

Indexing API

`POST /api/index/v1/getusercount`

Endpoint is deprecated

Deprecation introduced on 2026-02-03

POST`/api/index/v1/indexemployee`

Indexing API

`location`

Field is deprecated

Deprecation introduced on 2026-02-05

POST`/rest/api/v1/chat`

Client API

`citations`

Use inline citations via ChatMessageFragment.citation and ChatMessageCitation.referenceRanges instead. This field is still populated for backward compatibility.

Deprecation introduced on 2026-02-06

POST`/rest/api/v1/createannouncement`

Client API

`isNegated`

Use relationType instead

Deprecation introduced on 2026-02-05

`documents`

Field is deprecated

Deprecation introduced on 2026-02-05

`boardId`

Answer Boards no longer supported

Deprecation introduced on 2026-02-05

`snippet`

Use 'text' field instead

Deprecation introduced on 2026-02-05

`inviteTime`

Use ChannelInviteInfo instead

Deprecation introduced on 2026-02-05

`reminderTime`

Use ChannelInviteInfo instead

Deprecation introduced on 2026-02-05

`reactions`

Use reacts instead

Deprecation introduced on 2026-02-05

`role`

Use permissions instead

Deprecation introduced on 2026-02-05

GET`/rest/api/v1/governance/data/policies/{id}`

Client API

`sensitiveInfoTypes`

Use sensitiveContentOptions instead

Deprecation introduced on 2026-02-05

`likelihoodThreshold`

Field is deprecated

Deprecation introduced on 2026-02-05

`urlGreenlist`

Field is deprecated

Deprecation introduced on 2026-02-05

`datasources`

Use datasourceInstances instead

Deprecation introduced on 2026-02-05

`externalSharingOptions`

Use broadSharingOptions instead

Deprecation introduced on 2026-02-05

`enabled`

Field is deprecated

Deprecation introduced on 2026-02-05

`anyoneWithLinkEnabled`

Field is deprecated

Deprecation introduced on 2026-02-05

`sensitiveInfoTypes`

Use customSensitiveExpressions instead

Deprecation introduced on 2026-02-05

`sensitiveTerms`

Use customSensitiveExpressions instead

Deprecation introduced on 2026-02-05

`sensitiveRegexes`

Use customSensitiveExpressions instead

Deprecation introduced on 2026-02-05

POST`/rest/api/v1/listanswers`

Client API

`POST /rest/api/v1/listanswers`

Answer boards have been removed and this endpoint no longer serves a purpose

Deprecation introduced on 2026-01-21

## Removal date: 2027-01-15

POST`/rest/api/v1/getanswer`

Client API

`trackingToken`

Use \`answer.trackingToken\` instead.

Deprecation introduced on 2026-05-07

POST`/rest/api/v1/getcollection`

Client API

`trackingToken`

Use \`collection.trackingToken\` instead.

Deprecation introduced on 2026-05-07

POST`/rest/api/v1/insights`

Client API

`searchSessionSatisfaction`

This property is no longer supported. Please contact Support for alternatives.

Deprecation introduced on 2026-05-13
