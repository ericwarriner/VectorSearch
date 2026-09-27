---
name: open-follow-ups
description: Open, non-blocking follow-ups for the Vector Search keynote demo (found 2026-09-26) — slow search from encoding every result image, a possible NHWC/NCHW ArcFace input bug, README and keynote-script inaccuracies, and unpinned model/runtime downloads that are the real risk on conference wifi
metadata:
  type: project
---

Found by the 2026-09-26 deploy session; each was checked against the code. None of them blocks the demo, which works in production ([[deploy-state]]).

1. **Search is slow (~1.3 s warm, ~2.8 s cold)** — BACKLOGGED by Eric 2026-09-26 as `docs/BACKLOG.md` B1; do it when he picks it up, not unprompted. `routes/api/search.ts` asks `findNearest` for up to 250 documents, then base64-encodes the `image_blob` of every one in the age range before `slice(0, num_rows)` keeps the ~10 shown. Fix: stop building results once `num_rows` in-range documents are collected, or slice before encoding. Cold starts would want `--min-instances=1`.
2. **Possible model-input bug (unverified).** `utils/arcface.ts` builds the tensor as `[1, 112, 112, 3]` (NHWC), while its own comment says NCHW and ArcFace ONNX models normally expect `[1, 3, 112, 112]`. Queries still work because all 10,000 stored embeddings came from the same code, but match quality may be quietly degraded. Fixing it means re-embedding the whole collection, so decide with Eric first.
3. **README (and the keynote script) are wrong about the stack.** README says inference runs on "the client's WebGL computational layer" and deploys with Google Buildpacks. The code sets `executionProviders: ["wasm"]`, and `--source .` builds from the Dockerfile. `islands/PresentationDeck.tsx` also says "WebGL ONNX" in a slide and in the spoken script, which matters for a live keynote. The README also never mentions the SSD MobileNet detector.
4. **Unpinned downloads on every page load, the real keynote risk.** The browser fetches the ArcFace model (~250 MB) from `huggingface.co/garavv/arcface-onnx/resolve/main/arc.onnx` (tracks `main`, so it can change between demos) and onnxruntime-web from `cdn.jsdelivr.net/npm/onnxruntime-web/dist/` (no version pinned). On conference wifi that's the likeliest failure; Cloud Run doesn't help. Pin both, and consider hosting them in GCS behind Cloud CDN.
