---
url: "https://developers.glean.com/cookbook/rfp-responder"
canonical: "https://developers.glean.com/cookbook/rfp-responder"
title: "Answer an RFP or security questionnaire"
description: "A review app that drafts cited answers to an RFP or security questionnaire, leaves unsupported questions blank, and requires a person to approve each answer. It starts with recorded Chat responses, so you can inspect its refusal paths before connecting it to Glean."
fetched_at: "2026-09-01T13:23:00.383Z"
---
# Answer an RFP or security questionnaire

A review app that drafts cited answers to an RFP or security questionnaire, leaves unsupported questions blank, and requires a person to approve each answer. It starts with recorded Chat responses, so you can inspect its refusal paths before connecting it to Glean.

~45 minIntermediate

![RFP Responder review screen with cited draft answers and approval controls](/img/cookbook/previews/rfp-responder/preview.webp)View preview

localhost:3000

![RFP Responder review screen with cited draft answers and approval controls](/img/cookbook/previews/rfp-responder/preview.webp)

Grounded draft answers stay behind a human review gate.

Problem

A security questionnaire arrives with 200 rows. The answers exist in last quarter's SOC 2 report, a policy document, or the response you sent another customer. Someone spends a week finding them again.

Drafting is not the dangerous part. A fluent answer with no supporting evidence can reach a customer's document over your signature. This app makes that failure visible. Questions with approved evidence get cited drafts. Questions with weak evidence are flagged for verification. Questions with no evidence stay blank and go to a subject matter expert. A person approves each answer before export.

The default walkthrough uses recorded responses, so you can watch each path without credentials. Live mode runs as the signed-in person and limits customer-facing drafts to reviewed source URL prefixes.

Architecture

Questionnairexlsx / docx / CSV

Parse + dedupexact merges only

Platform Chatone call per question

Gleanpermission-aware index

Evidence checktopicality + approval

Review + approvehuman gate, audit log

Prerequisites

Node 20 or newer

Nothing else. The walkthrough replays recorded Chat responses, so it needs no credentials and makes no network calls

Only for a live run: a Glean instance with company content indexed, a work email for sign-in or a Glean API token with the CHAT scope, and a reviewed list of document URL prefixes that may support customer-facing answers

Steps

1

**Copy the project onto your machine**

Creates an rfp-responder folder containing the local server, review app, sample questionnaire, and recorded Chat responses. Stay in the same parent directory for the remaining commands.

```
npx -y tiged@2.12.8 --mode=git gleanwork/glean-cookbook/recipes/rfp-responder rfp-responder
```

2

**Install dependencies**

Installs the packages for the TypeScript server. Everything runs on your machine, and nothing is deployed.

```
cd rfp-responder && npm install
```

3

**See what it refuses before connecting anything**

Replays the recorded responses through the full questionnaire and checks that every draft has a citation, unsupported rows stay blank, weak evidence is flagged, and export stays behind approval. The command needs no credentials and makes no network calls.

```
npm run verify:fixture
```

4

**Open the review app**

Starts the local server and prints a Local URL. Open that URL in a browser. The app uses the same recorded responses, so there is nothing to sign in to.

```
npm start
```

5

**Load the sample and check the refusals**

Click Try the bundled sample, then Confirm and draft answers. The app parses 20 rows and merges the exact SSO duplicate before drafting 19 questions. SEC-01 and SEC-02 get cited answers. ACC-02 and ACC-03 are marked weak. ACC-04 and CMP-01 stay blank and need a subject matter expert.

Merge only exact duplicates

Similarity may rank possible duplicates for review, but must never merge security controls automatically.

Topicality is not approval

A source must be both relevant and explicitly approved for customer-facing use before it can support a draft.

Single-user permission boundary

The app runs as the credential owner. Multi-user deployment requires per-user authentication and authorization.

Take it further

-   Add an xlsx and docx reader so real questionnaires can be uploaded directly. The parser here reads CSV to keep the evidence and approval logic legible.
-   Write answers back into the source document with a custom tool instead of exporting, keeping the confirm step and the approval log.
-   Give the answer library its own access control before sharing it across a team. It's a cache of retrieved content, so it can leak across the permission boundary the rest of the app respects.
-   Route "needs SME" rows to their owners automatically and track which ones came back. The assignment field here does not send a message.

Try it

**Draft the bundled security questionnaire**

Click Try the bundled sample, then Confirm and draft answers. The app parses 20 rows across 4 tabs, merges 1 exact duplicate, and asks 19 questions. The review summary shows 10 strongly grounded answers, 2 weak answers to verify, and 8 questions that need a subject matter expert. SEC-01 and SEC-02 have cited drafts.

**Check what happens when the evidence does not support an answer**

After drafting the bundled sample, ACC-04 and CMP-01 show no draft answer and say that the question needs a subject matter expert. The rows have no citations and offer assignment to a subject matter expert.

**Review an answer backed by weak evidence**

After drafting the bundled sample, ACC-02 and ACC-03 have draft answers but appear in the weak evidence bucket. Their evidence notes explain that a person must verify the source before accepting the answer.

**Compare a live questionnaire run with a colleague who has narrower access**

In separate live runs, each person signs in as themselves and uploads the same questionnaire. A row backed only by a document the second person cannot access stays blank and needs a subject matter expert. The app does not impersonate either person.

Run this recipe

-   Choose your tool
    
    Claude CodeCodexCodex Cursor
    
    Install the pluginTerminalIn Claude Code
    
    1
    
    ```
    claude plugin marketplace add gleanwork/glean-cookbook
    ```
    
    2
    
    ```
    claude plugin install cookbook@glean-cookbook
    ```
    
    Run the recipe
    
    ```
    /cookbook:rfp-responder
    ```
    
    Run /reload-plugins to pick it up without restarting.
    

[View source](https://github.com/gleanwork/glean-cookbook/tree/main/recipes/rfp-responder)

Runs the recipe through the Glean cookbook plugin.

At a glance

CapabilitiesChat, Workflows

SurfacesPlatform API

StatusShowcase

Time~45 min

Required scopes

CHAT
