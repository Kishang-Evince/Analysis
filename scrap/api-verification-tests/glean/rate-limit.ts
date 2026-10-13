/**
 * Bucket B, Sr 8: Rate-limit handling + sub-second response
 *
 * Test: Fire rapid sequential search/chat API calls, time responses,
 * confirm 429 eventually returns with documented retry-friendly error body.
 */

import dotenv from "dotenv";
dotenv.config();

interface RateLimitTestResult {
  totalRequests: number;
  successfulRequests: number;
  rateLimitHits: number;
  avgResponseTime: number;
  subSecondResponses: number;
  errorDetails?: Record<string, any>;
}

async function testRateLimitHandling(): Promise<RateLimitTestResult> {
  const serverUrl = process.env["GLEAN_SERVER_URL"] || "";
  const apiToken = process.env["GLEAN_API_TOKEN"] || "";

  if (!serverUrl || !apiToken) {
    throw new Error("GLEAN_SERVER_URL and GLEAN_API_TOKEN required");
  }

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  };

  const result: RateLimitTestResult = {
    totalRequests: 0,
    successfulRequests: 0,
    rateLimitHits: 0,
    avgResponseTime: 0,
    subSecondResponses: 0,
  };

  const responseTimes: number[] = [];
  const burstSize = 50; // Rapid burst to trigger rate limits

  console.log(`Starting rate-limit test with ${burstSize} rapid requests against /rest/api/v1/search...`);

  for (let i = 0; i < burstSize; i++) {
    result.totalRequests++;
    const startTime = Date.now();

    try {
      const response = await fetch(`${serverUrl}/rest/api/v1/search`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          trackingToken: `test-${i}`,
          pageSize: 10,
          query: `test query ${i}`,
        }),
      });
      const elapsed = Date.now() - startTime;
      responseTimes.push(elapsed);

      if (response.status === 429) {
        result.rateLimitHits++;
        const body = await response.text();
        console.log(`Request ${i + 1}: 429 Rate Limited (${elapsed}ms)`);
        console.log(`  Body: ${body}`);
        result.errorDetails = { status: 429, body };
        break; // Stop after hitting first rate limit
      } else if (response.ok) {
        result.successfulRequests++;
        if (elapsed < 1000) result.subSecondResponses++;
        console.log(`Request ${i + 1}: ${elapsed}ms - OK (${response.status})`);
      } else {
        const body = await response.text();
        console.log(`Request ${i + 1}: Error ${response.status} - ${body.slice(0, 100)}`);
      }
    } catch (error: any) {
      const elapsed = Date.now() - startTime;
      responseTimes.push(elapsed);
      console.log(`Request ${i + 1}: Exception - ${error.message}`);
    }
  }

  result.avgResponseTime =
    responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

  console.log("\n=== Rate-Limit Test Results ===");
  console.log(`Total Requests: ${result.totalRequests}`);
  console.log(`Successful: ${result.successfulRequests}`);
  console.log(`Rate-Limit Hits (429): ${result.rateLimitHits}`);
  console.log(`Avg Response Time: ${result.avgResponseTime.toFixed(2)}ms`);
  console.log(`Sub-second Responses: ${result.subSecondResponses}`);

  return result;
}

testRateLimitHandling()
  .then((result) => {
    process.exit(result.rateLimitHits > 0 ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
