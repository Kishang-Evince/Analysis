---
url: "https://developers.glean.com/libraries/indexing-sdk/"
canonical: "https://developers.glean.com/libraries/indexing-sdk/"
title: "Indexing SDK | Glean Developer"
description: "Build custom Glean connectors in Python - fetch from any source, transform to Glean documents, and index with permissions"
fetched_at: "2026-09-01T13:23:04.214Z"
---
Indexing SDK

# Describe your source. Get a connector.

Install the Connector Builder plugin and tell your coding agent what you want indexed. It explores the source's API, plans the connector with you, generates it against this SDK, and tests it before anything reaches your index.

Install the plugin[Write it by hand](/libraries/indexing-sdk/quickstart)

terminalConnector Builder

$ claude plugin marketplace add gleanwork/glean-indexing-sdk
✔ Added marketplace: glean-indexing-sdk
$ claude plugin install glean-connector-builder@glean-indexing-sdk
✔ Installed: glean-connector-builder
\> Build a connector for our internal wiki at wiki.acme.com.
  It has a REST API with cursor pagination and per-page ACLs.
● Reading the wiki API docs
● Confirmed scope: 12,400 pages, 3 permission groups
● Generating connector.py, data\_client.py, tests
● Phase 1 tests: 8 passed, 0 failed
● Ready to index - run it when you are

## Install the Connector Builder

Point your agent's plugin host at the SDK repository, which doubles as the marketplace.

Claude CodeCodexCodex Cursor

terminalClaude Code

claude plugin marketplace add gleanwork/glean-indexing-sdk
claude plugin install glean-connector-builder@glean-indexing-sdk

Run /reload-plugins to pick it up without restarting.Invoke explicitly with `/glean-connector-builder:connector-builder`, or just describe your source.

### Then describe your source

I want to push my Webex data to Glean. Build a connector for me.

Build a connector for our internal wiki at wiki.acme.com. It has a REST API with cursor pagination, and each page carries a list of groups that can read it.

The agent asks for whatever scope it still needs, confirms a plan with you, generates the connector, and runs the mocked and recorded test phases before offering to index anything. Hosts pull from the repository, so updating is a marketplace refresh rather than a rebuild - `claude plugin marketplace update glean-indexing-sdk`, then `claude plugin update glean-connector-builder@glean-indexing-sdk`.

## What the agent does

Eight skills coordinate the build. You confirm scope and review the result; the agent does the reading, wiring, and iterating.

1

Describe the sourceYour code

Plain language is enough: what system, what content, and who should be able to see it.

2

Explore the APISDK

Reads the source's documentation to establish endpoints, auth, pagination, and where permissions live.

3

Confirm the planYour code

Scope, connector type, and permission model come back for your approval before any code is written.

4

GenerateSDK

Writes the data client and connector against this SDK, including pagination, rate limiting, and ACL mapping.

5

TestSDK

Runs the mocked phase, then the real-source phase against recorded fixtures - before anything is uploaded to Glean.

6

Review, then indexYour code

Check the review items below, then run a full crawl and confirm documents are searchable.

### The eight skills

`connector-builder`Top-level workflow coordinating the rest.

`connector-api-exploration`Reading and confirming the source's API documentation.

`connector-auth`Authentication patterns for source systems.

`connector-pull`Data clients, pagination, rate limiting.

`connector-push`Uploading documents and identities.

`connector-testing`The three-phase testing workflow.

`connector-observability`Logging and metrics wiring.

`connector-deployment`Generating and applying deployment artifacts.

They encode the same guidance as these docs - notably crawl semantics, the rule most easily got wrong: a full crawl must cover the entire confirmed scope before completing, because stale-document deletion removes anything absent from the run. The sources live in [`skills/`](https://github.com/gleanwork/glean-indexing-sdk/tree/main/skills) if you want to add one.

## Before you trust it, review these

An agent produces a plausible connector quickly. These are the places a plausible connector is most often wrong - and the reason the rest of these docs exist.

[PermissionsAre real ACLs attached, and does get\_identities() push the users and groups they reference? An allow-all default is the most consequential thing to miss.](/libraries/indexing-sdk/permissions)[Full-crawl completenessDoes the data client raise on a failed page rather than returning what it has? A short result set deletes documents as stale.](/libraries/indexing-sdk/push/error-handling)[Timestampscreated\_at and updated\_at must be epoch seconds, not ISO strings. This fails silently - documents just sort wrong.](/libraries/indexing-sdk/quickstart)[Rate limitingConfigured against your source's real quota, not left at the conservative default of one retry.](/libraries/indexing-sdk/pull/rate-limiting)[Incremental crawlsIf it claims incremental support, does it override \_get\_last\_crawl\_timestamp()? Without that, since is always None.](/libraries/indexing-sdk/concepts/indexing-modes)[Run the real testsGenerated code is written against the API docs. Phase 2 checks it against what the source actually returns.](/libraries/indexing-sdk/testing/integration)

## Two methods, five stages

Whether an agent writes it or you do, a connector is the same pipeline. This is the shape of what gets generated.

Source systemYour wiki, catalog, database

`get_source_data()`Fetch raw records

`transform()`Map to Glean documents

`PushUploader`Batch, retry, upload

Glean indexSearchable, permission-aware

You write thisThe SDK handles thisExternal system

## What's in the box

The agent wires these up as your source needs them. Each page is also the reference for doing it yourself.

[Connector typesFour base classes: in-memory, sync streaming, async streaming, and people.](/libraries/indexing-sdk/concepts/connector-types)[Pull integrationsHTTP client with retries and backoff, three pagination modes, token-bucket rate limiting.PullHttpClient](/libraries/indexing-sdk/pull/http-client)[Push & indexingDocuments, users, groups, memberships, employees - batched and uploaded in parallel.PushUploader](/libraries/indexing-sdk/push/uploader)[PermissionsPer-document ACLs plus the identity graph that makes them evaluate.](/libraries/indexing-sdk/permissions)[TestingThree phases: fully mocked, real-source record and replay, and live end-to-end.TestHarness](/libraries/indexing-sdk/testing/overview)[ObservabilityStructured logs and per-stage timings, with optional CloudWatch and Google Cloud plugins.](/libraries/indexing-sdk/observability)[Status & debuggingAnswer "why is my document not in search?" without guessing.glean-idx document](/libraries/indexing-sdk/status-and-debugging)[DeploymentGenerate Docker and Terraform for a scheduled job on AWS or GCP.glean-idx deploy](/libraries/indexing-sdk/deployment/overview)

## Pick a base class

The four connector types differ in how data flows through them, not in what they produce. Start with the first if you're unsure.

BaseDatasourceConnector

The whole dataset fits comfortably in memory. Wikis, service catalogs, config databases.

Data client`BaseDataClient`

Produces`DocumentDefinition`

Peak memoryWhole dataset

BaseStreamingDatasourceConnector

The dataset is large or paginated and your source client is synchronous.

Data client`BaseStreamingDataClient`

Produces`DocumentDefinition`

Peak memoryOne batch

BaseAsyncStreamingDatasourceConnector

Same as streaming, but your source client is async - httpx.AsyncClient, aiohttp.

Data client`BaseAsyncStreamingDataClient`

Produces`DocumentDefinition`

Peak memoryOne batch

BasePeopleConnector

You're indexing employee and identity records rather than documents.

Data client`BaseDataClient`

Produces`EmployeeInfoDefinition`

Peak memoryWhole dataset

## Three test phases, one added dependency at a time

Each phase swaps exactly one thing from mocked to real, so a failure tells you which layer broke.

[

1Unit

SourceMocked

GleanMocked

SpeedMilliseconds

CredentialsNone

run\_connector with a static data client. No network at all.

Does transform() produce the documents I expect?

](/libraries/indexing-sdk/testing/unit)[

2Integration

SourceReal

GleanMocked

SpeedFast after first run

CredentialsSource only

Records real source responses to NDJSON, then replays them offline.

Does my data client parse what the source really returns?

](/libraries/indexing-sdk/testing/integration)[

3End-to-end

SourceReal

GleanReal

SpeedSlow

CredentialsSource + Glean

No mocking. Uploads to whatever GLEAN\_SERVER\_URL points at.

Does the whole thing work against a live instance?

](/libraries/indexing-sdk/testing/end-to-end)

## SDK or the Indexing API directly?

Both push into the same index. The difference is how much you build yourself.

Indexing SDKIndexing API directly

LanguagePythonAny HTTP client

Batching and upload sessionsBuilt inYou implement it

Retries and rate limitingBuilt inYou implement it

Pagination against your sourceBuilt inYou implement it

Testing without a live instanceBuilt inYou implement it

Structured logging and metricsBuilt inYou implement it

Deployment scaffoldingglean-idx deploy generates itYou implement it

Use the **SDK** for a connector that runs on a schedule against a source system - most custom connectors. Use the **API directly** when indexing from a non-Python service, pushing occasional one-off documents, or attaching [custom metadata](/api-info/indexing/custom-metadata/overview) to documents already in Glean. The SDK is a client for the Indexing API, not a replacement - the [API documentation](/api-info/indexing/getting-started/overview) stays the reference for the wire protocol.
