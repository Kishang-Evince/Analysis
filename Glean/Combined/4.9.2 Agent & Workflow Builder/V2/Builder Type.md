**Glean Tier 3 Advanced Evaluation**
**Builder Type - Independent Fresh Research (V2)**

*Independent re-research, not a re-verification of the prior draft - sources picked and read fresh this pass, cross-checked 2026-09-08 against `www.glean.com`, `developers.glean.com`, `docs.glean.com`, `help.glean.com`, `community.glean.com`.*

**Sr No mapping:** rows 1-12 below map 1:1 to the same Sr No in the companion test guide [test/V2/Builder Type.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Builder%20Type.md) - same number, same claim, doc-sourced here / tenant-tested there.

## Scope note

Original field definition: *"Primary design model of the editor (Visual Drag-and-Drop, Code-First, Natural Language Directives, Hybrid)."* 7 independent pages read cold this pass.

---

## Classification: **Hybrid**

Every source converges on the same architecture, described in slightly different words each time.

## Claims (Sr No 1-12, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | New-agent flow opens with a binary choice: "Build with Natural Language" vs. "Start from Scratch" | [create-your-first-agent](https://docs.glean.com/agents/create-agents/create-your-first-agent) | Tutorial opens with exactly this binary choice, both options on one screen. |
| 2 | NL path auto-generates the step sequence | [create-your-first-agent](https://docs.glean.com/agents/create-agents/create-your-first-agent) ; [ai-agents/agent-builder](https://www.glean.com/ai-agents/agent-builder) | *"Provide plain-language instructions... Glean will build it for you."* |
| 3 | Scratch path drops into a visual canvas | [create-your-first-agent](https://docs.glean.com/agents/create-agents/create-your-first-agent) | Canvas shows trigger + steps flow, plus a step-configuration side panel. |
| 4 | Canvas has an "Open Panel" for NL edits, not just NL-at-creation | [create-your-first-agent](https://docs.glean.com/agents/create-agents/create-your-first-agent) | NL editing is embedded *inside* the visual canvas, not a separate mode - the single strongest piece of evidence for Hybrid over "two separate modes." |
| 5 | Workflow mode = fixed, step-by-step, no autonomous re-planning at runtime | [docs.glean.com/agents/](https://docs.glean.com/agents/) | *"Create your first Workflow agent - Build a fixed, step-by-step agent."* |
| 6 | Auto mode plans dynamically at runtime | [docs.glean.com/agents/](https://docs.glean.com/agents/) | *"Create an Auto mode agent - recommended... describe, refine, and test."* Doc-tree itself splits these into two top-level pages, not a footnote distinction. |
| 7 | Direct API Integration path works without a framework | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) | Named as one of 5 distinct build paths on the index page. |
| 8 | LangChain integration | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) | Named path; Agent Toolkit's `[langchain]` extra is the concrete mechanism. |
| 9 | MCP path | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) | Named path - Glean consumable as an MCP-connected tool from IDE/host clients. |
| 10 | Agent Toolkit is genuinely framework-agnostic (not LangChain-exclusive) | [developers.glean.com/guides/agents/overview](https://developers.glean.com/guides/agents/overview) | Cross-framework toolkit named as its own distinct path, separate from the LangChain-specific one. |
| 11 | Headless builder supports Auto mode only, Workflow mode explicitly unsupported | [create-agent-via-headless-builder](https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder) | Verbatim: *"The headless builder supports Auto mode agents. It does not support Workflow mode agents."* Callout box labeled "Auto mode only." |
| 12 | `help.glean.com` 301-redirects to `docs.glean.com/en/` | direct fetch, [help.glean.com/en/](https://help.glean.com/en/) | Help center and docs merged into one property as of this pass (2026-09-08) - infra finding, not part of the original field definition but relevant to the SOW's resource list. |

## Additional source (no numbered claim - null result)

| Source | Finding |
|---|---|
| [community.glean.com](https://community.glean.com/) ("Gleaniverse") | No builder-specific thread surfaced on the homepage; confirms "Glean Agents" as a named product line in the community footer. No test-guide item - nothing to verify. |

## Independent read: why "Hybrid" and not something narrower

- Not **pure NL** (would fail claims 1, 3, 5, 11) - Scratch/Workflow paths exist as first-class, deterministic alternatives.
- Not **pure visual drag-and-drop** (would fail claims 2, 4) - every visual description pairs with NL in the same breath, including NL editing embedded in the canvas.
- Not **pure Code-First** (would fail claims 1-6) - code paths (7-10) are real and plural but sit alongside the no-code builder for a different user, not as the only path.
- **Hybrid** is the only label that survives all 12 claims without contradiction.

## Confidence

**Doc-Verified**, multi-source (7 independent pages), validation date 2026-09-08. No sandbox/tenant access used - everything above is publicly readable without login. Tenant verification of all 12 claims tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Classification | Hybrid (NL + visual canvas + code-first APIs/SDKs/frameworks) | 1-11 |
| Minimum viable path for non-technical business user | Natural language, zero code | 1-2 |
| Code-first surface | Not one path - 4 named (Direct API, LangChain, MCP, Agent Toolkit) | 7-10 |
| Structural evidence | Doc tree splits Auto mode (NL-first) vs Workflow mode (step-by-step) into separate top-level pages | 5-6 |
| Notable UX detail | NL editing available *inside* the visual canvas ("Open Panel") | 4 |
| Headless builder scope | Auto mode only, Workflow explicitly unsupported | 11 |
| Infra finding (new) | help.glean.com now redirects to docs.glean.com - help center and docs merged | 12 |
