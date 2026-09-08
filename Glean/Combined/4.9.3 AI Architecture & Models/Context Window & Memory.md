# Field 8: Context Window & Memory

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Context Window & Memory.md](../../../test/Glean/4.9.3 AI Architecture & Models/Context Window & Memory.md)

---

**Field definition:** Maximum token count supported and session-level context retention.  
**Prerequisites / Licensing:** Memory requires **GCP + Universal Key** per feature matrix; BYOK may lack memory.  
**Context handling (Doc-Verified):** Glean-managed per model; **GPT-4.1 1M token** leverage documented; agent memory log + `[[step]]` references; read-document trimming.  
**Observed limits (Pending Sandbox):** _TBD — max Sheet/Doc size before truncate warning_  
**Confidence Level:** **Doc-Verified** (mechanisms) · **Pending Sandbox** (numeric per-model caps)  
**Validation Date:** September 3, 2026  
**Source URLs:** [July 2025 release — 1M context](https://docs.glean.com/release-notes/releases/2025-07-16-july-release) · [How agents work — memory log](https://docs.glean.com/agents/how-agents-work) · [Read document tool](https://docs.glean.com/tools/glean/read-document) · [Memory personalization](https://docs.glean.com/administration/assistant/configuration/memory-personalization) · [LLM key feature availability](https://docs.glean.com/administration/llm-key-feature-availability)

### Context and memory features

| Feature | Behavior | Tenant availability |
|---|---|---|
| Large doc ingest | Read-document tool trims to fit model window; partial-read warning | Drive PDF/Doc/Sheet |
| Agent memory log | Step outputs persist; configurable inheritance | All agents |
| Assistant Memory | Saved + extracted per-user preferences | **GCP + Universal Key only** |
| Multi-turn chat | Prior messages in session context | Assistant + Chat agents |
| Token overflow | `token_limit_exceeded` (Field 7 E4 in 4.9.1) | Huge Sheet/Doc in chat |

### Engineering observation (Doc-Verified)

- Per-model context limits **not enumerated** in admin docs — Glean abstracts selection and trimming.
- Memory is **user-isolated**; does not grant document access beyond ACLs.
- If tenant uses BYOK on non-GCP deployment, Memory UI may be absent.

### Verification steps / test case

1. Attach large Drive PDF to agent — note partial-read warning threshold.
2. Multi-turn chat: reference earlier message without re-pasting — confirm retention.
3. Check Settings → Personalization for Memory (if Universal Key + GCP).
4. Paste huge `Stratos_Connector_Test_Sheet` — trigger truncate or `token_limit_exceeded`.

**Risk & Cost Impact:** Risk: Low | Cost: Metered on long-context models

---
