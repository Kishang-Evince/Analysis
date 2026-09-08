**Glean Tier 3 Advanced Evaluation**  
**Error Handling & Recovery**

*Section 4.10.1, "Error Handling & Recovery" \- re-evaluated with precise, hands-on technical detail from the SDK and Agent Toolkit source*

| Confidence Score | Verification Status | Source Basis |
| :---- | :---- | :---- |
| **90 / 100** | Verified (hands-on, expanded) | Direct SDK/Agent Toolkit source and README review |

*This is the highest-confidence field in the entire Functional Capabilities assessment (90/100) \- error handling is one of the few areas where hands-on SDK/source review gives near-complete visibility without needing live tenant access, since it's all implemented in open-source client code.*

# **1\. Typed Errors (Retained From Original Assessment)**

Every SDK exception carries structured, programmatically inspectable fields: status\_code, message, raw\_response, and body. General errors (400/401/408/429/4XX/5XX) surface as a typed GleanError. Permission and validation failures (403/422) surface as a more specific GleanDataError with a structured .data payload a developer can branch on directly \- not just a generic HTTP error with a status code attached.

# **2\. Fully Parameterized Retry Configuration**

Retry behavior isn't just an on/off switch \- RetryConfig accepts a named BackoffStrategy with four explicit tunable values: initial interval, max interval, a multiplier, and a max-elapsed-time budget (e.g., RetryConfig("backoff", BackoffStrategy(1, 50, 1.1, 100), false)). A developer can tune exactly how aggressively the client retries, rather than accepting a fixed default.

# **3\. Environment-Variable Retry Tuning in the Agent Toolkit**

The Agent Toolkit additionally exposes the same retry knobs as environment variables \- GLEAN\_RETRY\_INITIAL, GLEAN\_RETRY\_MAX, GLEAN\_RETRY\_MULTIPLIER, GLEAN\_RETRY\_MAX\_ELAPSED \- confirmed with a worked example for a "low-latency, bounded retries" configuration. This means retry behavior can be tuned per-deployment without a code change or redeploy.

# **4\. What Actually Gets Retried**

Confirmed explicitly: automatic retries cover HTTP 429 (rate limit) and 5xx (server error) responses, AND connection timeouts \- not just rate-limit responses as the original assessment implied. This is a broader safety net than initially found.

# **5\. Operational Nuance: Retry Budget Can Look Like a Hang**

| A genuine debugging trap worth knowing about in advance: connection errors (an unreachable or unresolvable host) are retried for up to GLEAN\_RETRY\_MAX\_ELAPSED seconds before the client finally fails. A misconfigured server\_url will therefore appear to "hang" for that entire window rather than fail immediately with a clear error \- a developer unaware of this could waste real time assuming their own code is stuck. |
| :---- |

# **6\. Input Validation Confirmed**

GLEAN\_SERVER\_URL is validated for a proper https:// scheme \- a bare hostname is rejected immediately with a clear error message, rather than failing confusingly deep inside the first actual API request. This is a small but real quality-of-life detail for anyone setting up the SDK for the first time.

# **7\. Agent-Specific Error Isolation (New Finding)**

Inside the Agent Toolkit, a genuinely thoughtful design choice was found: ctx.get\_client() raises a plain ValueError for missing/invalid configuration (a setup-time failure), but individual tool-call errors during an agent run are wrapped into structured ToolResults rather than raised as exceptions. In practice, this means one failed tool call inside a multi-step agent workflow does not crash the entire agent run \- the agent framework can see the failure and potentially recover or route around it.

# **8\. Proactive Error Avoidance for Large Files**

Beyond reactive error handling, the SDK documentation explicitly recommends streaming file uploads rather than reading an entire file into memory, specifically to avoid out-of-memory crashes on very large files. This is a design choice that prevents a class of error before it happens, rather than just handling it gracefully after the fact.

# **9\. Error Handling Is a First-Class Documented Topic**

"Error Handling" appears as its own named section in the TypeScript SDK's documentation table of contents, alongside Retries, Server Selection, Custom HTTP Client, and Debugging. This confirms Glean's SDK team treats error handling as a dedicated, first-class concern in the developer experience, not an afterthought bolted onto a getting-started guide.

# **Limitations & Enterprise Impact**

**Limitation:** All of this is confirmed at the SDK/API and Agent Toolkit layer only. UI-level error handling for business users (what a non-technical employee actually sees when something goes wrong in the chat interface) remains untested \- no sandbox/live-tenant access exists for this research.

**Enterprise Impact:** This is a well-engineered error/retry contract that meaningfully reduces integration risk for any team building on Glean's API. The retry-budget-causes-hang nuance and per-tool-call error isolation in the Agent Toolkit are exactly the kind of detail that prevents production incidents \- worth sharing directly with any engineering team that will integrate against this API, since these aren't the kind of things a sales demo would ever surface.

# **Sources**

\- github.com/gleanwork/api-client-python (official Python SDK README)

\- github.com/gleanwork/glean-agent-toolkit (official Agent Toolkit README)

\- npmjs.com/package/@gleanwork/api-client (official TypeScript SDK documentation)

\- pypi.org/project/glean-api-client (official PyPI package documentation)