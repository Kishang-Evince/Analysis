---
url: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions"
canonical: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions"
title: "Supported GCP regions"
description: "This document covers the Google Cloud Platform (GCP) regions and zones validated and supported by Glean for tenant deployment."
fetched_at: "2026-10-13T08:50:26.949Z"
---
On this page

Overall, there are two types of GCP regions for hosting Glean: **Preferred** and **Non-Preferred** regions.

note

The default region for tenants hosted by Glean is `us-central1`, which is located in North America. Please advise Glean if you would like your tenant deployed in an different region.

## Considerations for region selection[​](#considerations-for-region-selection "Direct link to Considerations for region selection")

There are two main considerations that drive support for Glean in different regions:

1.  Availability of the GCP services Glean uses, including GPU accelerators: Glean's ML pipelines do not require TPUs. Glean fully supports a region that offers GPUs only, although serving costs can be higher than in a region with a broader choice of accelerators.
2.  LLM model availability in Vertex AI: LLM model availability is only a consideration if you wish to use Vertex AI for access to LLM models. If you are using Glean's LLM key or your own Azure OpenAI, OpenAI, or Anthropic account key, you can disregard this requirement.

## Preferred regions[​](#preferred-regions "Direct link to Preferred regions")

Glean validates every required service in a preferred region, and each of these regions offers a broad choice of [GPU accelerators](https://cloud.google.com/compute/docs/gpus/gpu-regions-zones). These preferred regions deliver the most predictable ML performance at the lowest infrastructure cost.

| Region | Location | GCP Region | GCP Zone |
| --- | --- | --- | --- |
| AMER | USA (Iowa) | `us-central1` | `us-central1-a` |
| APAC | Taiwan (Changhua County) | `asia-east1` | `asia-east1-c` |
| EMEA | Netherlands (Eemshaven) | `europe-west4` | `europe-west4-a` |

Glean recommends leveraging a preferred region for hosting your Glean tenant unless a specific country is required for data sovereignty purposes.

## Non-preferred regions[​](#non-preferred-regions "Direct link to Non-preferred regions")

Glean supports non-preferred regions, but non-preferred regions offer fewer GPU accelerator types. Glean ML workflows run on the accelerators that the region provides, which can increase infrastructure cost and, with smaller accelerators, reduce ML performance.

In EMEA, `europe-west1` (Belgium) offers more GPU accelerator types than the other non-preferred EMEA regions, so it's the best choice if your organization can use any EU region. `europe-west4` remains a preferred region, but you don't need to select it only to obtain TPU availability.

-   AMER
-   APAC
-   EMEA

| Location | GCP Region | GCP Zone |
| --- | --- | --- |
| Brazil (Sao Paulo) | `southamerica-northeast1` | `southamerica-northeast1-a,c` |
| Canada (Montreal) | `northamerica-northeast1` | `northamerica-northeast1-c` |

| Location | GCP Region | GCP Zone |
| --- | --- | --- |
| Australia (Sydney) | `australia-southeast1` | `australia-southeast1-a,c` |
| India (Mumbai) | `asia-south1` | `asia-south1-a,b` |
| Japan (Tokyo) | `asia-northeast1` | `asia-northeast1-a` |
| Singapore (Jurong West) | `asia-southeast1` | `asia-southeast-c,b,a` |
| South Korea (Seoul) | `asia-northeast3` | `asia-northeast3-b,a,c` |

| Location | GCP Region | GCP Zone |
| --- | --- | --- |
| Belgium (St. Ghislain) | `europe-west1` | `europe-west1-b,c,d` |
| Germany (Frankfurt) | `europe-west3` | `europe-west3-b` |
| Israel (Tel Aviv) | `me-west1` | `me-west1-b,c` |
| Poland (Warsaw) | `europe-central2` | `europe-central2-b,c` |
| UK (London) | `europe-west2` | `europe-west2-a,b` |

tip

Where possible, you should elect to use the first GCP zone referenced as some zones contain higher memory GPUs that are better suited for ML workflows than others.

If you opt to use a non-preferred region:

-   **For Glean-hosted tenants:** Your subscription cost will be higher to offset the higher infrastructure costs of these regions.
-   **For customer-hosted tenants:** You should anticipate higher monthly infrastructure costs for the Glean component of your GCP Billing Account.

## LLM model availability in Vertex AI[​](#llm-model-availability-in-vertex-ai "Direct link to LLM model availability in Vertex AI")

When selecting an LLM for use with your Glean environment, if you wish for the LLM to be accessed via Vertex AI, you should consider the availability of your desired model within Vertex AI for each GCP region.

-   More information: [Generative AI on Vertex AI locations (cloud.google.com)](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations)
