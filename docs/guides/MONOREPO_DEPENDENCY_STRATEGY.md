# 모노레포 의존성 관리 전략

## 📦 패키지 설치 위치 가이드

### 🌐 루트 레벨 (Workspace Root)

**설치 대상: 개발 도구 & 공통 설정**

```json
{
  "devDependencies": {
    // ✅ 코드 품질 도구
    "eslint": "^8.57.1",
    "prettier": "^3.6.2",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint-config-prettier": "^9.1.2",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^4.6.2",

    // ✅ 타입 시스템
    "typescript": "^5.3.3",

    // ✅ 빌드 오케스트레이션
    "turbo": "^2.0.0",

    // ✅ 테스트 프레임워크 (선택)
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",

    // ✅ 공통 타입 정의
    "@types/node": "^20.0.0"
  }
}
```

**❌ 설치하면 안 되는 것들:**

- 런타임 라이브러리 (React, Vue, etc.)
- CSS 프레임워크 (Tailwind, styled-components)
- 번들러 (Vite, Webpack, Rollup)
- UI 라이브러리 (Material-UI, Ant Design)

---

### 📱 앱 레벨 (apps/\*)

**설치 대상: 런타임 의존성 & 앱 특화 도구**

```json
{
  "dependencies": {
    // ✅ 워크스페이스 패키지
    "@dbds/components": "workspace:*",
    "@dbds/charts": "workspace:*",
    "@dbds/tokens": "workspace:*",

    // ✅ 런타임 라이브러리
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",

    // ✅ 상태 관리 (필요시)
    "zustand": "^4.0.0",
    "react-query": "^5.0.0"
  },
  "devDependencies": {
    // ✅ 번들러 & 플러그인
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.1",

    // ✅ CSS 도구
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.16",

    // ✅ 타입 정의
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18"
  }
}
```

---

### 📦 패키지 레벨 (packages/\*)

**설치 대상: 패키지 빌드에 필요한 최소한**

```json
{
  "dependencies": {
    // ✅ 다른 워크스페이스 패키지
    "@dbds/tokens": "workspace:*",

    // ✅ 런타임에 필요한 유틸
    "clsx": "^2.1.0",
    "date-fns": "^3.3.0"
  },
  "devDependencies": {
    // ✅ 빌드 도구
    "tsup": "^8.0.0",
    "rollup": "^4.0.0",

    // ✅ CSS 도구 (스타일이 있는 경우)
    "tailwindcss": "^3.4.0",

    // ✅ 타입 정의
    "@types/react": "^18.2.48"
  },
  "peerDependencies": {
    // ✅ 호스트 앱이 제공해야 하는 것
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

---

## 🎨 CSS 프레임워크 전략

### 1. Tailwind CSS (현재 사용 중)

#### ✅ 권장: 각 프로젝트에 설치 + 설정 공유

**이유:**

- Tailwind는 **빌드 타임 의존성** (각 프로젝트가 독립적으로 빌드)
- pnpm이 자동으로 중복 제거 (실제 디스크 사용량은 1배)
- 각 앱이 독립적으로 버전 관리 가능

**설치 구조:**

```
📦 workspace
├─ packages/theme/         → Tailwind 설정 공유 ✅
│  └─ tailwind.config.js
│
├─ apps/demo/
│  ├─ package.json         → tailwindcss devDep ✅
│  └─ tailwind.config.js   → extends @dbds/theme ✅
│
├─ apps/storybook/
│  ├─ package.json         → tailwindcss devDep ✅
│  └─ tailwind.config.js   → extends @dbds/theme ✅
│
└─ packages/components/
   ├─ package.json         → tailwindcss devDep ✅
   └─ tailwind.config.js   → extends @dbds/theme ✅
```

**설정 예시:**

```javascript
// apps/demo/tailwind.config.js
module.exports = {
  presets: [require('@dbds/theme')],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/components/src/**/*.{ts,tsx}', // 컴포넌트 포함!
  ],
};
```

---

### 2. CSS-in-JS (styled-components, emotion)

#### ✅ 권장: 각 프로젝트에 설치

**이유:**

- **런타임 의존성** (번들에 포함되어야 함)
- 버전 충돌 가능성 높음

```json
// apps/demo/package.json
{
  "dependencies": {
    "styled-components": "^6.0.0" // 런타임 필요
  }
}
```

---

## 📊 의존성 중복 관리

### pnpm의 장점

```
실제 설치:
node_modules/
└─ .pnpm/
   └─ tailwindcss@3.4.0/  ← 단 1번만 저장!

각 프로젝트:
apps/demo/node_modules/tailwindcss       → symlink
apps/storybook/node_modules/tailwindcss  → symlink
packages/components/node_modules/        → symlink
```

**결과:**

- ✅ 디스크 사용량: 1배
- ✅ 설치 속도: 빠름
- ✅ 버전 통일: 자동

---

## 🔍 의존성 중복 확인

```bash
# 중복 패키지 확인
pnpm list --depth 0

# 특정 패키지 버전 확인
pnpm list tailwindcss

# 왜 설치되었는지 확인
pnpm why tailwindcss
```

---

## 🎯 베스트 프랙티스 요약

| 패키지 종류             | 설치 위치       | 예시                         |
| ----------------------- | --------------- | ---------------------------- |
| **개발 도구**           | 🌐 루트         | ESLint, Prettier, TypeScript |
| **빌드 오케스트레이션** | 🌐 루트         | Turborepo, Nx                |
| **테스트 프레임워크**   | 🌐 루트         | Vitest, Jest (공통 사용 시)  |
| **런타임 라이브러리**   | 📱 각 앱/패키지 | React, Vue, Angular          |
| **CSS 프레임워크**      | 📱 각 앱/패키지 | Tailwind (빌드타임)          |
| **CSS-in-JS**           | 📱 각 앱/패키지 | styled-components (런타임)   |
| **번들러**              | 📱 각 앱/패키지 | Vite, Webpack                |
| **유틸리티**            | 📦 필요한 곳    | lodash, date-fns             |

---

## 🚀 마이그레이션 가이드

### Case 1: 루트에 잘못 설치된 경우

```bash
# 1. 루트에서 제거
pnpm remove react -w

# 2. 필요한 앱/패키지에 설치
pnpm add react --filter demo
pnpm add react --filter storybook
```

### Case 2: 버전 통일

```bash
# 모든 패키지의 React 버전을 18.2.0으로 통일
pnpm add react@18.2.0 --filter demo
pnpm add react@18.2.0 --filter storybook
pnpm add react@18.2.0 --filter @dbds/components
```

### Case 3: 공유 설정 패키지 활용

```bash
# @dbds/theme 패키지를 통해 Tailwind 설정 공유
# 각 프로젝트의 tailwind.config.js에서:
module.exports = {
  presets: [require('@dbds/theme')],
  // 프로젝트별 오버라이드
};
```

---

## 💡 현재 프로젝트 상태

### ✅ 잘 되어 있는 부분

- 개발 도구 (ESLint, Prettier)가 루트에 설치됨
- 각 앱이 독립적으로 Tailwind 설치
- `@dbds/theme`으로 설정 공유
- workspace 프로토콜 사용 (`workspace:*`)

### 🔧 개선 가능한 부분

- TypeScript가 중복 설치될 수 있음 (버전 확인 필요)
- React/@types/react 버전 통일 (현재는 괜찮음)

---

## 📚 참고 자료

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Turborepo Handbook](https://turbo.build/repo/docs/handbook)
- [Vercel Monorepo Guide](https://vercel.com/blog/monorepos)
