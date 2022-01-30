#! /bin/bash

# Cambio a carpeta home
cd ~

# Clonar acme.sh
git clone https://github.com/acmesh-official/acme.sh.git
cd acme.sh

# instalar dependencias
apt install -y cron socat

# Instalar acme.sh
./acme.sh --install -m rodrigo.castillo.c@usach.cl

# Emitir certificados
cd ~/.acme.sh
./acme.sh --issue -d mmrptis.ga -d www.mmrptis.ga -w /usr/share/nginx/html
