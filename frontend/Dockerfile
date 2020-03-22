FROM node:13 as node

WORKDIR /app

COPY public ./public
COPY src ./src
COPY package.json package-lock.json ./

RUN npm install && npm run build


FROM nginx:1-alpine as nginx

RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /app/build /usr/share/nginx/html/

EXPOSE 80/tcp

ENTRYPOINT ["nginx", "-g", "daemon off;"]