**Glean Tier 3 Advanced Evaluation**
**Custom Code Support — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/agents/create-agents/create-agent-via-headless-builder` and `docs.glean.com/agents/auto-mode-agent`, plus a fresh search confirming no code-block step type exists in the visual canvas. Field definition: "Capability to insert custom scripts or programming libraries into workflows." Base file at [`../Custom Code Support.md`](../Custom%20Code%20Support.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Custom Code Support.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Custom%20Code%20Support.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The base research's "API/YAML layer yes; in-workflow user code no" conclusion is reconfirmed directly. This pass adds one new, real detail: the headless builder is explicitly natural-language-prompt-driven, not code-driven — agents are created via a `/glean_run` command in a coding environment using plain-language prompts, not by writing agent logic in a programming language. Auto mode's sandboxed code execution is confirmed real but the documentation is explicitly vague about which languages/libraries it supports or whether arbitrary code is possible — this vagueness itself is worth flagging rather than assuming a specific technical scope.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The headless builder's file structure (`spec.yaml`, `instructions.md`) is confirmed directly, and is explicitly natural-language-prompt-driven, not code-driven — a real, previously-uncaptured nuance about how this customization path actually works | [docs.glean.com/agents/create-agents/create-agent-via-headless-builder](https://docs.glean.com/agents/create-agents/create-agent-via-headless-builder) | Confirmed directly: `spec.yaml` is *"main agent specification (contains the agent `id`)"* and `instructions.md` is the *"system prompt / agent instructions."* The page *"focuses on creating agents through natural language prompts using the `/glean_run` command in coding environments"* — meaning even this developer-facing path is prompt-based configuration, not programmatic logic authoring. The page makes no mention of embedding custom code or scripting. |
| 2 | Auto mode's sandboxed code execution is confirmed to be real, but the documentation is explicitly and deliberately vague about its technical scope — no language, library, or arbitrary-code capability is confirmed or denied | [docs.glean.com/agents/auto-mode-agent](https://docs.glean.com/agents/auto-mode-agent) | Verbatim: *"Auto mode can use sandboxed execution and dynamic context handling as part of the broader agent runtime"* for *"research, analysis, and other workflows that benefit from intermediate computation."* This pass's own fetch explicitly noted: *"The documentation is deliberately vague on the technical details — it only confirms that sandboxed code execution exists as a feature... without detailing the actual implementation constraints or user capabilities."* This should be reported as a genuine documentation gap, not assumed to mean either "full Python support" or "no real computation" — it's simply unconfirmed either way. |
| 3 | No custom code/script step type exists in the visual Workflow canvas — reconfirmed via a fresh, independent search rather than just repeated from the base research | Search-corroborated, fresh search this pass | Multiple independent descriptions of Agent Builder consistently describe it as a *"no-code visual canvas"* with steps limited to *"reading data, writing to data sources, drafting content, or updating external systems"* via pre-built Actions — no search result named a code/script step type anywhere. |
| 4 | The remaining customization paths (Agents API/JSON import-export as Beta, Git ADLC sync, MCP/custom execute actions) remain accurate on cross-reference to this project's own prior research | Cross-referenced from the base research's own already-confirmed source list | No changes needed to these attributions this pass — this pass's fresh research focused specifically on the headless builder and Auto-mode sandbox nuances (claims 1-2), which had the most room for added precision. |

## Independent read

- Claim 1 is a genuinely useful clarification for setting expectations with a client's engineering team: "headless" here means file-based agent *configuration*, invoked via natural-language prompts, not a code-authoring SDK — a team expecting to write Python logic that becomes agent behavior would be disappointed by what this path actually offers.
- Claim 2's honest "documentation is vague" framing is the right way to handle this — rather than guessing at Auto mode's sandbox capabilities from silence, this should be flagged as a real gap worth asking Glean about directly if a client's use case depends on knowing exactly what computation is possible there.

## Confidence

**Doc-Verified** for claims 1, 2 (direct fresh fetches, with claim 2's vagueness itself directly confirmed). **Search-corroborated** for claim 3. **Cross-referenced** for claim 4. Validation date 2026-09-09. Tenant/hands-on verification (an actual headless-builder test, an actual Auto-mode sandboxed-execution probe) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Headless builder | Confirmed: prompt-driven via `/glean_run`, not code-authoring | 1 |
| Auto mode sandbox scope | Confirmed real but deliberately undocumented in technical detail | 2 |
| Workflow canvas code-block step | Confirmed absent, independently re-verified | 3 |
| Remaining customization paths | Reconfirmed via cross-reference | 4 |
