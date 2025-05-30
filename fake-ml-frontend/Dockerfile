# 1) Build
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# 2) Runtime con 'serve'
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Instala sólo 'serve' global
RUN npm install -g serve

# Copia el dist
COPY --from=builder /usr/src/app/dist ./dist

# Sirve en el puerto 5173
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "80"]
