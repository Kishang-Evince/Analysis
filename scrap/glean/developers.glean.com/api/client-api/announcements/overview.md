---
url: "https://developers.glean.com/api/client-api/announcements/overview"
canonical: "https://developers.glean.com/api/client-api/announcements/overview"
title: "Announcements API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:51.863Z"
---
The Announcements API allows administrators to create, update, and manage organizational announcements that are visible to users based on department and location targeting. These announcements help keep teams informed about important updates, policy changes, and company-wide communications.

## Use Cases

### Company-wide Communications

Create and broadcast important announcements to all employees or specific departments about policy changes, events, and updates.

### Department-specific Notifications

Target announcements to specific departments or locations to ensure relevant information reaches the right audience.

### Announcement Management

Update, modify, or remove announcements as needed to keep organizational communications current and accurate.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/createannouncement`](/api/client-api/announcements/createannouncement) | [Create Announcement](/api/client-api/announcements/createannouncement)
Create a textual announcement visible to some set of users based on department and location.

 |
| POST | [`/rest/api/v1/deleteannouncement`](/api/client-api/announcements/deleteannouncement) | [Delete Announcement](/api/client-api/announcements/deleteannouncement)

Delete an existing user-generated announcement.

 |
| POST | [`/rest/api/v1/updateannouncement`](/api/client-api/announcements/updateannouncement) | [Update Announcement](/api/client-api/announcements/updateannouncement)

Update a textual announcement visible to some set of users based on department and location.

 |
