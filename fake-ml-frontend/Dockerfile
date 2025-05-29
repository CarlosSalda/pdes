# Stage 1: build Vite + React frontend
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# 1) Copia lockfiles primero para cache de deps
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# 2) Copia el resto del código (todo el contexto)
COPY . .

# 3) Build
RUN pnpm build
# Stage 2: serve with Nginx
FROM nginx:stable-alpine AS runner
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
