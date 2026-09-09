---
url: "https://www.glean.com/blog/sensitive-content-models-septdrop-2025"
canonical: "https://www.glean.com/blog/sensitive-content-models-septdrop-2025"
title: "Sensitive content models separate risk from noise at 80%+ accuracy"
description: "Harsh Singhal Sarika Mohapatra | Glean’s sensitive content models automatically distinguish and protect real, sensitive data from the noise across all unstructured data, reducing data exposure risks during AI implementation."
fetched_at: "2026-09-01T13:26:52.368Z"
---
Last updated Sep 05, 2025.

# Sensitive content models separate risk from noise at 80%+ accuracy

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68be78ed53e7635a9493d18a_Harsh%20Singhal.webp)

Harsh Singhal

Software Engineer



](/authors/harsh-singhal)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baa8c5975c47dca2e21777_Sarika.png)

Sarika Mohapatra

Software Engineer



](/authors/sarika-mohapatra)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/67ac95165f7b0f3e4b901ab2_Sunil%20Agarwal.jpeg)

Sunil Agrawal

Chief Security Officer



](/authors/sunil-agrawal)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/67dc54a473da648e54d4e7fb_Julie%20Headshot.jpeg)

Julie Mills

PMM



](/authors/julie-mills)

![Sensitive content models separate risk from noise at 80%+ accuracy](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baac31ac1febddeb37678a_image2-min.jpg)

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

Enterprise context is what makes AI relevant and valuable at work; the more context you bring the richer the insights. While context in Glean is permissions enforced, enforcement is only as good as the underlying permissions, and with hundreds of SaaS applications and billions of user-generated content, many enterprises can’t keep up with access controls and need additional help in getting data AI ready. 

We introduced continuous protection and automated hiding of sensitive content in Glean across 100+ data sources at our annual user conference, [Glean:GO](https://www.glean.com/events/glean-go-2025). These features enabled customers to set up custom policies to detect what information is most sensitive for their organization-from employee data to passwords and authentication to top secret projects using 100+ infotypes, regex, and term matching. 

Today, we’re excited to expand on this capability with sensitive content models that separate the signal from the noise by pairing traditional infotype classifiers with AI models trained on the full enterprise context, like document content, activities, and permissions. **These sensitive content models help to distinguish benign use cases from true exposure, seeing an 80% accuracy rate on unstructured data.**

While many solutions detect sensitive content on structured data, few solve unstructured data, especially at the scale of coverage Glean provides. Unstructured content has no schema-sensitivity depends on context, not just content. That’s why Glean’s sensitive content models stand out: they interpret the context, leveraging proprietary search and enterprise graphs, around infotypes, regex, and term matches, to help companies automatically protect data at scale. 

## The design of sensitive content models

We’ve been fortunate to partner with several enterprises in developing these sensitive content models, enabling us to mirror how security teams actually assess exposure. Our enterprise customers’ security teams also helped identify use cases where data is less sensitive than it might first appear. These examples include:

| Low severity | Medium severity | High severity |
| --- | --- | --- |
| Test credentials shared with everyone in the organization.  
Rationale for low severity: Security training materials, where the educational value outweighs minimal exposure risk since they are marked as examples | Personally identifiable data shared with the HR department.  
Rationale for medium severity: Created and shared by the head of HR department. | Social security number shared with everyone in the company.  
Rationale for high severity: Contains production SSNs and is anonymously accessible via link, meaning it's publicly exposed. |

As shown in the examples above, we explain the decisions that the sensitive content models make so you can understand their logic. Based on in-product feedback, including thumbs up and thumbs down votes, the models continue to learn what is sensitive data to enterprises.

## Sensitive content models understand context

The reason that sensitive content models can reason over unstructured data is because they understand context: individual document context, activity around the document, and enterprise relationships. Sensitive content models examine semantic relationships between document titles, content summaries, and the identified sensitive patterns. A document titled "Security best practices" containing example credentials receives fundamentally different treatment than a file called "Production database backup" with similar content patterns. The system understands contextual clues like "example," "sample," "template," and "training" that indicate educational rather than operational use.

Glean goes beyond looking at the document in isolation. It also looks at documents that are closely linked as well as where the document resides in folder structures, channels, and more. Documents owned by security teams, located in training containers, or tagged with educational metadata, receive different risk assessments than those in operational systems. 

The models also use the enterprise graph, which maps the relationships behind enterprise data (including people, projects, and processes) to make AI context aware. The enterprise graph can discern the role of the document in the larger enterprise, whether the document is widely shared across security teams, frequently accessed by educators, or integrated into onboarding flows, suggesting that there’s a legitimate use case for sensitive content. On the other hand, documents with restricted access patterns, limited view history, or access concentrated in high-privilege roles may indicate higher risk.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baabea546a2c2c45e6c8fc_image3-min.jpg)

## Put AI to work with confidence using automated data security

Sensitive content models mark a shift-here at Glean, we’re now using AI to secure AI itself. By understanding both document and enterprise context, we can build AI models capable of discerning real, sensitive data from the noise across all unstructured data. Glean protects sensitive content with precision, and puts AI to work safely across the enterprise.

Check out our September Drop page for more details on other exciting Glean features that came out this week! 

*Sensitive content models are in beta and part of Glean Protect+, a premium security suite.*

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

[Get The Resource](#)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
