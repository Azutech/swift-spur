FROM node:19-alpine as development

COPY package*.json .

RUN npm install

COPY . .

 RUN npm run build

FROM node:19-alpine 


ARG NODE_ENV=production