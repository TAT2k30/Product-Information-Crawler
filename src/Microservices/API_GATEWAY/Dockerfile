FROM node:18

WORKDIR src/Microservices/API_GATEWAY

COPY /package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:api-gateway"]
