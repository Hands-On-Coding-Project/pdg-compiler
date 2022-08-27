FROM node:18-alpine

RUN apk update && apk add bash build-base python3 py3-pip

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]