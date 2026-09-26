# Pinned so builds are reproducible; bump deliberately.
FROM denoland/deno:debian-2.9.4

WORKDIR /app

# Dependencies first, so a source-only change reuses this layer
# instead of re-resolving the whole npm/JSR tree.
COPY deno.json deno.lock ./
RUN deno install

COPY . .

# Build Fresh assets — this generates _fresh/server.js (the production bundle)
RUN deno task build

# Cloud Run injects PORT=8080 automatically
EXPOSE 8080

# Shell form so $PORT is interpolated at runtime; the default keeps
# plain `docker run` working when PORT is unset.
CMD ["sh", "-c", "deno serve -A --port=${PORT:-8080} _fresh/server.js"]
