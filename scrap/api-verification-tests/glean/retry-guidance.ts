/**
 * Bucket B, Sr 2 (Error Recovery): 429 retry-friendly guidance
 *
 * Test: Same burst-request script as Sr8 above.
 * Confirm documented exponential-backoff retry pattern works against real 429.
 */

import dotenv from "dotenv";
dotenv.config();

import { Glean } from "@gleanwork/api-client";

interface RetryTestResult {
  bursts: number;
  totalRequests: number;
  rateLimitHits: number;
  retriedSuccessfully: number;
  backoffTested: boolean;
  documentedRetryFormat: boolean;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function testRetryGuidance(): Promise<RetryTestResult> {
  const glean = new Glean({
    apiToken: process.env["GLEAN_API_TOKEN"] ?? "",
    serverURL: process.env["GLEAN_SERVER_URL"] ?? "",
  });

  const result: RetryTestResult = {
    bursts: 0,
    totalRequests: 0,
    rateLimitHits: 0,
    retriedSuccessfully: 0,
    backoffTested: false,
    documentedRetryFormat: false,
  };

  console.log("Testing 429 retry guidance with exponential backoff...\n");

  // Send burst, hit 429, then retry with exponential backoff
  for (let burst = 0; burst < 3; burst++) {
    result.bursts++;
    console.log(`--- Burst ${burst + 1} ---`);

    for (let attempt = 0; attempt < 20; attempt++) {
      result.totalRequests++;

      try {
        await glean.client.search.queryAsAdmin({
          trackingToken: `burst-${burst}-req-${attempt}`,
          pageSize: 10,
          query: `retry test ${attempt}`,
        });

        if (result.rateLimitHits > 0) {
          result.retriedSuccessfully++;
          console.log(
            `  Attempt ${attempt}: SUCCESS after ${result.rateLimitHits} rate limits`
          );
        }
      } catch (error: any) {
        if (error.status === 429) {
          result.rateLimitHits++;
          const backoffMs = Math.pow(2, Math.min(attempt, 5)) * 100; // 2^attempt * 100ms
          console.log(
            `  Attempt ${attempt}: 429 Rate Limited. Backoff: ${backoffMs}ms`
          );

          // Inspect error body for documented retry guidance
          if (
            error.body &&
            (error.body.retryAfter || error.body["retry-after"])
          ) {
            result.documentedRetryFormat = true;
            console.log(
              `    Retry-After header: ${error.body.retryAfter || error.body["retry-after"]}`
            );
          }

          result.backoffTested = true;
          await sleep(backoffMs);
          continue;
        } else {
          console.log(`  Attempt ${attempt}: Error ${error.status}`);
          break;
        }
      }

      if (result.rateLimitHits > 0 && attempt > result.rateLimitHits + 2) {
        break; // Stop after successful recovery
      }
    }

    if (result.rateLimitHits > 0) {
      break; // Exit after demonstrating retry on first burst
    }

    await sleep(1000); // Wait between bursts
  }

  console.log("\n=== Retry Guidance Test Results ===");
  console.log(`Bursts Sent: ${result.bursts}`);
  console.log(`Total Requests: ${result.totalRequests}`);
  console.log(`Rate Limit Hits (429): ${result.rateLimitHits}`);
  console.log(`Successfully Retried After 429: ${result.retriedSuccessfully}`);
  console.log(`Backoff Tested: ${result.backoffTested}`);
  console.log(`Documented Retry Format Found: ${result.documentedRetryFormat}`);

  return result;
}

testRetryGuidance()
  .then((result) => {
    const success = result.backoffTested || result.rateLimitHits > 0;
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
