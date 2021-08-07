FROM node:16.6.1

WORKDIR /usr/src/app

COPY alert-service/package*.json ./

RUN npm install npm@latest

RUN npm install

COPY ./alert-service ./alert-service

COPY ./auth ./auth
COPY ./*.js ./

EXPOSE 3000

CMD [ "node", "./alert-service/app.js" ]