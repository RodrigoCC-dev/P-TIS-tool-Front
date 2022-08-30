#! /bin/bash

# Deshabilitar la aplicación actual
docker stop ptis-front
docker rm ptis-front
docker rmi ptisfront

# Configurar la aplicación nueva
echo 'Ingrese dirección de la API, (ejemplo: https://tuapi.com):'
read direccion
echo "VUE_APP_API_URL='${direccion}'" > .env

# Construir la aplicación
npm install
npm run build
cp Dockerfile Dockerfile.bk
cp Dockerfile_SSL Dockerfile
docker build -t ptisfront .

# Instalar la aplicación
docker run --name ptis-front -p 80:80 -p 443:443 -d ptisfront

# Limpiar instalación
docker rmi registry.gitlab.com/rodrigo.castillo.c/p-tis-tool-front
