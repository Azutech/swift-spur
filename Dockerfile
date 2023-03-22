FROM node:19-alpine as development

COPY package*.json .

WORKDIR /usr/src/app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000



FROM node:19-alpine as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /usr/src/app ./Dist/src

CMD ["node", "Dist/src/server.js"]

