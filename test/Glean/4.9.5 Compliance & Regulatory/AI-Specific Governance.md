# Field 9 — AI-Specific Governance

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [AI-Specific Governance.md](../../../Glean/Combined/4.9.5 Compliance & Regulatory/AI-Specific Governance.md)

---

**Requires Protect+ license.**

| # | Test | Expected | Observed |
|---|---|---|---|
| 1 | Protect+ tabs visible in Admin | AI Security + Findings | |
| 2 | Prompt injection in chat | Finding flagged/blocked | |
| 3 | Malicious instruction in Drive doc — Assistant query | Indirect injection Finding | |
| 4 | Toxic content policy test | Block or flag | |
| 5 | Bias-specific runtime control | expect **none** documented | |

Phased rollout: start **Flag for review** before **Block**.

---
