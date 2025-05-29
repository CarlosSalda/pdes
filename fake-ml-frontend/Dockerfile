# Stage 1: build Vite + React frontend
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy all frontend files
COPY fake-ml-frontend/. ./

# Install dependencies and build
RUN npm install -g pnpm \
 && pnpm install --frozen-lockfile \
 && pnpm build

# Stage 2: serve with Nginx
FROM nginx:stable-alpine AS runner
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
