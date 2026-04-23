FROM node:20-alpine AS builder

WORKDIR /opt/hackathon/frontend

RUN addgroup -S app && adduser -S app -G app

COPY package*.json ./
RUN npm install

COPY . .
ARG API_KEY=test
RUN NUXT_PUBLIC_API_BASE="/api" NUXT_PUBLIC_API_KEY="${API_KEY}" npm run generate

RUN chown -R app:app /opt/hackathon

####################################

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /opt/hackathon/frontend/.output/public /usr/share/nginx/html
COPY scripts/dockerfile/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
