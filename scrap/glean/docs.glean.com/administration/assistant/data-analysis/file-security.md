---
url: "https://docs.glean.com/administration/assistant/data-analysis/file-security"
canonical: "https://docs.glean.com/administration/assistant/data-analysis/file-security"
title: "File security"
description: "Learn about the secure, isolated environment used for executing code in Glean's Data Analysis feature"
fetched_at: "2026-09-01T13:28:59.870Z"
---
On this page

## Introduction[​](#introduction "Direct link to Introduction")

At Glean, we prioritize security, especially when it comes to executing code in a shared environment. Our code sandbox solution for [Data Analysis](/administration/assistant/data-analysis/about-data-analysis) is designed to ensure that all code is executed in a secure, isolated, and controlled environment, safeguarding both user data and system integrity.

## How the sandbox works[​](#how-the-sandbox-works "Direct link to How the sandbox works")

The sandbox is a virtual environment that allows customers to upload and analyze data files, such as spreadsheets or CSVs, using custom code. The environment provides an isolated instance for each session where code can be safely executed without impacting other users or systems. Each sandbox is temporary, specifically created for each user's session and destroyed afterward to ensure no data persistence.

Here is the lifecycle of a data analysis request:

![Data analysis request lifecycle](/img/administration/assistant/data-analysis/file-security-1.png)

And here is the sandbox architecture:

![Sandbox architecture diagram](/img/administration/assistant/data-analysis/file-security-2.png)

## Key features[​](#key-features "Direct link to Key features")

-   **Resource limits**: The sandbox restricts the amount of time, memory, and CPU that code can consume.
    
-   **Isolation**: Each sandbox operates independently, meaning that code execution is isolated from other users. There is no network egress allowed, which ensures that no data can be sent out from the sandbox environment.
    
-   **Temporary nature**: Once a session ends or a certain period of inactivity is detected, the sandbox is terminated. No code or data is stored beyond the active session.
    

## Security implications[​](#security-implications "Direct link to Security implications")

Our sandboxing solution has been carefully designed with security in mind to minimize potential risks. The following controls are implemented to ensure a high level of security:

-   **Network isolation**: Sandboxes are strictly network isolated, preventing data from leaving the sandbox environment. The only allowed network traffic is ingress from authenticated internal systems for code execution purposes.
    
-   **No data sharing**: Each sandbox is assigned to a specific session, ensuring that data and code uploaded during that session are not shared across sandboxes. Once the sandbox is destroyed, all session data is wiped.
    
-   **Resource monitoring**: Each sandbox is containerized and uses Kubernetes pod limits monitored to prevent overuse of system resources. This helps mitigate denial-of-service (DoS) risks by ensuring users cannot consume excessive amounts of memory or CPU.
    

## User controls and customization[​](#user-controls-and-customization "Direct link to User controls and customization")

Users have control over the following aspects of the sandbox environment:

-   **Code execution**: LLM-generated code will be executed in the sandbox. Code can be executed and re-executed during the session until the sandbox is reset or destroyed.
    
-   **Session termination**: Sandboxes are automatically cleaned up after a session ends, and users can also clear their chat session from the sidebar.
    

While the sandbox environment operates within predefined security and resource limits, users can control how long they keep their session active and how much data they upload for analysis, all within safe limits.

## Costs and efficiency[​](#costs-and-efficiency "Direct link to Costs and efficiency")

Our sandbox solution is designed to be both cost-effective and scalable. The sandbox runs on cloud infrastructure, which allows us to optimize resource usage based on demand.

-   **Cost per sandbox**: There is a fixed monthly cost associated with running the machine on which the sandboxed pods run, which can range from $35–60/month for most deployments. (See the FAQ for details.) This makes the sandbox solution highly affordable for customers who need to execute code on demand.
    
-   **Scalability**: We have a fixed number of sandboxes that determine the number of parallel user sessions at a time, but can work with you to upscale and downscale resourcing as needed.
    

## Summary[​](#summary "Direct link to Summary")

Our code sandbox provides a secure, isolated, and cost-effective environment for running code as part of the Data Analysis feature. With its robust security features, including resource limits, network isolation, and session-based sandboxing, you can safely analyze data without worrying about system integrity or data leakage. Our solution is also affordable, scalable, and efficient, making it an ideal choice for companies looking to perform complex data analysis with the highest security standards.

For more technical information on the architecture, see the [technical overview](/administration/assistant/data-analysis/technical-overview).

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### What happens to my data after a session ends?

Once a sandbox session is terminated, all data and code uploaded to the sandbox are automatically deleted. There is no persistence of data between sessions, ensuring that no customer data is stored or shared across sandboxes. The sandbox environment is destroyed, and a fresh instance is created for each new session.

### Can I control how long the sandbox stays active?

Yes, the sandbox is session-based and will remain active as long as the session is live. If there is no activity for a set amount of time, the sandbox will automatically terminate.

### Are there any limitations on the code I can run?

Yes, to ensure security and performance, the sandbox has some limitations:

-   **Resource limits**: CPU and memory usage are capped to prevent misuse.
-   **Restricted libraries**: Only certain Python libraries are available by default. Libraries that pose security risks or are not essential for data analysis are restricted.
-   **Execution time limits**: Code execution is limited by time to avoid long-running processes from overconsuming resources.

### What kind of network restrictions does the sandbox have?

The sandbox environment is fully network isolated, meaning:

-   **No network egress**: Sandboxes are prevented from sending any data outside the sandbox, ensuring that no external connections can be made from the environment.
-   **Ingress-only traffic**: The only inbound network traffic allowed is from authenticated systems within the platform, specifically for executing Data Analysis tools.

### How does the sandbox handle security vulnerabilities?

Our sandbox is designed with multiple layers of security to minimize vulnerabilities:

-   **Isolation**: Each sandbox is completely isolated from others, preventing unauthorized access to data or code.
-   **Strict access controls**: Access to the sandbox environment is only possible from inside the platform, and all requests are authenticated through secure channels.
-   **Automatic cleanup**: Once a session ends, the sandbox is destroyed, and all associated data is deleted, reducing the risk of any lingering vulnerabilities.

### How is resource usage monitored in the sandbox?

Resource usage (CPU and memory) is closely monitored in real-time. Each sandbox is provisioned with set limits on CPU and memory usage to ensure fair resource allocation and prevent system overload.

### What if my organization needs more concurrent sessions?

For organizations that need more concurrent sessions or larger workloads, we offer scalable solutions. You can increase the number of sandboxes by adjusting the resource allocation and contacting your account manager.

### What happens if the sandbox reaches its resource limits?

If your code exceeds the predefined resource limits (memory or CPU), the sandbox will stop the execution and return an error. This ensures that system resources are not over-consumed, protecting both your session and other users' experiences. You may need to reduce the input data size to stay within the allowed limits.

### Can I integrate third-party tools or libraries into the sandbox?

The sandbox comes with a limited set of pre-approved Python libraries. For security reasons, external libraries or tools cannot be directly integrated into the sandbox environment. If your organization requires additional libraries, please contact our support team to explore potential customizations.

### How much does the sandbox cost?

If Glean hosts your instance, this is included with your subscription. If you're hosting Glean yourself, the sandbox environment is cost-efficient. The overall cost depends on the resourcing you select, typically ranging from $35-60/month for most deployments.

warning

During the beta, it is not possible to scale beyond 54 concurrent user sessions. If your resourcing needs are different, let your customer success manager know and we will work with you directly.
