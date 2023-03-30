#! /bin/bash

# Cambio a carpeta home
cd ~

# Clonar acme.sh
git clone https://github.com/acmesh-official/acme.sh.git
cd acme.sh

# instalar dependencias
apt update
apt install -y cron socat

# Instalar acme.sh
./acme.sh --install -m rodrigo.castillo.c@usach.cl

# Emitir certificados
cd ~/.acme.sh
echo '---------------------------------------------'
echo 'Ingrese el dominio que usará la aplicación:'
read dominio
./acme.sh --issue -d $dominio -w /usr/share/nginx/html

# Copiar certificados creados en carpeta de acceso
mkdir /certificates
cp /root/.acme.sh/${dominio}_ecc/${dominio}.cer /certificates/cert_file.cer
cp /root/.acme.sh/${dominio}_ecc/${dominio}.key /certificates/key_file.key
