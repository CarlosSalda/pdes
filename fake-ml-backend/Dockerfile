# Stage 1: build and compile NestJS backend
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy all backend files
COPY fake-ml-backend/. ./

# Install dependencies and build
RUN npm install -g pnpm \
 && pnpm install --frozen-lockfile \
 && pnpm build

# Stage 2: run the compiled code
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main.js"]
