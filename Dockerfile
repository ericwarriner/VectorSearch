FROM denoland/deno:debian

WORKDIR /app
COPY . .

# Cache all dependencies
RUN deno cache dev.ts main.ts

# Build Fresh assets — this generates _fresh/server.js (the production bundle)
RUN deno task build

# Cloud Run injects PORT=8080 automatically
EXPOSE 8080

# Use shell form so $PORT is interpolated from the environment at runtime
CMD sh -c "deno serve -A --port=$PORT _fresh/server.js"
