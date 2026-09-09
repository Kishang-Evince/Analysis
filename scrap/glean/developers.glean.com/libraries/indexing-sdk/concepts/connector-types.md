---
url: "https://developers.glean.com/libraries/indexing-sdk/concepts/connector-types"
canonical: "https://developers.glean.com/libraries/indexing-sdk/concepts/connector-types"
title: "Connector types | Glean Developer"
description: "Choose the right Glean Indexing SDK base class for your data volume and source API"
fetched_at: "2026-09-01T13:23:04.527Z"
---
On this page

The SDK ships four connector base classes. They differ in how data flows through them, not in what they produce.

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

If you're unsure, start with `BaseDatasourceConnector`. Switching to a streaming variant later means changing the base class and the return type of `get_source_data()` - `transform()` is unchanged.

## In memory[​](#in-memory "Direct link to In memory")

`get_source_data()` returns a `Sequence`. The connector fetches everything, transforms everything, then uploads in batches of `batch_size` (default 1000).

```
class WikiDataClient(BaseDataClient[WikiPage]):    def get_source_data(self, since=None, **kwargs):        return fetch_all_pages()class WikiConnector(BaseDatasourceConnector[WikiPage]):    configuration = CustomDatasourceConfig(name="wiki", display_name="Wiki")    def transform(self, data):        return [to_document(page) for page in data]
```

Peak memory holds every source record **and** every transformed document at once. At a few hundred thousand documents that becomes the binding constraint - and the fix is a streaming connector, not a smaller batch size, because batching happens after transform.

## Sync streaming[​](#sync-streaming "Direct link to Sync streaming")

`get_source_data()` is a generator. The connector pulls `batch_size` items at a time, transforms that slice, and uploads it before pulling more.

```
from collections.abc import Generatorfrom glean.indexing.connectors import (    BaseStreamingDataClient,    BaseStreamingDatasourceConnector,)class ArticleDataClient(BaseStreamingDataClient[Article]):    def get_source_data(self, **kwargs) -> Generator[Article, None, None]:        page = 1        while True:            batch = fetch_page(page)            if not batch:                return            yield from batch            page += 1class ArticleConnector(BaseStreamingDatasourceConnector[Article]):    configuration = CustomDatasourceConfig(name="articles", display_name="Articles")    def transform(self, data):        return [to_document(article) for article in data]
```

Note that `transform()` still receives a `Sequence` - the SDK slices the generator into batches for you. You never write batching logic. Full-mode batches form one replacement upload; incremental-mode batches use additive `index_documents()` calls.

tip

If your source is a paginated HTTP API, use [`BasePullHttpStreamingDataClient`](/libraries/indexing-sdk/pull/data-clients) instead of hand-rolling the loop above. It handles pagination, retries, and rate limiting.

## Async streaming[​](#async-streaming "Direct link to Async streaming")

Same model, async generators. Drive it with `index_data_async()`.

```
from collections.abc import AsyncGeneratorfrom glean.indexing.connectors import (    BaseAsyncStreamingDataClient,    BaseAsyncStreamingDatasourceConnector,)class EventDataClient(BaseAsyncStreamingDataClient[Event]):    async def get_source_data(self, **kwargs) -> AsyncGenerator[Event, None]:        async for event in stream_events():            yield eventclass EventConnector(BaseAsyncStreamingDatasourceConnector[Event]):    configuration = CustomDatasourceConfig(name="events", display_name="Events")    def transform(self, data):        return [to_document(event) for event in data]await connector.index_data_async(mode=IndexingMode.FULL)
```

`transform()` stays synchronous. Only fetching is async.

Push identities separately

The sync and async streaming connector implementations do not call the optional `get_identities()` crawl inherited from `BaseDatasourceConnector`. If streamed documents reference datasource users or groups, upload those identities before the streaming content run.

info

Async connectors also expose the synchronous `index_data()`, which wraps the async path in `asyncio.run()`. That works from a plain script but fails inside an existing event loop. In tests, use `await run_connector_async(...)`; `run_connector()` raises a clear error if you call it on an async connector from inside a running loop.

## People[​](#people "Direct link to People")

`BasePeopleConnector` produces `EmployeeInfoDefinition` instead of `DocumentDefinition`. Configuration, `batch_size`, and observability behave the same.

```
class EmployeeConnector(BasePeopleConnector[EmployeeRecord]):    configuration = CustomDatasourceConfig(name="hris", display_name="HRIS")    def transform(self, data):        return [to_employee(record) for record in data]
```

Employee data feeds Glean's people directory and knowledge graph. It's distinct from the **datasource identities** (users, groups, memberships) that back document ACLs - see [Permissions](/libraries/indexing-sdk/permissions).

## Batch size[​](#batch-size "Direct link to Batch size")

All four classes expose `batch_size`, defaulting to 1000.

```
connector = WikiConnector(name="wiki", data_client=client)connector.batch_size = 250
```

Lower it if your documents are large enough to hit upload timeouts. For timeout and concurrency tuning, see [Batching and throughput](/libraries/indexing-sdk/push/batching).
