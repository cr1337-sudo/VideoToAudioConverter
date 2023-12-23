FROM node:20

WORKDIR ./user-auth-microservice/dist/index.js

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "run" ,"dev"]