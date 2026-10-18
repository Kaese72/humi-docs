# build stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
# The site is built for the /docs/ base, so it is served from a matching
# directory and URLs map straight onto files.
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/docs/.vitepress/dist /usr/share/nginx/html/docs
RUN rm /etc/nginx/conf.d/*
COPY enabled.humi-docs.conf /etc/nginx/conf.d/enabled.humi-docs.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
