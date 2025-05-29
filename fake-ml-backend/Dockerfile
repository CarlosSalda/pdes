# ────────────────
# Etapa 1: Builder
# ────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia los archivos de lock y package.json para caché de dependencias
COPY package.json pnpm-lock.yaml ./

# Instala todas las dependencias (dev + prod)
RUN pnpm install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Compila el proyecto NestJS (genera /app/dist)
RUN pnpm build


# ───────────────────
# Etapa 2: Producción
# ───────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Instala pnpm en el contenedor de producción
RUN npm install -g pnpm

# Solo necesitamos package.json y pnpm-lock para las deps de prod
COPY package.json pnpm-lock.yaml ./

# Instala únicamente dependencias de producción
RUN pnpm install --prod --frozen-lockfile

# Copia los artefactos compilados desde la etapa builder
COPY --from=builder /app/dist ./dist

# Ajusta la variable de entorno
ENV NODE_ENV=production

# Expone el puerto que usa Nest (por defecto 3000)
EXPOSE 3000

# Lanza el entrypoint de Nest
CMD ["node", "dist/main.js"]
