FROM node

WORKDIR /usr/src/app

COPY alert-service/package*.json ./alert-service/

RUN cd alert-service && npm install 

COPY ./alert-service ./alert-service

COPY ./auth ./auth
COPY ./*.js ./

EXPOSE 3000

CMD [ "node", "./alert-service/app.js" ]