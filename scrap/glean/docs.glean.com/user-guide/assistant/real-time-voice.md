---
url: "https://docs.glean.com/user-guide/assistant/real-time-voice"
canonical: "https://docs.glean.com/user-guide/assistant/real-time-voice"
title: "Use real-time voice"
description: "Have natural, hands-free voice conversations with Glean on web, desktop, and mobile."
fetched_at: "2026-09-01T13:30:39.410Z"
---
On this page

Real-time voice lets you have natural, hands-free voice conversations with Glean. Instead of typing, you speak and hear Glean respond out loud, with interruptible back-and-forth dialogue. Conversations are transcribed into a standard chat so you can scroll, copy, or continue by text later.

Real-time voice is different from dictation or text-to-speech. It enables low-latency, interactive dialogue where you can interrupt, ask follow-up questions, and receive spoken answers grounded in your organization's knowledge.

note

On the Glean Universal Model Key, real-time voice is on by default, but your admin can turn it off. On Customer Key, your admin must set it up first. If you don't see the voice button, contact your Glean admin. For admin configuration details, see [Real-time voice setup](/administration/assistant/features/real-time-voice).

## Where to access[​](#where-to-access "Direct link to Where to access")

Real-time voice is available on web, in the Glean desktop app, and on mobile. Look for the **voice button** (waveform icon) in the composer.

You can start a voice session from the composer in a new conversation or an existing chat. Starting voice from an existing chat lets you carry a text conversation into voice and keep going hands-free.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Real-time voice must be enabled for your organization. On Customer Key deployments, your admin must set it up first. If you don't see the voice button, contact your Glean admin.

## How to start a voice session[​](#how-to-start-a-voice-session "Direct link to How to start a voice session")

1.  Open Glean.
2.  Tap or click the **voice button** (waveform icon) in the composer.
3.  Grant microphone access if prompted. You only need to do this the first time.
4.  Start talking. Glean listens and responds out loud. You can interrupt at any time.
5.  When you're done, end the voice session. You can also read the conversation on screen by switching to Chat in the ribbon. Your conversation is saved as a standard chat transcript that you can review, copy, or continue by text.

## Create documents by voice[​](#create-documents-by-voice "Direct link to Create documents by voice")

You can create document artifacts directly from a voice conversation. Instead of receiving a transient chat response, Glean generates a persistent document that appears in the Canvas and is saved to your Library.

This is useful when a spoken conversation produces something you want to keep, such as a project brief drafted during a brainstorming session, a follow-up email captured as a doc, or a working document from a planning discussion.

### How it works[​](#how-it-works "Direct link to How it works")

1.  During a voice session, ask Glean to create a document. For example, "Draft a one-page project brief on Q3 priorities as a document."
2.  The document artifact appears and updates live in the Canvas while you continue the conversation.
3.  When the session ends, the document is saved to your **Library** as a reusable artifact you can revisit, edit, and share.

note

Only document artifacts are supported from voice at this time. Slides, HTML, and other visual artifact types must be created from text chat.

## Use cases[​](#use-cases "Direct link to Use cases")

Real-time voice works well for situations where typing isn't practical or when a spoken conversation feels more natural:

-   **Brainstorm and capture as a document**: Talk through ideas and have Glean create a project brief or working doc from the conversation, saved to your Library for later editing.
-   **Prepare for the day**: Ask about your upcoming meetings, open action items, or key updates while getting ready.
-   **Hands-free document and knowledge Q&A**: Query internal documents, policies, or project details without switching windows.
-   **Triage email and messages**: Catch up on your inbox while commuting. Have Glean summarize new messages and flag what needs attention.
-   **Rehearse difficult conversations**: Practice a challenging discussion with Glean playing the other side.
-   **Untangle messy projects**: Talk through a complex project and let Glean help you organize your thoughts and surface relevant information.
-   **Reflect on your week**: Review what you accomplished and plan ahead using voice while wrapping up for the week.

## Privacy and data handling[​](#privacy-and-data-handling "Direct link to Privacy and data handling")

-   **No raw audio is stored.** Audio streams are routed from your browser to the model provider your organization has configured and back. No audio recordings are retained.
-   **Transcriptions are stored like text chats.** Voice transcriptions follow the same storage and retention policies as standard chat messages.
-   **Permissions are enforced.** Glean's existing security model and document-level permissions apply to all voice interactions, the same as text-based chats.

## Limitations[​](#limitations "Direct link to Limitations")

-   Only document artifacts can be created from voice at this time. Slides, HTML, and other visual artifact types must be created from text chat.
-   Real-time voice usage may be subject to [usage-based pricing](/glean-enterprise-flex-pricing).

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Do I need to install anything to use real-time voice?

No. Real-time voice works in the Glean web app, desktop app, and mobile app. No additional installation is required.

### Can I switch between voice and text in the same conversation?

Yes. You can start a voice session from the composer of an existing chat to continue a text conversation by voice. When you end a voice session, the conversation is saved as a standard chat transcript, and you can keep going by typing.

### Is my audio recorded or stored?

No. Glean does not store raw audio. Audio is streamed in real time and discarded after processing. Only the text transcription is saved, following the same policies as standard chat messages.

### How do I enable real-time voice for my organization?

Admins can configure real-time voice settings in the **Admin console**. For setup instructions, see [Real-time voice setup](/administration/assistant/features/real-time-voice).

### Can I create documents from a voice conversation?

Yes. You can ask Glean to create a document artifact during a voice session. The document appears live in the Canvas and is saved to your Library when the session ends. Only document artifacts are supported from voice at this time - slides, HTML, and other visual artifact types must be created from text chat.

### Why don't I see the voice button?

The voice button may not appear if your admin has turned off real-time voice, or hasn't set it up yet on Customer Key. Contact your Glean admin for help.
