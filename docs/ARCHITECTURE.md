# 아키텍처 가이드

## 📋 목차

- [시스템 구조](#시스템-구조)
- [온프레미스 배포](#온프레미스-배포)
- [새 앱 추가하기](#새-앱-추가하기)
- [확장 전략](#확장-전략)
- [배포 체크리스트](#배포-체크리스트)

---

## 시스템 구조

### 모노레포 구조

```
monorepo-design-system-template/
├── packages/               # 공유 라이브러리
│   ├── components/        # UI 컴포넌트
│   ├── tokens/           # 디자인 토큰
│   └── theme/            # Tailwind 테마
└── apps/                 # 애플리케이션
    └── storybook/        # 디자인 시스템 문서
```

### 배포 아키텍처

```
┌─────────────────────────┐
│   온프레미스 서버        │
│  ┌──────────────────┐  │
│  │  Nginx (Port 80) │  │
│  │  - Reverse Proxy │  │
│  │  - Load Balancer │  │
│  └────────┬─────────┘  │
│           │             │
│           ▼             │
│     ┌─────────┐         │
│     │Storybook│         │
│     │Container│         │
│     └─────────┘         │
└─────────────────────────┘
```

---

## 온프레미스 배포

### 빠른 시작

```bash
# 1. Docker Compose로 배포
docker-compose up -d

# 2. 확인
curl http://localhost/health
```

### Docker Compose 구성

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./deploy/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./deploy/nginx/conf.d:/etc/nginx/conf.d:ro
    depends_on:
      - storybook
    restart: unless-stopped

  storybook:
    build:
      context: .
      dockerfile: ./apps/storybook/Dockerfile
    restart: unless-stopped
```

### Dockerfile 패턴

```dockerfile
# 멀티 스테이지 빌드
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# 의존성 설치
FROM base AS deps
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/*/package.json ./packages/
COPY apps/your-app/package.json ./apps/your-app/
RUN pnpm install --frozen-lockfile --filter your-app...

# 빌드
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter your-app build

# 프로덕션
FROM nginx:alpine
COPY --from=builder /app/apps/your-app/dist /usr/share/nginx/html
COPY apps/your-app/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx 설정

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # 보안 헤더
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip 압축
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # 정적 자산 캐싱
    location ~* \.(css|js|jpg|png|gif|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 라우팅
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 헬스체크
    location /health {
        return 200 "healthy\n";
    }
}
```

---

## 새 앱 추가하기

### 1. 앱 생성

```bash
mkdir apps/your-app
cd apps/your-app
```

**package.json**
```json
{
  "name": "your-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@design-system/components": "workspace:*",
    "@design-system/tokens": "workspace:*",
    "@design-system/theme": "workspace:*"
  }
}
```

### 2. Dockerfile 작성

위의 [Dockerfile 패턴](#dockerfile-패턴) 참고하여 `apps/your-app/Dockerfile` 생성

### 3. docker-compose.yml 업데이트

```yaml
services:
  your-app:
    build:
      context: .
      dockerfile: ./apps/your-app/Dockerfile
    container_name: ds-your-app
    restart: unless-stopped
    networks:
      - frontend-network
```

### 4. Nginx 라우팅 추가

```nginx
# deploy/nginx/conf.d/default.conf

upstream your_app {
    server your-app:80;
}

server {
    location /your-app/ {
        proxy_pass http://your_app/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 5. 빌드 및 배포

```bash
# 빌드
docker-compose build your-app

# 시작
docker-compose up -d

# 확인
curl http://localhost/your-app/health
```

---

## 확장 전략

### Phase 1: 단일 서버 (현재)

**규모:** ~100명 사용자

**리소스:**
- CPU: 4코어
- RAM: 8GB
- Disk: 100GB SSD

### Phase 2: 서비스 분리

**규모:** ~500명 사용자

**변경사항:**
- 웹 서버와 앱 서버 분리
- Redis 캐싱 추가
- CDN 연동

### Phase 3: 수평 확장

**규모:** ~2,000명 사용자

**변경사항:**
```yaml
# Docker Swarm 또는 Kubernetes
services:
  your-app:
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
```

### 확장 신호

**CPU:** 평균 70% 이상 1시간
**메모리:** 사용률 75% 이상
**응답시간:** P95 > 1초
**에러율:** 1% 이상

---

## 배포 체크리스트

### 배포 전

- [ ] Docker 및 Docker Compose 설치 (v20.10+)
- [ ] 환경 변수 파일 생성
- [ ] 빌드 성공 확인
- [ ] 포트 오픈 (80, 443)

### 배포 중

- [ ] 배포 스크립트 실행
- [ ] 빌드 로그 확인
- [ ] 컨테이너 시작 확인
- [ ] 헬스체크 통과

### 배포 후

- [ ] HTTP 접속 확인
- [ ] 로그 확인 (`docker-compose logs`)
- [ ] 리소스 사용량 확인 (`docker stats`)
- [ ] 백업 설정

### 주기적 점검

**일일:**
- 서비스 가용성
- 에러 로그

**주간:**
- 백업 상태
- 디스크 공간
- 성능 지표

**월간:**
- 보안 업데이트
- 용량 계획
- 성능 최적화

---

## 모니터링

### Prometheus + Grafana

```bash
# 모니터링 설정
./deploy/scripts/monitoring-setup.sh

# 시작
docker-compose -f docker-compose.monitoring.yml up -d
```

**접속:**
- Grafana: http://localhost:3001 (admin/admin)
- Prometheus: http://localhost:9090

### 백업

```bash
# 백업 실행
./deploy/scripts/backup.sh

# 복구
./deploy/scripts/restore.sh /backup/backup_file.tar.gz

# 자동 백업 (crontab)
0 2 * * * /path/to/deploy/scripts/backup.sh
```

---

## 트러블슈팅

### 컨테이너가 시작되지 않음

```bash
docker-compose logs your-app
docker-compose ps
docker stats
```

### 포트 충돌

```bash
# Linux
sudo lsof -i :80

# Windows
netstat -ano | findstr :80
```

### 메모리 부족

```yaml
services:
  your-app:
    deploy:
      resources:
        limits:
          memory: 512M
```

### 빌드 실패

```bash
# 캐시 없이 재빌드
docker-compose build --no-cache

# 의존성 재설치
rm -rf node_modules
pnpm install
```

---

## 명령어 참고

```bash
# 배포
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 재시작
docker-compose restart your-app

# 중지
docker-compose down

# 리소스 확인
docker stats

# 정리
docker system prune -a
```

---

## 참고 문서

- [빠른 시작 가이드](../QUICKSTART_ONPREMISE.md)
- [배포 가이드](../deploy/README.md)
- [Docker 공식 문서](https://docs.docker.com/)
- [Nginx 설정 가이드](https://nginx.org/en/docs/)

