---
url: "https://docs.glean.com/administration/management/features/glean-language-support"
canonical: "https://docs.glean.com/administration/management/features/glean-language-support"
title: "Glean language support"
description: "Use Glean in your preferred language."
fetched_at: "2026-10-13T08:49:16.926Z"
---
On this page

Language support covers three parts of Glean:

-   **Search** returns documents written in the same language as your query
-   **Assistant** answers in the language you asked in, and usually draws on documents written in that same language
-   **Summarization** writes summaries in your interface language, whatever language the source document uses

Because Assistant depends on documents in the language of the question, an English question that needs knowledge from a Spanish document isn't generally available. Asking in one language and drawing on documents in another is an early access feature.

warning

Glean's language models are multilingual, so casual testing can make it look like Glean understands a language that isn't listed below. That's different from Glean's end-to-end search technology working in that language. Use the support matrix rather than spot checks to confirm whether Glean supports a language.

## How Glean searches your content[​](#how-glean-searches-your-content "Direct link to How Glean searches your content")

Glean looks for your content in two different ways, and the support matrix tracks each one by language.

### Keyword search[​](#keyword-search "Direct link to Keyword search")

Keyword search matches the actual words you type. Search for "parental leave" and Glean returns documents that contain those words.

Keyword search is the most precise option when you already know the wording you want, like a document title, a product name, or an error message. It matches keywords, not semantics. For example, a search for "time off policy" won't return a document titled "Vacation and leave guidelines," because the two don't share words.

Supporting a language means the search stack handles:

-   Language detection: Glean identifies which language the query is in
-   Segmentation: Glean finds the boundary between words
-   Stemming: plurals and verb tenses count as the same concept
-   Stop words: Glean ignores common words such as *a*, *the*, *of*, and *from*

### Semantic search[​](#semantic-search "Direct link to Semantic search")

Semantic search matches meaning rather than exact wording. It's what connects "time off policy" to that vacation and leave document.

Semantic search doesn't replace keyword search. Glean runs both and combines the results, so you get documents that match your exact words alongside documents that match what you meant.

Supporting a language means Glean handles:

-   Frequency-based term weights: Glean tracks how often every term appears, not just stop words, and weighs terms accordingly when building a result set
-   Domain-adapted vector search: a fine-tuned embedding model runs inside the larger hybrid search system
-   Acronyms: Glean mines the acronyms specific to your content automatically
-   Synonyms: Glean mines the synonyms specific to your content automatically

### How language support impacts Assistant[​](#how-language-support-impacts-assistant "Direct link to How language support impacts Assistant")

Assistant doesn't answer from memory. It searches your company's content first, then writes an answer based on the documents it finds.

Keyword search is the baseline requirement and semantic search raises search quality from there.

So a language with ✅ in both columns gives you the strongest Assistant answers. Where only keyword search is available, Assistant still works, but you'll get better results by phrasing questions with wording that's likely to appear in the document itself.

## Language support matrix[​](#language-support-matrix "Direct link to Language support matrix")

See the previous sections to understand keyword search and semantic search. The UI (user interface) column indicates language localization for every end-user product surface.

note

External help documentation and admin workspace setup are not yet localized.

✅ Generally available  
🟦 Early access. Contact your Glean representative to enable it.

|  | Keyword search | Semantic search | UI |
| --- | --- | --- | --- |
| English | ✅ | ✅ | ✅ |
| German | ✅ | ✅ | ✅ |
| Japanese | ✅ | ✅ | ✅ |
| Portuguese | ✅ | ✅ | ✅ |
| Spanish | ✅ | ✅ | ✅ |
| Croatian | ✅ | ✅ | ✅ |
| Czech | ✅ | ✅ | ✅ |
| Greek | ✅ | ✅ | ✅ |
| Hungarian | ✅ | ✅ | ✅ |
| Slovak | ✅ | ✅ | ✅ |
| Macedonian | ✅ | ✅ |  |
| Polish | ✅ | ✅ |  |
| Romanian | ✅ | ✅ |  |
| French | ✅ | 🟦 | ✅ |
| Dutch | ✅ |  | ✅ |
| Italian | ✅ |  | ✅ |
| Chinese (Simplified) | 🟦 |  | ✅ |
| Chinese (Traditional) | 🟦 |  | ✅ |
| Korean | 🟦 |  | ✅ |
| Turkish | 🟦 |  |  |
| Albanian | 🟦 |  |  |
| Arabic | 🟦 |  |  |
| Bengali | 🟦 |  |  |
| Bulgarian | 🟦 |  |  |
| Danish | 🟦 |  |  |
| Finnish | 🟦 |  |  |
| Hindi | 🟦 |  |  |
| Indonesian | 🟦 |  |  |
| Norwegian | 🟦 |  |  |
| Russian | 🟦 |  |  |
| Swedish | 🟦 |  |  |
| Tamil | 🟦 |  |  |
| Telugu | 🟦 |  |  |
| Ukrainian | 🟦 |  |  |
