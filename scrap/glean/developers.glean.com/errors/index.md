---
url: "https://developers.glean.com/errors/"
canonical: "https://developers.glean.com/errors/"
title: "Platform API Errors | Glean Developer"
description: "Error reference for Glean Platform API ProblemDetail responses"
fetched_at: "2026-09-01T13:23:00.567Z"
---
# Platform API Errors

Find the stable `ProblemDetail.code` returned by the Platform API, then open its reference page for likely causes, remediation, retry guidance, and an example response.

Find an error

Enter a code such as `invalid_cursor`, an HTTP status such as `429`, or a keyword such as `permissions`.

23 documented errors

| Error code | HTTP status | What it means |
| --- | --- | --- |
| [`invalid_request`](/errors/invalid-request "Invalid Request") | `400` | The request could not be processed because the payload, parameters, or request structure is invalid. |
| [`missing_required_field`](/errors/missing-required-field "Missing Required Field") | `400` | The request is missing a field that the endpoint requires. |
| [`invalid_parameter`](/errors/invalid-parameter "Invalid Parameter") | `400` | A request parameter or field is present but has an invalid value. |
| [`invalid_cursor`](/errors/invalid-cursor "Invalid Pagination Cursor") | `400` | The pagination cursor cannot be used for this request. |
| [`expired_cursor`](/errors/expired-cursor "Expired Pagination Cursor") | `400` | The pagination cursor was valid previously but is no longer usable. |
| [`invalid_filter`](/errors/invalid-filter "Invalid Filter") | `400` | A filter in the request is not valid for the endpoint or datasource scope. |
| [`invalid_datasource`](/errors/invalid-datasource "Invalid Datasource") | `400` | The requested datasource scope is unknown, inaccessible, or not valid for the operation. |
| [`authentication_required`](/errors/authentication-required "Authentication Required") | `401` | The API request did not include valid authentication credentials. |
| [`token_expired`](/errors/token-expired "Token Expired") | `401` | The authentication token was valid but has expired. |
| [`insufficient_permissions`](/errors/insufficient-permissions "Insufficient Permissions") | `403` | The caller is authenticated but is not allowed to perform the requested operation. |
| [`spend_limit_exceeded`](/errors/spend-limit-exceeded "Spend Limit Exceeded") | `403` | The request was rejected because a configured spend limit for the deployment has been reached. |
| [`resource_not_found`](/errors/resource-not-found "Resource Not Found") | `404` | The requested resource or endpoint could not be found or is not visible to the caller. |
| [`method_not_allowed`](/errors/method-not-allowed "Method Not Allowed") | `405` | The endpoint exists but does not support the HTTP method used by the request. |
| [`request_timeout`](/errors/request-timeout "Request Timeout") | `408` | The server timed out while processing the request. |
| [`request_too_large`](/errors/request-too-large "Request Too Large") | `413` | The request body is larger than the API accepts. |
| [`token_limit_exceeded`](/errors/token-limit-exceeded "Token Limit Exceeded") | `413` | The request exceeded the model's token limit, which caps how much content the model can process in one operation. |
| [`conflict`](/errors/conflict "Conflict") | `409` | The request conflicts with the current state of the resource. |
| [`gone`](/errors/gone "Gone") | `410` | The resource or operation is no longer available. |
| [`unprocessable_query`](/errors/unprocessable-query "Unprocessable Query") | `422` | The API understood the request shape but could not process the query semantics. |
| [`tools_unauthorized`](/errors/tools-unauthorized "Tools Unauthorized") | `422` | The request targets an agent that uses tools the end user has not authorized, so the run cannot start. |
| [`rate_limit_exceeded`](/errors/rate-limit-exceeded "Rate Limit Exceeded") | `429` | The caller has sent too many requests in a time window. |
| [`internal_error`](/errors/internal-error "Internal Error") | `500` | The API encountered an unexpected error while processing the request. |
| [`service_unavailable`](/errors/service-unavailable "Service Unavailable") | `503` | The API is temporarily unable to serve the request. |
