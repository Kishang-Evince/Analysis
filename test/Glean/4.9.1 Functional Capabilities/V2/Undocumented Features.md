# 4.9.1 Undocumented Features — Independent Research Test Guide

**Purpose:** Hands-on reproduction of every finding in the companion research doc [V2/Undocumented Features.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Undocumented%20Features.md), using the tenant's real test stack wherever the finding can be exercised against real content.

**Tenant entry:** A Python scratch venv + Glean API token · Admin Console → Platform → Models · Admin Console → Agent trace/observability settings
**Companion research doc:** [V2/Undocumented Features.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Undocumented%20Features.md)
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.
**Out of scope:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery, GitHub, etc.

**Prerequisites:**
- Complete [Pre-Flight](../Pre-Flight.md): `Stratos_Connector_Test_Doc`/`Stratos_Connector_Test_Sheet` in Google Drive, Notion page shared with the Glean integration, Gmail/Outlook messages, Teams channel message.
- Python 3.10+ scratch venv with `pip install glean-api-client`, a Glean API token.
- Admin/Super Admin console access for Sr No 3, 6-8.
- A Governance-API-scoped token for Sr No 7 (ask your admin if you don't have one).

**Sr No mapping:** Sr No 1-8 map 1:1 to the research doc's claims table.
**How to record a result:** `Pass`/`Fail`/`Partial`/`Blocked` in Result, plus one line in Notes on exactly what you observed.
**Effort column:** minutes + `Easy`/`Hard` difficulty tag.

---

| Sr No | Finding | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | `debug_logger` / `GLEAN_DEBUG` work as documented | 1. In a scratch script, run `logging.basicConfig(level=logging.DEBUG)` then `Glean(debug_logger=logging.getLogger("glean.api_client"))`.<br>2. Search for `Stratos_Connector_Test_Doc` through this client and confirm the full HTTP request/response is printed to your console.<br>3. Repeat without the explicit logger, instead setting the `GLEAN_DEBUG=true` environment variable before running the script. | Full request/response logged both ways, identically. | | | ~15 min, Hard (needs Python env) |
| 2 | `exclude_deprecated_after` / `include_experimental` change behavior as documented | 1. Call the Search API for `Stratos_Connector_Test_Sheet` once with default settings.<br>2. Call it again with `include_experimental=True` set on the client.<br>3. Compare the two responses for any additional fields or behavior difference.<br>4. Repeat using the `X_GLEAN_INCLUDE_EXPERIMENTAL` environment variable instead of the constructor argument. | Behavior visibly differs between the default call and the experimental-enabled call, both via constructor arg and via env var. | | | ~15 min, Hard |
| 3 | Regional governance of open models is a real, working admin control | 1. Confirm your tenant uses the Glean Universal Key (Admin Console → Platform → Models).<br>2. Locate the region-based control for open/third-party models.<br>3. Toggle a region restriction and confirm the list of available models visibly changes. | Toggling the region control changes which models are actually selectable. | | Mark `Blocked` if your tenant uses a Customer Key instead | ~20 min, Hard |
| 4 | Go SDK genuinely compiles and works against real tenant content | 1. Run `go get github.com/gleanwork/api-client-go` in a scratch Go module.<br>2. Write a minimal client call that searches for `Stratos_Connector_Test_Doc`.<br>3. Run it and confirm it compiles and returns a real result referencing that document. | Compiles cleanly and returns the actual document, not an error or empty result. | | | ~25 min, Hard (needs Go toolchain) |
| 5 | Waldo's benchmarked latency improvement is observable on real content | 1. Ask Assistant a question requiring retrieval from `Stratos_Connector_Test_Doc` with Adaptive Reasoning enabled (if togglable in your tenant); time the response.<br>2. Ask the same question with Adaptive Reasoning disabled; time it again. | The Adaptive-Reasoning-enabled response is noticeably faster to first token, roughly consistent with the documented ~50% improvement. | | | ~20 min, Hard |
| 6 | Agent trace export to an external observability tool actually works | 1. Configure OTLP export to one supported tool you have access to (e.g. Datadog or Grafana).<br>2. Run an Auto-mode agent that fetches `Stratos_Connector_Test_Doc`, the Notion page, and the Teams message.<br>3. Check the external tool for the resulting spans. | Spans for the agent run, tool calls, and LLM calls are all visible in the external observability tool. | | | ~40 min, Hard (needs an external observability tool account) |
| 7 | `setdocvisibility` can really hide/unhide a document tenant-wide | 1. Using a Governance-API-scoped token, call `setdocvisibility` to hide `Stratos_Connector_Test_Doc`.<br>2. As **Admin A**, search for it — expect zero hits.<br>3. As **User B** (who normally can see it), search for it too — expect zero hits for them as well.<br>4. Call `setdocvisibility` again to unhide it, and confirm both users can find it again. | The document disappears from search for every user while hidden, and reappears for everyone once unhidden. | | Use this test document only — never a real production document | ~25 min, Hard (needs Governance API token) |
| 8 | Agent prompt draft/rollback tooling works as documented | 1. Build or open an Auto-mode agent whose instructions reference `Stratos_Connector_Test_Sheet`.<br>2. Publish a draft change to its instructions (e.g. change the output format).<br>3. Confirm the new behavior in a test run.<br>4. Use the rollback control to revert to the prior published version, and confirm the agent's behavior reverts too. | Rollback successfully restores the prior instructions and prior behavior. | | | ~20 min, Easy |

---

## Result Rollup

| Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|
| 8 | | | | |

Copy results back into [V2/Undocumented Features.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Undocumented%20Features.md).
