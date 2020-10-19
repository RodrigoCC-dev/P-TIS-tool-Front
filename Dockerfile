###########
## Build ##
###########

FROM node:10

ENV NODE_ENV=production
ENV PORT=80

# Set workdir
WORKDIR usr/src/app

RUN rm -rf /tmp/* /var/cache/apk/*

# Install dependencies
COPY . usr/src/app
COPY package.json package-lock.json ./

RUN npm install --progres:false

################
## Production ##
################

# Image for production
FROM nginx:alpine

# Port to expose
EXPOSE 80

# Copy artifact build from the 'build environment'
COPY usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY usr/src/app/dist /usr/share/nginx/html

# Run nginx
CMD ["nginx", "-g", "daemon off;"]

COPY . .