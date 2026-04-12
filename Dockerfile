FROM denoland/deno:alpine

WORKDIR /app
COPY . .

# Cache dependencies
RUN deno cache main.ts

# Ensure Fresh routes are built
RUN deno task build

# Cloud Run sets the PORT env variable automatically
EXPOSE 8080

CMD ["run", "-A", "main.ts"]