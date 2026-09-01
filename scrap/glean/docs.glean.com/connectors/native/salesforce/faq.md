---
url: "https://docs.glean.com/connectors/native/salesforce/faq"
canonical: "https://docs.glean.com/connectors/native/salesforce/faq"
title: "FAQs"
description: "Below are representative FAQs:"
fetched_at: "2026-09-01T13:29:39.795Z"
---
Below are representative FAQs:

### Can we connect multiple Salesforce orgs to the same Glean tenant?

Yes. Each Salesforce org (production or sandbox) is configured as a separate **Salesforce** connector in Glean. You can assign different names (e.g., `Salesforce – EMEA`, `Salesforce – Sandbox`) and independently control object scope and crawl behavior.

### Does Glean enforce Salesforce field‑level security (FLS)?

Not today. If a field is indexed and a user has access to the record via Salesforce sharing, that field’s content may appear in Glean, even if Salesforce FLS would normally hide it from that user. You should exclude/red‑list sensitive fields or objects from indexing when FLS is used for compliance controls.

### How quickly do Salesforce changes appear in Glean?

Under typical configurations, content changes propagate on the order of minutes after they are saved in Salesforce, subject to incremental crawl and indexing times. Permission changes propagate after share/identity crawls complete (for example, on an hourly schedule) and are indexed.

### Does the connector index Salesforce Knowledge drafts?

The connector can index published Knowledge articles by default. Indexing draft articles is available but may require explicit enablement depending on your configuration; confirm with your Glean representative and validate behavior in your environment.

### Which language version of a Salesforce Knowledge article appears in Glean?

For Salesforce Knowledge articles with multiple language versions, Glean surfaces the article's master-language version in search. This makes results consistent instead of allowing different translated versions of the same article to surface unpredictably.

### Are Salesforce attachments and Files indexed?

Yes. You can configure Glean to index **Salesforce Files (ContentDocument/ContentVersion)** via the Salesforce Attachments Indexing feature. Files are subject to global indexing limits (64 MB size cap and 16.875 MB text limit) and not all file types are content‑indexed.

### Can we restrict indexing to a subset of Salesforce data (for example, only sales or only support)?

Yes. You can choose which objects to index and optionally apply filters for certain objects. Additionally, you can exclude specific fields (e.g., sensitive fields) from indexing entirely.

### What happens when a record is deleted or access is revoked in Salesforce?

Deleted records are removed during subsequent content crawls. Access revocations are enforced once updated share and identity information is crawled and re‑indexed; until then, users may still see records they previously had access to.

### How do we use Salesforce data in Glean Assistant and Glean Agents?

Glean Assistant and Glean Agents leverage Salesforce data through the connector for retrieval, and through **Salesforce Tools** (e.g., Search Salesforce with SOQL, Update Salesforce Opportunity) for live reads and writes. Admins must enable tools and users may need to authorize Salesforce access via OAuth; see *Salesforce Tools* and *Salesforce Tools Setup* docs for details.

### Does the Salesforce connector respect Salesforce territories?

Yes. When you enable Salesforce Enterprise Territory Management (Territory2) to share records such as Accounts, Opportunities, Contacts, or Cases, Glean includes those territory‑based assignments in record‑level permissions. Users see the same records in Glean that they can access in Salesforce via territories and other Salesforce sharing mechanisms.
