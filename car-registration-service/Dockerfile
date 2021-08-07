FROM node:16.6.1

WORKDIR /usr/src/app

COPY car-registration-service/package*.json ./

RUN npm install -g npm@7.20.5

RUN npm install

COPY ./car-registration-service ./car-registration-service

COPY ./auth ./auth
COPY ./*.js ./

EXPOSE 3000

CMD [ "node", "./car-registration-service/app.js" ]