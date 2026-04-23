#!/bin/bash

set -e

docker info >/dev/null 2>&1 || { echo "❌ Docker n'est pas démarré"; exit 1; }

cp .env.prod.example .env

cd backend/
cp .env.prod.example .env

cd ..

echo "🏗 Build et démarrage de tous les services..."
docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "✅ Setup prod terminé"
