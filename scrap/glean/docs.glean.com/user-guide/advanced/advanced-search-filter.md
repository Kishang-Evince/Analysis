---
url: "https://docs.glean.com/user-guide/advanced/advanced-search-filter"
canonical: "https://docs.glean.com/user-guide/advanced/advanced-search-filter"
title: "Advanced search filters in Glean"
description: "Learn filter syntax, examples, and best practices to get precise results in Glean Search and when building Agents."
fetched_at: "2026-09-01T13:30:37.397Z"
---
On this page

[Search filters](/user-guide/search/how-to-search-in-glean) narrow your results to exactly what you need. Instead of scanning hundreds of results for one document, you can ask for "Google Drive presentations from Jane, updated last week."

Use filters to:

-   Run precise queries in Glean Search
-   Build **Manual** search queries in Agents, so a step retrieves exactly the data you specify

The basic syntax is `filter:value`, such as `app:gdrive` or `from:"Jane Doe"`. Add a `-` to exclude results, so `-app:gmail` leaves out Gmail. Combine filters to narrow further.

If you're building an Agent, see [Use search filters in Glean Agents](#use-search-filters-in-glean-agents) for the rules that keep results reliable.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

You need access to Glean Search. To test filters for Agents, you also need permission to build or edit agents.

## How to build a search query[​](#how-to-build-a-search-query "Direct link to How to build a search query")

Build a query incrementally. Start with keywords, then add one filter at a time to narrow the results:

1.  Start simple: `project phoenix`
2.  Add an app: `project phoenix app:confluence`
3.  Add a type: `project phoenix app:confluence type:page`
4.  Add a person: `project phoenix app:confluence type:page from:"PM"`
5.  Add a time filter: `project phoenix app:confluence type:page from:"PM" updated:past_week`

## Essential syntax rules[​](#essential-syntax-rules "Direct link to Essential syntax rules")

Quote multi-word values, and use quotes for exact phrases. Unquoted words match any of the words. Quoted words must all appear.

```
filter:value                    → Basic filter syntaxfilter:"value with space"       → Quote multi-word values"exact phrase"                  → Match this exact phrase"word1" "word2"                 → Require both words, in any orderword1 word2                     → Match any of these words-filter:value                   → Exclude matching results
```

## Core filters[​](#core-filters "Direct link to Core filters")

These are the fundamental filters that work across all applications:

```
app:appname                    → Limit to specific app(s)type:typename                  → Filter by document type  from:person                    → From specific personfrom:me                        → Your documentsupdated:timeframe              → Recently modifiedmy:history                     → You've viewed (6 month limit)collection:"Name"              → In a Glean collectionhas:golink                     → Has a Go linkin:"Folder Name"               → Docs in specific container/space/folder
```

## Date and time expressions[​](#date-and-time-expressions "Direct link to Date and time expressions")

### Natural language[​](#natural-language "Direct link to Natural language")

```
updated:today                  → Current day onlyupdated:yesterday              → Previous day onlyupdated:past_week              → Last 7 daysupdated:past_month             → Last 30 daysupdated:past_3_days            → Last 3 daysupdated:past_quarter           → Last 90 daysupdated:this_week              → Current calendar weekupdated:last_month             → Previous calendar monthafter:"2024-01-01"             → After a specific datebefore:"2024-01-01"             → Before a specific date
```

### Specific dates[​](#specific-dates "Direct link to Specific dates")

```
updated:"2024-01-15"                    → Specific dateupdated:"2024-01"                       → Entire monthupdated:"2024"                          → Entire yearupdated:"2024-Q1"                       → Quarterafter:"2024-01-01" before:"2024-01-31"  → Date range
```

## Boolean logic[​](#boolean-logic "Direct link to Boolean logic")

-   **The same filter behaves like *or*.** `type:doc type:sheet` matches docs or sheets.
-   **Different filters behave like *and*.** `app:jira from:me` matches Jira items from you.
-   You can't force *and* on the same filter (platform limitation).
-   No parentheses or custom grouping (platform limitation).
-   **Negation:** add `-` to exclude a term. For example, `employee experience -customer` excludes results that mention "customer."

## People and entity filters[​](#people-and-entity-filters "Direct link to People and entity filters")

Find people by title, department, location, or reporting structure, and combine those filters with document searches.

```
# Job & Organizationtitle:"Software Engineer"      → Job titledepartment:engineering         → Departmentbusinessunit:sales             → Business unitteam:"Platform Team"           → Specific team# Locationlocation:"San Francisco"       → City/officecountry:"United States"        → Countrystate:"CA"                     → State/provinceregion:"EMEA"                  → Region# Reporting & Employmentreportsto:"Manager Name"       → Direct managerlevel:[ic|manager|director]    → Seniority levelstartafter:"2023-01-01"        → Start date afterstartbefore:"2024-01-01"       → Start date beforeemploymenttype:[fulltime|contractor|intern]# Combining with documentsfrom:[title:"Product Manager"] type:presentationfrom:[department:sales] updated:past_week
```

## Text matching patterns[​](#text-matching-patterns "Direct link to Text matching patterns")

```
# Exact phrase"quarterly business review"     → Exact phrase in order# All words required"quarterly" "business" "review" → All 3 words, any order# Any wordsquarterly business review       → ANY of these words# Special characters (use quotes)"user@company.com""Q4-2024"  "$1,000,000""C++"
```

## Use search filters in Glean Agents[​](#use-search-filters-in-glean-agents "Direct link to Use search filters in Glean Agents")

A **Manual** search query gives an Agent step exact control over what it retrieves, so results stay consistent from one run to the next. **AI-generated** queries are convenient, but their filters can change between runs.

For a **Company Search** step, default to a Manual search query. Use an AI-generated query only when the Agent must set a parameter during the run, such as a relative date.

### Rules for reliable results[​](#rules-for-reliable-results "Direct link to Rules for reliable results")

-   **Quote multi-word values:** `account:"Acme Corp"`
-   **Test the query in Glean Search first**, then copy the exact syntax
-   **Prefer Manual search** over AI-generated when you can
-   **Include every filter** the step needs
-   **Handle empty results** in your Agent logic

note

Any manual query that works in Agents also works in Glean Search, which makes the Search UI a convenient place to test.

### Good and bad examples[​](#good-and-bad-examples "Direct link to Good and bad examples")

Quote multi-word values. Unquoted values are misread and cause parsing errors.

```
✅ account:"Acme Corporation" status:"in progress"❌ account:Acme Corporation status:in progress✅ app:jira type:bug label:"high-priority"❌ app:jira type:bug label:high priority
```

## Tips and tricks[​](#tips-and-tricks "Direct link to Tips and tricks")

### Performance tips[​](#performance-tips "Direct link to Performance tips")

-   Add an `app:` filter first to narrow the scope
-   Be specific with document types
-   Limit date ranges when you can
-   Use exact phrases for titles you know

### Discover filters through the Search UI[​](#discover-filters-through-the-search-ui "Direct link to Discover filters through the Search UI")

1.  Run a search.
2.  Click **All filters**.
3.  Select options.
4.  Copy the syntax from the search bar.

## Known limitations and workarounds[​](#known-limitations-and-workarounds "Direct link to Known limitations and workarounds")

| Limitation | What doesn’t work | Practical workaround |
| --- | --- | --- |
| No complex boolean | `(A OR B) AND (C OR D)` | Run multiple targeted searches |
| No same‑field AND | “Docs with Jane AND John” | Use text search for both names |
| No regex | Pattern matching | Use multiple exact phrases |
| History scope | `my:history` > 6 months | Combine with other filters |
| GDrive recency edge cases | Newly updated files may not appear with broad time filters | Combine time with `from:` or `type:`; add keywords for critical searches |
| Bounded result set | Glean Search returns a ranked set of top results per query, not an exhaustive list. It isn't a substitute for native source query languages when you need every matching record. | For complete enumeration, use a source-specific tool (for example, [Search Jira with JQL](/tools/connector/jira/search-jql)) or break queries into narrower time-sliced windows |

## Quick reference table[​](#quick-reference-table "Direct link to Quick reference table")

Common needs and the filter combinations that cover them:

| Need | Filter combination |
| --- | --- |
| My recent work | `from:me updated:past_week` |
| Team documents | `from:[department:"Dept"] type:document` |
| Open bugs | `app:jira type:bug status:"open"` |
| Customer intel | `"Acme Corp" app:salescloud app:zendesk` |
| Meeting notes | `"meeting" type:document updated:past_month` |
| Shared drives | `app:gdrive folder:"Shared"` |
| Recent Slack | `app:slack updated:yesterday` |
| My history, slides | `my:history type:presentation` |

## Common search patterns[​](#common-search-patterns "Direct link to Common search patterns")

These are ready-to-use queries for team documents, customer intelligence, project tracking, bugs, sales, and knowledge search.

Recent team documents

```
from:[department:"Engineering"] updated:past_weekfrom:[reportsto:"Manager Name"] "meeting notes"from:me app:gdrive type:document updated:past_month
```

Customer intelligence

```
"Acme Corp" app:salescloud app:zendesk app:gongaccount:"Acme Corp" type:opportunity status:"open""Acme Corp" app:slack channel:"#customer-success"
```

Project tracking

```
"Project Phoenix" app:confluence app:jira"Project Phoenix" updated:past_week -type:email"Project Phoenix" from:[team:"Phoenix Team"]
```

Bug management

```
app:jira type:bug status:"open" priority:highestapp:jira type:bug label:customer-reported assignee:meapp:jira type:bug status:"resolved" updated:past_week
```

Sales pipeline

```
app:salescloud type:opportunity stage:!"closed lost"app:salescloud type:opportunity amount:>100000app:salescloud closedate:"2024-Q1" owner:me
```

Knowledge search

```
"how to" type:document app:confluence label:tutorialcollection:"Engineering Playbooks" "best practices"has:golink "onboarding"
```

## Application-specific filters[​](#application-specific-filters "Direct link to Application-specific filters")

Filter syntax and examples for Google Drive, Slack, Jira, Confluence, Salesforce, GitHub, GitLab, Teams, Gong, and Zendesk.

Google Drive

```
app:gdrivetype:[document|spreadsheet|presentation|pdf|image|video|folder]folder:"Folder Name"owner:email@company.comExample:app:gdrive type:spreadsheet folder:"Finance" updated:past_week
```

Slack

```
app:slackchannel:"#channel-name"   # include the #from:@username            # include the @type:[conversation|channel|dm]Example:app:slack channel:"#engineering" from:@john "deployment"
```

Jira

```
app:jiratype:[bug|story|epic|task|subtask]status:"Status Name"assignee:"Person Name"reporter:"Person Name"project:"PROJECT-KEY"label:labelnamecomponent:componentnamepriority:[highest|high|medium|low|lowest]sprint:"Sprint Name"Example:app:jira type:bug status:"in progress" priority:high assignee:me
```

Confluence

```
app:confluencetype:[page|blogpost|space]space:"Space Name"author:"Person Name"label:labelnameExample:app:confluence space:"Engineering Wiki" author:"Jane" label:howto
```

Salesforce

```
# Sales Cloudapp:salescloudtype:[opportunity|account|lead|contact|case]status:"Status Name"stage:"Stage Name"owner:"Person Name"account:"Account Name"amount:>100000closedate:"2024-Q1"# Service Cloudapp:servicecloudtype:casepriority:[high|medium|low]Example:app:salescloud type:opportunity stage:"negotiation" amount:>50000
```

GitHub / GitLab

```
app:github   # or app:gitlabtype:[issue|pr|commit|repo|discussion]repo:"repository-name"author:"username"assignee:"username"label:labelnamestatus:[open|closed|merged]Example:app:github type:pr repo:"main-app" status:open label:bug
```

Microsoft Teams

```
app:teamsteam:"Team Name"channel:"Channel Name"from:"Person Name"type:[conversation|file|channel]Example:app:teams team:"Product Dev" channel:"General" type:file
```

Gong

```
app:gongaccount:"Account Name"participant:"Person Name"type:[call|email]Example:app:gong account:"Acme Corp" type:call updated:past_week
```

Zendesk

```
app:zendesktype:ticketstatus:[new|open|pending|solved|closed]priority:[urgent|high|normal|low]assignee:"Agent Name"requester:"Customer Name"Example:app:zendesk type:ticket status:open priority:urgent
```
