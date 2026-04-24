FROM node:20-alpine AS builder

WORKDIR /opt/hackathon/backend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

##############################

FROM node:20-alpine

WORKDIR /opt/hackathon/backend

RUN addgroup -S app && adduser -S app -G app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /opt/hackathon/backend/dist ./dist
COPY --from=builder /opt/hackathon/backend/migrations ./migrations
COPY --from=builder /opt/hackathon/backend/src/utils/migration-helpers ./src/utils/migration-helpers

RUN chown -R app:app /opt/hackathon

USER app

CMD ["sh", "-c", "npm run migrate:up && npm start"]
