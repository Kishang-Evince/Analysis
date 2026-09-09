**Glean Tier 3 Advanced Evaluation**
**Native Connectors - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `www.glean.com` and `docs.glean.com`. Field definition: "List of pre-built, out-of-the-box integrations supported directly by the vendor." Base file at [`../Native Connectors.md`](../Native%20Connectors.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Native Connectors.md](../../../../test/Glean/4.9.4%20Integration%20&%20Technical/V2/Native%20Connectors.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The 275+ connector count is real and organized into 12 functional categories, but no setup-time figure is published anywhere - a direct gap against this field's own evaluation methodology. What *is* published, and genuinely useful, is a per-connector refresh-rate table - the closest thing to a documented reliability/freshness metric, ranging from under 5 minutes (webhook-driven connectors) to as slow as 3 days for one specific data type.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | 275+ connectors are claimed, organized into 12 named functional categories, with no per-category count breakdown published | [www.glean.com/platform/connectors](https://www.glean.com/platform/connectors) | *"275+ out-of-the-box connectors."* Categories: Sales & Marketing, Engineering & Analytics, Documents, Project Management, HR, Support, Communication, Design, Learning & Enablement, Calendar, Single sign-on, Intranet. No count shown per category. |
| 2 | "Native" connectors are structurally distinct from the "Push API"/custom connector path - the 275+ figure likely spans both, not one uniform connector type | [docs.glean.com/connectors/about](https://docs.glean.com/connectors/about) | Native: *"Purpose-built for specific applications (for example, Slack, Salesforce, Google Drive). They call source APIs directly to support extensive data crawling, attachment crawling, threaded results parsing, thread mentions, and additional source-specific capabilities."* Push API connectors: *"Ideal for custom applications, self-hosted environments, or systems behind firewalls"* - data pushed in via the Indexing API rather than pulled via a native integration. |
| 3 | No connector setup-time figure is published anywhere checked - marketing language is qualitative ("instantly," "easily") not quantified | [www.glean.com/platform/connectors](https://www.glean.com/platform/connectors) | *"Easily integrate 275+ apps across ecosystems out of the box"* and *"Connect to all your apps, instantly"* - no specific minutes/hours setup-time claim found on this or any connector-catalog page checked. A direct, checkable gap against this field's evaluation methodology, which explicitly asks to test setup times. |
| 4 | A real, quantified reliability/freshness metric does exist per connector - refresh/crawl rate - ranging from under 5 minutes to multiple days depending on the specific app and data type | [docs.glean.com/connectors/crawling-refresh-rates](https://docs.glean.com/connectors/crawling-refresh-rates) | Fastest tier (webhook-driven, near real-time): Slack, Jira, GitLab all `<5m`. Mid tier (API-polling incremental crawl): Google Drive, Box, SharePoint, Salesforce all `10m`; Microsoft Teams, GitHub, Zendesk, ServiceNow (Catalog), Airtable, most HR connectors `1h`; Zoom `6h`. Slowest documented: ServiceNow Knowledge Articles at `3d`. |
| 5 | Refresh mechanism itself varies by connector - some are event-driven (webhook, near-instant), others are scheduled polling (fixed interval) - this is a real architectural difference, not just a speed difference | [docs.glean.com/connectors/crawling-refresh-rates](https://docs.glean.com/connectors/crawling-refresh-rates) | Explicitly webhook-based: Slack (*"Near-immediate updates via webhook"*), Jira, GitLab, newer Confluence versions. Explicitly API-polling/incremental crawl: Teams, Zoom, Salesforce, ServiceNow, Airtable, most HR connectors. A buyer needing true real-time freshness for a specific app should check which mechanism that specific connector uses, not assume uniform behavior across the 275+ catalog. |
| 6 | The slowest documented refresh rate (ServiceNow Knowledge Articles, 3 days) is a real, specific outlier worth knowing about for any buyer relying on that data type | [docs.glean.com/connectors/crawling-refresh-rates](https://docs.glean.com/connectors/crawling-refresh-rates) | ServiceNow itself has two different rates depending on data type: Catalog data at `1h`, but Knowledge Articles specifically at `3d` - a single connector can have meaningfully different freshness depending on which content type within it is being asked about. |

## Independent read

- Claim 3 is the field's cleanest gap: the evaluation methodology explicitly asks to test setup time, and no public figure exists to check against - this can only be closed by an actual timed setup in a tenant, tracked in the companion test guide.
- Claims 4-6 are the strongest, most concrete data this field can offer - a per-connector, per-data-type refresh table is a far more useful "reliability" signal than the generic 275+ count, and it's genuinely published, not inferred.
- Claim 6 matters specifically for a healthcare/knowledge-base-heavy buyer: if ServiceNow Knowledge Articles are a primary content source, a 3-day refresh lag is materially different from the sub-hour rates most other connectors get, and should be surfaced explicitly rather than assumed uniform with the rest of the catalog.

## Confidence

**Doc-Verified**, 3 independent first-party sources, validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant/hands-on verification (an actual timed connector setup, and confirming real-world refresh behavior) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Connector count & categories | 275+, 12 functional categories, no per-category breakdown | 1 |
| Native vs. Push API/custom | Two structurally different connector types under one headline number | 2 |
| Setup time | Not published anywhere - genuine gap | 3 |
| Refresh-rate table | Real, per-connector, published - <5min to 3 days | 4 |
| Refresh mechanism | Webhook (event-driven) vs. scheduled polling - varies by connector | 5 |
| Slowest documented case | ServiceNow Knowledge Articles, 3 days | 6 |
