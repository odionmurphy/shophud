# Backend Dockerfile using Bun
FROM oven/bun:latest

WORKDIR /app

# Copy package file(s) first to leverage layer caching
COPY package.json bun.lockb* ./

RUN bun install --production

# Copy rest of the source
COPY . .

EXPOSE 3001

CMD ["bun","index.ts"]
