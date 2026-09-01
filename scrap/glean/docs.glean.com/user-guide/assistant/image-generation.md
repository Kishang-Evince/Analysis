---
url: "https://docs.glean.com/user-guide/assistant/image-generation"
canonical: "https://docs.glean.com/user-guide/assistant/image-generation"
title: "Image Generation in Glean"
description: "Create custom visuals from natural-language prompts directly in Glean"
fetched_at: "2026-09-01T13:30:38.970Z"
---
On this page

Glean includes built-in image generation, allowing you to create custom visuals from natural-language prompts without leaving your workflow. Whether you need to illustrate concepts, create quick mockups, or add visuals to documentation, you can generate images alongside your questions and tasks.

## Who can use image generation[​](#who-can-use-image-generation "Direct link to Who can use image generation")

Image generation is available to:

-   **Glean Universal Model Key and Customer Key (BYOK)** customers, on all supported clouds, with access to Glean Assistant and Glean Agents
-   End users in tenants where the feature is enabled

note

Image generation must be enabled by your admin. See [Contextual Images setup](/administration/assistant/features/contextual-images) for admin configuration details.

Image generation requires an image-capable model (such as GPT Image or Gemini image models). Claude models do not generate images.

From the end user's perspective, there's nothing to install. If your admin has enabled the feature, you'll see image responses directly in Glean.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Image generation must be enabled by your admin and requires an image-capable model (such as GPT Image or Gemini image models). See [Contextual Images setup](/administration/assistant/features/contextual-images) for admin configuration details.

## Where you can generate images[​](#where-you-can-generate-images "Direct link to Where you can generate images")

You can use image generation anywhere you use Glean:

-   **Glean chat** in the Glean web application
-   **Plan & Execute note** in Agents when creating or refining multi-step plans

Image generation works in both:

-   **Fast mode** – optimized for speed
-   **Thinking mode** – optimized for deeper reasoning and richer use of your enterprise context

You don't need to change modes or tools to access image generation. Simply ask the assistant for an image in your prompt.

## How to generate an image[​](#how-to-generate-an-image "Direct link to How to generate an image")

You generate images using natural language prompts, just like any other question to the assistant.

1

Open Glean

Navigate to Glean in your Glean application.

2

Write your prompt

Type a prompt that clearly asks for an image. Specify style, level of realism, audience, or any other constraints.

3

Submit and review

Submit your prompt. The assistant will generate the image using GPT Image 2 and return it inline in the chat, typically with a link to view or download.

4

Download or refine

Click the image or link to open it in full size, then download it, paste it into docs or slides, or regenerate with updated instructions.

### Example prompts[​](#example-prompts "Direct link to Example prompts")

**Using your work context:**

-   *"Search for my scope and what I work on. Then generate an image that describes it visually."*

This lets the assistant ground the image in your recent work—projects, artifacts, and topics tied to your account.

**Purely creative:**

-   *"Generate a photorealistic image of a hamster flying a plane."*

Good for illustrative or playful visuals where you don't need enterprise context.

**Explaining a concept:**

-   *"Create a simple diagram that explains the enterprise agent development lifecycle, with clear stages from value to launch and monitoring."*

**Documentation support:**

-   *"Generate a clean, line-art style diagram that shows 'My Work' at the center with Security, Agents, Connectors, and Customer Outcomes around it, suitable for a product overview slide."*

## Prompting tips and best practices[​](#prompting-tips-and-best-practices "Direct link to Prompting tips and best practices")

To get better results from image generation:

### Be explicit about subject and style[​](#be-explicit-about-subject-and-style "Direct link to Be explicit about subject and style")

Specify visual style, detail level, and format to guide the model.

*Examples: "flat illustration, minimal text, pastel colors" | "photorealistic" | "simple black-and-white line drawing"*

### Specify the audience[​](#specify-the-audience "Direct link to Specify the audience")

Tell the assistant who will view the image to adjust complexity and tone.

*Examples: "for an executive audience" | "for a new engineer onboarding doc"*

### Limit on-image text[​](#limit-on-image-text "Direct link to Limit on-image text")

Short labels or headings work best. Long paragraphs should live in your document, not on the image.

### Iterate with feedback[​](#iterate-with-feedback "Direct link to Iterate with feedback")

Ask the assistant to refine instead of starting from scratch.

*Examples: "regenerate with fewer details" | "simplify the diagram" | "change the color palette"*

### Use your enterprise context when it helps[​](#use-your-enterprise-context-when-it-helps "Direct link to Use your enterprise context when it helps")

For work-related visuals, reference your internal data so the assistant can ground the image in what you actually do.

*Examples: "my recent docs" | "my roadmap" | "my team's projects"*

## Admin controls[​](#admin-controls "Direct link to Admin controls")

For information about enabling, disabling, and configuring image generation, see [Contextual Images setup](/administration/assistant/features/contextual-images).

## Known limitations and quirks[​](#known-limitations-and-quirks "Direct link to Known limitations and quirks")

Most of the time, images render directly in your chat. However, there are a few quirks to be aware of:

### Occasional link-only responses[​](#occasional-link-only-responses "Direct link to Occasional link-only responses")

In some cases, you may see a clickable image link instead of an inline thumbnail. Clicking the link should still open the image in a new tab. If you open **"Show work"**, you may see a valid image link there even if the main response only shows the URL.

### Activity-based prompts and broken links[​](#activity-based-prompts-and-broken-links "Direct link to Activity-based prompts and broken links")

Prompts that ask the assistant to analyze your recent activity or personal graph and then generate an image (for example, *"Use my personal graph over the last 3 months, then generate an image"*) can sometimes produce an image link that doesn't load correctly or returns a browser error.

**If this happens:**

-   Try regenerating with a simpler prompt that doesn't rely on "my last N months of work"
-   If the problem persists, report it via the feedback controls in the chat (thumbs down with a brief description) so we can track it

### Image safety and blocked requests[​](#image-safety-and-blocked-requests "Direct link to Image safety and blocked requests")

Requests that violate safety policies (explicit content, hateful or harassing imagery, real-person impersonation, or sensitive personal data) may be refused or heavily modified.

**For best results, avoid prompts that include:**

-   Real coworkers' faces or full names
-   Sensitive customer data, secrets, or production credentials
-   Harmful, illegal, or discriminatory scenarios

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Can I upload an image and ask Glean to edit it?

Yes, you can attach an image and ask the assistant to adjust style, colors, or add/remove elements, subject to the same safety policies.

### Which image model is used?

Image generation currently uses **GPT Image 2** by default. You can introduce additional models over time for more advanced creative or marketing use cases. When available, the models surface in the normal Glean experience.

### Where are images stored?

Generated images are stored and served through Glean's image infrastructure and follow the same enterprise-grade security and access controls as other Glean content.

### Do I need to switch modes to generate images?

No. Image generation is available in both Fast and Thinking modes, so you can choose speed or depth without losing access to image generation.

## See also[​](#see-also "Direct link to See also")

-   [Quick Start Guide](/user-guide/about/end-user-quick-start-guide)
-   [Glean Best Practices](/user-guide/assistant/best-practices)
-   [Community and Support](https://community.glean.com/)
