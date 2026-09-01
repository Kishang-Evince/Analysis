---
url: "https://docs.glean.com/tools/glean/read-personal-activity"
canonical: "https://docs.glean.com/tools/glean/read-personal-activity"
title: "Read Personal Activity"
description: "Compile a list of a user's activities over a specified period to power self-assessment and contribution-summary agents."
fetched_at: "2026-09-01T13:30:07.532Z"
---
On this page

The read personal activity tool allows an agent to extract and compile a list of a user's activities over a specified period. This functionality is useful for creating agents that can assist users with self-assessments or highlighting their contributions over a period of time.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

This tool can be used to find a list of your personal activities for building agents:

-   **self-assessment agent:** Helps you prepare for self-evaluations and performance reviews or highlight contributions to a specific project or initiative.

## Configuration[​](#configuration "Direct link to Configuration")

Select or specify a date range using the following formats:

-   A custom date range specified as a `start_date:yyyy-mm-dd end_date:yyyy-mm-dd`
-   `Duration_days:N` to fetch activity data for the last N days.
