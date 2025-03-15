FROM node:23-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm --force
COPY . .
RUN pnpm install
RUN pnpx prisma generate
ENV PORT=8080
CMD ["sh", "-c", "pnpm nx run backend:start"]