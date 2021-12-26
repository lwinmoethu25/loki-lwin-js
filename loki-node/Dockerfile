FROM node:14

WORKDIR /loki-backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
