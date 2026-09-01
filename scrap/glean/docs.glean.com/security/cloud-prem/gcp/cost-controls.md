---
url: "https://docs.glean.com/security/cloud-prem/gcp/cost-controls"
canonical: "https://docs.glean.com/security/cloud-prem/gcp/cost-controls"
title: "Reduce customer-hosted GCP costs"
description: "Plan committed use discounts and request a cost review for a customer-hosted Glean deployment"
fetched_at: "2026-09-01T13:29:57.655Z"
---
On this page

Plan committed use discounts (CUDs) for stable Compute and Cloud SQL usage in your customer-hosted Glean deployment. Before purchasing a commitment, use conservative coverage targets and ask Glean to review commitments tied to a machine family.

## Plan committed use discounts[​](#plan-committed-use-discounts "Direct link to Plan committed use discounts")

Google Cloud CUDs reduce eligible costs in exchange for a commitment to a minimum amount of resource usage or spend for one or three years. For an overview of commitment types and eligible services, see [Committed use discounts](https://docs.cloud.google.com/docs/cuds) in the Google Cloud documentation.

Don't commit 100% of current consumption. Glean continues to reduce infrastructure usage, and future right-sizing can lower the resources that your deployment needs. As a starting point, target about 80% coverage of stable consumption for:

-   Compute flexible CUDs
-   Cloud SQL CUDs

Your organization is responsible for choosing the commitment amount and a one-year or three-year term based on its usage forecast and risk tolerance.

Before purchasing a commitment:

1.  Review current usage, expected growth, and planned right-sizing.
2.  Check Google's [committed use discount recommendations](https://docs.cloud.google.com/docs/cuds-recommender).
3.  Confirm that the commitment applies to the services, regions, and billing account used by your Glean deployment.
4.  Compare the commitment with other eligible usage billed to the same account.
5.  Ask Glean to review resource-based commitments tied to a machine family. Glean may need to align the deployment configuration with that family.

For database-specific coverage and exclusions, see [Committed use discounts for Cloud SQL](https://docs.cloud.google.com/sql/cud).

## Request a cost review[​](#request-a-cost-review "Direct link to Request a cost review")

Provide the following information when you request a review through the [Glean support portal](https://support.glean.com):

-   The exact GCP project ID for the Glean deployment
-   The billing period you reviewed
-   A project-filtered billing report grouped by service
-   The services and SKUs with the largest costs or unexpected changes
-   Any relevant cost-allocation labels
-   Planned changes to indexed content volume, connector scope, or usage
-   Existing or proposed CUDs, including their type, region, term, and coverage
