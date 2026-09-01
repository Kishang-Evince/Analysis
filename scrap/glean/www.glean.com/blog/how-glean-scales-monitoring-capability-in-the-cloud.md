---
url: "https://www.glean.com/blog/how-glean-scales-monitoring-capability-in-the-cloud"
canonical: "https://www.glean.com/blog/how-glean-scales-monitoring-capability-in-the-cloud"
title: "How Glean scales monitoring capability in the Cloud"
description: "Gary Luo Connor Lafferty | Discover how Gleans single-tenant model comprehensively tackles the problem while improving our productivity and error visibility as we scale our ccustomer base"
fetched_at: "2026-09-01T13:26:43.020Z"
---
Last updated Dec 01, 2022.

# How Glean scales monitoring capability in the Cloud

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e5679c4298f65669718247_41-Gary.png)

Gary Luo

Engineering



](/authors/gary-luo)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/61e567853f039d1fb9a153ce_46-Connor.png)

Connor Lafferty

Engineering



](/authors/connor-lafferty)

![How Glean scales monitoring capability in the Cloud](https://cdn.prod.website-files.com/613513981b0efaf850830620/6389795548095b5c3f01a25a_Scale%20cloud%20monitoring.jpg)

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

[Glean](https://www.glean.com) uses a single-tenant model (providing every customer a dedicated GCP project) to deploy our services and provide the best possible security experience. One big challenge we face, however, is monitoring and operating multiple GCP projects as our customer base grows. Multiple alerts for separate GCP projects can fire simultaneously, making it a challenge to manage. 

Google’s [Error Reporting](https://cloud.google.com/error-reporting) faces the same issue – where the same application exception may happen in multiple GCP projects at the same time. In this post, we’ll discuss how we use our Notification Dispatcher tool to scale our monitoring ability in Cloud.

## Main Challenges

In order to manage multiple GCP projects effectively, we need to maintain a global view of alert notifications and application exceptions across all our GCP projects. This helps us to understand how widely a production issue has spread globally, and allows us to triage production issues in an efficient way.

[Cloud Monitoring Alerting](https://cloud.google.com/monitoring/alerts) supports many different types of notification channels, but it lacks Jira support. Error Reporting didn’t support notifications when the Notification Dispatcher tool was developed. Since Glean is a search-oriented company, we want to connect these important GCP production-related services to other SaaS applications like Jira – and more importantly, make the information searchable and turn resolutions into shareable knowledge.

On top of that, we develop many home-grown features that enable us to manage the same issues for multiple projects together.

## Introducing Notification Dispatcher Tool

Notification Dispatcher is the internal tool at [Glean](https://www.glean.com/) for managing GCP alert notifications and Error Reporting errors. It is integrated with Cloud Monitoring and Error Reporting as the notification source, and is integrated with Slack, Jira, and OpsGenie as notification destinations.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6389793982e7afd74a208df3_nDV-1PouDw_2Z15j4-Drh6DoxkO70umM49QD_aMtZRojNgUiogEnvF8Lk2_JhP5JDY5UFp5mZqaT0jbNn5MZrEojkxHHGdSB2kCT2YF0S2O01NlVaAlmWzdEJ6Sm9neNbDNgzapJPSkqIK2WdgIDWnstNilM3NtZRnHhN5saG6iObVtjVzSMGbCpS-llpQ.png)

This tool has a few components:

-   **Error Reporting Crawler:** An App Engine Flex service that sends [Error Reporting API](https://cloud.google.com/error-reporting/reference/rest) calls to crawl errors from all our GCP projects. In order to obey Error Reporting API [quotas](https://cloud.google.com/error-reporting/quotas), we use an App Engine Task Queue to crawl errors in a batch fashion.
-   **Alert Notification Receiver:** Implemented as an App Engine Flex service that watches a PubSub channel for alert notifications. All of our alert policies have the PubSub channel added as their notification channel.
-   **Notification Policy Rules:** A text proto file where Glean engineers can specify how to match alert incidents or errors and forward them to which SaaS application(s).
-   **States Database:** A Cloud SQL database that stores the collected alert incidents, Error Reporting errors, and their dispatching states.
-   **Notification Dispatcher:** The execution engine that processes all the notifications and dispatches them according to the notification policy rules. It is implemented as a shared client library which is compiled into both the Error Reporting Crawler and the Alert Notification Receiver Flex services.

## Advanced Features

We’ve built some other cool features that enable us to scale operations in the Cloud:

-   **Jira Integration:** Glean engineers can use the tool to specify which Jira components and which Jira priorities are to be used for creating new Jiras when alert incidents or Error Reporting errors are received. As Glean indexes our Jira instance, all the alert incidents, and errors become searchable.
-   **Incident and Error Deduplication:** Notification matching rules are very flexible and support regular expressions, which allows Glean engineers to deduplicate the same alert incidents or errors without spamming engineer teams. This is especially important when there is a page storm or the same issue happens in multiple projects at the same time.**‍**
-   **Notification Silence:** We developed this feature before GCP introduced the [Notification Snooze](https://cloud.google.com/monitoring/alerts/snooze) Pre-GA feature. It even allows Glean engineers to silence alerts by alert incident labels, or silence alerts for a whole project.**‍**
-   **Notification Frequency Control:** Glean engineers can specify how frequently they want to receive updates to the specified notification destinations. This prevents alerts from generating updates too often.**‍**
-   **Notification Suppression:** This feature is normally used when an alert incident with a higher severity is fired, we want to suppress a relevant alert with lower severity.**‍**
-   **Notification Auto Escalation:** Glean engineers can use this feature to raise OpsGenie or Jira priorities when the specified criteria are met. This normally means an issue has been widely spread and requires immediate attention.**‍**
-   **Error Grouping:** We introduced an error fingerprint similar to how GCP Error Reporting [grouped errors](https://cloud.google.com/error-reporting/docs/grouping-errors). This useful technique allows us to group GCP errors across multiple projects. Besides that, Glean engineers can use notification policy rules to match errors by exception message, frame, or stack trace across all of our programming languages.

## Takeaways

The Notification Dispatcher tool has improved our productivity dramatically since it was launched. It provides a mechanism for our engineers to consolidate production signals from all of our GCP projects and focus on important production issues. Once those notifications are forwarded to Jira or Slack, engineers can [Glean](https://www.glean.com/) the information and turn the resolutions or discussions into knowledge.

If you’d like to get hands-on with scaling our operations in the Cloud, check out our [careers page](https://www.glean.com/careers) – or schedule a [demo](https://www.glean.com/get-a-demo) to discover what Glean can do for you.

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
