/**
 * Bucket B, Sr 1-4 (API Architecture): REST APIs + OpenAPI specs published
 *
 * Test: Fetch /oas/client, /oas/platform, /oas/indexing OpenAPI specs.
 * Confirm all three exist and return valid OpenAPI JSON/YAML.
 */

import dotenv from "dotenv";
dotenv.config();

interface OpenAPITestResult {
  clientSpec: {
    available: boolean;
    version?: string;
    format?: string;
    pathCount?: number;
  };
  platformSpec: {
    available: boolean;
    version?: string;
    format?: string;
    pathCount?: number;
  };
  indexingSpec: {
    available: boolean;
    version?: string;
    format?: string;
    pathCount?: number;
  };
  allSpecsAvailable: boolean;
}

async function testOpenAPISpecs(): Promise<OpenAPITestResult> {
  const serverUrl = process.env["GLEAN_SERVER_URL"] || "";

  if (!serverUrl) {
    throw new Error("GLEAN_SERVER_URL env var required");
  }

  const result: OpenAPITestResult = {
    clientSpec: { available: false },
    platformSpec: { available: false },
    indexingSpec: { available: false },
    allSpecsAvailable: false,
  };

  const specs = [
    { name: "client", key: "clientSpec" },
    { name: "platform", key: "platformSpec" },
    { name: "indexing", key: "indexingSpec" },
  ];

  console.log("Fetching OpenAPI specifications...\n");

  for (const spec of specs) {
    try {
      const url = `${serverUrl}/oas/${spec.name}`;
      console.log(`Fetching ${url}...`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json,application/yaml",
        },
      });

      if (response.status === 200) {
        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("json");
        const isYaml = contentType.includes("yaml");

        let data: any;
        if (isJson) {
          data = await response.json();
        } else if (isYaml) {
          // YAML would need a parser; for now, just consume as text
          const text = await response.text();
          data = { raw: text.slice(0, 200) };
        }

        const specData =
          result[spec.key as keyof typeof result] || ({} as any);
        specData.available = true;
        specData.version =
          data.openapi || data.swagger || data["openapi-version"];
        specData.format = isJson ? "JSON" : isYaml ? "YAML" : "unknown";
        specData.pathCount = data.paths
          ? Object.keys(data.paths).length
          : undefined;

        console.log(`✓ ${spec.name.toUpperCase()} spec found`);
        console.log(`  - Format: ${specData.format}`);
        console.log(`  - Version: ${specData.version}`);
        if (specData.pathCount) {
          console.log(`  - Paths defined: ${specData.pathCount}`);
        }
      } else {
        console.log(
          `✗ ${spec.name.toUpperCase()} spec returned ${response.status}`
        );
      }
    } catch (err: any) {
      console.log(`✗ ${spec.name.toUpperCase()} spec error: ${err.message}`);
    }
  }

  result.allSpecsAvailable =
    result.clientSpec.available &&
    result.platformSpec.available &&
    result.indexingSpec.available;

  console.log("\n=== OpenAPI Specifications Test Results ===");
  console.log(`Client API Spec Available: ${result.clientSpec.available}`);
  if (result.clientSpec.version) {
    console.log(`  - OpenAPI Version: ${result.clientSpec.version}`);
  }

  console.log(`Platform API Spec Available: ${result.platformSpec.available}`);
  if (result.platformSpec.version) {
    console.log(`  - OpenAPI Version: ${result.platformSpec.version}`);
  }

  console.log(`Indexing API Spec Available: ${result.indexingSpec.available}`);
  if (result.indexingSpec.version) {
    console.log(`  - OpenAPI Version: ${result.indexingSpec.version}`);
  }

  console.log(`\nAll Specs Available: ${result.allSpecsAvailable}`);

  return result;
}

testOpenAPISpecs()
  .then((result) => {
    process.exit(result.allSpecsAvailable ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
