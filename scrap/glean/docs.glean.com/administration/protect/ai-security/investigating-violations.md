---
url: "https://docs.glean.com/administration/protect/ai-security/investigating-violations"
canonical: "https://docs.glean.com/administration/protect/ai-security/investigating-violations"
title: "Investigating Violations"
fetched_at: "2026-09-01T13:29:13.573Z"
---
On this page

Glean Protect+

The `ai_security.ai_security` BigQuery table contains enriched records of AI security violations. These records include debug metadata, workflow context, raw content, and validation/model metadata.

You can use this table for various purposes, including:

-   Root-cause analysis and triage
-   Dashboards and automated alerts
-   Offline machine learning or data aggregation work

## Quick Investigation Checklist[​](#quick-investigation-checklist "Direct link to Quick Investigation Checklist")

Before you begin an investigation, ensure you have the following:

-   **Required Data**: The event\_id, Run ID, or a specific timestamp range from the Findings dashboard.
-   **Permissions**: The necessary bigquery.dataViewer and bigquery.jobUser permissions to access and query the data.
-   **Query Best Practices**: Use saved views or pivoted queries to minimize manual errors.
-   **Data Security**: Mask or redact any sensitive fields before sharing query results outside of the security team.

## How to access the data[​](#how-to-access-the-data "Direct link to How to access the data")

### Required Privileges[​](#required-privileges "Direct link to Required Privileges")

To access and query the data, a user typically needs the following Identity and Access Management (IAM) roles:

-   roles/bigquery.dataViewer: To read the table data.
-   roles/bigquery.jobUser: To run queries.

For broader access to logs and for troubleshooting ingestion issues, the roles/logging.viewer role may also be helpful.

### GCP Console (web UI)[​](#gcp-console-web-ui "Direct link to GCP Console (web UI)")

1.  Sign in to Google Cloud Console and select the project that owns the dataset.
2.  Open **BigQuery** → Explorer panel → find `your_project` → dataset `ai_security` → table `ai_security`.
3.  Click the table to view schema, details and preview rows.
4.  Use the **Query editor** to run SQL; review results in Table / JSON view; use the Visualization tab to build simple charts.
5.  Save frequently used diagnostic queries with the Console's Saved Queries feature for reuse and sharing.

### CLI (Cloud Shell or local with gcloud + bq)[​](#cli-cloud-shell-or-local-with-gcloud--bq "Direct link to CLI (Cloud Shell or local with gcloud + bq)")

1.  Authenticate and set the project:

```
gcloud auth logingcloud config set project YOUR_PROJECT_ID
```

2.  Run a simple query with `bq`:

```
bq query --use_legacy_sql=false \"SELECT timestamp, jsonPayload.ai_security.event_id, jsonPayload.ai_security.event_type FROM \`YOUR_PROJECT.ai_security.ai_security\` WHERE jsonPayload.ai_security.event_type = 'VIOLATION' ORDER BY timestamp DESC LIMIT 50;"
```

3.  Output JSON for programmatic parsing:

```
bq query --use_legacy_sql=false --format=prettyjson 'SELECT ...'
```

4.  Save queries as stored procedures in BigQuery and call them from the CLI for automation.

## Relevant columns (top-level BigQuery fields)[​](#relevant-columns-top-level-bigquery-fields "Direct link to Relevant columns (top-level BigQuery fields)")

These fields are present on each exported log row and give resource / ingestion context:

-   `logName` - Log stream name.
-   `resource.type` - GCP resource type (e.g., `k8s_container`).
-   `resource.labels.pod_name` - Pod name (k8s).
-   `resource.labels.location` - Region / zone.
-   `resource.labels.namespace_name` - K8s namespace.
-   `resource.labels.cluster_name` - Cluster name.
-   `resource.labels.project_id` - GCP project id.
-   `timestamp` - Event timestamp (when it occurred).
-   `receiveTimestamp` - When the log was ingested.
-   `insertId` - Unique insert id (dedupe).
-   `labels.commit_hash`, `labels.branch`, `labels.full_version` - Build/version metadata.

## Payload structure (*jsonPayload.ai\_security*)[​](#payload-structure-jsonpayloadai_security "Direct link to payload-structure-jsonpayloadai_security")

`jsonPayload.ai_security` contains a JSON representation of the `AiSecurityLogEntry` proto. Important fields and their meaning:

-   `event_id` (string) - globally unique event ID.
    
-   `event_type` (enum) - e.g., `VIOLATION`.
    
-   `event_description` (string) - human-readable description.
    
-   `user_id` (string) - hashed identifier of the user that triggered the event.
    
-   `user_email` (string) - plaintext SSO email of the user that triggered the event. Emitted only to the raw `ai-security` log (for SIEM correlation, e.g. matching against Okta) and **excluded** from the scrubbed BigQuery export. Populated on `VIOLATION` and `MONITOR_QUEUE` events; omitted for anonymous / external-search identities.
    
-   `session_info` - object with `tab_id` and `session_tracking_token`.
    
-   `action` (enum) - enforcement taken (`BLOCK_REQUEST` / `ALLOW_REQUEST`).
    
-   `content_raw` (string) - raw content that caused the event (user prompt or retrieved content).
    
-   `content_metadata` (repeated `{key,value}`) - context keys such as:
    
    -   `RESOURCE_NAME`, `RESOURCE_ID`, `RESOURCE_URL`,
        
    -   `AGENT_NAME`, `RUN_ID`, `CHAT_SESSION_ID`, `AGENT_ID`, `SOURCE`
        
-   `validation_metadata` (repeated `{key,value}`) - model prediction / validation debugging key-values.
    
-   (other context fields may exist - e.g., workflow entries, LLM call details, agent spans)
    

This JSON mirrors the following structure:

```
message Metadata {   string key = 1 [(options.scrub) = {method: RAW}];   string value = 2 [(options.scrub) = {method: RAW}];}message AiSecurityLogEntry {  string event_id = 1;  EventType event_type = 2;  string event_description = 3;  string user_id = 4;  string user_email = 21;  SessionInfo session_info = 5;  Action action = 6;  repeated Metadata validation_metadata = 7;  string content_raw = 8;  repeated Metadata content_metadata = 9;}
```

## Common SQL patterns & examples[​](#common-sql-patterns--examples "Direct link to Common SQL patterns & examples")

Notes: `UNNEST()` is used to flatten repeated metadata arrays. Replace `YOUR_PROJECT` accordingly.

### Get latest 100 violations with key content & resource id[​](#get-latest-100-violations-with-key-content--resource-id "Direct link to Get latest 100 violations with key content & resource id")

```
SELECT  timestamp,  jsonPayload.ai_security.event_id AS event_id,  jsonPayload.ai_security.event_type AS event_type,  jsonPayload.ai_security.user_id AS user_id,  jsonPayload.ai_security.action AS action,  jsonPayload.ai_security.content_raw AS content_raw,  cm.value AS resource_idFROM  `YOUR_PROJECT.ai_security.ai_security`,  UNNEST(jsonPayload.ai_security.content_metadata) AS cmWHERE  jsonPayload.ai_security.event_type = 'VIOLATION'  AND cm.key = 'RESOURCE_ID'ORDER BY timestamp DESCLIMIT 100;
```

### Extract a single row’s full JSON for deep debugging[​](#extract-a-single-rows-full-json-for-deep-debugging "Direct link to Extract a single row’s full JSON for deep debugging")

```
SELECT  TO_JSON_STRING(t) AS full_row_jsonFROM  `YOUR_PROJECT.ai_security.ai_security` AS tWHERE  jsonPayload.ai_security.event_id = 'f525eda94eae4f8bb260b78cddb9b3bb';
```

### Pivot content\_metadata into columns (common keys)[​](#pivot-content_metadata-into-columns-common-keys "Direct link to Pivot content_metadata into columns (common keys)")

```
SELECT  timestamp,  jsonPayload.ai_security.event_id AS event_id,  MAX(IF(cm.key='RESOURCE_ID', cm.value, NULL)) AS resource_id,  MAX(IF(cm.key='AGENT_NAME', cm.value, NULL)) AS agent_name,  MAX(IF(cm.key='RUN_ID', cm.value, NULL)) AS run_id,  jsonPayload.ai_security.content_raw AS content_rawFROM  `YOUR_PROJECT.ai_security.ai_security`,  UNNEST(jsonPayload.ai_security.content_metadata) AS cmWHERE  jsonPayload.ai_security.event_type = 'VIOLATION'GROUP BY timestamp, event_id, content_rawORDER BY timestamp DESCLIMIT 200;
```

### Count of violations by action type (daily)[​](#count-of-violations-by-action-type-daily "Direct link to Count of violations by action type (daily)")

```
SELECT  DATE(timestamp) AS day,  jsonPayload.ai_security.action AS action,  COUNT(1) AS countFROM `YOUR_PROJECT.ai_security.ai_security`WHERE jsonPayload.ai_security.event_type = 'VIOLATION'GROUP BY day, actionORDER BY day DESC;
```

### Top validation metadata keys/values (for model debugging)[​](#top-validation-metadata-keysvalues-for-model-debugging "Direct link to Top validation metadata keys/values (for model debugging)")

```
SELECT  vm.key, vm.value, COUNT(1) AS occurrencesFROM `YOUR_PROJECT.ai_security.ai_security`,UNNEST(jsonPayload.ai_security.validation_metadata) AS vmGROUP BY vm.key, vm.valueORDER BY occurrences DESCLIMIT 200;
```

## Useful investigative workflows[​](#useful-investigative-workflows "Direct link to Useful investigative workflows")

1.  **Triage a single finding**
    -   Start with the `event_id` from the Findings dashboard or the `Run ID`.
    -   Query `event_id` in BigQuery to fetch `content_raw`, `content_metadata` and `validation_metadata`.
    -   Inspect LLM call traces / `llm_call` and `agent_span` fields (if present) to see prompt / response context.
2.  **Find similar incidents**
    -   Use `content_metadata.RESOURCE_ID` or normalized `content_raw` hashes to group similar violations.
    -   Search by `validation_metadata` keys (e.g., model label or confidence buckets) to identify common false positives.
3.  **Root cause of skipped users / digest generation issues**
    -   Combine `digest` entries with workflow/compiler logs (`workflow`, `workflow_compiler`) in the exported fields to see enqueue vs execution differences.
4.  **Automated daily rollups**
    -   Create scheduled queries that aggregate violations by agent, tool, and resource; write results to `ai_security_reporting` dataset for dashboards.

## Best practices & operational recommendations[​](#best-practices--operational-recommendations "Direct link to Best practices & operational recommendations")

-   **Minimize scanned bytes:** Project only needed fields (avoid `SELECT *`). Use `UNNEST()` carefully and filter early.
-   **Protect PII:** `content_raw` may contain sensitive user content. Limit access via IAM and consider creating sanitized views that mask or redact `content_raw` before sharing with wider teams.
-   **Stored procedures & saved queries:** Convert complex investigation SQL into stored procedures or saved queries for repeatable triage.
-   **Alerting:** For high-severity events (e.g., many `BLOCK_REQUEST` in short window), schedule queries to write a metric table and tie it to Cloud Monitoring or a Cloud Function that publishes alerts.
-   **Retention & export:** Define retention in BigQuery or set up periodic exports for offline ML if long-term analysis is required.

## Example: create a reusable view for violation triage[​](#example-create-a-reusable-view-for-violation-triage "Direct link to Example: create a reusable view for violation triage")

```
CREATE OR REPLACE VIEW `YOUR_PROJECT.ai_security.violation_triage` ASSELECT  timestamp,  jsonPayload.ai_security.event_id AS event_id,  jsonPayload.ai_security.event_type AS event_type,  jsonPayload.ai_security.user_id AS user_id,  jsonPayload.ai_security.action AS action,  jsonPayload.ai_security.event_description AS description,  jsonPayload.ai_security.content_raw AS content_raw,  ARRAY(    SELECT AS STRUCT key, value FROM UNNEST(jsonPayload.ai_security.content_metadata)  ) AS content_metadata,  ARRAY(    SELECT AS STRUCT key, value FROM UNNEST(jsonPayload.ai_security.validation_metadata)  ) AS validation_metadataFROM `YOUR_PROJECT.ai_security.ai_security`WHERE jsonPayload.ai_security.event_type = 'VIOLATION';
```

Use this view for faster queries, RBAC (grant view access without giving raw table access), and reducing accidental exposure of raw logs.

## Troubleshooting tips[​](#troubleshooting-tips "Direct link to Troubleshooting tips")

-   If queries are slow/expensive:
    -   Add time filters, use partition pruning, cluster by high-cardinality fields, and avoid scanning `content_raw` unnecessarily.
-   For reproducible investigations:
    -   Capture the exact SQL and result snapshot (e.g., export query output to Cloud Storage) to preserve context for later audits.
