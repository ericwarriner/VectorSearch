---
name: deploy-state
description: Where the Google Cloud Vector Search demo runs (Cloud Run vectorsearch-demo in GCP project ericwarriner2, Firestore vector index images4_arcface) as verified 2026-09-26, how to deploy it without landing in the wrong project, and the deploy-hardening files still uncommitted
metadata:
  type: project
---

**Live (deployed and verified end to end 2026-09-26):** https://vectorsearch-demo-535054082444.us-central1.run.app — Cloud Run service `vectorsearch-demo`, us-central1, revision `vectorsearch-demo-00001-rjw`, `--allow-unauthenticated` (Eric: security is not a concern for this demo). The runtime identity is the default compute service account `535054082444-compute@developer.gserviceaccount.com`, which already had `roles/datastore.user`. Verified: page and static assets 200, `/api/count` = 10000, a vector self-match at distance 0.0000, and the full browser flow (upload → face detect → 512-d embedding → Firestore search → 10 ranked results with thumbnails).

**Cloud:** GCP project `ericwarriner2` (number 535054082444), gcloud account eric.warriner@gmail.com — a third project, separate from WallaB.AI's `wallab-501200` and Fazenda's `newfazendaapp`.
- Firestore `(default)`, Native mode, `nam5`, has two READY flat vector indexes: `images4_arcface` (512-d, the live one, 10,000 documents) and a legacy `images3` (128-d, from an earlier embedding model).
- The project also holds an unrelated Cloud Run service `site` (region uk). Leave it alone.

**Deploying from the Windows PC:** pin `--project ericwarriner2 --account eric.warriner@gmail.com` on every gcloud call. This PC's gcloud default project is `theweekbrewed` (checked 2026-09-26), so an unpinned call lands there. `gcloud run deploy --source .` builds from the `Dockerfile`, not Buildpacks.

**Uncommitted at HEAD 74feabb (2026-09-26), verified by a real Cloud Build, awaiting Eric's decision to commit:**
- `Dockerfile`: base pinned to `denoland/deno:debian-2.9.4`; dependency layer (`deno.json` + `deno.lock` → `deno install`) copied before the source so edits reuse the cache; `CMD` uses `${PORT:-8080}`.
- New `.dockerignore` and `.gcloudignore`: exclude `service.json`, `.env*`, `node_modules/`, `_fresh/`, `.git/`, `*.pptx`, `scratch/`. Excluding `node_modules` is a correctness fix (a Windows-built 407 MB node_modules was being copied into the Linux image), and the upload fell from ~500 MB to 29 files / 5.7 MiB.

Related: [[open-follow-ups]].
