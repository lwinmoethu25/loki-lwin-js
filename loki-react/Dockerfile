FROM node:14.16.0-alpine3.10 as build-stage

WORKDIR /loki-react
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

FROM nginx:1.17.0-alpine

COPY --from=build-stage /loki-react/build /usr/share/nginx/html
EXPOSE $DEFALUT_PORT

CMD nginx -g 'daemon off;'