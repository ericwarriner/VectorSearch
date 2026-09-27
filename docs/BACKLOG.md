# Vector Search demo — Backlog

Work Eric has put on the list for later. Each item was checked against the
code when it was added. Newest at the bottom; mark an item ✅ with its commit
when it ships instead of deleting it.

## B1 — Make the search fast

*Added 2026-09-26 (Eric).*

**Symptom:** a search takes ~1.3 s warm and ~2.8 s on a cold start, which is
noticeable when it runs live in a keynote.

**Cause:** `routes/api/search.ts` asks `findNearest` for up to 250 documents
(`limit: 250`, to leave room for the age filter), then base64-encodes the
`image_blob` of **every** document in the age range before
`filtered.slice(0, data.num_rows)` keeps the ~10 the page shows. Most of the
time goes on reading and encoding ~2.5 MB of images that are thrown away.

**Fix:**
- Stop building results once `num_rows` in-range documents have been
  collected, so only the images that are returned get encoded.
- Consider lowering the 250 limit, if the age filter rarely needs that many.
- Set `--min-instances=1` on the `vectorsearch-demo` Cloud Run service to
  remove the cold start, at least around a keynote (GCP project
  `ericwarriner2`; pin `--project` and `--account` on the gcloud call).

**Done when:** a warm search returns in well under a second, and the result
list still shows the same people in the same order as before.
