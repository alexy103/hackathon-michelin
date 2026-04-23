#!/bin/bash

set -e

docker info >/dev/null 2>&1 || { echo "❌ Docker n'est pas démarré"; exit 1; }

echo "🚀 Lancement de l'environnement de prod..."
cp .env.prod.example .env
mkdir -p backend/docker_data/prod

echo "🏗 Build et démarrage de tous les services..."
docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "✅ Setup prod terminé"
