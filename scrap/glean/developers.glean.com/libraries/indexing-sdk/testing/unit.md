---
url: "https://developers.glean.com/libraries/indexing-sdk/testing/unit"
canonical: "https://developers.glean.com/libraries/indexing-sdk/testing/unit"
title: "Unit testing | Glean Developer"
description: "Phase 1 - test connectors with a fully mocked Glean client and no network access"
fetched_at: "2026-09-01T13:23:05.121Z"
---
On this page

Run this from the CLI

`glean-idx test --phase mock` runs this phase without writing a test file and mocks Glean. It leaves the connector's source clients unchanged, so use static clients when the phase must make no network calls. See the [CLI reference](/libraries/indexing-sdk/cli).

Phase 1 runs your connector end to end with the Glean API mocked and static data on the source side. No network, no credentials, milliseconds per test. This is where most of your connector tests should live.

## run\_connector[​](#run_connector "Direct link to run_connector")

Pair `run_connector` with a static data client:

```
from glean.indexing.testing import StaticDataClient, run_connectorresult = run_connector(    MyConnector("myds", StaticDataClient([        {"id": "1", "title": "Doc 1", "url": "https://example.com/1"},        {"id": "2", "title": "Doc 2", "url": "https://example.com/2"},    ])))result.assert_documents_posted(count=2, datasource="myds")
```

It returns a `MockGleanClient` that recorded everything the connector sent.

Static clients exist for each connector shape:

| Client | Pairs with |
| --- | --- |
| `StaticDataClient` | `BaseDatasourceConnector`, `BasePeopleConnector` |
| `StaticStreamingDataClient` | `BaseStreamingDatasourceConnector` |
| `StaticAsyncStreamingDataClient` | `BaseAsyncStreamingDatasourceConnector` |

## Assertions[​](#assertions "Direct link to Assertions")

```
result.assert_documents_posted(count=2, datasource="myds")result.assert_employees_posted(count=10)result.assert_users_posted(count=5)result.assert_groups_posted(count=2)result.assert_memberships_posted(count=8)result.assert_datasource_configured(name="myds")
```

Omit `count` to assert only that something was posted.

For anything more specific, read the recorded objects directly:

```
docs = result.documents_postedassert [d.id for d in docs] == ["1", "2"]assert docs[0].title == "Doc 1"assert docs[0].body.text_content.startswith("Welcome")assert docs[0].updated_at == 1769956200        # epoch seconds, not a string
```

Available collections: `documents_posted`, `employees_posted`, `users_posted`, `groups_posted`, `memberships_posted`.

## Async connectors[​](#async-connectors "Direct link to Async connectors")

Use the async runner:

```
import pytestfrom glean.indexing.testing import StaticAsyncStreamingDataClient, run_connector_async@pytest.mark.asyncioasync def test_async_connector():    result = await run_connector_async(        MyAsyncConnector("myds", StaticAsyncStreamingDataClient(fixtures))    )    result.assert_documents_posted(count=10)
```

Calling `run_connector()` on an async connector from inside a running event loop raises a `RuntimeError` telling you to use `run_connector_async` — rather than the confusing `asyncio.run() cannot be called from a running event loop` you'd otherwise get.

## Testing modes and options[​](#testing-modes-and-options "Direct link to Testing modes and options")

```
from glean.indexing.models import ConnectorOptions, IndexingModeresult = run_connector(    connector,    mode=IndexingMode.INCREMENTAL,    options=ConnectorOptions(force_restart=True),)
```

## Driving index\_data yourself[​](#driving-index_data-yourself "Direct link to Driving index_data yourself")

When you need to interleave calls or inspect state between them, use the context manager instead:

```
from glean.indexing.testing import mock_glean_clientwith mock_glean_client() as client:    connector.configure_datasource()    connector.index_data(mode=IndexingMode.INCREMENTAL)    client.assert_datasource_configured(name="myds")    client.assert_documents_posted(count=2)
```

The yielded client is a facade over a `MagicMock(spec=Glean)`, so the whole generated client surface is reachable — and typos fail loudly rather than silently passing:

```
client.indexing.documents.bulk_index.assert_called_once()   # real methodclient.indexing.documents.bluk_index                        # AttributeError
```

`@with_mock_glean_client` is the decorator form; it injects the client as the first positional argument.

info

`mock_glean_client()` skips the automatic output validation that `run_connector()` performs. Prefer `run_connector()` unless you specifically need manual control.

## Guarding against real network calls[​](#guarding-against-real-network-calls "Direct link to Guarding against real network calls")

The SDK's own suite uses `pytest-socket` to fail any test that opens a socket. It's a cheap way to guarantee a "unit" test stayed a unit test:

```
pytest -p no:socket tests/unit
```

## What to test here[​](#what-to-test-here "Direct link to What to test here")

-   `transform()` output: field mapping, timestamp conversion, MIME types.
-   Edge cases in source data: missing optional fields, empty strings, unicode.
-   Permission mapping — see [Permissions](/libraries/indexing-sdk/permissions).
-   Empty result sets, and that a single malformed record doesn't abort the batch.

What you *can't* test here is whether your assumptions about the source's real responses are correct. That's [Phase 2](/libraries/indexing-sdk/testing/integration).
