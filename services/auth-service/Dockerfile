FROM node:20.9.0-alpine

WORKDIR /app/services/auth-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7070

CMD ["npm", "start"]