FROM node:23-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm --force
COPY . .
RUN pnpm install
RUN pnpm nx run client:build
RUN pnpx prisma generate
CMD ["sh", "-c", "pnpm nx run client:start"]
