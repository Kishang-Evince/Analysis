# Field 8: Data Processing Agreements

**Category:** 4.9.5 - Compliance & Regulatory  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 9 fields drafted (Doc-Verified baseline) · Contract artifacts Pending (Trust Portal, BAA, DPA PDFs, SOC 2 scope)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Data Processing Agreements.md](../../../test/Glean/4.9.5 Compliance & Regulatory/Data Processing Agreements.md)

---

**Field definition:** CCPA/GDPR aligned data protection clauses and sub-processor controls.  
**Prerequisites / Licensing:** Legal team; DPA execution.  
**DPA availability (Doc-Verified):** **DPA at `glean.com/legal/dpa`**; subprocessors list published; GDPR claimed.  
**DPA executed (Pending Sandbox):** _TBD — legal_  
**Confidence Level:** **Doc-Verified** (DPA/subprocessor transparency) · **Pending Contract** (CCPA-specific language)  
**Validation Date:** September 3, 2026  
**Source URLs:** [DPA](https://glean.com/legal/dpa) · [Subprocessors](https://www.glean.com/legal/subprocessors) · [Legal page](https://www.glean.com/legal) · [MCP security / DPA reference](https://docs.glean.com/administration/platform/mcp/security) · [Meeting transcription consent](https://docs.glean.com/user-guide/assistant/meeting-notes/transcription-and-consent)

### DPA and sub-processor posture

| Artifact | Location | Notes |
|---|---|---|
| Data Processing Addendum | `glean.com/legal/dpa` | Referenced in MCP + transcription docs |
| Subprocessors list | `glean.com/legal/subprocessors` | Updated July 28, 2026 in scrap |
| GDPR | Claimed on legal page | |
| CCPA | Not explicit in product docs | Likely privacy policy / DPA — legal review |
| Subprocessor change notice | `privacy@glean.com` per subprocessors page | |

### Representative subprocessors (Vendor-Stated)

AWS, Google, Microsoft (cloud/LLM), OpenAI, Anthropic, Palo Alto Networks (AI security) — customer can influence cloud/LLM location via deployment + BYOK choices.

### Engineering observation (Doc-Verified)

- BYOK reduces third-party LLM sub-processor exposure vs Universal Key.
- MCP remote servers inherit DPA and SOC-aligned security program per MCP security doc.
- EU data subjects: pair DPA with regional residency settings (4.9.4 Field 5).

### Verification steps / test case

1. Legal obtains executed DPA.
2. Map subprocessors to your LLM routing (Universal Key vs BYOK).
3. Confirm regional residency with account team if EU subjects involved.
4. Subscribe to subprocessor change notifications.

**Risk & Cost Impact:** Risk: Low (standard enterprise DPA) | Cost: Native

---
