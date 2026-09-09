---
url: "https://docs.glean.com/user-guide/assistant/code-search"
canonical: "https://docs.glean.com/user-guide/assistant/code-search"
title: "Code Search"
description: "Learn about Glean's capability to search code through the repositories."
fetched_at: "2026-09-01T13:30:38.427Z"
---
On this page

The Code Search capability in Glean primarily runs as an automatic tool inside Glean, helping you find and reason over code across your connected repositories. You can also invoke it explicitly through the Code Search tool in Agents when you need tighter control or custom query patterns.

There is no initial setup required for Glean to start using Code Search. After you connect your code hosts like GitHub, GitHub Enterprise Server, GitLab or GitLab server, Glean uses Code Search automatically.

Code Search is supported for GitHub cloud, GitHub Enterprise cloud, GitLab On-prem, GitHub On-prem enterprise server, Gitlab self-managed On-prem, Bitbucket cloud, Bitbucket On-Prem and for Glean deployments on GCP, AWS and Azure.

This functionality is designed to assist with various code-related tasks, such as:

-   **Finding and understanding code**: Helps users locate specific code snippets, understand code changes, and navigate through code repositories.
-   **Creating code snippets**: Allows users to generate code snippets based on their queries.
-   **Debugging**: Assists in identifying recent changes that may be causing errors by searching through recent pull requests and commits.
-   **Feature status checks**: Provides information on whether certain features have been implemented and how they can be enabled by searching related code files and documentation.

Glean automatically detects when you have a question about your code. For example, if you ask,

-   "What changed in X?"
-   "Where is Y implemented?"
-   "How do I add Z endpoint?" It runs a Code Search and uses the code from your connected hosts. The Code Search feature respects the access permissions to give you the right results.

With Code Search, Glean gives answers with code context and uses its understanding of your code, commits, and pull requests to give you a full summary. It can suggest likely code locations, show code differences (diffs) and point to previous implementations.

## Security[​](#security "Direct link to Security")

Code Search protects private repositories as it inherits the same security model as your code connectors.

Glean respects your privacy and operates with high security guardrails so processing stays within your environment. **All data is stored in your cloud project-no data leaves your environment.** Glean also enforces user access permissions at query time, ensuring users only see data they are authorized to view.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   **Debugging Errors**: A user can search for recent code changes that might have introduced errors into a specific component. The tool will look through recent commits and pull requests to identify potential causes and summarize them.
    
    **Example**: "What recent changes could have caused errors in runtime configs?" The tool might identify PRs that addressed configuration errors and suggest reviewing those changes.
    
-   **Feature Implementation Status**: A user can inquire about the implementation status of a specific feature. The tool can identify if the feature has been implemented, locate the documentation, and even provide instructions on enabling it.
    
    **Example**: "Is indexing of code content from GitHub files enabled?" The agent would confirm if the feature is active and outline the steps to enable it.
    
-   **Code Implementation Guidance**: A user, unsure where to start with implementing a new feature, can get guidance on which files to modify based on past similar changes.
    
    **Example**: "Where can I add a new endpoint in QE?" The tool would search for similar past implementations and provide sample code snippets and file locations to get started.
    

For information on using Code Search explicitly in agents, see the [Code Search tool](/tools/glean/code-search).
