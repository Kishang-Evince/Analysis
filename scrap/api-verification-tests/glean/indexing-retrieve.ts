/**
 * Indexing API - retrieve/debug a document's indexed state.
 *
 * Test: POST /api/index/v1/debug/{datasource}/document with {objectType, docId}.
 * Confirms whether a document was actually indexed/uploaded, and its permissions.
 * Schema from: https://gleanwork.github.io/open-api/specs/final/indexing.yaml
 * (DebugDocumentRequest / DebugDocumentResponse)
 */

import dotenv from "dotenv";
dotenv.config();

interface RetrieveResult {
  found: boolean;
  statusCode: number;
  body: any;
}

async function testIndexingRetrieve(): Promise<RetrieveResult> {
  const serverUrl = process.env["GLEAN_SERVER_URL"] || "";
  const apiToken = process.env["GLEAN_INDEXING_TOKEN"] || "";

  const testDatasource = process.env["GLEAN_DATASOURCE"] || "";

  if (!serverUrl || !apiToken || !testDatasource) {
    throw new Error("GLEAN_SERVER_URL, GLEAN_INDEXING_TOKEN, GLEAN_DATASOURCE required");
  }

  const testDocId = process.env["GLEAN_TEST_DOC_ID"] || "test-doc";
  const testObjectType = process.env["GLEAN_TEST_OBJECT_TYPE"] || "Document";

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  };

  console.log(`Retrieving debug info for doc "${testDocId}" in datasource "${testDatasource}"...`);

  const response = await fetch(
    `${serverUrl}/api/index/v1/debug/${testDatasource}/document`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        objectType: testObjectType,
        docId: testDocId,
      }),
    }
  );

  const text = await response.text();
  let body: any = text;
  try { body = JSON.parse(text); } catch {}

  console.log(`Status: ${response.status}`);
  console.log(`Body:`, body);

  return { found: response.ok, statusCode: response.status, body };
}

testIndexingRetrieve()
  .then((result) => {
    console.log("\n=== Indexing Retrieve Test Result ===");
    console.log(`Found: ${result.found}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
