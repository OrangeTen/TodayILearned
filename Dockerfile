FROM node:7.10

WORKDIR /app
COPY . .
RUN cd tilup-web &&\
 npm install
RUN cd tilup-web &&\
 npm run build

RUN cd tilup-server &&\
 npm install

EXPOSE 3000
CMD cd tilup-server &&\
 node app.js
