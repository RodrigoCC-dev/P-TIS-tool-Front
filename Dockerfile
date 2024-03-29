###########
## Build ##
###########

FROM node:10

ENV NODE_ENV=production
ENV PORT=80

# Set workdir
WORKDIR usr/src/app

# Install dependencies
COPY . usr/src/app
COPY package.json package-lock.json ./

RUN npm install --progress:false

################
## Production ##
################

# Image for production
FROM nginx:latest

# Port to expose
EXPOSE 80

# Install 'nano' y 'git'
RUN rm -rf /tmp/* /var/cache/apk/*
RUN apt-get update && apt-get install -y nano git

# Copy artifact build from the 'build environment'
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html

# Run nginx
CMD ["nginx", "-g", "daemon off;"]

COPY . .
