# syntax=docker/dockerfile:1

# ---- Builder Stage ----
# このステージでは、アプリケーションをビルドするために必要なすべての依存関係をインストールします。
FROM node:20-alpine AS builder
WORKDIR /app

# 依存関係のみを先にコピーして、Dockerのレイヤーキャッシュを最適化します。
COPY package.json yarn.lock./
RUN yarn install --frozen-lockfile

# ソースコードをコピーしてアプリケーションをビルドします。
COPY . .
RUN yarn build

# ---- Production Stage ----
# このステージでは、ビルドされたアーティファクトのみを含む軽量な最終イメージを作成します。
FROM node:20-alpine
WORKDIR /app

# セキュリティ向上のため、非ルートユーザーを作成して使用します。
RUN addgroup -g 1001 -S nodejs
RUN adduser -S medusa -u 1001 -G nodejs
USER medusa

# 本番環境に必要な依存関係のみをインストールします。
COPY package.json yarn.lock./
RUN yarn install --production --frozen-lockfile

# Builderステージからビルド済みのコードをコピーします。
COPY --from=builder /app/dist ./dist

# Medusaサーバーが使用するポートを公開します。
EXPOSE 9000

# コンテナ起動時にマイグレーションを実行し、サーバーを起動します。
CMD ["sh", "-c", "medusa migrations run && medusa start"]