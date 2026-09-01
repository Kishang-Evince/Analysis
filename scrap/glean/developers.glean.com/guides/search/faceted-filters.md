---
url: "https://developers.glean.com/guides/search/faceted-filters"
canonical: "https://developers.glean.com/guides/search/faceted-filters"
title: "Faceted Filtering | Glean Developer"
description: "We provide the functionality of filtering the list of possible facets of a particular type (obtained in the facetResults above) using a prefix. If you want to filter the buckets of a particular sourceName in the facetResults using a specific prefix, you can set the facetBucketFilter object. It has the following two fields:"
fetched_at: "2026-09-01T13:23:02.772Z"
---
On this page

We provide the functionality of filtering the list of possible facets of a particular type (obtained in the [`facetResults`](/api/client-api/search/search#responses) above) using a prefix. If you want to filter the [`buckets`](/api/client-api/search/search#responses) of a particular [`sourceName`](/api/client-api/search/search#responses) in the [`facetResults`](/api/client-api/search/search#responses) using a specific prefix, you can set the [`facetBucketFilter`](/api/client-api/search/search#request) object. It has the following two fields:

1.  [`facet`](/api/client-api/search/search#request) - The facet fieldName that you want to filter on.
2.  [`prefix`](/api/client-api/search/search#request) - The prefix by which you want to filter the buckets of that facet by.

To use this Facet Bucket Filtering make sure that the [`responseHints`](/api/client-api/search/search#request) contains "FACET\_RESULTS" . See the sample request body below that filters the "type" bucket using the prefix “co”:

```
{  "query": "test",  "requestOptions": {    "facetBucketFilter": {      "facet": "type",      "prefix": "co"    },    "facetBucketSize": 3000,    "responseHints": ["FACET_RESULTS"]  }}
```

Within the `facetResults` field in the response to this query, you will find that the bucket for `sourceName`\="type" contains only those values with the prefix "co" in any word.

You can limit the maximum number of buckets you get within the `facetResults` for all `sourceName` by passing your desired value into `facetBucketSize`. In the example above, we limit buckets to 3000

### Preferred Name prefix matching[​](#preferred-name-prefix-matching "Direct link to Preferred Name prefix matching")

For `sourceName` supporting people within the buckets (e.g., "from", "owner", etc.), we support prefix matching using their preferred names (or nicknames). So if `facetBucketFilter` is applied to the “from” facet using the prefix “Adi,” it will give all the people whose either name or preferred name has a prefix of “Adi”.
