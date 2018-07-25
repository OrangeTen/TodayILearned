FROM node:7.10

WORKDIR /app
COPY tilup-web/package.json tilup-web/package-lock.json tilup-web/
RUN cd tilup-web &&\
 npm install
COPY tilup-server/package.json tilup-server/package-lock.json tilup-server/
RUN cd tilup-server &&\
  npm install

COPY . .
RUN cd tilup-web &&\
 npm run build

EXPOSE 3000
CMD cd tilup-server &&\
 node app.js
