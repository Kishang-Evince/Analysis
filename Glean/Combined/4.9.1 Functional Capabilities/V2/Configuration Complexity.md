**Glean Tier 3 Advanced Evaluation**
**Configuration Complexity - Independent Fresh Research (V2)**

*Independent research, fresh 2026-09-10. Field definition: "The level of technical effort required to configure standard workflows."*

**Sr No mapping:** rows 1-4 map 1:1 to [test/V2/Configuration Complexity.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Configuration%20Complexity.md).

## Claims

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Baseline Assistant setup is documented as a short, 2-phase process | [docs.glean.com/get-started/golive/setup-glean-assistant](https://docs.glean.com/get-started/golive/setup-glean-assistant) | Phase 1 (required): Activate → Assign teammates (all users or test group) → Enable - 3 steps. Phase 2 (optional): Customize (LLM selection, content restrictions, custom instructions, disclaimer). |
| 2 | Vendor explicitly recommends a phased rollout rather than full activation, implying real deployment risk | [docs.glean.com/get-started/golive/setup-glean-assistant](https://docs.glean.com/get-started/golive/setup-glean-assistant) | *"enabling Glean Assistant for a test group first before proceeding with the broader organization"* - a risk-mitigation recommendation, not a purely cosmetic option. |
| 3 | Optional customization adds real configuration surface area beyond the minimal baseline | [docs.glean.com/get-started/golive/setup-glean-assistant](https://docs.glean.com/get-started/golive/setup-glean-assistant) | Four distinct optional decision points: LLM provider/access method, content exclusion/inclusion rules, up to 5 custom instructions, disclaimer text - each requiring its own admin judgment call. |
| 4 | No published time-to-configure benchmark exists for a baseline deployment | Absence checked via targeted search | No first-party page found stating an expected setup duration (hours/days) for the documented steps - this must be measured directly rather than cited from docs. |

## Confidence
**Doc-Verified**, 1 first-party source, 2026-09-10.
