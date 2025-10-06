#!/bin/sh

# Run migrations and start server
echo "Running database migrations..."
npx medusa db:migrate

echo "Seeding database..."
npm run seed || echo "Seeding failed, continuing..."

echo "Creating admin user..."
npx medusa user -e admin@example.com -p supersecret -i admin || echo "Admin user creation failed or already exists"

echo "Starting Medusa development server..."
npm run dev