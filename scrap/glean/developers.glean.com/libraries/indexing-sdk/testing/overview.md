---
url: "https://developers.glean.com/libraries/indexing-sdk/testing/overview"
canonical: "https://developers.glean.com/libraries/indexing-sdk/testing/overview"
title: "Testing overview | Glean Developer"
description: "The three-phase testing model for Glean Indexing SDK connectors"
fetched_at: "2026-09-01T13:23:05.054Z"
---
On this page

Connector bugs are expensive to find in production: a crawl either indexes nothing, indexes the wrong thing, or - worst case - deletes documents it should have kept. The SDK's testing tools exist so you find those problems before pointing a connector at a real instance.

Testing progresses through three phases. Each phase swaps exactly one dependency from mocked to real, so a failure tells you which layer broke.

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

Most of your tests should be Phase 1. Phase 2 catches the class of bug you can't mock your way to - a source field that's `null` more often than the docs suggest. Phase 3 is a pre-release check, not something you run on every commit.

From the CLI, move through the phases explicitly:

```
glean-idx test --phase mock --max-items 5glean-idx test --phase integration --max-items 5glean-idx test --phase live --mode full --max-items 5 --allow-destructive-live
```

The CLI's mock phase mocks Glean but leaves the connector's source clients unchanged; use static clients for a no-network Phase 1. Every live phase requires `--allow-destructive-live` and target confirmation. A full live phase replaces the datasource, and `max_items` only limits registered source-client consumption-it is not a Glean-side cap or blast-radius guarantee.

## The harness[​](#the-harness "Direct link to The harness")

`TestHarness` wraps a connector and drives all three phases:

```
from glean.indexing.testing import TestConfig, TestHarnessharness = TestHarness(    connector=my_connector,    config=TestConfig(),    clients={"data_client": real_data_client},   # required for Phase 2 and 3)
```

`clients` maps **connector attribute names** to data client instances. Keys must match real attributes on the connector - `AttributeError` otherwise. Phase 1 doesn't need it.

## Output validation[​](#output-validation "Direct link to Output validation")

`run_connector()` and the harness both run `validate_connector_output()` automatically, which catches structural mistakes - a document whose `datasource` doesn't match the connector, a missing required field - and raises `ConnectorOutputValidationError`. You get those checks without writing them.

## Testing permissions[​](#testing-permissions "Direct link to Testing permissions")

Every phase can assert on ACLs. Because permissions are the highest-risk part of a connector, test the negative case explicitly - see [Permissions](/libraries/indexing-sdk/permissions).
