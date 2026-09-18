/**
 * Bucket B, Sr 20: Three distinct REST API surfaces
 *
 * Test: curl/fetch each of Client API, Platform API, Indexing API directly
 * and confirm all three exist + respond as documented.
 * Also fetch /oas/* OpenAPI specs.
 */

import dotenv from "dotenv";
dotenv.config();

interface APITestResult {
  clientApi: {
    available: boolean;
    statusCode?: number;
    error?: string;
  };
  platformApi: {
    available: boolean;
    statusCode?: number;
    error?: string;
  };
  indexingApi: {
    available: boolean;
    statusCode?: number;
    error?: string;
  };
  openApiSpecs: {
    client: boolean;
    platform: boolean;
    indexing: boolean;
  };
}

async function testRESTAPISurfaces(): Promise<APITestResult> {
  const serverUrl = process.env["GLEAN_SERVER_URL"] || "";
  const apiToken = process.env["GLEAN_API_TOKEN"] || "";

  if (!serverUrl || !apiToken) {
    throw new Error("GLEAN_SERVER_URL and GLEAN_API_TOKEN env vars required");
  }

  const result: APITestResult = {
    clientApi: { available: false },
    platformApi: { available: false },
    indexingApi: { available: false },
    openApiSpecs: {
      client: false,
      platform: false,
      indexing: false,
    },
  };

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  };

  // Test Client API
  try {
    console.log("Testing Client API endpoint...");
    const response = await fetch(`${serverUrl}/api/client/search`, {
      method: "GET",
      headers,
    });
    result.clientApi.statusCode = response.status;
    result.clientApi.available = response.status < 500;
    console.log(`  Client API: ${response.status}`);
  } catch (err: any) {
    result.clientApi.error = err.message;
    console.log(`  Client API Error: ${err.message}`);
  }

  // Test Platform API
  try {
    console.log("Testing Platform API endpoint...");
    const response = await fetch(`${serverUrl}/api/search`, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: "test" }),
    });
    result.platformApi.statusCode = response.status;
    result.platformApi.available = response.status < 500;
    console.log(`  Platform API: ${response.status}`);
  } catch (err: any) {
    result.platformApi.error = err.message;
    console.log(`  Platform API Error: ${err.message}`);
  }

  // Test Indexing API
  try {
    console.log("Testing Indexing API endpoint...");
    const response = await fetch(`${serverUrl}/api/index/v1/indexdocuments`, {
      method: "POST",
      headers,
      body: JSON.stringify([
        {
          docId: "test-doc",
          datasource: "test",
          title: "Test",
        },
      ]),
    });
    result.indexingApi.statusCode = response.status;
    result.indexingApi.available = response.status < 500;
    console.log(`  Indexing API: ${response.status}`);
  } catch (err: any) {
    result.indexingApi.error = err.message;
    console.log(`  Indexing API Error: ${err.message}`);
  }

  // Test OpenAPI specs
  try {
    console.log("\nTesting OpenAPI specifications...");
    const specs = ["client", "platform", "indexing"];

    for (const spec of specs) {
      try {
        const response = await fetch(`${serverUrl}/oas/${spec}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const available = response.status === 200;
        result.openApiSpecs[spec as keyof typeof result.openApiSpecs] =
          available;
        console.log(`  /oas/${spec}: ${response.status}`);

        if (available) {
          const data = await response.json();
          console.log(`    - OpenAPI version: ${data?.openapi || data?.swagger}`);
        }
      } catch (err: any) {
        console.log(`  /oas/${spec} Error: ${err.message}`);
      }
    }
  } catch (err: any) {
    console.log(`OpenAPI test error: ${err.message}`);
  }

  console.log("\n=== REST API Surfaces Test Results ===");
  console.log(
    `Client API Available: ${result.clientApi.available} (${result.clientApi.statusCode})`
  );
  console.log(
    `Platform API Available: ${result.platformApi.available} (${result.platformApi.statusCode})`
  );
  console.log(
    `Indexing API Available: ${result.indexingApi.available} (${result.indexingApi.statusCode})`
  );
  console.log(`OpenAPI Specs - Client: ${result.openApiSpecs.client}`);
  console.log(`OpenAPI Specs - Platform: ${result.openApiSpecs.platform}`);
  console.log(`OpenAPI Specs - Indexing: ${result.openApiSpecs.indexing}`);

  return result;
}

testRESTAPISurfaces()
  .then((result) => {
    const allAvailable =
      result.clientApi.available &&
      result.platformApi.available &&
      result.indexingApi.available;
    process.exit(allAvailable ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
