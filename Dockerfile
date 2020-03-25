FROM node:12.2.0-alpine

# Built by deploy-node-app

WORKDIR /app

COPY package.json /app

RUN npm install
COPY . /app
 

CMD ["node", "src/index.js"]

EXPOSE 8081
