#!/bin/bash
# SQLite 기반 Docker-less 개발 환경 실행 스크립트

set -e

echo "🚀 요양레이다 Docker-less 개발 환경 시작"
echo "=========================================="

# SQLite 모드로 전환
export DB_PROVIDER=sqlite
export DATABASE_URL="file:./dev.db"
export NODE_ENV=development

echo "📦 Prisma Client 생성 (SQLite 모드)..."
npx prisma generate

echo "🔄 데이터베이스 마이그레이션 실행..."
npx prisma migrate dev --name init

echo "🌱 샘플 데이터 시딩 (선택)..."
if [ -f "scripts/seed.mjs" ]; then
  read -p "샘플 데이터를 추가할까요? (y/N): " confirm
  if [[ $confirm == [yY] ]]; then
    node scripts/seed.mjs
  fi
fi

echo "🔧 개발 서버 시작..."
npm run dev
