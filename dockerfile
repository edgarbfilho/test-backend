# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia todo o código
COPY . .

# Gera Prisma Client para linux-musl (compatível Alpine)
RUN npx prisma generate

# Build do NestJS
RUN npm run build

# Stage 2: Produção
FROM node:18-alpine
WORKDIR /app

# Instala apenas dependências de produção
COPY package*.json ./
RUN npm install --production

# Copia build e Prisma Client
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/prisma ./prisma

# Porta do backend
EXPOSE 4000

# Comando para rodar o backend
CMD ["node", "dist/main.js"]
