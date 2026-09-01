---
url: "https://docs.glean.com/administration/protect/sensitive-findings/about"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/about"
title: "About sensitive findings"
fetched_at: "2026-09-01T13:29:13.983Z"
---
On this page

Glean Protect+

Sensitive findings is a centralized dashboard designed to manage and protect sensitive data across various applications and environments. Sensitive findings help in detecting and mitigating the risks associated with broadly shared or externally exposed sensitive data. Its primary focus is to ensure that your organization can maintain compliance with data protection regulations while enhancing the visibility and control of your data assets.

The hub offers several key functions:

1.  **Data protection**: Ensures sensitive data isn't exposed during deployment.
2.  **Audit and management**: Facilitates effective auditing and management of sensitive data, which is crucial for regulatory compliance.
3.  **Deployment enablement**: Helps unblock deployments in organizations facing data governance challenges, especially for larger and more complex environments.
4.  **Real-time monitoring**: Aids in the real-time identification and remediation of sensitive content issues, significantly reducing potential risks associated with data exposure.

It employs several operational mechanisms to fulfill its functions effectively:

1.  **Policy creation and management**: Users can create policies from reports. The policies are used to manage sensitive content detection and enforce data protection measures efficiently.
    
2.  **[Policy management APIs](https://developers.glean.com/api/client-api/governance/overview)**: There are APIs for creating and managing sensitive content detection configurations. These APIs allow for various operations such as listing reports, creating new reports, fetching specific reports, and updating report configurations.
    
3.  **Sensitive findings dashboard**: The hub provides a single-pane governance dashboard to configure policies, monitor/triage violations, and enforce data hiding. This eliminates the need for manual configuration and individual document hiding by offering enhanced controls within a centralized interface.
    
4.  **Continuous scanning and auto-hiding**: The system scans documents for policy violations during indexing and offers the option to hide flagged content automatically. This ensures that sensitive data is managed in near-real-time.
    

note

Sensitive findings scans only work on data that Glean crawls and indexes. They do not apply to data fetched live via federated fetch APIs (such as Slack Real-Time Search or other real-time integrations).

## Frequently Asked Questions[​](#frequently-asked-questions "Direct link to Frequently Asked Questions")

**Q: How many reports can I generate at a time?**  
**A:** You can generate up to **5** reports at a time. This includes all reports currently being generated as well as weekly scheduled reports.

**Q: How do I cancel a report?**  
**A:** To cancel a report in progress, go to [Sensitive content reporting](https://app.glean.com/admin/sensitivecontentreports). You will see a list of reports with status “*In Progress”* for reports being currently generated or “*Queued”* for reports scheduled to be run weekly once. Each of these entries will have a dropdown menu with options to “Cancel report” or “Cancel weekly report.” Canceling a weekly report will cancel the entire series, as we do not support skipping weekly runs.

**Q: Can I see what configurations I used for a report?**  
**A:** Yes! Go to the [Sensitive content reporting](https://app.glean.com/admin/sensitivecontentreports), and click on the name of the report you want to review. You can see the parameters you set for that report. If the report is done generating, you can also see how long it took, the total number of documents scanned, and the number of violations found.
