---
url: "https://docs.glean.com/user-guide/mcp/image-generation"
canonical: "https://docs.glean.com/user-guide/mcp/image-generation"
title: "Generate images with MCP"
description: "Ask a connected AI host to create and edit Glean-generated images and save them to your Library as artifacts"
fetched_at: "2026-10-13T08:51:33.995Z"
---
On this page

Glean's built-in image generation is available from a connected MCP host, so you can ask Claude, Cursor, ChatGPT, or another host to create a visual without leaving your workflow. Glean generates the image under your permissions, saves it to your Library as an image artifact, and returns it to the host as an inline image or a stable link.

## How image tools work[​](#how-image-tools-work "Direct link to How image tools work")

The **Image generation** toolset adds two tools that a connected host can call on your behalf:

-   `create_image` — generates a new image from a prompt and saves it as an image artifact in your Library
-   `edit_image` — modifies an existing image artifact from a natural-language instruction

To find an image you already have, use `search` and `read_document`. There's no separate image search tool. The host renders the result inline where it supports images, and returns a Library link everywhere else.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A host connected to a Glean MCP server — see [Configure the Glean MCP server](/user-guide/mcp/end-user-configuration).
-   The **Image generation** toolset on that server, which your admin adds when they [create or edit an MCP server](/administration/platform/mcp/built-in-glean-tools#image-generation).
-   Image generation enabled for your account. The tools appear only when you're eligible to generate images in Glean. See [Image Generation in Glean](/user-guide/assistant/image-generation) for who can use it, and [Contextual images setup](/administration/assistant/features/contextual-images) for admin configuration.

## Create an image[​](#create-an-image "Direct link to Create an image")

Ask the host for an image and to save it to Glean. The host calls `create_image`, and Glean returns the image and a Library link. For example:

```
Use Glean to generate a professional hero image of a city skyline at sunrise for our product launch deck, and give me the link.
```

You can ground the image in your own work when the host also has `search` and `read_document`:

```
Use Glean to search my scope and what I work on, then generate an image that describes it visually.
```

## Edit an image[​](#edit-an-image "Direct link to Edit an image")

Give the host the image artifact you want to change, then describe the edit. For a link that ends with `/library/{artifact-id}`, the artifact ID is the final segment.

```
Use Glean to edit https://app.glean.com/library/{artifact-id}: make the background dark blue and add a subtle grid.
```

The host passes the artifact ID and your instruction to `edit_image`, and Glean saves the result.

## Permissions and eligibility[​](#permissions-and-eligibility "Direct link to Permissions and eligibility")

Your MCP connection uses your Glean identity and permissions:

-   The image tools appear only when you're eligible to generate images in Glean. A host connected to a server that includes the toolset still can't call them when your account isn't eligible.
-   `create_image` and `edit_image` save images to your **Library**, with you as the owner.
-   Generated images follow Glean's standard access controls and image safety policies.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Which image model does Glean use?

Image generation uses the same model as image generation in Glean. See [Image Generation in Glean](/user-guide/assistant/image-generation) for the current model and details.

### Why don't I see the image inline?

Some hosts don't render images inline. In that case, the host returns a Library link that opens the image in a new tab.

### Why are the image tools missing from my host?

Either the server doesn't include the **Image generation** toolset, or your account isn't eligible to generate images. Ask your admin to confirm both.

## See also[​](#see-also "Direct link to See also")

-   [Image Generation in Glean](/user-guide/assistant/image-generation) — use image generation directly in Glean
-   [Save artifacts to your Library with MCP](/user-guide/mcp/artifacts) — save and share other content a host produces
-   [Contextual images setup](/administration/assistant/features/contextual-images) — admin configuration for image generation
-   [Create MCP servers](/administration/platform/mcp/create-mcp-servers) — admin setup for the Image generation toolset
