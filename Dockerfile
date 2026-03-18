ARG NODE_VERSION=20
ARG NGINX_HTML_DIR=/usr/share/nginx/html

FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./ 
RUN npm ci
RUN npm install @rolldown/binding-linux-x64-gnu --no-save || true

COPY . .
RUN npm run build

FROM nginx:stable-alpine
ARG NGINX_HTML_DIR=/usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist ${NGINX_HTML_DIR}

