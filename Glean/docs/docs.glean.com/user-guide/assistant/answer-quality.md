---
url: "https://docs.glean.com/user-guide/assistant/answer-quality"
canonical: "https://docs.glean.com/user-guide/assistant/answer-quality"
title: "Troubleshoot answer quality"
description: "What to do when Glean gives a wrong answer, an inaccurate or incomplete response, a slow response, or didn't use my documents. Check citations, fix gaps, and send feedback."
fetched_at: "2026-10-13T08:51:26.017Z"
---
On this page

Sometimes a Glean answer looks wrong, misses a document you expected, or ignores something you said earlier. Try the following steps to work out what happened, fix what you can, and report answer quality so Glean can investigate.

## The answer looks wrong[​](#the-answer-looks-wrong "Direct link to The answer looks wrong")

Start with the citations. Every claim that Glean can support points to a source you already have permission to open, so the citations show whether the problem is the answer or the underlying content. See [citations](/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations).

Select the inline citation markers in the response to see which document Glean used. Hover over a marker to preview the source in a card, and select the card to open the full document.

Open the original document and check the claim. If the source is outdated or contradicts itself, the answer reflects your content rather than an error in Glean. If the sources are correct but the answer misreads them, downvote the response (select **thumbs down** at the bottom of the response) and describe the difference. The Glean quality team reviews answer quality votes.

## The answer is missing a document[​](#the-answer-is-missing-a-document "Direct link to The answer is missing a document")

Glean only uses content that is both indexed and visible to you, so a missing document is usually a permissions or timing gap rather than a bad answer.

-   **Check your access.** Glean mirrors the permissions in your connected apps. If you can't open the document in its original app, Glean can't use it for your answer.
-   **Check whether the app is connected.** Your admin controls which apps Glean indexes. Open [Settings](https://app.glean.com/settings) to see the apps you can connect.
-   **Allow for indexing time.** For most apps such as Jira, Confluence, and Slack, Glean indexes new content within 15 minutes. For apps like Zendesk and Salesforce, API restrictions mean changes appear within an hour. If delays are longer than that, contact your Glean admin.
-   **Point Glean at the source.** Type `@` and select the document or person you want Glean to use, then ask the question again.

## The answer is too broad or off-topic[​](#the-answer-is-too-broad-or-off-topic "Direct link to The answer is too broad or off-topic")

Name the document, team, or date range you care about, or `@` mention the source. Narrower questions produce answers that are easier to verify.

## The tool did not run[​](#the-tool-did-not-run "Direct link to The tool did not run")

If Glean returns instructions instead of doing the action in a connected app, and no **Connect** prompt appears, you're probably in a reasoning mode that doesn't load connected-app tools.

Switch to **Thinking** mode from the chat input and ask again. See [reasoning modes](/user-guide/assistant/glean-chat#reasoning-modes) and [troubleshooting tools authentication](/troubleshooting/tools-authentication#glean-returns-instructions-instead-of-running-an-action).

## Glean mixed up an earlier message[​](#glean-mixed-up-an-earlier-message "Direct link to Glean mixed up an earlier message")

Memory and personalization have documented limits. Duplicate entries can appear and Glean consolidates them over time, and Glean consolidates new context about once a day, so Glean may not yet reflect something you said recently. Review [known limitations](/user-guide/assistant/memory-personalization#known-limitations), then check and edit your saved memories in **Settings → Personalization**.

To keep a single conversation on track, restate the constraint in your next message instead of starting a new chat.

## A long chat stops responding[​](#a-long-chat-stops-responding "Direct link to A long chat stops responding")

Each turn in a chat has to fit inside the model's context window, and a long conversation, especially one with large uploads or many full-document reads, can outgrow that space. When this happens, answers may become less accurate, or messages may fail to send. This limit applies to the conversation and doesn't reset on its own, so retrying the same chat keeps failing.

To recover, you can continue your work in a new chat:

1.  In your current chat, ask Glean to summarize the conversation so far.
2.  Start a new chat and copy-paste Glean's summary as its first message.

To avoid reaching the limit on long tasks, split the work across shorter chats and attach or read only the files each step needs. For the underlying limits and full recovery steps, see [Chat session size limits](/agents/concepts/execution-limits#chat-session-size-limits).

## The response was slow[​](#the-response-was-slow "Direct link to The response was slow")

Response time varies with the question and how much content Glean searches. A Deep Research report takes longer than a short chat answer. Glean doesn't publish a response time target, and no setting guarantees one.

If a simple question is consistently slow, downvote the response so the timing data reaches the quality team, and tell your Glean admin.

## Nothing in this list applies[​](#nothing-in-this-list-applies "Direct link to Nothing in this list applies")

Send feedback on the specific response. Detail is what makes it useful.

1

Downvote the response

Select **thumbs down** at the bottom of the response. A feedback form opens.

2

Say what you expected

Include the answer you expected, the document or system that holds the correct information, and which part of the response was wrong. Select a structured reason when one fits.

3

Submit

Glean sends the rating and your comment for review. Your chat is not sent to Glean. See [user feedback](/user-guide/assistant/user-feedback) for who can see it.

Feedback goes to review and troubleshooting. It doesn't retrain Glean's responses automatically, so don't expect the same question to change right away.

Escalate to a support ticket when the problem blocks your work, affects your whole team, or repeats across many questions. Your Glean admin files tickets for your organization. See [create a support ticket](/troubleshooting/support-center/tickets).

## See also[​](#see-also "Direct link to See also")

-   [Best Practices](/user-guide/assistant/best-practices) — how to phrase questions for better answers
-   [Citations](/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations) — how to verify the sources behind an answer
-   [How Glean accesses information](/user-guide/assistant/how-glean-accesses-info) — what Glean can search on your behalf
-   [User feedback](/user-guide/assistant/user-feedback) — what happens after you upvote or downvote
-   [Quick start guide](/user-guide/about/end-user-quick-start-guide) — habits that produce better answers
