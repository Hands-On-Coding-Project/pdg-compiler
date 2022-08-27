FROM node:18-alpine

RUN apk update && apk add bash && apk add build-base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]