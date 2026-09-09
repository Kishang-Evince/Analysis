---
url: "https://www.glean.com/blog/how-we-migrated-150-cloud-sql-instances-using-gcp-dms"
canonical: "https://www.glean.com/blog/how-we-migrated-150-cloud-sql-instances-using-gcp-dms"
title: "How we migrated 150 Cloud SQL instances using GCP DMS"
description: "Satyam Shanker  | We migrated our Cloud SQL instances- a central part of the Glean index building architecture- to MySQL8. Read more about how we did it here."
fetched_at: "2026-09-01T13:26:44.642Z"
---
Last updated Aug 24, 2022.

# How we migrated 150 Cloud SQL instances using GCP DMS

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/641443b7208e558a59f93731_glean-author-symbol.jpg)

Satyam Shanker

Engineering



](/authors/satyam-shanker)

![How we migrated 150 Cloud SQL instances using GCP DMS](https://cdn.prod.website-files.com/613513981b0efaf850830620/62ec14100425f71be1b1d43d_How%20we%20migrated%20150%20Cloud%20SQL%20instances.png)

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

Our Cloud SQL instances are a central part of the [Glean](https://www.glean.com/) index building architecture. Among other things, they serve as a repository for all our crawled data which eventually makes its way to the served index. They also store other information like [answers](https://www.glean.com/product/knowledge-management) created by Glean users. When we started Glean, we saved all this in Google Big Table, but later moved it to Cloud SQL due to cost considerations. Historically, all our Cloud SQL instances were MySQL5 instances. We decided to migrate these instances to MySQL8 recently after GCP started supporting MySQL8. 

## **Motivation**‍

In addition to using the latest and greatest version, the main motivation behind moving with the migration were the JSON improvements introduced as a part of [MySQL8](https://dev.mysql.com/doc/refman/8.0/en/json.html). Before MySQL8 we had cases where some upgrades took close to 48 hours to complete as some Alter Table commands operating on the JSON columns took a long time. We believed using MySQL8 would enable us to significantly speed up such operations as we might be able to update JSON in place. 

## Main challenges

1.  Since this was a major version upgrade we would need to create a completely new MySQL8 instance and then copy over the data from the old instance. The size of this data that needed to be copied over was quite large in some of our deployments running into TBs.
2.  While the copying of the data was being done, the source DB needed to be available for regular operation.
3.  Depending upon how our services connected to the DB, eventually when we switched from the old DB to the new DB, some services would need to be restarted, while some services would need to be redeployed. We also implemented some services to detect the change in the GCP connection settings and thereby refresh their in memory SQL connection pools, thereby eliminating the need for a restart or redeploy. 
4.  Since the switch could mean redeployment of some services, this needed to happen under someone’s supervision. Also this meant that it could only happen when the customer load on the system was low. 

## Using GCP DMS

Given the above constraints, we decided to use GCP DMS to migrate our DBs from MySQL5 to MySQL8. DMS is a Google recommended service when moving SQL workloads from other infrastructure to Google managed cloud SQL instances. We decided to use the *continuous* type of migration jobs which use an initial dump phase and then use primary secondary replication in the CDC phase. We monitored the replication lag and when the replication lag was low, we were ready to switch from the old instance to the new instance. While this condition may be satisfied at any time of the day, we switched the instance only during nights and weekends so that customer service disruption was minimized. 

## Asynchronous operations framework

**‍**Historically our upgrades were run by the *push\_master* who is continuously monitoring the upgrades. They mostly run for a period of 2 hours. However given the large data size (point 1 above), the SQL upgrade was expected to run for many days. Also we had to upgrade close to 75 projects with 2 cloud SQL instances each which would mean a manual upgrade cumbersome. We decided to implement what we call the *AsynchronousUpgradeframework* to solve this issue. 

At a very high level, this is a state machine. The current state of the upgrade is stored in a GCS bucket in a file called the state file. There is a periodic tick that comes in, loads the state file and sends GCP queries to look into the current state of the migration. Then depending upon these 2 inputs the state machine may update the state, and take some action. One example of this can be, the current state of migration jobs is running, we look into the replication lag and it’s quite high so we stay in the same state. However, in the case the replication lag is found to be low, and the use of the system is low (point 4 above), we decide to make a state transition by patching the new instance, switching it and triggering the restarts and redeployments.  

All the operations performed by this framework need to be idempotent in case there are intermittent issues. Hence they need to leave the system in a consistent state for the next tick. 

## Gains using MySQL8 vs MySQL5

While a detailed comparison of the performance of MySQL8 vs MySQL5 for the Glean workloads could be the topic of a separate post, some early indications include:

-   Significant gains in the CPU for the same workload. For example in one case the CPU was around 30% where it initially hovered around 50%.
-   Lower disk read I/O.
-   Memory utilization seems to be similar. We think that MySQL tries to keep the memory at around 85% of the available memory. 
-   We also saw much better caching of similar queries. 

## Some learnings

**‍**Over the course of the project we learned many things. 

-   It is difficult to lower the replication lag quickly if there is high load on the source DB. We initially decided to let the source DB run at full throttle when the replica was catching up. We assumed that tuning the parameters for parallel replication and transaction commits semantics we would be able to bring the lag down. However we quickly realized that it was not working for our case. We had to pause the activity on the source DB. 
-   Large initial dump time: If the data is concentrated in a few tables in the source DB then the initial dump would be very long. We had a case where about 90% of the data was in one table in a specific project. In our first attempt the initial dump took more than 7 days. Since the maximum replication log retention on the source could be 7 days, the job would never get the correct updates. Luckily we were able to ignore some of this data using dumpFlags and then recrawl it once the switch to the new instance happened. 
-   Scaling with the current model where we have a separate GCP project for each customer can be tricky for future migrations. We should move to multi-tenant architecture where we have single projects for more customers.  **‍**

**‍**If [building](https://www.glean.com/careers) or [using](https://www.glean.com/get-a-demo) a best-in-class search product sounds interesting to you, we’d love to talk with you!

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
