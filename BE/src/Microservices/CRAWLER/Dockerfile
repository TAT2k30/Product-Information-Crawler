FROM node:18

WORKDIR src/Microservices/CRAWLER

COPY /package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:crawler-service"]
