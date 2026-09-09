# 4.9.3 Private / Local Instance Support — Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Private - Local Instance Support.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Private%20-%20Local%20Instance%20Support.md). The core finding there is that the answer to "does Glean support private/local models" depends entirely on which layer of the product you're looking at — the Admin Console (no) vs. the developer-facing Agent Toolkit (yes, one path). This guide's job is to confirm both halves are correct, and to actually measure the one thing docs never state: latency. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Platform → Models (Model Hub) · a terminal with Python for the developer-path tests
**Companion research doc:** [V2/Private - Local Instance Support.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Private%20-%20Local%20Instance%20Support.md)
**Base field doc (untouched, original):** [../Private - Local Instance Support.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/Private%20-%20Local%20Instance%20Support.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console, to inspect the Model Hub screen.
- For Sr No 3-4 and 6 only: a Python 3.10+ environment, the Glean Agent Toolkit installed (`pip install glean-agent-toolkit`), and — if you want to actually run the private path, not just read about it — an NVIDIA NIM microservice you or your team can stand up (this can be a small local/on-prem instance; it does not need to be production-scale to test the connection).
- If you don't have an NVIDIA NIM instance available to actually run, you can still complete Sr No 3-4 as a documentation/config-review check and mark the live-connection portion `Blocked (no NIM instance available)`.

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Private - Local Instance Support.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Private%20-%20Local%20Instance%20Support.md#claims-sr-no-1-6-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine UI clicking, quick to judge) or `Hard` (needs a private NIM instance, a Python environment, or timed comparisons) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the Admin Console has no private/local model option — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The standard Admin Console model-selection screen only lets you pick from named commercial providers (OpenAI, Google, Anthropic, Amazon, Meta) — there's no field anywhere to type in your own private/custom model endpoint | 1. Log in as Admin.<br>2. Go to **Admin Console → Platform → Models** (Model Hub).<br>3. Go through every screen/tab related to adding or configuring a model.<br>4. Specifically look for any option like "Custom endpoint," "Private model," "On-prem," "Bring your own model," or a free-text URL field for a model server. | You find only a fixed list of named commercial providers to choose from — no free-text or "custom" option to point at your own privately hosted model. | | | ~10 min, Easy |
| 2 | If your tenant uses a Customer Key (BYOK), you're still limited to the same list of named providers — just restricted to whichever ones are reachable from your specific cloud (AWS or GCP), not opened up to a private model option | 1. Confirm whether your tenant uses a Customer Key or the Glean Universal Key (ask your admin/account team if unsure).<br>2. If Customer Key: check whether the list of available providers is narrower than the full Universal Key list, and whether it's narrower specifically along cloud-provider lines (e.g. certain providers missing because your key is AWS-only or GCP-only). | The Customer Key list is a subset of named commercial providers restricted by cloud — not a wider option that includes a private/custom model. | | | ~10 min, Easy |

## Section 2 — Confirming the one real private-model path (developer-level, NVIDIA NIM) — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Using the developer-facing Agent Toolkit (code, not the Admin Console), you can point Glean at a privately hosted NVIDIA NIM model server instead of NVIDIA's public cloud API, by setting a `base_url` parameter | **If you have a NIM instance available:** 1. Stand up (or use an existing) NVIDIA NIM microservice on infrastructure you control (a private cloud VM, on-prem server, etc).<br>2. In a Python script using the Glean Agent Toolkit, configure the NIM connection with `base_url` pointing at your private instance's address instead of the default NVIDIA cloud endpoint.<br>3. Run a test agent call through it. **If you don't have a NIM instance:** do steps 1-2 as a config review only (confirm the `base_url` parameter genuinely exists and works as documented) and mark the live-run portion `Blocked (no NIM instance available)`. | The private NIM instance successfully serves the model request — proving the connection is real, not just a documentation claim. If blocked, at minimum confirm the `base_url` parameter is real and accepted without error. | | This is the single most important row in this guide — it's the one place a genuinely private local model path is claimed to exist | ~45 min, Hard (needs a working NIM instance + Python environment) |
| 4 | Without any extra configuration, the same example defaults to NVIDIA's own public cloud API (`build.nvidia.com`), not a private path — private deployment is something you have to deliberately set up | 1. Follow the NVIDIA NIM example's default setup instructions exactly as written, using only an NVIDIA API key from `build.nvidia.com` (no `base_url` override).<br>2. Run it and confirm it works. | The default, out-of-the-box configuration works and clearly uses NVIDIA's public cloud service — confirming that the private path (Sr No 3) is opt-in extra work, not the default behavior. | | | ~15 min, Hard (needs a Python environment + NVIDIA API key) |

## Section 3 — Making sure "private hosting" claims aren't being confused across different product areas — Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Glean's flexible hosting language for custom connectors (data/tool integrations) is a completely separate capability from private model hosting, and shouldn't be quoted as if it answers this field | 1. Read through Glean's custom connector deployment documentation.<br>2. Confirm it only discusses where the connector/data-integration code runs (your cloud vs. Glean's), and contains no mention of hosting the LLM/generative model itself. | You confirm the connector-hosting flexibility and the model-hosting question are clearly two separate topics in Glean's own documentation — so this connector flexibility should never be cited as evidence for or against private *model* support. | | This is a sanity-check row to prevent a common mistake in the write-up, not a capability test | ~10 min, Easy |

## Section 4 — Measuring the one thing nobody documents: latency (closing a real gap) — Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | No Glean documentation states how much slower (or faster) a private/local NIM model is compared to the default cloud API — this has to be measured directly | **Requires a working private NIM instance from Sr No 3.** 1. Run the identical prompt/request through the default cloud path (Sr No 4's setup) and time how long the response takes, start to finish.<br>2. Run the exact same prompt/request through the private NIM path (Sr No 3's setup) and time it the same way.<br>3. Repeat each 3-5 times and take the average, since network conditions vary run to run. | You end up with two real, comparable average response times (e.g. "cloud path averaged 2.1 seconds, private path averaged 0.8 seconds") — a concrete number that fills a real gap in Glean's public documentation. | | If Sr No 3 was blocked (no NIM instance), this row is automatically `Blocked` too — note that clearly rather than leaving it empty | ~30 min, Hard (multiple timed runs, requires Sr No 3's setup) |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Private - Local Instance Support.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Private%20-%20Local%20Instance%20Support.md), and specifically add the real latency numbers from Sr No 6 to close that documentation gap.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Admin Console has no private-model option | 2 | | | | |
| 2. Developer-level NVIDIA NIM private path | 2 | | | | |
| 3. Avoiding connector/model confusion | 1 | | | | |
| 4. Latency measurement | 1 | | | | |
