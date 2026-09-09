# Field 5: Custom Code Support

**Category:** 4.9.2 - Agent & Workflow Builder  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 10 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for ceilings, template inventory, trigger latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Confluence, Snowflake/BigQuery/Databricks, GitHub, Gong, etc.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Custom Code Support.md](../../../test/Glean/4.9.2 Agent & Workflow Builder/Custom Code Support.md)

---

**Field definition:** Capability to insert custom scripts or programming libraries into workflows.  
**Prerequisites / Licensing:** Agents API token (Beta); optional Git ADLC repo.  
**Overall custom code rating (Doc-Verified):** **API/YAML layer yes; in-workflow user code no.**  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Headless builder](https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder) · [Agents API overview](https://developers.glean.com/api/client-api/agents/overview) · [Import agent](https://developers.glean.com/api/client-api/agents/import-agent) · [Auto mode sandboxed execution](https://docs.glean.com/agents/auto-mode-agent)

### Customization paths

| Mechanism | What you write | In Workflow steps? | Status |
|---|---|---|---|
| `spec.yaml` + `instructions.md` | Agent definition files | N/A (file-based) | Doc-Verified |
| Agents API / JSON import-export | Programmatic agent CRUD | N/A | Beta |
| Git ADLC sync | Versioned agent repo | N/A | Doc-Verified |
| MCP / custom execute actions | External tool definitions | Invoked as tools | Doc-Verified |
| Auto sandboxed code execution | Platform-managed analysis runtime | Auto runtime only | Not user-authored Python/JS in canvas |
| Custom code block in Workflow canvas | - | **No evidence** | Not supported |

### Engineering observation (Doc-Verified)

- Engineering teams extend agents via **API, headless files, MCP** - not embedded scripting inside Workflow steps.
- Auto mode **sandboxed code execution** is platform-controlled analysis sandbox (PTC), not arbitrary user libraries in the builder.
- Tenant baseline (NL Auto agent over Drive + Notion) needs **zero custom code**.

### Verification steps / test case

1. Export Auto agent to JSON; re-import via UI or API.
2. Create headless `.glean/agents/` spec; publish via Git ADLC or plugin path if enabled.
3. Confirm Workflow builder has no "custom code" step type.
4. Document API Beta badge in Admin if visible.

**Risk & Cost Impact:** Risk: Low (baseline) / Medium (API Beta drift) | Cost: Native

---
