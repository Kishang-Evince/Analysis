/**
 * Bucket B, Sr 2 (Performance): Exact rate-limit quota unconfirmed
 *
 * Test: Run burst-request script until throttled, record actual qpm figure.
 * This row produces a new number (actual measured quota), not just pass/fail.
 */

import dotenv from "dotenv";
dotenv.config();

interface QuotaTestResult {
  requestsFired: number;
  rateLimitHitAt: number;
  estimatedQuotaPerMinute: number;
  testDurationMs: number;
  successfulRequests: number;
  documentedQuota?: string;
}

async function testRateLimitQuota(): Promise<QuotaTestResult> {
  const apiToken = process.env["GLEAN_API_TOKEN"] ?? "";
  const serverUrl = process.env["GLEAN_SERVER_URL"] ?? "";

  if (!apiToken || !serverUrl) {
    throw new Error("GLEAN_API_TOKEN and GLEAN_SERVER_URL required");
  }

  const result: QuotaTestResult = {
    requestsFired: 0,
    rateLimitHitAt: 0,
    estimatedQuotaPerMinute: 0,
    testDurationMs: 0,
    successfulRequests: 0,
  };

  const startTime = Date.now();
  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  };

  console.log("Testing rate-limit quota by firing requests until throttled...\n");

  // Fire requests rapidly (no sleep between) until we hit 429
  for (let i = 0; i < 1000; i++) {
    result.requestsFired++;

    try {
      const response = await fetch(`${serverUrl}/api/search`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: `quota-test-${i}`,
        }),
      });

      if (response.status === 429) {
        result.rateLimitHitAt = i + 1;
        const rateLimitHeader = response.headers.get("X-RateLimit-Limit") ||
          response.headers.get("RateLimit-Limit") || "unknown";
        console.log(`✓ Rate limit hit at request ${i + 1}`);
        console.log(
          `  Rate-Limit header value: ${rateLimitHeader}`
        );

        // Check for reset time
        const resetHeader =
          response.headers.get("X-RateLimit-Reset") ||
          response.headers.get("RateLimit-Reset");
        if (resetHeader) {
          console.log(`  RateLimit-Reset: ${resetHeader}`);
        }

        // Extract error body for quota info
        const body = await response.json();
        if (
          body &&
          (body.quota ||
            body.rateLimit ||
            body["rate-limit"] ||
            body.limit)
        ) {
          result.documentedQuota =
            body.quota ||
            body.rateLimit ||
            body["rate-limit"] ||
            body?.limit;
          console.log(
            `  Quota info from response: ${JSON.stringify(result.documentedQuota)}`
          );
        }
        break;
      }

      if (response.status === 200) {
        result.successfulRequests++;
      }

      if (i % 100 === 0 && i > 0) {
        console.log(`Requests fired: ${i}`);
      }
    } catch (err: any) {
      console.log(`Request ${i} error: ${err.message}`);
      if (err.message.includes("429")) {
        result.rateLimitHitAt = i + 1;
        break;
      }
    }
  }

  result.testDurationMs = Date.now() - startTime;

  // Estimate QPM (queries per minute)
  if (result.rateLimitHitAt > 0) {
    const minutesFraction = result.testDurationMs / 60000;
    result.estimatedQuotaPerMinute = Math.floor(
      result.rateLimitHitAt / minutesFraction
    );
  }

  console.log("\n=== Rate-Limit Quota Test Results ===");
  console.log(`Total Requests Fired: ${result.requestsFired}`);
  console.log(`Rate Limit Hit At Request #: ${result.rateLimitHitAt}`);
  console.log(`Successful Requests Before Throttle: ${result.successfulRequests}`);
  console.log(`Test Duration: ${result.testDurationMs}ms`);
  console.log(
    `Estimated Quota (queries/minute): ${result.estimatedQuotaPerMinute} qpm`
  );

  if (result.documentedQuota) {
    console.log(`Documented Quota: ${result.documentedQuota}`);
  }

  return result;
}

testRateLimitQuota()
  .then((result) => {
    console.log(
      `\n⚠️  Measured quota: ~${result.estimatedQuotaPerMinute} qpm`
    );
    console.log("(Compare against Glean's published rate-limit documentation)");
    process.exit(result.rateLimitHitAt > 0 ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
