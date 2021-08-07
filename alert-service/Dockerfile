FROM node

WORKDIR /usr/src/app

COPY ./alert-service ./alert-service

RUN cd alert-service && npm install 

COPY ./auth ./auth

RUN cd auth && npm install 

COPY ./*.js ./

EXPOSE 3000

CMD [ "node", "./alert-service/app.js" ]