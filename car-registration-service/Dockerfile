FROM node

WORKDIR /usr/src/app

COPY ./car-registration-service ./car-registration-service

RUN cd car-registration-service && npm install

COPY ./auth ./auth

RUN cd auth && npm install 

COPY ./*.js ./

EXPOSE 3000

CMD [ "node", "./car-registration-service/app.js" ]