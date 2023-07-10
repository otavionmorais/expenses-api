FROM node:18

WORKDIR /expenses-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["/bin/bash", "-c", "npm run migrations:execute:prod;npm run start:prod"]