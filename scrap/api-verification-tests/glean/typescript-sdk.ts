/**
 * Bucket B, Sr 22: TypeScript/JavaScript SDK
 *
 * Test: npm install @gleanwork/api-client, instantiate client, make a call.
 * Verify SDK is available and functional.
 */

import dotenv from "dotenv";
dotenv.config();

import { Glean } from "@gleanwork/api-client";

interface SDKTestResult {
  sdkInstalled: boolean;
  clientInstantiated: boolean;
  apiCallSuccessful: boolean;
  responseStructure?: Record<string, any>;
  error?: string;
}

async function testTypeScriptSDK(): Promise<SDKTestResult> {
  const result: SDKTestResult = {
    sdkInstalled: false,
    clientInstantiated: false,
    apiCallSuccessful: false,
  };

  try {
    // Check if SDK is installed and importable
    console.log("Checking TypeScript/JavaScript SDK installation...");
    result.sdkInstalled = true;
    console.log("✓ SDK installed and imported");

    // Instantiate client
    console.log("Instantiating Glean API client...");
    const glean = new Glean({
      apiToken: process.env["GLEAN_API_TOKEN"] ?? "",
      serverURL: process.env["GLEAN_SERVER_URL"] ?? "",
    });
    result.clientInstantiated = true;
    console.log("✓ Client instantiated successfully");

    // Make a simple API call
    console.log("Making test API call (search)...");
    const response = await glean.client.search.queryAsAdmin({
      trackingToken: "sdk-test",
      pageSize: 5,
      query: "test",
      requestOptions: {
        facetFilters: [],
        facetBucketSize: 10,
      },
    });

    result.apiCallSuccessful = true;
    result.responseStructure = {
      hasResults: !!response,
      resultType: typeof response,
      keys: Object.keys(response || {}).slice(0, 5),
    };

    console.log("✓ API call successful");
    console.log(`  Response keys: ${Object.keys(response || {}).slice(0, 5)}`);
  } catch (error: any) {
    result.error = error.message;
    console.error("✗ SDK test failed:", error.message);
  }

  console.log("\n=== TypeScript/JavaScript SDK Test Results ===");
  console.log(`SDK Installed: ${result.sdkInstalled}`);
  console.log(`Client Instantiated: ${result.clientInstantiated}`);
  console.log(`API Call Successful: ${result.apiCallSuccessful}`);

  if (result.responseStructure) {
    console.log(`Response Structure:`, result.responseStructure);
  }

  return result;
}

testTypeScriptSDK()
  .then((result) => {
    const success =
      result.sdkInstalled &&
      result.clientInstantiated &&
      result.apiCallSuccessful;
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
