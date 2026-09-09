---
url: "https://docs.glean.com/get-started/setup/sync-people-data"
canonical: "https://docs.glean.com/get-started/setup/sync-people-data"
title: "Select people connector"
description: "Synchronize your employee directory with Glean to ensure secure, accurate, and personalized search results. Glean calls this identity information 'people data'."
fetched_at: "2026-09-01T13:29:50.929Z"
---
On this page

People data is your employee directory synced into Glean. Syncing this data lets Glean enforce document permissions, apply role-based access controls (RBAC), and deliver more relevant, personalized search results.

tip

If you configured SSO using OIDC in the previous step, and your directory is the same as your SSO platform (for example, Entra ID or Okta), your directory is already configured as part of SSO-you only need to enable it as a people connector here.

note

You won't be able to complete this step until your Glean tenant is provisioned. If your tenant is still provisioning, click **Do this later** and return to this step once provisioning is complete.

## Add a people connector[​](#add-a-people-connector "Direct link to Add a people connector")

In the **Select a connector to sync with people data** section, select a people connector to sync your employee directory.

![Select a connector to sync with people data](/img/get-started/people-data-add-task.webp)

Select a connector to sync with people data

Follow the in-product instructions to connect your people connector. Or, see the following topics for detailed instructions on configuring common connectors:

-   [Okta](/administration/identity/people-data/configuration/people-data-okta)
-   [Entra ID](/administration/identity/people-data/configuration/people-data-entra-id)
-   [Google Drive](/administration/identity/people-data/configuration/people-data-google-drive)
-   [Workday](/administration/identity/people-data/configuration/people-data-workday)

After you select a connector, Glean shows the **Attribute mapping** screen so you can confirm or customize how source fields map to Glean attributes. See [Attribute mapping](/administration/identity/people-data/attribute-mapping) for what each column means, which connectors support custom mappings, and which Glean attributes are required for each connector.

The initial sync typically takes two to four hours to complete. For troubleshooting missing or incomplete people data, see [People data issues](/administration/identity/people-data/troubleshooting/people-data-issues).

## Manual upload (CSV)[​](#manual-upload-csv "Direct link to Manual upload (CSV)")

If your directory cannot be automatically synced from one of the supported people connectors, upload your people data as a CSV file.

Because CSV upload is not asynchronous, Glean does not recommend it for ongoing use. Any updates to your directory (new employees, departures, or changes) require you to re-upload a new CSV.

### Why can't Glean get identity information from the SAML token?

1.  The SAML assertion token does not contain all of the identity data required by Glean, and
2.  Changes to a user account are only reflected in the SAML token when the token refreshes on user re-authentication.

This means that Glean would not be aware of any changes to a user's identity attributes or group memberships until after re-authentication occurs, which is not desirable from a permissions enforcement perspective.

### CSV format[​](#csv-format "Direct link to CSV format")

The following are mandatory fields:

| Required field | Description |
| --- | --- |
| `first_name` | The user's first name, e.g. `Ben` |
| `last_name` | The user's last name, e.g. `Benson` |
| `email` | The user's email, e.g. `bbenson@domain.com` |
| `department` | The user's department, e.g. `Engineering` |

The following are not mandatory, but Glean **highly recommends** these fields to enhance the Glean experience for your organization:

| Recommended field | Description |
| --- | --- |
| `title` | The user's job title, e.g. `Software Engineer`. Used in search ranking and on the user's profile page. |
| `manager_email` | The email of the user's manager. Used heavily in search ranking signals. Required for the org chart to be populated correctly. |
| `city` | The user's city, e.g. `Tokyo`. Used for location-based personalization. |
| `state` | The user's state or province (where applicable). |
| `country` | The user's country, e.g. `Japan`. |
| `start_date` | The start date of the user. To show tenure in the user's profile page. |
| `nickname` | The name the user goes by, if different from `first_name`. |
| `phone_number` | The user's work phone number. |

Here's a sample CSV:

```
name,email,first_name,last_name,nickname,title,department,business_unit,manager_email,location,city,country,desk_location,start_date,status,photo_urlSamuel Sample,s.sample@company.com,Sam,Sample,Sam,CEO,Leadership,Leadership Team,,"Sydney, Australia",Sydney,Australia,"Desk 1/25",27/09/22,active,https://i.postimg.cc/rp2Qfkz6/WFH-2.jpgEllie Example,e.example@company.com,Ellie,Example,,CFO,Leadership,Leadership Team,s.sample@company.com,"Palo Alto, California",California,USA,,26/10/22,active,https://i.postimg.cc/rp2Qfkz6/WFH-2.jpgSteve Smith,s.smith@company.com,Steve,Smith,Steve,CTO,Leadership,Leadership Team,s.sample@company.com,"Auckland, New Zealand",Auckland,"New Zealand","Table 1",27/10/22,active,https://i.postimg.cc/rp2Qfkz6/WFH-2.jpgBenjamin Benson,b.benson@company.com,Benjamin,Benson,Ben,"Software Engineer",Engineering,Engineering,s.smith@company.com,"Tokyo, Japan",Tokyo,Japan,"Level 6, 1/6",03/12/22,deactivated,
```

### Upload the data[​](#upload-the-data "Direct link to Upload the data")

Select **CSV** as a people connector and select your CSV file when prompted. If you do not see this option or have difficulty with the upload, contact Glean support.
