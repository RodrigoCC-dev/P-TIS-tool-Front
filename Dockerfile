FROM node:10

WORKDIR usr/src/app

COPY package.json package-lock.json ./

RUN npm install --progres:false

EXPOSE 80

CMD ["npm", "start"]

COPY . .
