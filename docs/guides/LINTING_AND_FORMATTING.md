# Linting & Formatting Guide

모노레포에서 ESLint와 Prettier를 관리하는 방법입니다.

## 📂 설정 파일 구조

### 루트 레벨 (공통 설정)

```
workspace/
├── .eslintrc.json          # ⭐ 공통 ESLint 규칙
├── .prettierrc.json        # ⭐ 공통 Prettier 규칙
├── .eslintignore           # ESLint 무시 파일
├── .prettierignore         # Prettier 무시 파일
└── package.json            # ESLint/Prettier 의존성
```

### 패키지/앱 레벨 (확장 설정)

```
packages/components/
└── .eslintrc.json          # 루트 설정 extends + 커스텀 규칙

apps/demo/
└── .eslintrc.json          # 루트 설정 extends
```

---

## 🎯 설정 철학

### 1. **루트에서 공통 설정**

- 모든 패키지/앱이 공유하는 기본 규칙
- TypeScript, React, Hooks 규칙
- Prettier 통합

### 2. **패키지별 확장**

- 각 패키지의 특성에 맞게 커스터마이징
- `extends: ["../../.eslintrc.json"]`로 상속
- 필요한 규칙만 오버라이드

---

## 📝 루트 ESLint 설정

```json
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier" // Prettier와 충돌 방지
  ],
  "rules": {
    "react/react-in-jsx-scope": "off", // React 18+
    "react/prop-types": "off", // TypeScript 사용
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

---

## 🎨 Prettier 설정

```json
{
  "semi": true, // 세미콜론 사용
  "trailingComma": "es5", // ES5 스타일 쉼표
  "singleQuote": true, // 싱글 쿼트 사용
  "printWidth": 80, // 최대 줄 길이
  "tabWidth": 2, // 탭 너비
  "useTabs": false // 스페이스 사용
}
```

---

## 🚀 사용 방법

### 1. 의존성 설치

```bash
pnpm install
```

### 2. Lint 실행

```bash
# 전체 프로젝트 lint
pnpm lint

# 자동 수정
pnpm lint:fix

# 특정 패키지만
pnpm --filter @dbds/components lint
```

### 3. Format 실행

```bash
# 전체 프로젝트 포맷팅
pnpm format

# 포맷 검사만
pnpm format:check
```

### 4. Type Check

```bash
# 전체 타입 체크
pnpm type-check
```

---

## 📦 패키지별 커스터마이징

### packages/components

```json
{
  "extends": ["../../.eslintrc.json"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ]
  }
}
```

**특징**: 사용하지 않는 변수 경고만 (에러 아님)

---

### packages/charts

```json
{
  "extends": ["../../.eslintrc.json"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

**특징**: ECharts 타입 때문에 `any` 허용

---

### apps/storybook

```json
{
  "extends": ["../../.eslintrc.json"],
  "rules": {
    "react/display-name": "off"
  }
}
```

**특징**: Story 컴포넌트에서 displayName 불필요

---

## 🔧 IDE 통합

### VS Code (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  }
}
```

### 추천 VS Code 확장

- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`

---

## 📋 Ignore 파일

### .eslintignore

```
node_modules
dist
build
.turbo
*.config.js
storybook-static
```

### .prettierignore

```
node_modules
dist
build
pnpm-lock.yaml
*.min.js
storybook-static
```

---

## 🎯 장점

### 1. **일관성**

- 모든 패키지/앱에서 동일한 코드 스타일
- 팀 협업 시 코드 컨벤션 통일

### 2. **효율성**

- 루트에서 한 번만 설정
- 패키지별 필요한 부분만 오버라이드

### 3. **자동화**

- Pre-commit hook 추가 가능 (Husky)
- CI/CD에서 자동 검증

### 4. **유지보수**

- 규칙 변경 시 루트만 수정
- 자동으로 모든 패키지에 적용

---

## 🔄 CI/CD 통합

### GitHub Actions 예시

```yaml
name: Lint & Format

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - name: Install dependencies
        run: pnpm install
      - name: Lint
        run: pnpm lint
      - name: Format check
        run: pnpm format:check
      - name: Type check
        run: pnpm type-check
```

---

## 💡 Best Practices

### 1. **커밋 전 체크**

```bash
pnpm lint:fix && pnpm format
```

### 2. **Pre-commit Hook (Husky + lint-staged)**

```bash
pnpm add -D husky lint-staged
npx husky init
```

`.husky/pre-commit`:

```bash
#!/bin/sh
pnpm lint-staged
```

`package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### 3. **VS Code 설정 공유**

```bash
# .vscode/settings.json을 Git에 포함
# 팀원 모두 동일한 설정 사용
```

---

## 🆕 개별 패키지에 Lint 스크립트 추가 (선택)

각 패키지의 `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix"
  }
}
```

---

## 🚨 문제 해결

### ESLint 에러 무시하기

```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();
```

### 파일 전체 무시

```tsx
/* eslint-disable */
// 이 파일의 모든 ESLint 규칙 무시
```

### Prettier 무시

```tsx
// prettier-ignore
const matrix = [
  [1, 2, 3],
  [4, 5, 6]
];
```

---

## 📊 모노레포 구조

```
루트 설정 (.eslintrc.json, .prettierrc.json)
    ↓ extends
├── packages/components/.eslintrc.json
├── packages/charts/.eslintrc.json
├── apps/demo/.eslintrc.json
└── apps/storybook/.eslintrc.json
```

**장점**:

- ✅ 공통 규칙은 한 곳에서 관리
- ✅ 패키지별 예외 규칙 설정 가능
- ✅ 일관된 코드 품질 유지

---

**DBDS** - 깔끔하고 일관된 코드베이스 🎯
