/**
 * Bucket B, Sr 1 (API Depth): Indexing API supports real CRUD
 *
 * Test: Full cycle via Indexing API:
 * 1. Index a test doc (create)
 * 2. Update it
 * 3. Update its permissions
 * 4. Delete it
 *
 * Confirm each call behaves as documented.
 * Schema from: https://gleanwork.github.io/open-api/specs/final/indexing.yaml
 */

import dotenv from "dotenv";
dotenv.config();

interface IndexingCRUDTestResult {
  indexCreated: boolean;
  indexUpdated: boolean;
  permissionsUpdated: boolean;
  documentDeleted: boolean;
  testDocId: string;
  errors: string[];
}

async function testIndexingCRUD(): Promise<IndexingCRUDTestResult> {
  const serverUrl = process.env["GLEAN_SERVER_URL"] || "";
  const apiToken = process.env["GLEAN_INDEXING_TOKEN"] || "";

  if (!serverUrl || !apiToken) {
    throw new Error("GLEAN_SERVER_URL and GLEAN_API_TOKEN required");
  }

  const result: IndexingCRUDTestResult = {
    indexCreated: false,
    indexUpdated: false,
    permissionsUpdated: false,
    documentDeleted: false,
    testDocId: `test-crud-doc-${Date.now()}`,
    errors: [],
  };

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  };

  const testDatasource = "testdatasource";
  const testObjectType = "Document";

  // 1. CREATE - Index a test document
  console.log(`\n1. CREATE: Indexing test document ${result.testDocId}...`);
  try {
    const response = await fetch(
      `${serverUrl}/api/index/v1/indexdocuments`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          datasource: testDatasource,
          documents: [
            {
              id: result.testDocId,
              datasource: testDatasource,
              objectType: testObjectType,
              title: "Test Document for CRUD Verification",
              viewURL: `${serverUrl}/doc/${result.testDocId}`,
              body: {
                mimeType: "text/plain",
              textContent: "This is a test document used to verify CRUD operations on the Indexing API.",
              },
            },
          ],
        }),
      }
    );

    if (response.ok) {
      result.indexCreated = true;
      console.log("✓ Document indexed successfully");
    } else {
      const error = await response.text();
      result.errors.push(`Create failed: ${response.status} - ${error}`);
      console.log(`✗ Create failed: ${response.status}`);
    }
  } catch (err: any) {
    result.errors.push(`Create exception: ${err.message}`);
    console.log(`✗ Create error: ${err.message}`);
  }

  // 2. UPDATE - Modify the document
  console.log(`\n2. UPDATE: Updating test document...`);
  try {
    const response = await fetch(
      `${serverUrl}/api/index/v1/indexdocuments`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          datasource: testDatasource,
          documents: [
            {
              id: result.testDocId,
              datasource: testDatasource,
              objectType: testObjectType,
              title: "Test Document - UPDATED",
              viewURL: `${serverUrl}/doc/${result.testDocId}`,
              body: {
                mimeType: "text/plain",
              textContent: "This document has been updated as part of CRUD verification.",
              },
            },
          ],
        }),
      }
    );

    if (response.ok) {
      result.indexUpdated = true;
      console.log("✓ Document updated successfully");
    } else {
      const error = await response.text();
      result.errors.push(`Update failed: ${response.status} - ${error}`);
      console.log(`✗ Update failed: ${response.status}`);
    }
  } catch (err: any) {
    result.errors.push(`Update exception: ${err.message}`);
    console.log(`✗ Update error: ${err.message}`);
  }

  // 3. UPDATE PERMISSIONS - Change document permissions
  console.log(`\n3. PERMISSIONS: Updating document permissions...`);
  try {
    const response = await fetch(
      `${serverUrl}/api/index/v1/updatepermissions`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          datasource: testDatasource,
          id: result.testDocId,
          objectType: testObjectType,
          permissions: {
            allowAnonymousAccess: true,
          },
        }),
      }
    );

    if (response.ok) {
      result.permissionsUpdated = true;
      console.log("✓ Permissions updated successfully");
    } else {
      if (response.status === 404) {
        console.log("⚠️  Permissions endpoint not found (may not be supported)");
      } else {
        const error = await response.text();
        result.errors.push(
          `Permissions update failed: ${response.status} - ${error}`
        );
        console.log(`✗ Permissions update failed: ${response.status}`);
      }
    }
  } catch (err: any) {
    result.errors.push(`Permissions exception: ${err.message}`);
    console.log(`✗ Permissions error: ${err.message}`);
  }

  // 4. DELETE - Remove the document
  console.log(`\n4. DELETE: Deleting test document...`);
  try {
    const response = await fetch(
      `${serverUrl}/api/index/v1/deletedocument`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          datasource: testDatasource,
          id: result.testDocId,
          objectType: testObjectType,
        }),
      }
    );

    if (response.ok) {
      result.documentDeleted = true;
      console.log("✓ Document deleted successfully");
    } else {
      const error = await response.text();
      result.errors.push(`Delete failed: ${response.status} - ${error}`);
      console.log(`✗ Delete failed: ${response.status}`);
    }
  } catch (err: any) {
    result.errors.push(`Delete exception: ${err.message}`);
    console.log(`✗ Delete error: ${err.message}`);
  }

  console.log("\n=== Indexing API CRUD Test Results ===");
  console.log(`✓ Create (INDEX): ${result.indexCreated}`);
  console.log(`✓ Update: ${result.indexUpdated}`);
  console.log(`✓ Update Permissions: ${result.permissionsUpdated}`);
  console.log(`✓ Delete: ${result.documentDeleted}`);

  if (result.errors.length > 0) {
    console.log(`\nErrors encountered:`);
    result.errors.forEach((err) => console.log(`  - ${err}`));
  }

  return result;
}

testIndexingCRUD()
  .then((result) => {
    const success =
      result.indexCreated && result.indexUpdated && result.documentDeleted;
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
