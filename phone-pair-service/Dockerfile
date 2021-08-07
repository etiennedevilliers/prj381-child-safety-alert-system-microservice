FROM node

WORKDIR /usr/src/app

COPY phone-pair-service/package*.json ./

RUN npm install 

COPY ./phone-pair-service ./phone-pair-service

COPY ./auth ./auth
COPY ./*.js ./

EXPOSE 3000

CMD [ "node", "./phone-pair-service/app.js" ]