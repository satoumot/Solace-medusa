# syntax=docker/dockerfile:1

# ---- Builder Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json./
RUN npm install

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001 -G nodejs
USER nextjs

COPY package.json package-lock.json./
RUN npm install --production

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/next.config.js ./

EXPOSE 3000

CMD ["npm", "run", "start"]