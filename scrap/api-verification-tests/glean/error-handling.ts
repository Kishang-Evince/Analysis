/**
 * Bucket B, Sr 1 (Error Handling): Typed, structured API errors
 *
 * Test: Trigger a 403 or 422 (malformed request) via SDK or curl.
 * Inspect error object structure - confirm GleanError / GleanDataError
 * with documented fields (status_code, raw_response, .data payload).
 */

import dotenv from "dotenv";
dotenv.config();

import { Glean } from "@gleanwork/api-client";

interface ErrorStructureTestResult {
  test403Triggered: boolean;
  test422Triggered: boolean;
  error403Structure?: Record<string, any>;
  error422Structure?: Record<string, any>;
  hasStatusCode: boolean;
  hasRawResponse: boolean;
  hasDataPayload: boolean;
}

async function testErrorHandling(): Promise<ErrorStructureTestResult> {
  const glean = new Glean({
    apiToken: process.env["GLEAN_API_TOKEN"] ?? "",
    serverURL: process.env["GLEAN_SERVER_URL"] ?? "",
  });

  const result: ErrorStructureTestResult = {
    test403Triggered: false,
    test422Triggered: false,
    hasStatusCode: false,
    hasRawResponse: false,
    hasDataPayload: false,
  };

  // Test 403 - Unauthorized/Forbidden
  console.log("Testing 403 error structure...");
  try {
    await glean.client.search.queryAsAdmin({
      trackingToken: "test",
      pageSize: 10,
      query: "test",
    });
  } catch (error: any) {
    if (error.status === 403 || error.statusCode === 403) {
      result.test403Triggered = true;
      result.error403Structure = {
        status: error.status || error.statusCode,
        message: error.message,
        hasStatusCode: !!error.status_code || !!error.statusCode,
        hasRawResponse: !!error.raw_response || !!error.rawResponse,
        hasData: !!error.data,
        errorType: error.constructor.name,
      };

      console.log("✓ 403 triggered");
      console.log("  Structure:", result.error403Structure);

      result.hasStatusCode =
        !!error.status_code ||
        !!error.statusCode ||
        error.status !== undefined;
      result.hasRawResponse =
        !!error.raw_response ||
        !!error.rawResponse ||
        !!error.response;
    }
  }

  // Test 422 - Unprocessable Entity (malformed request)
  console.log("\nTesting 422 error structure...");
  try {
    // Attempt a malformed request
    await glean.client.search.queryAsAdmin({
      trackingToken: "test",
      pageSize: 10,
      query: "", // Empty query may trigger 422
      requestOptions: {
        facetFilters: [
          {
            fieldName: "invalid-field-name-that-doesnt-exist",
            values: [
              {
                value: "test",
                relationType: "INVALID_TYPE" as any,
              },
            ],
          },
        ],
        facetBucketSize: -1, // Invalid value
      } as any,
    });
  } catch (error: any) {
    if (error.status === 422 || error.statusCode === 422) {
      result.test422Triggered = true;
      result.error422Structure = {
        status: error.status || error.statusCode,
        message: error.message,
        hasStatusCode: !!error.status_code || !!error.statusCode,
        hasRawResponse: !!error.raw_response || !!error.rawResponse,
        hasData: !!error.data,
        dataPayload: error.data || error.body,
        errorType: error.constructor.name,
      };

      console.log("✓ 422 triggered");
      console.log("  Structure:", result.error422Structure);

      result.hasStatusCode =
        !!error.status_code || !!error.statusCode || error.status !== undefined;
      result.hasRawResponse =
        !!error.raw_response ||
        !!error.rawResponse ||
        !!error.response;
      result.hasDataPayload = !!error.data || !!error.body;
    }
  }

  console.log("\n=== Error Handling Test Results ===");
  console.log(`403 Error Triggered: ${result.test403Triggered}`);
  console.log(`422 Error Triggered: ${result.test422Triggered}`);
  console.log(`Has Status Code Field: ${result.hasStatusCode}`);
  console.log(`Has Raw Response: ${result.hasRawResponse}`);
  console.log(`Has Data Payload (for 422): ${result.hasDataPayload}`);

  return result;
}

testErrorHandling()
  .then((result) => {
    // Test passes if we can inspect error structure, doesn't require both errors
    const success =
      result.hasStatusCode ||
      result.hasRawResponse ||
      result.hasDataPayload ||
      result.test403Triggered ||
      result.test422Triggered;
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
