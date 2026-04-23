#!/bin/bash

set -e

docker info >/dev/null 2>&1 || { echo "❌ Docker n'est pas démarré"; exit 1; }

echo "🚀 Lancement du docker..."
cp .env.dev.example .env
mkdir -p backend/docker_data

set -a
source .env
set +a

docker compose -f docker-compose.dev.yml up -d --build

echo ""

echo "📦 Installation des dépendances du backend..."
cd backend/
cp .env.dev.example .env
npm install

echo ""

echo "📦 Installation des dépendances du frontend..."
cd ..
cd frontend/

npm install
echo ""

echo "⏳ Attente que PostgreSQL soit prêt..."

until [ "$(docker inspect -f '{{.State.Health.Status}}' hackathon-postgres)" = "healthy" ]; do
  echo "Postgres pas encore prêt..."
  sleep 2
done

echo "✅ PostgreSQL prêt"

echo "🔄 Lancement des migrations..."
cd ..
cd backend/
npm run migrate:up

echo ""

echo "🏗 Build de l'app..."
npm run build

echo "✅ Setup terminé"

echo ""

source .env

echo ""
echo "----- PGAdmin -----"
echo ""

echo "Host name : db"
echo "Port : ${POSTGRES_PORT}"
echo "Email : ${PGADMIN_DEFAULT_EMAIL}"
echo "Mdp : ${PGADMIN_DEFAULT_PASSWORD}"
echo ""
echo "http://localhost:${PGADMIN_PORT}"

echo ""
echo "----- PostgreSQL -----"
echo ""

echo "Identifiant : ${POSTGRES_USER}"
echo "Mdp : ${POSTGRES_PASSWORD}"

echo ""
echo "----- Backend -----"
echo ""

echo "cd backend/"
echo "npm run dev"
echo ""
echo "Backend : http://localhost:${API_PORT}"
echo "Swagger : http://localhost:${API_PORT}/docs"

echo ""

echo ""
echo "----- Frontend -----"
echo ""

echo "cd frontend/"
echo "npm run dev"
echo ""
echo "Frontend : http://localhost:3000"

echo ""

echo "Identifiant du compte administrateur :"
echo "Email : admin@example.com"
echo "Mdp : Developpeur@12345"