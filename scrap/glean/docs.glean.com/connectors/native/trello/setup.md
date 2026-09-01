---
url: "https://docs.glean.com/connectors/native/trello/setup"
canonical: "https://docs.glean.com/connectors/native/trello/setup"
title: "setup"
fetched_at: "2026-09-01T13:29:45.960Z"
---
On this page

## Connect to Trello[​](#connect-to-trello "Direct link to Connect to Trello")

1.  Login to Trello [here](https://trello.com/login) with the admin user's credentials.
2.  Go to [this](https://trello.com/power-ups/admin/) page and create a new integration by clicking "Create" on the top right of the page. store the Personal Key in the API Key field. ![](/assets/images/power-ups-and-integrations-895a86e83fbcf587ef045be5dfd2527c.png)
3.  Fill in the form by setting the integration name to "Glean integration", choosing the workspace to activate the integration in and filling in the "Email", "Support contact" and "Author" fields. Leave the "Iframe connector URL" field blank and click "Create" once all the required fields are filled. ![](/assets/images/new-integration-form-59b00817f64aaf872c92625086267825.png)
4.  Click on "Generate a new API key". ![](/assets/images/generate-new-key-d7f0e13be7426efce8adade8e1865a79.png)
5.  Store the "API key" and "Secret" into the fields named `API Key` and `Webhook Secret`. Additionally, click on the link to generate a token manually, click allow and then store the token in the `Access Token` field. ![](/assets/images/integration-secrets-4a70c8a0d9f8662f48ffd4a71123a086.png)
6.  Click **Save** in Glean. You’re all set!
