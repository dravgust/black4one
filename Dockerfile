FROM node:lts-alpine as build-stage

ARG APP_API_URL
ENV APP_API_URL ${APP_API_URL}

WORKDIR /app
COPY ./app/package*.json .
RUN npm install -only=prod
COPY ./app/ .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]