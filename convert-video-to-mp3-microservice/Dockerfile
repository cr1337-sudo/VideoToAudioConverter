FROM node:20

WORKDIR ./convert-video-to-mp3-microservice/dist/index.js

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8000

CMD ["npm", "run" ,"dev"]