---
url: "https://developers.glean.com/guides/tools/faq"
canonical: "https://developers.glean.com/guides/tools/faq"
title: "FAQ | Glean Developer"
description: "Frequently asked questions about implementing and using Tools on Glean's platform"
fetched_at: "2026-09-01T13:23:03.725Z"
---
On this page

## Common Questions[​](#common-questions "Direct link to Common Questions")

Which fields are interpreted by LLM?

The "Unique Identifier" and "Trigger Condition (including Example Queries)" fields are used by the LLM to identify which tool it should invoke/use for a user's query.

Make sure to give a detailed trigger condition and example queries, to ensure LLM knows exactly what user queries this tool should be used for.

How to authenticate Tools built using Glean's Jira template?

Follow the steps in [Glean Documentation](https://docs.glean.com/administration/tools/setup-tools/jira-tools-setup#configure-authentication) to set up authentication for Jira.

What are type hints?

Type hints are like instructions that help the Glean AI understand and work with different tools better. They're clues that tell the AI what each part of a tool does, making it easier for the AI to get the right information or do the right thing with those tools.

### Benefits of Implementing Type Hints[​](#benefits-of-implementing-type-hints "Direct link to Benefits of Implementing Type Hints")

Type hints provide two key advantages:

-   **Simplified Tool Creation**: Type hints make it easier for developers to describe their tools' capabilities and requirements.
-   **Better at Getting Information and Doing Tasks**: Type hints give clear instructions on gathering data or performing actions, leading to more accurate and relevant results from the AI.

### How to Use Type Hints[​](#how-to-use-type-hints "Direct link to How to Use Type Hints")

To use type-hints, consider the following steps:

1.  Identify Relevant Type Hints: Review the list of supported type hints to determine which ones align with your tool's functionality.
2.  Incorporate Type Hints into Your API Specs: Add the selected type hints as structured details in your tool's API specifications.

### Supported Type Hints[​](#supported-type-hints "Direct link to Supported Type Hints")

Here are the type hints currently supported by Glean:

#### Content[​](#content "Direct link to Content")

Applied to fields that deal with large amounts of text or content. Ideal for tools that generate, modify, or display content.

```
description:  x-glean-typehint: 'Content'  type: string  description: Rich description.
```

#### EmailAddress[​](#emailaddress "Direct link to EmailAddress")

Used for fields that capture the email address of the user.

```
assignee:  x-glean-typehint: 'EmailAddress'  type: string  description: User to which the issue is assigned.
```

#### JiraComponentId[​](#jiracomponentid "Direct link to JiraComponentId")

Designated for fields involving a JIRA component ID.

```
components:  x-glean-typehint: 'JiraComponentId'  type: string  description: Component Id where the ticket should be filed.
```

#### JiraIssueId[​](#jiraissueid "Direct link to JiraIssueId")

Used for fields that interact with a specific JIRA issue.

```
issue:  x-glean-typehint: 'JiraIssueId'  type: string  description: Issue Id on which comment should be posted.
```

#### JiraIssuePriority[​](#jiraissuepriority "Direct link to JiraIssuePriority")

For fields that denote the priority of a Jira issue.

```
priority:  x-glean-typehint: 'JiraIssuePriority'  type: integer  description: Numeric priority. 1 (Highest) to 5 (Lowest)  minimum: 1  maximum: 5
```

#### JiraIssueType[​](#jiraissuetype "Direct link to JiraIssueType")

For fields that denote a Jira issue type.

```
issue_type:  x-glean-typehint: 'JiraIssueType'  type: integer  description: Issue type. 10000 refers to Epic, 10001 to Story, 10002 to Task, 10003 to Sub-Task, 10004 to Bug.
```

#### JiraProjectID[​](#jiraprojectid "Direct link to JiraProjectID")

For fields requiring a JIRA project ID.

```
pid:  x-glean-typehint: 'JiraProjectID'  type: string  description: Project ID where the ticket is created.
```

#### ResultUrl[​](#resulturl "Direct link to ResultUrl")

For fields containing the URL of created objects from write tools.

```
jiraTicketUrl:  x-glean-typehint: 'ResultUrl'  type: string  description: Url of the created object.
```

Do Tools work for endpoints behind VPN?

Yes, please contact our team for information on how to do this.

How much data can my service return (for retrieval tools)?

The response from the service you're connecting to retrieve content using your retrieval tool will be sent to the LLM to create the final response. Hence, please ensure that the data returned is not larger than ~8000 characters. Depending on the LLM model being used, larger responses will be truncated from the end.
