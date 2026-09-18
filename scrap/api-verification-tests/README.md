# API Verification Tests

Test suite for verifying Glean and other provider APIs against Bucket B claims (custom code required tests).

## Structure

```
api-verification-tests/
├── package.json
├── README.md (this file)
└── glean/
    ├── rate-limit.ts              # Sr 8: Rate-limit handling + sub-second response
    ├── rest-api-surfaces.ts        # Sr 20: Three distinct REST API surfaces
    ├── typescript-sdk.ts           # Sr 22: TypeScript/JavaScript SDK
    ├── error-handling.ts           # Sr 1: Typed, structured API errors
    ├── retry-guidance.ts           # Sr 2: 429 retry-friendly guidance
    ├── rate-limit-quota.ts         # Sr 2: Exact rate-limit quota measurement
    ├── openapi-specs.ts            # Sr 1-4: OpenAPI specs published
    ├── indexing-crud.ts            # Sr 1: Indexing API CRUD operations
    └── permission-latency.ts       # Sr 6: Permission propagation latency
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your Glean credentials:
   ```bash
   GLEAN_API_TOKEN=your_api_token_here
   GLEAN_SERVER_URL=https://your-glean-instance.com
   ```

4. (Optional) Install TypeScript globally for direct `ts-node` execution:
   ```bash
   npm install -g ts-node typescript
   ```

**Note:** Environment variables are loaded from `.env` file automatically via dotenv. `.env` is git-ignored for security.

## Running Tests

### All tests
```bash
npm run test:glean:*
```

### Individual tests

Each test corresponds to a Bucket B item from the verification plan:

| Test File | Bucket B Sr # | Description | Command |
|---|---|---|---|
| rate-limit.ts | Sr 8 | Rate-limit handling + sub-second response | `npm run test:glean:rate-limit` |
| rest-api-surfaces.ts | Sr 20 | Three distinct REST API surfaces | `npm run test:glean:rest-api` |
| typescript-sdk.ts | Sr 22 | TypeScript/JavaScript SDK available | `npm run test:glean:typescript-sdk` |
| error-handling.ts | Sr 1 (Error) | Typed, structured API errors | `npm run test:glean:error-handling` |
| retry-guidance.ts | Sr 2 (Error) | 429 retry-friendly guidance | `npm run test:glean:retry` |
| rate-limit-quota.ts | Sr 2 (Perf) | Exact rate-limit quota measurement | `npm run test:glean:rate-quota` |
| openapi-specs.ts | Sr 1-4 (API) | OpenAPI specs published | `npm run test:glean:openapi` |
| indexing-crud.ts | Sr 1 (Depth) | Indexing API CRUD operations | `npm run test:glean:indexing-crud` |
| permission-latency.ts | Sr 6 (Access) | Permission propagation latency | `npm run test:glean:permission-latency` |

### Run from file directly (requires ts-node installed globally)

```bash
ts-node glean/rate-limit.ts
ts-node glean/rest-api-surfaces.ts
# etc...
```

## Test Expectations

- Exit code 0 = test passed
- Exit code 1 = test failed
- Console output includes structured results per claim

### Example output: rate-limit.ts

```
Starting rate-limit test with 50 rapid requests...
Request 1: 145ms - OK
Request 2: 132ms - OK
...
Request 32: 429 Rate Limited (98ms)
  Error structure: { status: 429, statusCode: 429, body: {...} }
...

=== Rate-Limit Test Results ===
Total Requests: 32
Successful: 31
Rate-Limit Hits (429): 1
Avg Response Time: 127.34ms
Sub-second Responses: 31
```

## Test Notes

### Rate Limiting Tests (rate-limit.ts, retry-guidance.ts, rate-limit-quota.ts)

These tests intentionally trigger rate limits. They are safe for development/sandbox environments but should be run with caution on production tenants.

### Permission Latency Test (permission-latency.ts)

This test simulates polling for permission changes. For real latency measurement, manual setup is required:

1. Create a restricted test document in the source system
2. Verify the test user initially sees it in Glean search
3. Revoke the user's access in the source system
4. Run this test to measure how long until the doc disappears from Glean search results

Typical propagation times vary by connector:
- Webhook-driven (Jira, Slack): <5 minutes
- Frequent crawl (Google Drive): 5-15 minutes
- Hourly crawl (Teams, Zoom): 1-2 hours

### SDK Tests (typescript-sdk.ts)

Requires `@gleanwork/api-client` npm package to be installed. If not installed, run:

```bash
npm install @gleanwork/api-client
```

## Adding New Provider Tests

To add tests for another provider (e.g., Evince, Algolia):

1. Create a new folder: `mkdir evince/`
2. Create test files following the same structure: `evince/rate-limit.ts`, etc.
3. Update `package.json` with new scripts: `"test:evince:rate-limit": "ts-node evince/rate-limit.ts"`

## Mapping to Verification Plan

All tests in this folder directly map to "Bucket B" items in `/scrap/YES_ROWS_VERIFICATION_PLAN.md`:

- **Bucket B** = Needs a script / API call / SDK (custom code required) = 12 rows
- **These tests** = Executable functions for each of the 12 items

When running a test, the exit code and console output serve as evidence for the corresponding claim in the verification plan.

## Troubleshooting

### "GLEAN_API_TOKEN not set"

Set the environment variable:
```bash
export GLEAN_API_TOKEN="your_token"
export GLEAN_SERVER_URL="https://your-instance"
```

### "Cannot find module '@gleanwork/api-client'"

Install the SDK:
```bash
npm install @gleanwork/api-client
```

### "ts-node not found"

Install TypeScript and ts-node globally:
```bash
npm install -g ts-node typescript
# or run tests via npm scripts
npm run test:glean:rate-limit
```

### Test times out

Some tests (permission-latency, rate-quota) may take longer due to polling/burst loops. Increase timeout if needed, or run tests individually rather than in batch.
