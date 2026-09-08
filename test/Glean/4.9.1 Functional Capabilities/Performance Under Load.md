# Field 8 — Performance Under Load

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Performance Under Load.md](../../../Glean/Combined/4.9.1 Functional Capabilities/Performance Under Load.md)

---

**Goal:** Latency curve under polite concurrency.  
**Write results to:** eval log Field 8 measured table + verdict.

### Published ceilings (Doc-Verified — do not exceed aggressively)

| Endpoint | Limit |
|---|---|
| `/search` | 5 req/s |
| `/chat` | 0.5 req/s (~30/min) |
| `/agents/runs` | 0.5 req/s |
| User token | 30 req/s |
| Deployment | 8,000 req/min |

### Measured load plan

| Stage | Concurrent | Calls | Endpoint | p50 | p95 | Error % |
|---|---|---|---|---|---|---|
| Baseline | 1 | 20 | Search (`Stratos_Connector_Test_Doc`) | | | |
| Light | 5 | 50 | Search | | | |
| Medium | 10 | 100 | Search + Chat mix | | | |
| Spike | 20 | 40 | Search only | | | Abort on sustained 429 |
| UI | 1 | 10 | App search bar (stopwatch) | | | |
| Agents | 3 | 3 | Parallel Auto agents | | | Qualitative |

**Tools:** `curl` loop or k6/hey · **Caution:** off-hours; stop on sustained 429

### Chat/Agent qualitative
1. Run 3 Auto agents (Drive + Notion) in parallel as Admin A
2. Note queueing, timeouts, answer degradation → eval log verdict paragraph

---
