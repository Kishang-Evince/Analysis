/**
 * Indexing API - register the custom datasource used by other test scripts.
 *
 * Test: POST /api/index/v1/adddatasource with a CustomDatasourceConfig.
 * Required before indexdocuments/updatepermissions/deletedocument/debug calls
 * will accept the datasource name (they 400 with "Config is not registered
 * for datasource ..." until this runs once).
 * Schema from: https://gleanwork.github.io/open-api/specs/final/indexing.yaml
 */

import dotenv from "dotenv";
dotenv.config();

async function addDatasource() {
  const serverUrl = process.env["GLEAN_SERVER_URL"] || "";
  const apiToken = process.env["GLEAN_INDEXING_TOKEN"] || "";
  const datasource = process.env["GLEAN_DATASOURCE"] || "";

  if (!serverUrl || !apiToken || !datasource) {
    throw new Error("GLEAN_SERVER_URL, GLEAN_INDEXING_TOKEN, GLEAN_DATASOURCE required");
  }

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  };

  const config = {
    name: datasource,
    displayName: `${datasource} (test)`,
    datasourceCategory: "PUBLISHED_CONTENT",
    isTestDatasource: false,
    urlRegex: "https://example-test-datasource.local/.*",
    objectDefinitions: [
      {
        name: "Document",
        displayLabel: "Document",
        docCategory: "PUBLISHED_CONTENT",
      },
    ],
  };

  console.log(`Registering datasource "${datasource}"...`);
  console.log("Config:", JSON.stringify(config, null, 2));

  const response = await fetch(`${serverUrl}/api/index/v1/adddatasource`, {
    method: "POST",
    headers,
    body: JSON.stringify(config),
  });

  const text = await response.text();
  let body: any = text;
  try { body = JSON.parse(text); } catch {}

  console.log(`Status: ${response.status}`);
  console.log("Body:", body);

  return { ok: response.ok, status: response.status, body };
}

addDatasource()
  .then((result) => {
    console.log(`\n${result.ok ? "✓ Datasource registered" : "✗ Failed to register datasource"}`);
    process.exit(result.ok ? 0 : 1);
  })
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  });
