---
url: "https://docs.glean.com/administration/assistant/data-analysis/technical-overview"
canonical: "https://docs.glean.com/administration/assistant/data-analysis/technical-overview"
title: "Technical overview"
description: "Technical architecture and implementation details of the Data Analysis capability in Assistant"
fetched_at: "2026-09-01T13:28:59.776Z"
---
On this page

This document provides an overview of the Data Analysis feature's architecture and request flow. For additional context, see the [Data Analysis overview](/administration/assistant/data-analysis/about-data-analysis) and [File Security](/administration/assistant/data-analysis/file-security).

## Architecture[​](#architecture "Direct link to Architecture")

![](/img/administration/assistant/data-analysis/technical-overview-1.png)

All data analysis requests are processed as standard `/chat` requests through the Query Endpoint (QE). The data analysis flow is triggered when a user submits an analytical question about an uploaded or tagged spreadsheet (.xlsx, .xls, or .csv files). **Data analysis** is implemented as a Glean tool that iteratively generates and executes Python code to determine the answer. This tool leverages LLMs for code generation and utilizes a dedicated Python sandbox for code execution.

## Components[​](#components "Direct link to Components")

### Cloud SQL[​](#cloud-sql "Direct link to Cloud SQL")

Stores uploaded files. For more information about file handling, see [File upload](/administration/assistant/features/file-upload).

### Query endpoint[​](#query-endpoint "Direct link to Query endpoint")

A Glean Kubernetes service that handles `/chat` requests. Data analysis is triggered when:

-   The conversation contains uploaded or tagged spreadsheets
-   The user query is determined to be an analytical question requiring data analysis

### Sandbox[​](#sandbox "Direct link to Sandbox")

A dedicated environment for executing Python code generated during data analysis. Key characteristics:

-   Each chat session uses a dedicated sandbox instance
-   Uploaded files are copied into the sandbox for code execution
-   Isolated execution environment prevents data leakage between sessions

### Sandbox orchestrator[​](#sandbox-orchestrator "Direct link to Sandbox orchestrator")

Manages the provisioning and lifecycle of sandboxes.

## Sandboxes for data analysis[​](#sandboxes-for-data-analysis "Direct link to Sandboxes for data analysis")

info

The sandbox orchestrator and sandboxes are deployed as Kubernetes pods in the Glean cluster with a dedicated namespace. Currently, all pods operate within a single node.

### Sandbox implementation[​](#sandbox-implementation "Direct link to Sandbox implementation")

The sandbox is implemented as a Flask server that provides APIs for:

-   File uploads
-   Python code execution
-   Local filesystem access for code operations

This allows us to execute code that can read and work with the files. Each data analysis session uses a dedicated sandbox so there is no data leakage between sessions.

### Security measures[​](#security-measures "Direct link to Security measures")

The sandbox environment implements several security restrictions:

-   Resource limits:
    -   CPU: 500mCPU
    -   Memory: 500MiB
-   Network restrictions:
    -   No network egress (no internet access or access to other Glean services)
    -   Limited network ingress (only from QE pods)
-   Security controls:
    -   Non-root permissions
    -   gVisor implementation to prevent side-channel attacks (this prevents one sandbox being able to read data from another sandbox).
    -   Isolation between sandboxes

### Sandbox orchestrator functionality[​](#sandbox-orchestrator-functionality "Direct link to Sandbox orchestrator functionality")

The orchestrator is a Flask server that manages the lifecycle of the sandboxes themselves. It exposes APIs to requests for sandboxes and handles the initialization of the pod pool to fit the node and the destruction of stale sandboxes.

It is responsible for the following operations:

#### Initialization[​](#initialization "Direct link to Initialization")

-   Assigns unique sandbox instances per chat session
-   Enforces one sandbox per user limit
-   Resets and re-provisions sandbox on new session start

#### Scaling[​](#scaling "Direct link to Scaling")

-   Handles concurrent file analysis executions
-   Enforces usage limits:
    -   Per-user sandbox limits
    -   Total concurrent sandbox limits

#### Cleanup[​](#cleanup "Direct link to Cleanup")

-   Performs periodic cleanup of inactive sandboxes
-   Removes instances after specified inactivity period (for example, 10 minutes)

#### Resource management[​](#resource-management "Direct link to Resource management")

-   Enforces fixed memory and CPU limits per sandbox pod
-   Manages network policies:
    -   Blocks all network egress
    -   Allows ingress only from QE pods

## Data analysis flow[​](#data-analysis-flow "Direct link to Data analysis flow")

![](/img/administration/assistant/data-analysis/technical-overview-2.png)
