#!/bin/bash
echo "Fermeture des conteneurs..."
docker compose -f docker-compose.dev.yml down

echo ""
echo "Suppression des images / volumes docker..."
docker system prune -a

echo ""
echo "Suppression du .env..."
rm -r .env

echo ""

cd backend/
echo "Suppression du .env / node_modules et docker_data..."
rm -r .env
rm -r node_modules
cd ..
cd frontend/
rm -r node_modules
rm -r .nuxt

echo ""

rm -r docker_data

echo ""

echo "Suppression du dossier /dist..."
rm -r dist

echo ""
