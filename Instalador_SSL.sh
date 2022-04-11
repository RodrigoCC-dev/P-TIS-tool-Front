#! /bin/bash

# Obtener los certificados
mkdir certificates
docker pull registry.gitlab.com/rodrigo.castillo.c/p-tis-tool-front
docker run --name ptis-front -p 80:80 registry.gitlab.com/rodrigo.castillo.c/p-tis-tool-front
docker exec -it ptis-front bash -c "chmod 775 Crear_SSL.sh && ./Crear_SSL.sh"
docker cp ptis-front:/certificates/cert_file.cer certificates/cert_file.cer
docker cp ptis-front:/certificates/key_file.key certificates/key_file.key
echo Se ha obtenido el certificado SSL

# Configurando la aplicación
echo 'Ingrese dirección de la API, (ejemplo: https://tuapi.com):'
read direccion
echo "VUE_APP_API_URL='${direccion}'" > .env

# Construir la aplicación
yarn build
cp Dockerfile Dockerfile.bk
cp Dockerfile_SSL Dockerfile
docker build -t ptisfront .

# Instalar la aplicación
docker stop ptis-front
docker rm ptis-front
docker run --name ptis-front -p 80:80 -p 443:443 -d ptisfront

# Limpiar instalación
docker rmi registry.gitlab.com/rodrigo.castillo.c/p-tis-tool-front
