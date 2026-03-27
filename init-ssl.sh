#!/bin/bash
# Первичное получение SSL-сертификата через certbot
# Запускать один раз на чистом сервере ПОСЛЕ того как DNS уже указывает на этот IP
#
# Использование: bash init-ssl.sh

set -e

# Проверка root
if [ "$EUID" -ne 0 ]; then
  echo "Запустите скрипт от root: sudo bash init-ssl.sh"
  exit 1
fi

DOMAIN="ocherednichenko.ru"
EMAIL="admin@ocherednichenko.ru"   # ← замените на реальный e-mail (уведомления об истечении)
COMPOSE_FILE="docker-compose.yml"

echo "=== Шаг 1: Запускаем nginx только на HTTP (без SSL) ==="

# Временный конфиг — только HTTP, чтобы certbot мог пройти challenge
cat > /tmp/nginx-http-only.conf << 'EOF'
server {
    listen 80;
    server_name ocherednichenko.ru www.ocherednichenko.ru;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
EOF

# Подменяем конфиг и стартуем только nginx
docker compose -f "$COMPOSE_FILE" up -d postgres
docker run --rm -d \
  --name nginx-tmp \
  --network mozaika_internal \
  -p 80:80 \
  -v /tmp/nginx-http-only.conf:/etc/nginx/conf.d/default.conf:ro \
  -v /opt/mozaika/ssl/certbot:/var/www/certbot \
  nginx:alpine

echo "=== Шаг 2: Получаем сертификат ==="

mkdir -p /opt/mozaika/ssl

docker run --rm \
  -v /opt/mozaika/ssl:/etc/letsencrypt \
  -v /opt/mozaika/ssl/certbot:/var/www/certbot \
  certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" \
    -d "www.$DOMAIN"

echo "=== Шаг 3: Останавливаем временный nginx ==="
docker stop nginx-tmp

echo "=== Шаг 4: Копируем сертификаты в нужное место ==="
mkdir -p /opt/mozaika/ssl/certs
cp /opt/mozaika/ssl/live/${DOMAIN}/fullchain.pem /opt/mozaika/ssl/certs/fullchain.pem
cp /opt/mozaika/ssl/live/${DOMAIN}/privkey.pem   /opt/mozaika/ssl/certs/privkey.pem

echo "=== Шаг 5: Запускаем всё ==="
docker compose -f "$COMPOSE_FILE" up -d

echo ""
echo "✓ Готово! Сайт доступен на https://${DOMAIN}"
echo ""
echo "Для автопродления сертификата добавьте в crontab:"
echo "  0 3 * * * docker run --rm -v /opt/mozaika/ssl:/etc/letsencrypt -v /opt/mozaika/ssl/certbot:/var/www/certbot certbot/certbot renew --quiet && cp /opt/mozaika/ssl/live/${DOMAIN}/fullchain.pem /opt/mozaika/ssl/certs/fullchain.pem && cp /opt/mozaika/ssl/live/${DOMAIN}/privkey.pem /opt/mozaika/ssl/certs/privkey.pem && docker compose -f /opt/mozaika/docker-compose.yml exec nginx nginx -s reload"
