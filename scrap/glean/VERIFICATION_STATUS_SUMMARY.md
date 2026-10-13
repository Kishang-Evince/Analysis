# Verification Status Summary

*Snapshot of where `scrap/YES_ROWS_VERIFICATION_PLAN.md` and `Client Drafts/Glean_Analysis_Draft_3.xlsx` stand, 2026-09-21.*

## Numbers

- 59 "Check Required: Yes" rows total, split into 3 buckets in the verification plan.
- All 59 have a Comments entry in the plan doc - none blank.
- In the xlsx: 36 of 59 rows now `Confidence Level: Tested`. 23 still `Vendor-Stated`, honestly marked pending/partial, not silently skipped.
- As-Of Date: all 851 rows in the xlsx filled - 790 at the original research date, 42 at today (rows touched this session), 23 at the legal-PDF source date.

## Bucket A - Portal/UI test (32 rows)

Confirmed/passing: Sr6, Sr9, Sr15, Sr30 (4.9.1); Builder Type Sr1,2,5,6; Agent Autonomy Sr1,2,6,7; Human-in-the-Loop Sr1,2; Explainability Sr4; Audit Trail Completeness Sr1,2,4,6; Non-Technical UX Sr2; Decision Explanation Sr1,5; Audit Trail for AI Actions Sr1,2; Human-Readable Output Sr1.

Still pending: Sr10 (Universal Key/BYOK - not able to verify), Sr38 (unclear outcome), Builder Type Sr3 (canvas not tested), Hallucination Sr4 (note incomplete), Sr7/Sr9 (need ~1hr each), Model Selection Sr1/Sr2 (need ~1hr each), Non-Technical UX Sr4 (desktop app not installed).

Flagged, needs re-check: Access Control Granularity Sr1,2,5,8 - the note attached describes Audit Trail testing, not this field's actual Salesforce/FLS claim. Was copy-pasted into the wrong field, not yet fixed.

## Bucket B - Script/API tested (12 rows)

Confirmed/passing: Sr8 (rate-limit, sub-second), Sr20 (3 REST surfaces), Sr26 (Indexing SDK write, with the `datasourceVisibility` caveat), Error Handling Sr1/Sr2, Performance Sr2 (real quota captured: 12 req/sec), API Architecture Sr1-4, API Depth Sr1.

Still pending: Sr21 (Python SDK - not tested), Sr22 (TS SDK - partial, SDK's own call path not independently confirmed), Access Control Sr6 (need more time).

## Bucket C - Not independently verifiable (5 real rows + 2 standing rules)

All 5 real rows confirmed as correctly classified, with first-person notes tying back to actual findings from this session (Debug mode, REST surface tests, etc). No action needed - these are fine by design, not gaps.

## Pending rows, with current comment

| Bucket | Sheet | Field | Sr No | Status | Current comment |
|---|---|---|---|---|---|
| A | 4.9.1 | Features Confirmed | 10 | Not able to verify | not able to verify |
| A | 4.9.1 | Features Confirmed | 38 | Unclear outcome | Yes, without tool they can't perform any operation untill you allows tools to perform write action without permission |
| A | 4.9.2 | Builder Type | 3 | Not tested | canvas is not tested (part of combined Sr1,2,3,5,6 note) |
| A | 4.9.3 | Hallucination Controls | 4 | Note incomplete | Since we are using it't |
| A | 4.9.3 | Hallucination Controls | 7 | Needs ~1hr | Need 1hr to test |
| A | 4.9.3 | Hallucination Controls | 9 | Needs ~1hr | Need 1hr to test |
| A | 4.9.3 | Model Selection - Flexibility | 1 | Needs ~1hr | Need 1hr to test it |
| A | 4.9.3 | Model Selection - Flexibility | 2 | Needs ~1hr | Need 1hr to test it |
| A | 4.9.5 | Access Control Granularity | 1, 2, 5, 8 | Wrong comment attached, needs real re-test | Audit logs verified, for GCE logs & OTLP need setup but still verfied using glean assistent & search... *(this is Audit Trail content, not Salesforce/FLS - was copy-pasted into the wrong field)* |
| A | 4.9.6 | Non-Technical User Experience | 4 | Not tested | not downloaded glean's desktop app but there is option to download decktop app from app.glean platform as well for further testing need to download it |
| B | 4.9.1 | Features Confirmed | 21 | Not tested | NOT TESTED - no Python script written; covered TypeScript instead (Sr 22). |
| B | 4.9.1 | Features Confirmed | 22 | Partial | PARTIAL. SDK installs/instantiates fine; original call needed admin scope (real 403, not SDK bug). Switched to raw REST for further tests. |
| B | 4.9.5 | Access Control Granularity | 6 | Needs more time | Need more time to test. |

## What's left to actually close

1. Fix Access Control Granularity Sr1,2,5,8 - wrong comment attached, needs the real Salesforce/FLS test run.
2. Run the ~5 hours of remaining Bucket A UI tests (Sr10, Builder Type Sr3, Hallucination Sr4/7/9, Model Selection Sr1/2, Non-Technical UX Sr4).
3. Bucket B: write + run a Python SDK script (Sr21), re-confirm the TypeScript SDK's own call path with proper scope (Sr22), run the permission-latency test once a source-system revoke is set up (Access Control Sr6).
