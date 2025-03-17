FROM node:23-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm --force
COPY . .
RUN pnpm install
RUN cd ./apps/backend && pnpx prisma generate
RUN cd ../../
CMD ["sh", "-c", "pnpm nx run backend:start"]