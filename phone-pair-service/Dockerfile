FROM node

WORKDIR /usr/src/app

COPY ./phone-pair-service ./phone-pair-service

RUN cd phone-pair-service && npm install 

COPY ./auth ./auth

RUN cd auth && npm install 

COPY ./*.js ./

EXPOSE 3000

CMD [ "node", "./phone-pair-service/app.js" ]