FROM node

WORKDIR /usr/src/app

COPY car-registration-service/package*.json ./car-registration-service/

RUN cd car-registration-service && npm install

COPY ./car-registration-service ./car-registration-service

COPY ./auth ./auth
COPY ./*.js ./

EXPOSE 3000

CMD [ "node", "./car-registration-service/app.js" ]