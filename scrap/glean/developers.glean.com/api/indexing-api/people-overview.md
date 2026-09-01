---
url: "https://developers.glean.com/api/indexing-api/people-overview"
canonical: "https://developers.glean.com/api/indexing-api/people-overview"
title: "Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:57.073Z"
---
Manage employee and team information in your Glean instance. These endpoints handle indexing organizational data to enable people search and proper content attribution.

## Use Cases

### Employee Directory Sync

Synchronize employee information from HR systems to maintain accurate people profiles and organizational charts in Glean.

### Team Structure Management

Index team hierarchies and organizational structures to enable team-based search and content organization.

### Bulk Organization Updates

Efficiently update large numbers of employee records during organizational changes, mergers, or system migrations.

### Onboarding & Offboarding

Add new employees and remove departing team members to maintain current organizational data and access controls.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/index/v1/indexemployee`](/api/indexing-api/index-employee) | [Index employee](/api/indexing-api/index-employee) |
| POST | [`/api/index/v1/bulkindexemployees`](/api/indexing-api/bulk-index-employees) | [Bulk index employees](/api/indexing-api/bulk-index-employees) |
| POST | [`/api/index/v1/uploademployees`](/api/indexing-api/schedules-the-processing-of-uploaded-employees-and-teams) | [Schedules the processing of uploaded employees and teams](/api/indexing-api/schedules-the-processing-of-uploaded-employees-and-teams) |
| POST | [`/api/index/v1/deleteemployee`](/api/indexing-api/delete-employee) | [Delete employee](/api/indexing-api/delete-employee) |
| POST | [`/api/index/v1/indexteam`](/api/indexing-api/index-team) | [Index team](/api/indexing-api/index-team) |
| POST | [`/api/index/v1/deleteteam`](/api/indexing-api/delete-team) | [Delete team](/api/indexing-api/delete-team) |
| POST | [`/api/index/v1/bulkindexteams`](/api/indexing-api/bulk-index-teams) | [Bulk index teams](/api/indexing-api/bulk-index-teams) |
