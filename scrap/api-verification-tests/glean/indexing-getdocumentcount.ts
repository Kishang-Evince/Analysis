/**
 * Indexing API - get document count for a datasource.
 *
 * Test: POST /api/index/v1/getdocumentcount with {datasource}.
 * Confirms the API can report how many documents are indexed for a real datasource.
 * Schema from: https://gleanwork.github.io/open-api/specs/final/indexing.yaml
 */

import dotenv from "dotenv";
dotenv.config();

async function testGetDocumentCount() {
  const serverUrl = process.env["GLEAN_SERVER_URL"] || "";
  const apiToken = process.env["GLEAN_INDEXING_TOKEN"] || "";
  const datasource = process.env["GLEAN_DATASOURCE"] || "";

  if (!serverUrl || !apiToken || !datasource) {
    throw new Error("GLEAN_SERVER_URL, GLEAN_INDEXING_TOKEN, GLEAN_DATASOURCE required");
  }

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  console.log(`Getting document count for datasource "${datasource}"...`);

  const response = await fetch(`${serverUrl}/api/index/v1/getdocumentcount`, {
    method: "POST",
    headers,
    body: JSON.stringify({ datasource }),
  });

  const text = await response.text();
  let body: any = text;
  try { body = JSON.parse(text); } catch {}

  console.log(`Status: ${response.status}`);
  console.log(`Body:`, body);

  return { ok: response.ok, status: response.status, body };
}

testGetDocumentCount()
  .then((result) => {
    console.log("\n=== getdocumentcount Result ===");
    console.log(`OK: ${result.ok}`);
    process.exit(result.ok ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
