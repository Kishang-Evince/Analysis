---
url: "https://developers.glean.com/api/client-api/activity/overview"
canonical: "https://developers.glean.com/api/client-api/activity/overview"
title: "Activity API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:51.385Z"
---
The Activity API enables you to report user activity on indexed documents and search interactions to improve Glean's search quality and relevance. By tracking document views, edits, searches, and other user interactions, this API helps Glean understand content usage patterns and optimize search results.

## Use Cases

### Document Activity Tracking

Report user interactions with documents such as viewing, editing, and commenting to improve search relevance and content recommendations.

### Search Feedback Collection

Capture search result interactions, clicks, and user feedback to enhance search quality and result ranking algorithms.

### Usage Analytics

Gather comprehensive usage data to understand content popularity, user engagement patterns, and optimize the search experience.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/activity`](/api/client-api/activity/activity) | [Report document activity](/api/client-api/activity/activity)
Report user activity that occurs on indexed documents such as viewing or editing. This signal improves search quality.

 |
| POST | [`/rest/api/v1/feedback`](/api/client-api/activity/feedback) | [Report client activity](/api/client-api/activity/feedback)

Report events that happen to results within a Glean client UI, such as search result views and clicks. This signal improves search quality.

 |
