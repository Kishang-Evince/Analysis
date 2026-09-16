**Glean Tier 3 Advanced Evaluation**
**Coexistence Scenarios - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `glean.com/blog/mcp-servers-septdrop-2025` and `glean.com/blog/ai-in-life-sciences`, cross-referenced against this project's own 4.9.4 API Depth & Writeback V2 finding. Field definition: "Standard enterprise tools this system operates alongside without duplicating value." Base file at [`../Coexistence Scenarios.md`](../Coexistence%20Scenarios.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Coexistence Scenarios.md](../../../../test/Glean/4.9.9%20Competitive%20Positioning/V2/Coexistence%20Scenarios.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The "system of context" coexistence positioning is reconfirmed verbatim and precisely located. This pass adds a real, previously-unflagged caveat: Glean's remote MCP servers - the specific technical mechanism the base research cites as making coexistence "technical, not just commercial" - are confirmed to be in **public beta**, not generally available, as of the source blog post. It also corrects an oversimplification: the base research's "connectors are read-only; writeback only via governed agent tools" framing understates what this project's own 4.9.4 research already found - real Create+Update writeback exists for several third-party Actions (Salesforce, Jira, Confluence, Google Docs), just with no Delete action found anywhere. "Read-only" is not quite accurate; "no-delete, selectively-writable" is closer to the confirmed reality.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The "system of context" coexistence positioning is confirmed verbatim, in a section explicitly titled around working across the broader AI stack | [glean.com/blog/ai-in-life-sciences](https://www.glean.com/blog/ai-in-life-sciences) | Confirmed directly: *"Glean complements those investments by acting as the system of context across the enterprise,"* appearing in a section titled *"Built to work across your AI stack,"* which explicitly discusses working alongside Microsoft Copilot and ChatGPT Enterprise rather than replacing them. |
| 2 | **New, previously-unflagged caveat**: Glean's remote MCP servers - the specific mechanism cited as making coexistence technical rather than just commercial - are confirmed to be in public beta, not generally available | [glean.com/blog/mcp-servers-septdrop-2025](https://www.glean.com/blog/mcp-servers-septdrop-2025) | Confirmed directly: *"currently available in public beta."* This is a real, material caveat for any client-facing coexistence architecture diagram that treats MCP as a settled, production-ready integration layer - its beta status should be disclosed explicitly, with expectations set accordingly (potential API changes, less mature support SLAs). |
| 3 | MCP's specific, named integration points are more precise than a blanket "Cursor/ChatGPT/Claude Desktop" list - confirmed directly which tools connect via which specific mechanism | [glean.com/blog/mcp-servers-septdrop-2025](https://www.glean.com/blog/mcp-servers-septdrop-2025) | Confirmed directly: **Claude Desktop and ChatGPT** connect as chat interfaces; **Cursor** is used as the specific IDE example (for a CI/CD debugging use case). |
| 4 | **Correction**: GitHub and Confluence coexistence specifically routes through a separate Atlassian MCP server, not a direct native Glean-to-GitHub-Copilot connector as the base research's phrasing might imply | [glean.com/blog/mcp-servers-septdrop-2025](https://www.glean.com/blog/mcp-servers-septdrop-2025) | Confirmed directly: GitHub and Confluence integration happens *"via custom tools and Atlassian MCP server"* - a more specific, layered architecture than a flat "Cursor / GitHub Copilot" line suggests. Anyone diagramming this coexistence path for a client should show the Atlassian MCP server as an intermediate component, not a direct Glean-GitHub link. |
| 5 | Glean explicitly frames MCP as only one of several coexistence/integration mechanisms it supports - a broader technical picture than MCP alone | [glean.com/blog/mcp-servers-septdrop-2025](https://www.glean.com/blog/mcp-servers-septdrop-2025) | Verbatim: *"While MCP is one option for agent interoperability, Glean also supports the agent toolkit... and LangChain integrations."* This means a client whose developer tooling doesn't yet support MCP (or who is wary of its beta status per claim 2) has real, named alternative coexistence paths. |
| 6 | **Correction to a base-research oversimplification**: "connectors are read-only for indexing" understates the confirmed reality - this project's own 4.9.4 API Depth & Writeback V2 field found real Create+Update writeback for several third-party Actions, just with no Delete action found anywhere; "no-delete, selectively-writable" is more accurate than "read-only" | Cross-referenced from this project's own 4.9.4 V2 field | The 4.9.4 field directly confirmed third-party "Actions" (Salesforce/Jira/Confluence/Google Docs) support genuine Create and Update operations, not just read/index access - while confirming no Delete action exists anywhere. The base research's "read-only for indexing; writeback only via governed agent tools" framing is directionally reasonable (writeback IS gated behind governed agent tooling, not ambient) but should not be read as "connectors themselves are read-only" - the writeback capability is real and should be represented accurately in any coexistence architecture diagram, including its actual scope (Create/Update, no Delete). |

## Independent read

- Claim 2's beta-status disclosure is this pass's most consequential addition - a client architecture diagram that presents MCP-based coexistence as a stable, finished integration would be overstating its maturity, and this should be flagged explicitly in any pilot planning that depends on it.
- Claim 4's more precise integration-path detail (via Atlassian MCP server, not a direct link) matters for accurately setting client expectations about what's actually being connected to what - a client evaluating GitHub/Confluence coexistence should understand there's an intermediate dependency, not a direct Glean-native connection.
- Claim 6 is a meaningful accuracy correction: describing connectors as flatly "read-only" would understate a real capability (writeback into Salesforce/Jira/Confluence/Google Docs) that this project's own research already confirmed exists - the more precise and useful framing for a coexistence diagram is "read + selective, agent-gated writeback (no delete)," not "read-only."

## Confidence

**Doc-Verified** for claims 1, 2, 3, 4, 5 (direct fresh fetches, verbatim quotes). **Cross-referenced, high confidence - a direct correction** for claim 6. Validation date 2026-09-09. Tenant/hands-on verification (an actual architecture-boundary exercise with a client, an actual MCP beta-status disclosure in pilot planning) tracked in the companion test guide.

**Correction note, added 2026-09-14:** claim 2's MCP-public-beta framing is now outdated and this field's MCP-only framing is incomplete. As of the September 2026 MCP directory expansion, Glean's remote MCP server is production-grade (directory grew from 17 to 48+ vendor templates between March and September 2026 drops). More importantly, Glean also supports Google's Agent2Agent (A2A) protocol as a second, separate interoperability standard - see `4.9.4/V2/API Architecture Type.md` claim 7. A2A is not a variant of MCP: MCP exposes Glean's own tools to external hosts, while A2A exposes Glean Assistant itself as a remote agent to other agent runtimes/marketplaces (Google Gemini Enterprise, Microsoft Copilot Studio, etc.). Separately, the "Glean plug-in" for Cursor/Claude Code/Codex is confirmed to be a distinct mechanism from the standard remote MCP server, not just alternate branding - it dynamically discovers Glean Skills/tools via a governed gateway and can run alongside a standard MCP connection simultaneously; Claude Cowork and GitHub Copilot are explicitly NOT supported hosts for the plug-in. Any client-facing coexistence diagram should show at least three separate integration surfaces - MCP server, A2A, and the Glean plug-in - not one. Source: full-corpus sweep of this project's local Glean documentation crawl, tracked in `scrap/GLEAN_RESEARCH_MEMORY.md`.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| "System of context" positioning | Confirmed verbatim, precisely located | 1 |
| MCP maturity status | **New**: confirmed public beta, not GA - disclose in client materials | 2 |
| MCP named integration points | Confirmed: Claude Desktop, ChatGPT, Cursor | 3 |
| GitHub/Confluence integration path | Corrected: via Atlassian MCP server, not direct | 4 |
| Alternative coexistence mechanisms | Confirmed: Agent Toolkit, LangChain, beyond MCP alone | 5 |
| "Read-only" connector framing | Corrected: real writeback exists (Create/Update, no Delete) | 6 |
