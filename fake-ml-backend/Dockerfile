# ────────────────
# Etapa 1: Builder
# ────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Instala pnpm
RUN npm install -g pnpm

# Copia lockfiles y cfg de compilación
COPY package.json pnpm-lock.yaml nest-cli.json tsconfig*.json ./

# Instala todas las deps + cache
RUN pnpm install --frozen-lockfile

# Copia sólo el src para invalidar menos capas
COPY src ./src

# Compila a dist/
RUN pnpm build

# ───────────────────
# Etapa 2: Runner
# ───────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Instala pnpm (para arrancar)
RUN npm install -g pnpm

# Copia únicamente el código ya procesado + deps de producción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Ajustes y puerto
ENV NODE_ENV=production
EXPOSE 3000

# Arranca la app
CMD ["node", "dist/main.js"]
