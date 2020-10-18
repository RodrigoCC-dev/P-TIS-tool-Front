FROM node:10

ENV NODE_ENV=production
ENV PORT=80

WORKDIR usr/src/app

COPY package.json package-lock.json ./

RUN npm install --progres:false

EXPOSE 80

CMD ["npm", "run", "serve"]

COPY . .
