# ビルド用ステージ
FROM public.ecr.aws/docker/library/node:22.11.0-slim as builder
WORKDIR /app
# next/ 配下の package.json および package-lock.json をコピー
COPY next/package*.json ./
RUN npm ci

# プロジェクト全体（next フォルダ以下）をコピー
COPY next ./
RUN npm run build

# ランナー用ステージ
FROM public.ecr.aws/docker/library/node:22.11.0-slim as runner
# AWS Lambda Adapter を配置
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

# 環境変数の設定
ENV PORT=3000 \
    NODE_ENV=production \
    AWS_LWA_ENABLE_COMPRESSION=true

WORKDIR /app
# 必要なビルド成果物をコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# infra/run.sh をコピー（Dockerfile と同じ infra フォルダ内にある）
COPY infra/run.sh ./run.sh

# キャッシュ用のシンボリックリンク作成（必要な場合）
RUN ln -s /tmp/cache ./.next/cache

# 実行権限を付与
RUN chmod +x ./run.sh

# コンテナ起動時に run.sh を実行
CMD ["./run.sh"]
