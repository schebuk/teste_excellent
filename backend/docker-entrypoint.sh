#!/bin/bash
set -e

host=db
port=5432

echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h $host -p $port > /dev/null 2> /dev/null; do
    sleep 1
done
echo "PostgreSQL is ready!"

# Agora execute o comando para iniciar o serviço backend
exec "$@"
