# /root/medusa-starter/admin-dashboard/Dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV HOST=0.0.0.0 PORT=5173
EXPOSE 5173

CMD ["npm", "run", "dev"]