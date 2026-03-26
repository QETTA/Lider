FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:20-bookworm-slim AS production

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

CMD ["npm", "start"]
