FROM node:18-alpine AS base

RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

# ========================================
# 의존성 설치 단계
# ========================================
FROM base AS deps

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/components/package.json ./packages/components/
COPY packages/tokens/package.json ./packages/tokens/
COPY packages/tokens-product-1/package.json ./packages/tokens-product-1/
COPY packages/theme/package.json ./packages/theme/
COPY apps/storybook/package.json ./apps/storybook/

RUN pnpm install --frozen-lockfile --filter storybook...

# ========================================
# 빌드 단계
# ========================================
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY packages ./packages
COPY apps/storybook ./apps/storybook
COPY turbo.json ./

ENV NODE_ENV=production
RUN pnpm --filter storybook build-storybook

# ========================================
# 프로덕션 단계
# ========================================
FROM nginx:alpine AS production

RUN apk update && apk upgrade && \
    apk add --no-cache wget && \
    rm -rf /var/cache/apk/*

RUN rm -rf /etc/nginx/conf.d/default.conf

# Storybook 정적 파일 복사
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html

# Nginx 설정
COPY apps/storybook/nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

RUN echo "healthy" > /usr/share/nginx/html/health

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

