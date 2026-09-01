---
url: "https://www.glean.com/blog/secure-generative-ai-for-the-enterprise-requires-the-right-permissions-structure"
canonical: "https://www.glean.com/blog/secure-generative-ai-for-the-enterprise-requires-the-right-permissions-structure"
title: "Secure generative AI for the enterprise requires the right permissions structure"
description: "Jason Rudianto  | For generative AI to deliver secure and relevant results in complex enterprise environments, a properly built permissions structure is essential."
fetched_at: "2026-09-01T13:26:52.206Z"
---
Last updated Dec 18, 2023.

# Secure generative AI for the enterprise requires the right permissions structure

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6581f73a0bee6a4767b7e661_3360596171607_724410eb3328ecc93f32_192.jpg)

Jason Rudianto

Engineering



](/authors/jason-rudianto)

![Secure generative AI for the enterprise requires the right permissions structure](https://cdn.prod.website-files.com/613513981b0efaf850830620/6581f55a44f97a681fb97596_image2.webp)

Listen to article

0:00

0.5x 1x 1.5x 2x

### Table of contents

[

Heading 2

](#)

[

Heading 3

](#)

[

Heading 4

](#)

[

Heading 5

](#)

[

Heading 6

](#)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

Share this article:

Listen to article

0:00

0.5x 1x 1.5x 2x

To get the most out of great enterprise search and generative AI solutions, employees need to be able to trust them. For that to happen, it’s essential that the information being input into the model strictly follows the permissioning rules set for each and every [document](https://www.glean.com/blog/why-a-unified-document-model-is-essential-for-a-comprehensive-workplace-chatgpt). Without that guarantee, workers have no idea if confidential documents will stay confidential. Users can lose confidence in the platform, hurting its usability and slowing adoption of potentially transformative new technologies. 

Properly built permissioning ensures that generative AI systems only access and utilize data that they’re explicitly allowed to, regardless of app or user. For instance, Glean's AI assistant is fully permissions-aware and personalized, only sourcing information the user has explicit access to. This not only maintains the security and confidentiality of sensitive data but also enhances the relevance and personalization of the AI's output.

If you’re looking to build or integrate generative AI for work, a robust permission awareness framework needs to be at the top of the list when it comes to ensuring that it’s ready for business environments. In this blog, I’ll be sharing a little more about why and how permissioning needs to be prioritized, along with how we structure our own enterprise-ready solution. 

## Comprehensive yet nuanced

A great generative AI solution needs to have access to all your content and activity – it’s the only way to ensure results are always relevant, recent, and nuanced enough to deliver exactly what you need for each query. However, that poses a challenge when it comes to permissioning and privacy, as strict data access rules need to be followed across all levels in order to ensure sensitive information is kept safe.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56e67c273cff37ecfee5_655b62603568e1b41dcef414_image3.webp)

*Adhering to data access rules across multiple levels maintains security*

For example, from the minute Glean is deployed, permissioning and data access rules are a key priority. Glean works under the principle of least privilege, which is when users are provided only the minimum level of access that they’re authorized to have. This enables our system to strictly enforce data access rules that exist at multiple levels, across all applications. 

## Concurrency and scalability

Another serious challenge is keeping things up to date, at all times, regardless of scale. Permissions need live updates in order to ensure data security – permission rules change often, and it’s essential that they’re reflected as soon as possible. However, factors such as API rate limits can hinder information capture and processing across all types of documents.

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56e67c273cff37ecfee8_6581f5d2da00fb2d3d66ff59_image1.webp)

*Untracked permission updates can result in serious security issues*

Similar to crawler development, API issues and flakes also present a considerable problem when dealing with permissioning information. Permissioning structures need to be flexible and resilient enough to deal with these complications, yet robust enough to understand how each document should be displayed to each user. 

Additionally, computing and storing document permissions need to be performant and storage-efficient. While it’s tempting to individually mark up user permissions document by document, it’s extremely costly to index and document loading performance suffers due to increased storage needs. 

{{richtext-banner-component}}

## Unified permissions model 

Instead, it’s better to build a framework that’s compatible with [all datasources](https://www.glean.com/blog/why-a-unified-document-model-is-essential-for-a-comprehensive-workplace-chatgpt) – capable of understanding the different permission architectures for each source. However, datasource permissions can be as basic as model document permissions (as just a list of users) or as complex as nested groups, user-role based, and other unique properties. 

Each datasource’s permissions framework is also unique, requiring investigation and reverse engineering to discover how the datasource implements document visibility. Permissioning behavior is also often not well documented or comprehensive enough to cover every possible solution, making this even more challenging. 

Datasources can also have unique behaviors that need to be handled in order to mirror the search functionality of that respective datasource. Some edge case examples to consider include:  

-   Documents that are made publicly visible only when a user has visited that document before. An example of this includes certain GDrive permissions.
-   Temporary access permissions. Some datasource permissions support assigning permissions for a limited time, so in order to mirror this behavior, systems need to be kept well in sync. 
-   Documents that don’t provide flattened lists of allowed users or groups. These documents only specify general “allowed” criterias and “disallowed” criterias, which need to be resolved manually. 

Developing a system that accounts for all the above can be an extensive endeavor requiring considerable engineering resources and efforts. Here at Glean, it initially took us years to tune our solution to ably account for these complexities and edge cases, for corpuses of any scale. 

## Good permissioning gets AI enterprise-ready

Establishing a properly built permissioning system for any generative AI or search solution is essential to ensuring that it's enterprise ready, but it’s not easy to build. Spending the time to fine-tune secure permissioning for generative AI solutions may result in delayed time to value, difficulties with internal alignment, along with hefty costs down the line when it comes to developing, maintaining, and training it on your own. 

Enterprise data is the most valuable resource for any organization, and understanding how best to leverage it – and protect it – will be ever more important as workers onboard new tools into complex digital work environments. If you’re interested in getting started with truly enterprise-ready generative AI today with an out-of-the-box permissioning solution, sign up for a Glean [demo](https://www.glean.com/get-a-demo)!

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

![The generative AI shift: How CIOs will determine the future of business success](https://cdn.prod.website-files.com/613513981b0efaf850830620/6718a0531597b1ca92ad5352_cios-generative-ai-shift.webp)

## The generative AI shift: How CIOs will determine the future of business success

To determine how generative AI has transformed strategies for CIOs and IT leaders, why priorities have shifted, and how CIOs should adapt to prepare their businesses for success in an increasingly AI-centric environment, we worked with ISG to conduct a survey of CIOs and IT leaders (VP level and above) across companies in the Americas and Europe with 1000+ employees. ‍Download the full report to discover our findings:

[Get The Resource](/resources/guides/cio-generative-ai)

![The generative AI shift: How CIOs will determine the future of business success](https://cdn.prod.website-files.com/613513981b0efaf850830620/6718a0531597b1ca92ad5352_cios-generative-ai-shift.webp)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
