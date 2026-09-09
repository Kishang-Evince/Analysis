# Field 7: Prompt Engineering Access

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Prompt Engineering Access.md](../../../test/Glean/4.9.3 AI Architecture & Models/Prompt Engineering Access.md)

---

**Field definition:** Admin/developer capability to configure system prompts, instructions, and weights.  
**Prerequisites / Licensing:** Admin for org instructions; Agent Builder for agent prompts.  
**Prompt access rating (Doc-Verified):** **Moderate-High** - org custom instructions (5 max), agent step prompts, Enhance prompt, headless `instructions.md`; **no raw system-prompt editor for frontier models**.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (injection resistance)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Custom instructions](https://docs.glean.com/administration/assistant/configuration/custom-instructions) · [Enhance prompts](https://docs.glean.com/agents/enhance-prompts) · [Agent builder](https://docs.glean.com/agents/concepts/agent-builder) · [Headless builder](https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder)

### Prompt control surfaces

| Surface | Scope | Affects retrieval? |
|---|---|---|
| Org custom instructions (≤5) | All Assistant users | **No** - LLM response style only |
| Agent step instructions | Per agent / per step | Indirect via tool/knowledge config |
| Enhance prompt | Auto-improve builder text | No |
| `instructions.md` (headless) | Auto agents | Via agent spec |
| Custom Glean App / Prompt | Retrieval biasing | **Yes** - for data selection |

### Engineering observation (Doc-Verified)

- Docs warn org instructions **can severely impact chat quality** - affects all users immediately.
- To bias retrieval toward Notion/Drive, use **custom App/Prompt** config - not custom instructions alone.
- No documented access to underlying frontier model system prompt weights.

### Verification steps / test case

1. Add instruction: *"Always cite Notion and Drive sources first in bullet format."* - verify tone, not retrieval scope.
2. Build agent with explicit step prompt; run **Enhance prompt** - compare outputs.
3. Attempt prompt injection in custom instruction - observe Protect+ if enabled (Field 9).
4. Confirm no Admin UI for raw GPT system prompt edit.

**Risk & Cost Impact:** Risk: Medium (org-wide instruction blast radius) | Cost: Native

---
