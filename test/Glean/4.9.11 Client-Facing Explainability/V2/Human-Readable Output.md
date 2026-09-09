# 4.9.11 Human-Readable Output — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Human-Readable Output.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Human-Readable%20Output.md). The key upgrade is accessibility: Glean maintains a formal ACR covering WCAG 2.0/2.1/2.2 Levels A and AA, not just a vague statement. This guide's job is to spot-check the accessibility claim directly and run the standard User B clarity exercise. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Glean Assistant/Search sandbox · a keyboard-only or screen-reader test session
**Companion research doc:** [V2/Human-Readable Output.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Human-Readable%20Output.md)
**Base field doc (untouched, original):** [../Human-Readable Output.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/Human-Readable%20Output.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** A non-technical "User B" tester; optionally, a screen reader or keyboard-only test setup.

**Sr No mapping:** Sr No 1-5 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Human-Readable Output.md](../../../../Glean/Combined/4.9.11%20Client-Facing%20Explainability/V2/Human-Readable%20Output.md#claims-sr-no-1-5-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Confirming Answers behavior and the accessibility upgrade — Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Answers support markdown/links/audience targeting | Create a test Answer with markdown formatting and department targeting, and confirm it renders correctly. | Confirmed. | | | ~15 min, Easy |
| 2 | Featured vs. blended surfacing works as described | Seed a high-confidence Answer and a lower-confidence one; confirm the former appears at top, the latter blends into ranked results. | Confirmed. | | | ~15 min, Easy |
| 3 | Slack `/glean` surface (context only, not tenant-stack) | If your organization has Slack, note whether this surface is relevant; otherwise mark N/A. | N/A or confirmed. | | | ~5 min, Easy |
| 4 | The accessibility ACR and WCAG conformance claims are real | 1. Request the actual Accessibility Conformance Report from Glean (via a11y@glean.com or your account team).<br>2. Do a spot-check keyboard-only navigation test in the Assistant UI. | You get the real ACR document and confirm basic keyboard navigation works. | | Elevate this into any accessibility-compliance conversation for a healthcare client | ~30 min, Easy |

## Section 2 — Running the standard clarity exercise — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Known friction points (token limits, OAuth errors) still apply | Reuse or re-run the User B clarity exercise from the base test guide, and specifically watch for these two error types. | Confirmed. | | | ~30 min, Easy |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Answers behavior + accessibility upgrade | 4 | | | | |
| 2. Standard clarity exercise | 1 | | | | |
