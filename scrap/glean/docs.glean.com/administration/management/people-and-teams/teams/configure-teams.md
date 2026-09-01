---
url: "https://docs.glean.com/administration/management/people-and-teams/teams/configure-teams"
canonical: "https://docs.glean.com/administration/management/people-and-teams/teams/configure-teams"
title: "Configure Teams"
description: "Enable team collaboration and discovery by configuring team pages in Glean"
fetched_at: "2026-09-01T13:29:09.517Z"
---
On this page

Team pages serve as the digital hub for your organization's collaborative groups, helping people working together stay in sync while enabling others to better understand their colleagues' work. Each team page creates a dedicated space where teams can share their mission, highlight their members, explain their work, and provide clear contact pathways.

When properly configured, team pages become a valuable resource that enhances cross-functional collaboration and reduces time spent searching for basic organizational information. They provide a consistent, centralized place for important team details that might otherwise be scattered across various systems and documents.

![Team profile page showing membership, about section, and contact details](/img/archive/help-glean/managing-your-glean-deployment/admin-guide-teams-in-glean-1.png)

Example of a comprehensive team profile page showing all key components

## Benefits of team pages[​](#benefits-of-team-pages "Direct link to Benefits of team pages")

Our data shows that people frequently search for information about their colleagues and teams within their company. Building comprehensive team pages helps answer these queries and keeps everyone on the same page. When you implement team pages in Glean, you'll see several important benefits:

-   **Enhanced transparency**: Team pages make organizational structures visible and accessible to everyone, helping new employees navigate the company and existing employees understand how teams fit together.
-   **Streamlined communication**: By providing clear pathways for contacting the right teams, you'll reduce misdirected inquiries and help people connect more efficiently.
-   **Centralized information**: Important team details like mission, membership, and contact methods are gathered in one discoverable location instead of scattered across multiple systems.
-   **Future-ready foundation**: As Glean continues to build additional teams functionality, your organization will be well-positioned to benefit from these enhancements.
-   **Reduced search time**: Employees spend less time hunting for basic team information, allowing them to focus on more valuable work.

## Team creation methods[​](#team-creation-methods "Direct link to Team creation methods")

### Automatic generation

You can generate teams automatically from your existing work systems, leveraging the organizational structures you already have in place. This approach saves time and ensures your Glean teams accurately reflect your current organization. Teams can be automatically created from:

-   **Google Groups**: Transform your existing Google Groups into Glean teams, maintaining the same membership structure.
-   **Slack channels**: Convert your Slack workspace organization into team structures within Glean.
-   **People attributes**: Use attributes like department, division, or location that already exist in your people connector, such as Okta, BambooHR, or Azure Active Directory.

You control which teams get created, and the control differs by source:

-   For connector sources like **Slack channels** and **Google Groups**, use a **greenlist** to specify which channels or groups become teams. If the greenlist is empty, no teams are created from that source.
-   For teams generated from **people attributes**, use a **redlist** to exclude specific attribute values. All values create teams unless you add them to the redlist.

For example, you could greenlist only certain Slack channels, or redlist a department such as external contractors so it doesn't generate a team.

### Manual creation

For more customized team structures or when automatic generation doesn't fit your needs, you can manually create teams through two methods:

-   **CSV upload to Google Cloud Storage**: Prepare a structured CSV file with your team data and upload it to your designated Google Cloud Storage bucket.
-   **JSON data via Glean Push API**: Send team data in JSON format directly to the Glean Push API endpoint.

These manual methods provide complete control over team creation, especially useful for organizations with complex structures or special team configurations that don't align with existing systems.

## Team page components[​](#team-page-components "Direct link to Team page components")

A well-configured team page contains all the essential information someone might need when interacting with or learning about a team. Each component serves a specific purpose in helping others understand and connect with the team.

### Core information[​](#core-information "Direct link to Core information")

-   **Team name and department**: Clearly identifies the team and shows where it fits in the broader organization.
-   **Team membership**: Shows who belongs to the team and identifies leadership, helping others know who to approach for specific needs.
-   **Visual identity**: Profile and banner images that represent the team's character and create visual recognition.
-   **About section**: A rich text description explaining the team's purpose, responsibilities, and current initiatives. This can include multiple paragraphs and hyperlinks to relevant resources.

### Contact details[​](#contact-details "Direct link to Contact details")

-   **Email addresses**: Primary contact methods, which can include team aliases or distribution lists.
-   **Slack channels**: Direct links to the team's primary communication channels.
-   **Resource URLs**: Links to any relevant pages, including internal documentation, external resources, or team-specific tools and dashboards.

## Discovery features[​](#discovery-features "Direct link to Discovery features")

Glean makes teams easily discoverable through multiple pathways, ensuring that people can find the right teams when they need them.

### Team directory[​](#team-directory "Direct link to Team directory")

The team directory provides a central location where users can browse and discover teams across the organization. Teams appear alongside people in the directory, creating a comprehensive view of your organization's human resources. Within the directory, users can:

-   **Sort teams flexibly**: View teams by relevance (personalized to the user's work patterns), by team size, or alphabetically by name.
-   **Filter by name**: Quickly narrow down the list to find specific teams.
-   **Access profiles with one click**: Move directly from the directory to detailed team pages.

This directory becomes especially valuable for new employees learning the organization and for existing employees exploring unfamiliar parts of the company.

![Team directory listing multiple teams sorted by relevance](/img/archive/help-glean/managing-your-glean-deployment/admin-guide-teams-in-glean-2.png)

Team directory showing multiple teams sorted by relevance for an engineering user

### Search integration[​](#search-integration "Direct link to Search integration")

info

Teams are intelligently integrated into Glean's search experience, appearing prominently when:

-   A user explicitly searches for a team by name or function
-   Team information is relevant to a search query about projects, initiatives, or areas of responsibility
-   Users begin typing a team-related search term, triggering suggested results

When teams appear in search results, they're displayed as expandable cards that provide a quick preview of the team. Expanding these cards reveals up to six team members, giving users immediate insight into team composition without leaving the search interface.

As users type queries, Glean's suggestion system actively looks for relevant teams and offers them as suggestions based on the partial query. This proactive approach helps users discover teams they might not have known to look for specifically.

![Team suggestions appearing in Glean search results](/img/archive/help-glean/managing-your-glean-deployment/admin-guide-teams-in-glean-3.png)

Team suggestions appearing in search results

## External team pages integration[​](#external-team-pages-integration "Direct link to External team pages integration")

While we recommend using Glean's native team pages for the best experience and future compatibility, we understand that some organizations have existing investments in team documentation systems.

1

Configuration

To integrate external team pages, first establish the foundation by submitting your team data through either:

-   **Push API**: Send structured team data directly to Glean's API
-   **Google Cloud Storage**: Upload team information to your designated storage bucket

2

Link override

Once your teams are established in Glean, configure external page URLs for them. When configured, clicking a team name anywhere in Glean directs users to your external team page instead of the native Glean profile.

note

Configuring an external URL changes the default destination for a team's links, but the native Glean team page remains accessible. For example, team cards in search results link to both the native Glean page and your external page. Make sure your external pages contain all the information users need.

## Implementation recommendations[​](#implementation-recommendations "Direct link to Implementation recommendations")

Based on our experience working with many organizations, we've developed a set of recommendations to help you get the most value from team pages.

### Get started with teams[​](#get-started-with-teams "Direct link to Get started with teams")

We suggest a phased approach to implementing teams:

1.  **Begin with departments**: Start by creating team pages for each major department. This provides a foundational layer of organizational clarity.
2.  **Expand to functional teams**: Once department-level teams are established, create more granular teams for specific functions, such as development pods, product teams, sales territories, or support specializations.
3.  **Include community groups**: Don't forget to create teams for employee resource groups (ERGs) and other cross-functional communities that contribute to your organizational culture.

This progressive approach allows you to build team infrastructure methodically while gathering feedback and refining your implementation.

### Content management[​](#content-management "Direct link to Content management")

For team pages to remain valuable, they need accurate and up-to-date content. We recommend engaging team leads directly in this process:

-   Encourage team leads to add compelling profile images and banners that reflect their team's identity
-   Ask teams to write clear, descriptive information about their mission and current priorities
-   Ensure teams configure their preferred contact methods and keep them updated as they change

Team leads can delegate these responsibilities as needed, but they typically have the best context for what information should be included and how the team should be presented.

## Technical considerations[​](#technical-considerations "Direct link to Technical considerations")

### Setup and updates

When implementing or modifying teams, keep these timing expectations in mind:

-   After initial creation, new teams and updates can take up to 60 minutes to appear in Glean search results
-   Changes in original connectors (like Google Groups or Slack) follow similar timing when syncing to Glean
-   Users will see new teams and changes naturally as they use Glean once propagation completes These propagation times are important to communicate to team leads and members so they understand when their changes will become visible.

### Content governance[​](#content-governance "Direct link to Content governance")

Currently, Glean employs a collaborative editing model for team pages:

-   All team members can edit all aspects of their team page, including:
    -   Profile pictures and banner images
    -   Team descriptions and mission statements
    -   Contact information and resource links

This democratic approach encourages team participation but may not fit all organizational governance models.

info

We recognize that different organizations have different needs for content governance. Glean is actively exploring enhanced permission models and approval workflows for team content management. We welcome your feedback on what governance structures would best serve your organization's needs as we develop these features.
