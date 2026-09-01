---
url: "https://developers.glean.com/libraries/indexing-sdk/observability"
canonical: "https://developers.glean.com/libraries/indexing-sdk/observability"
title: "Observability | Glean Developer"
description: "Structured logging, metrics, and cloud provider plugins for Glean connectors"
fetched_at: "2026-09-01T13:23:04.472Z"
---
On this page

Every connector base class creates a `ConnectorObservability` instance and wires it into the indexing lifecycle. You get stage timings, item counts, and structured logs without adding any instrumentation.

```
connector.index_data(mode=IndexingMode.FULL)print(connector.observability.get_metrics_summary())
```

## What you get for free[​](#what-you-get-for-free "Direct link to What you get for free")

`index_data()` times each stage separately and records counts:

| Metric | Meaning |
| --- | --- |
| `data_fetch` | Time in your data client. |
| `data_transform` | Time in `transform()`. |
| `data_upload` | Time uploading to Glean. |
| `items_fetched` | Records returned by the source. |
| `documents_transformed` | Documents produced by `transform()`. |
| `documents_indexed` | Documents handed to the uploader. |
| `indexing_errors` | Incremented when the run raises. |

Separate stage timings are the main diagnostic tool for a slow connector — see [Batching and throughput](/libraries/indexing-sdk/push/batching).

The uploader and the pull HTTP client add more when wired up: upload batch sizes, throughput, API request latency and counts, retries, and crawl success/failure.

## Structured logging[​](#structured-logging "Direct link to Structured logging")

```
from glean.indexing.observability import setup_connector_loggingsetup_connector_logging("companywiki", log_level="INFO")
```

Structured JSON logging is on by default, which is what makes logs queryable once shipped to an aggregator — "show me every event for document `page_123`" needs fields, not prose.

| Argument | Default | Purpose |
| --- | --- | --- |
| `connector_name` | — | Identifies the connector in every record. |
| `log_level` | `"INFO"` | Standard level name. |
| `log_format` | `None` | Custom format string; overrides structured logging. |
| `use_structured_logging` | `True` | Emit JSON. |
| `formatter` | `None` | Custom `logging.Formatter`; overrides the two above. |
| `extra_handlers` | `None` | Additional handlers. |
| `logger_provider` | `None` | A cloud logging provider. |

`StructuredFormatter` and `CompactStructuredFormatter` are available if you want to attach them elsewhere.

## Metrics providers[​](#metrics-providers "Direct link to Metrics providers")

`MetricsProvider` is the extension point. The default is `NoOpMetricsProvider` — metrics are recorded in-process for `get_metrics_summary()` but not exported.

```
from glean.indexing.observability import ConnectorObservability, InMemoryMetricsProviderobservability = ConnectorObservability(    connector_name="companywiki",    datasource="companywiki",    crawl_mode="full",    metrics_provider=InMemoryMetricsProvider(),)
```

| Provider | Use |
| --- | --- |
| `NoOpMetricsProvider` | Default. No export. |
| `InMemoryMetricsProvider` | Local development and tests. Exposes `get_metrics()` and `get_metric_history()`. |
| `CloudWatchMetricsProvider` | AWS. Requires the `aws` extra. |
| `CloudMonitoringProvider` | GCP. Requires the `gcp` extra. |

Each observability instance gets a `run_id` (a UUID unless you pass one), which is how you correlate every log line and metric from a single crawl. `InMemoryMetricsProvider` synchronizes concurrent metric updates, so exact counter assertions are safe during parallel uploads.

## AWS[​](#aws "Direct link to AWS")

```
pip install "glean-indexing-sdk[aws]"
```

```
from glean.indexing.observability import ConnectorObservability, setup_connector_loggingfrom glean.indexing.observability.plugins.aws import (    CloudWatchLogsProvider,    CloudWatchMetricsProvider,)setup_connector_logging(    "companywiki",    logger_provider=CloudWatchLogsProvider(        log_group="/glean/connectors",        log_stream="companywiki",        region_name="us-east-1",    ),)observability = ConnectorObservability(    connector_name="companywiki",    metrics_provider=CloudWatchMetricsProvider(        namespace="GleanConnectors",        region_name="us-east-1",        dimensions={"connector": "companywiki"},    ),)
```

The logging provider is named `CloudWatchLogsProvider` and requires both `log_group` and `log_stream`; there is no `CloudWatchLoggerProvider`.

## GCP[​](#gcp "Direct link to GCP")

```
pip install "glean-indexing-sdk[gcp]"
```

```
from glean.indexing.observability.plugins.gcp import (    CloudLoggingProvider,    CloudMonitoringProvider,)
```

info

The plugin packages import lazily. If the extra isn't installed, importing the plugin module emits a `UserWarning` naming the missing extra rather than raising — so a misconfigured deployment degrades to no telemetry instead of crashing. Check for that warning if metrics stop appearing.

warning

The cloud provider plugins are currently tested only against mocks, never against real CloudWatch or Cloud Monitoring APIs. Validate them in a staging environment before relying on them for production alerting. Tracked in [issue #108](https://github.com/gleanwork/glean-indexing-sdk/issues/108).

## Custom providers[​](#custom-providers "Direct link to Custom providers")

Subclass `MetricsProvider` and implement `emit_metric()` and `flush()`:

```
from glean.indexing.observability import MetricsProvider, MetricTypeclass StatsdMetricsProvider(MetricsProvider):    def emit_metric(self, name, value, metric_type=MetricType.GAUGE, labels=None):        ...    def flush(self) -> None:        ...
```

`record_counter()`, `record_gauge()`, and `record_histogram()` are provided on the base class in terms of `emit_metric()`.

## Manual instrumentation[​](#manual-instrumentation "Direct link to Manual instrumentation")

```
obs = connector.observabilityobs.start_timer("enrichment")enrich(documents)obs.end_timer("enrichment")obs.record_metric("enriched_documents", len(documents))obs.increment_counter("enrichment_failures")
```

`PerformanceTracker` (context manager), `@with_observability` (class decorator for automatic method logging), and `@track_crawl_progress` are also available.

info

Custom fields passed to structured logging cannot collide with reserved `LogRecord` attribute names — `ConnectorObservability` raises `ValueError` listing the conflicts rather than producing corrupted records.

## What to alert on[​](#what-to-alert-on "Direct link to What to alert on")

-   `indexing_errors` above zero, or a non-zero process exit.
-   A crawl that hasn't succeeded within its expected window.
-   `documents_indexed` dropping sharply run over run — the signal for a partial crawl that's about to delete documents as stale.

That last one is the alert worth having. See [Indexing modes](/libraries/indexing-sdk/concepts/indexing-modes).
