# Field 1 — API Architecture Type

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [API Architecture Type.md](../../../Glean/Combined/4.9.4 Integration & Technical/API Architecture Type.md)

---

| # | Call | Endpoint | Protocol | Pass? |
|---|---|---|---|---|
| 1 | Search | `POST /rest/api/v1/search` | REST JSON | |
| 2 | Platform search | `POST /api/search` | REST JSON | |
| 3 | Network capture during UI search | — | No GraphQL/gRPC? | |

```bash
curl -X POST "https://<instance>-be.glean.com/rest/api/v1/search" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"query": "Stratos_Connector_Test_Doc"}'
```

---
