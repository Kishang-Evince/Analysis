---
url: "https://developers.glean.com/guides/chat/deep-linked-citations"
canonical: "https://developers.glean.com/guides/chat/deep-linked-citations"
title: "Deep Linked Citations | Glean Developer"
description: "Upgrade your custom chat frontend to display rich citation previews with highlighted snippets from source documents"
fetched_at: "2026-09-01T13:23:02.275Z"
---
On this page

This guide explains how to update a custom chat frontend that uses Glean's `/chat` REST API to take advantage of **deep-linked (direct-quote) citations**, while remaining backward compatible with existing responses.

Deep-linked citations are available starting Q4 2025. REST API support is currently in Beta.

## Overview[​](#overview "Direct link to Overview")

Deep-linked citations upgrade Glean Chat's citations from **document-level** to **text-level**:

-   Citations can now include **exact snippets** from the source document that support the preceding statement, rather than just pointing to the document as a whole.
-   In the `/chat` response, this appears as a new optional `referenceRanges[].snippets[]` array attached to each inline `citation` fragment.

Backward Compatible

If your integration ignores these new fields, everything continues to work. The change is **additive and backward compatible**. This guide is about how to opt in and render the richer experience.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Deep-linked citations are available when all of the following are true:

### Agent Configuration

Your `/chat` request must set `agentConfig.agent` to `"FAST"` or `"ADVANCED"`. If omitted, requests default to Chat V2 which does not support deep-linked citations.

### Supported LLM Models

Deep-linked citations are supported with OpenAI (GPT) and Anthropic (Claude) models. Gemini is not currently supported.

note

Deep-linked citations are provided for answers grounded in **enterprise content** (company documents, email, etc.), not for pure world-knowledge or web search answers. If these conditions are not met, your existing citation UI continues to function as today.

## Response Format[​](#response-format "Direct link to Response Format")

### Baseline Structure (Unchanged)[​](#baseline-structure-unchanged "Direct link to Baseline Structure (Unchanged)")

Each chat response message still looks like:

```
{  "messages": [    {      "author": "GLEAN_AI",      "fragments": [        { "text": "Some generated text. " },        {          "citation": {            "sourceDocument": {              "id": "DOC_ID",              "datasource": "gdrive",              "title": "Document title",              "url": "https://docs.google.com/..."            }          }        }      ],      "citations": [ /* existing top-level citations, unchanged */ ]    }  ]}
```

Your existing integration likely uses:

-   `fragments[].text` to render the assistant answer
-   `fragments[].citation.sourceDocument` and/or `citations[]` to render citation pills

All of that remains valid.

### New `referenceRanges` Field[​](#new-referenceranges-field "Direct link to new-referenceranges-field")

When deep-linked citations are available for a given citation, the fragment's `citation` now also includes **reference ranges** with **snippets**:

```
{  "messages": [    {      // ...      "fragments": [        // ...        {          "citation": {            "sourceDocument": { /* ... */ },            "referenceRanges": [              {                "textRange": {                  "startIndex": 50,                  "endIndex": 120,                  "type": "LINK"                },                "snippets": [                  {                    "text": "I'd like to try out Codex for engineering tasks...",                    "pageNumber": 1                  },                  {                    "text": "to the ChatGPT Teams account?"                  }                ]              }            ]          }        }      ],      "citations": [ /* ... */ ]    }  ]}
```

**Key points:**

| Field | Description |
| --- | --- |
| `referenceRanges[]` | Optional array. Many citations will continue to be document-level only. |
| `referenceRanges[].textRange` | Describes which part of the assistant response the citation is attached to (existing behavior). |
| `referenceRanges[].snippets[]` | **New**: An array of direct-quote snippets from the source document that support the statement. |
| `referenceRanges[].snippets[].text` | The quoted text from the source document. |
| `referenceRanges[].snippets[].pageNumber` | Optional page number where the snippet appears. |

Each `snippet` is a `SearchResultSnippet` object from the public search/documents API, shared with other Glean surfaces. At minimum it has `text: string`, but may also include `pageNumber: number` and other metadata such as snippet identifiers.

note

Top-level `citations[]` on the message remain unchanged and still hold document-level info. They are not required to implement deep-linking but may be useful for your existing UI logic.

## Migration Options[​](#migration-options "Direct link to Migration Options")

### Minimal Migration

Stay compatible without UI changes—just update your types to tolerate the new fields

### Full Migration

Render deep-linked citations with hover previews showing direct quotes

### Minimal Migration[​](#minimal-migration "Direct link to Minimal Migration")

If you only want to stay compatible without changing your UI:

1.  **Update your deserialization model** to tolerate the new fields:
    
    -   The `citation` object now may contain a `referenceRanges` array with nested `snippets`
    -   If you are using a generated client or strict type definitions, regenerate from the latest OpenAPI spec so these fields are known but optional
2.  **Ignore `referenceRanges` / `snippets` for now.** The behavior will match pre-deep-linked citations. This is a good first step while you plan UI updates.
    

### Full Migration[​](#full-migration "Direct link to Full Migration")

If your goal is to mirror the Glean UI behavior, you'll render hover cards that show the **direct quote** backing each statement, plus surrounding context and (where available) a **page number** and preview.

**High-level flow for each assistant message:**

1.  Render `fragments[].text` as you do today
2.  For each `fragments[].citation`:
    -   Always show the document-level citation pill (title, datasource, icon, etc.) based on `sourceDocument`—this is unchanged
    -   If `referenceRanges[].snippets[]` is present, use those snippets to populate the **hover card / popover** with direct quotes and surrounding context
    -   Optionally show the `pageNumber` when present
3.  Clicking the citation can continue to open `sourceDocument.url`

## Fetching Document Content[​](#fetching-document-content "Direct link to Fetching Document Content")

To display **surrounding text** around each snippet, fetch the full document text via `/getdocuments` using the cited document IDs:

```
POST /rest/api/v1/getdocuments{  "documentSpecs": [{ "id": "DOC_ID" }],  "includeFields": ["DOCUMENT_CONTENT"]}
```

The response includes `content.fullTextList` which you can join to get the full document text, then search for each snippet's `text` within that string to derive preceding and following context.

## Code Examples[​](#code-examples "Direct link to Code Examples")

-   TypeScript/React
-   Pseudocode

```
type Snippet = { text: string; pageNumber?: number }async function loadDocumentContent(docId: string): Promise<string> {  const resp = await fetch("/rest/api/v1/getdocuments", {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      documentSpecs: [{ id: docId }],      includeFields: ["DOCUMENT_CONTENT"],    }),  })  const data = await resp.json()  const doc = Object.values(data.documents)[0] as any  return (doc?.content?.fullTextList || []).join("\n\n")}function findSurroundingText(  fullText: string,  snippetText: string,  windowChars = 200,): { preceding: string; cited: string; following: string } {  const idx = fullText.indexOf(snippetText)  if (idx === -1) {    return { preceding: "", cited: snippetText, following: "" }  }  const start = Math.max(0, idx - windowChars)  const end = Math.min(fullText.length, idx + snippetText.length + windowChars)  return {    preceding: fullText.slice(start, idx),    cited: fullText.slice(idx, idx + snippetText.length),    following: fullText.slice(idx + snippetText.length, end),  }}function CitationPopover({ citation }: { citation: any }) {  const [docContent, setDocContent] = useState<string | null>(null)  useEffect(() => {    if (citation.sourceDocument?.id) {      loadDocumentContent(citation.sourceDocument.id).then(setDocContent)    }  }, [citation.sourceDocument?.id])  const ranges = citation.referenceRanges ?? []  if (!ranges.length) {    // Fallback: document-level citation only    return <div>{citation.sourceDocument?.title}</div>  }  return (    <div className="citation-popover">      <div className="citation-header">        <strong>{citation.sourceDocument?.title}</strong>        {ranges[0]?.snippets?.[0]?.pageNumber != null && (          <span> · Page {ranges[0].snippets[0].pageNumber}</span>        )}      </div>      <div className="snippet-context">        {ranges.flatMap((range, idx) =>          (range.snippets || []).map((s, j) => {            if (!docContent) {              return <div key={`${idx}-${j}`}>{s.text}</div>            }            const { preceding, cited, following } = findSurroundingText(              docContent,              s.text,            )            // Fallback if snippet text couldn't be matched in document            if (!preceding && !following) {              return <div key={`${idx}-${j}`}>{s.text}</div>            }            return (              <p key={`${idx}-${j}`}>                {preceding && <span className="muted">...{preceding}</span>}                <mark>{cited}</mark>                {following && <span className="muted">{following}...</span>}              </p>            )          }),        )}      </div>    </div>  )}
```

```
# For each citation with referenceRanges:1. Extract document ID from citation.sourceDocument.id2. Fetch document content:   POST /getdocuments   Body: { documentSpecs: [{ id: docId }], includeFields: ["DOCUMENT_CONTENT"] }3. Join fullTextList to get complete document text4. For each snippet in referenceRanges[].snippets[]:   a. Find snippet.text within the full document text   b. Extract ~200 chars before and after for context   c. Render with:      - Preceding context (muted/gray)      - Snippet text (highlighted)      - Following context (muted/gray)      - Page number if available5. Show in hover popover when user hovers citation pill
```

## UX Guidelines[​](#ux-guidelines "Direct link to UX Guidelines")

### When Users See Deep-Linked Snippets[​](#when-users-see-deep-linked-snippets "Direct link to When Users See Deep-Linked Snippets")

-   Not every citation pill will have snippet highlights—deep-linking only appears when the LLM confidently matches a snippet
-   When present, the hover popover should:
    -   Highlight the **cited snippet** with emphasis (e.g., background color or bold)
    -   Show a few lines before and after for context
    -   Optionally show **page number** if provided
    -   Optionally offer an **"Expand"** button for a larger preview

### Limitations[​](#limitations "Direct link to Limitations")

| Limitation | Description |
| --- | --- |
| **Complex formatting** | Tables, spreadsheets, code blocks, and heavy HTML may render as plain text in the snippet preview, which can look noisy or hard to read |
| **Source navigation** | Clicking a citation opens the underlying document. Jumping directly to the exact page/offset is not guaranteed for all sources—it's supported only in some cases (e.g., slide number for certain PPT sources, some page-number support for PDFs) and is still being expanded |
| **Coverage** | Deep-linked citations are not provided for world-knowledge or web-search-only answers. Some citations may intentionally fall back to document-level when matching is uncertain, to avoid misleading users |

Design your UI to gracefully fall back to document-level behavior when no `referenceRanges` / `snippets` are present.

## Migration Checklist[​](#migration-checklist "Direct link to Migration Checklist")

1

### Verify Server Configuration

Ensure your `/chat` requests set `agentConfig.agent` to `FAST` or `ADVANCED` and use an LLM configuration that supports deep-linked citations.

2

### Update API Types

Regenerate your client types from the latest OpenAPI spec so `ChatMessageCitation.referenceRanges[].snippets[]` and `SearchResultSnippet.pageNumber` are present but optional.

3

### Handle New Fields Defensively

Ensure your deserialization tolerates the new fields. Handle unknown/extra fields defensively to accommodate future enhancements.

4

### Update Citation UI

Keep your existing document-level citation pills (title, icon, click → `sourceDocument.url`). If `referenceRanges[].snippets[]` exists, show snippet text in your hover/detail view with optional page number.

5

### Add Contextual Preview (Recommended)

On hover or "expand", call `/getdocuments` with the cited document IDs and `includeFields: ["DOCUMENT_CONTENT"]`. Use the returned `fullTextList` to compute surrounding context and highlight each snippet.

## Related Documentation[​](#related-documentation "Direct link to Related Documentation")

[

### Chat API Reference

Complete reference for the /chat endpoint







](/api/client-api/chat/overview)[

### Read Documents API

Fetch document content with includeFields options







](/api/client-api/documents/getdocuments)
