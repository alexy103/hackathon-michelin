#!/bin/bash
echo "Fermeture des conteneurs..."
docker compose -f docker-compose.prod.yml down

echo ""
echo "Suppression des images / volumes docker..."
docker system prune -a

rm -r .env

cd backend/
rm -r .env