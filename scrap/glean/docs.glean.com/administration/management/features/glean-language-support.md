---
url: "https://docs.glean.com/administration/management/features/glean-language-support"
canonical: "https://docs.glean.com/administration/management/features/glean-language-support"
title: "Glean Language Support"
description: "Use Glean in your preferred language."
fetched_at: "2026-09-01T13:29:09.216Z"
---
On this page

## Capabilities[​](#capabilities "Direct link to Capabilities")

-   **Search** – Results are a subset of all documents written in the same language as the query.
-   **Chat** – Responses match the language of the query, and typically are based on documents written in the same language of the query.
    -   Note that this means Glean can only answer questions based off documents in the same language – for example, an English query that needs knowledge from a Spanish document is not GA.
    -   We do have initial support for the above (asking a question in language X that requires knowledge from language Y) for 2-lingual corpora as early access (🟦).
-   **Summarization** – Summaries are provided in the user interface language, regardless of the source document’s language.

**WARNING:** Because our LLM engines are multilingual, it may appear upon casual testing that Glean can understand languages not enumerate below – however, this is very different from our end-to-end, core technology actually functioning, so please do not use that to infer that Glean supports that language!

## Support matrix[​](#support-matrix "Direct link to Support matrix")

✅ Generally available  
🟦 Early access and welcoming design partners to help battle-test it!

|  | Keyword Search | Semantic Search | Glean | UI |
| --- | --- | --- | --- | --- |
| English | ✅ | ✅ | ✅ | ✅ |
| German | ✅ | ✅ | ✅ | ✅ |
| Japanese | ✅ | ✅ | ✅ | ✅ |
| Portuguese | ✅ | ✅ | 🟦 | ✅ |
| Spanish | ✅ | ✅ | 🟦 | ✅ |
| Croatian | ✅ | ✅ |  | ✅ |
| Czech | ✅ | ✅ |  | ✅ |
| Greek | ✅ | ✅ |  | ✅ |
| Hungarian | ✅ | ✅ |  | ✅ |
| Slovak | ✅ | ✅ |  | ✅ |
| Macedonian | ✅ | ✅ |  |  |
| Polish | ✅ | ✅ |  |  |
| Romanian | ✅ | ✅ |  |  |
| French | ✅ | 🟦 | 🟦 | ✅ |
| Dutch | ✅ |  | 🟦 | ✅ |
| Italian | ✅ |  | 🟦 | ✅ |
| Chinese (Simplified) | 🟦 |  | 🟦 | ✅ |
| Chinese (Traditional) | 🟦 |  | 🟦 | ✅ |
| Korean | 🟦 |  | 🟦 | ✅ |
| Turkish | 🟦 |  | 🟦 |  |
| Albanian | 🟦 |  |  |  |
| Arabic | 🟦 |  |  |  |
| Bengali | 🟦 |  |  |  |
| Bulgarian | 🟦 |  |  |  |
| Danish | 🟦 |  |  |  |
| Finnish | 🟦 |  |  |  |
| Hindi | 🟦 |  |  |  |
| Indonesian | 🟦 |  |  |  |
| Norwegian | 🟦 |  |  |  |
| Russian | 🟦 |  |  |  |
| Swedish | 🟦 |  |  |  |
| Tamil | 🟦 |  |  |  |
| Telugu | 🟦 |  |  |  |
| Ukrainian | 🟦 |  |  |  |

### Glossary[​](#glossary "Direct link to Glossary")

**Keyword Search** – The syntax/grammatical structure of the language is understood by the search stack. Search is functional.  
**Language detection** – The language of the query is understood.  
**Segmentation** – The boundary between words is understood.  
**Stemming** – Concepts such as plurals and verb tenses are understood.  
**Stop words** – Common words such as articles (e.g. a, the) and prepositions (e.g. of, from, in) are ignored.

**Semantic Search** – The semantics of the language as used in the particular enterprise context is understood. Search is stronger.  
**Frequency-based term weights** – System understands the relative frequency of all terms (not just stop words) and weighs them appropriately when constructing a result set.  
**Domain-Adapted Vector Search** – a fine-tuned embedding model is used within the larger hybrid search system  
**Acronyms** – Corpus specific acronyms are automatically mined.  
**Synonyms** – Corpus specific synonyms are automatically mined.

**Assistant** – Glean has been optimized for the language and in-context learning examples have been provided in the language. Note that as Glean is reliant on Search through RAG, quality is dependent on how much of the first 2 columns is complete for a given language: keyword Search is a strict requirement, and Semantic Search will improve upon quality.

**User Interface** – All end-user facing product surfaces are localized into the given language / region. Note that external help documentation and admin workspace setup are not yet localized.
