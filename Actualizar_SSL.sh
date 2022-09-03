#! /bin/bash

# Deshabilitar la aplicación actual
docker stop ptis-front
docker rm ptis-front
docker rmi ptisfront

# Configurar la aplicación nueva
echo .............................................................
echo 'Ingrese dirección de la API, (ejemplo: https://tuapi.com):'
read direccion
echo "VUE_APP_API_URL='${direccion}'" > .env

# Construir la aplicación
echo .............................................................
echo 'Se inicia construcción de la aplicación'
echo .............................................................
npm install
npm run build
cp Dockerfile Dockerfile.bk
cp Dockerfile_SSL Dockerfile
docker build -t ptisfront .
echo .............................................................
echo 'Aplicación construida exitósamente'
echo .............................................................

# Instalar la aplicación
docker run --name ptis-front -p 80:80 -p 443:443 -d ptisfront
echo .............................................................
echo 'Aplicación instalada correctamente'
echo .............................................................
