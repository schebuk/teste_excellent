FROM php:8.1-fpm

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev \
    postgresql-client \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

RUN ln -s /app/storage/app/public /app/public/storage

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

RUN cp .env.example .env
RUN php artisan key:generate

RUN php artisan migrate --force

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
