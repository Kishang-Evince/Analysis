---
url: "https://developers.glean.com/api/client-api/verification/overview"
canonical: "https://developers.glean.com/api/client-api/verification/overview"
title: "Verification API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:55.421Z"
---
The Verification API helps maintain content accuracy and currency by managing verification workflows for documents and information. Create verification reminders, track verification status, and ensure your organization's knowledge remains up-to-date and reliable.

## Use Cases

### Content Verification

Set up automated reminders and workflows to ensure documents and information are regularly reviewed and verified for accuracy.

### Quality Assurance

Track verification status across your content to maintain high-quality, reliable information throughout your organization.

### Compliance Tracking

Monitor verification activities and maintain audit trails to demonstrate compliance with content governance policies.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/addverificationreminder`](/api/client-api/verification/addverificationreminder) | [Create verification](/api/client-api/verification/addverificationreminder)
Creates a verification reminder for the document. Users can create verification reminders from different product surfaces.

 |
| POST | [`/rest/api/v1/listverifications`](/api/client-api/verification/listverifications) | [List verifications](/api/client-api/verification/listverifications)

Returns the information to be rendered in verification dashboard. Includes information for each document owned by user regarding their verifications.

 |
| POST | [`/rest/api/v1/verify`](/api/client-api/verification/verify) | [Update verification](/api/client-api/verification/verify)

Verify documents to keep the knowledge up to date within customer corpus.

 |
