FROM node:24 AS builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install -g pnpm@11

RUN pnpm install

COPY  . .

RUN pnpm build -- --debug

CMD ["pnpm", "start"]
