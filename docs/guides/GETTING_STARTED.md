# Workspace 시작 가이드

> **DBDS (Design Beyond Design System)** 디자인 시스템과 기타 패키지들을 포함하는 모노레포입니다.

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 패키지 빌드

```bash
# 모든 패키지 빌드
pnpm build

# 또는 개별 패키지 빌드
cd packages/tokens && pnpm build
cd packages/components && pnpm build
```

### 3. Storybook 실행

```bash
pnpm storybook
```

브라우저에서 http://localhost:6006 으로 접속하여 컴포넌트를 확인하세요.

## 📦 패키지 구조

```
DBDS/
├── packages/
│   ├── tokens/              # 디자인 토큰
│   │   └── src/
│   │       ├── colors.ts    # 흑백 컬러 시스템
│   │       ├── typography.ts
│   │       ├── spacing.ts
│   │       ├── radius.ts
│   │       └── shadows.ts
│   │
│   ├── theme/               # Tailwind preset
│   │   └── index.js
│   │
│   └── components/          # React 컴포넌트
│       └── src/
│           ├── Button/
│           ├── Input/
│           ├── Card/
│           └── Typography/
│
└── apps/
    └── storybook/           # 문서 및 개발 환경
        └── stories/
```

## 🎨 디자인 토큰

### 컬러 시스템

흑백 기반의 미니멀한 팔레트:

- **Pure**: `black`, `white`
- **Gray Scale**: `gray.50` ~ `gray.950`
- **Semantic**: `primary`, `secondary`, `border`, `background`, `text`

### 타이포그래피

- **Font Family**: System fonts
- **Font Size**: `xs` ~ `6xl`
- **Font Weight**: `light` ~ `extrabold`

### Spacing

일관된 간격 시스템: `0`, `1`(4px) ~ `32`(128px)

## 🧩 컴포넌트

### Button

```tsx
import { Button } from '@dbds/components';

<Button variant="primary" size="md">
  Click Me
</Button>;
```

**Props:**

- `variant`: `primary` | `secondary` | `outline` | `ghost`
- `size`: `sm` | `md` | `lg`
- `fullWidth`: boolean
- `disabled`: boolean

### Input

```tsx
import { Input } from '@dbds/components';

<Input
  label="Username"
  placeholder="Enter username"
  error={false}
  errorMessage="Required field"
/>;
```

**Props:**

- `size`: `sm` | `md` | `lg`
- `error`: boolean
- `errorMessage`: string
- `label`: string
- `fullWidth`: boolean

### Card

```tsx
import { Card } from '@dbds/components';

<Card variant="elevated" padding="md">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>;
```

**Props:**

- `variant`: `default` | `bordered` | `elevated`
- `padding`: `none` | `sm` | `md` | `lg`

### Typography

```tsx
import { Typography } from '@dbds/components';

<Typography variant="h1" color="primary" weight="bold">
  Heading Text
</Typography>;
```

**Props:**

- `as`: `h1` ~ `h6` | `p` | `span`
- `variant`: `h1` ~ `h6` | `body1` | `body2` | `caption`
- `color`: `primary` | `secondary` | `disabled`
- `weight`: `light` | `normal` | `medium` | `semibold` | `bold`
- `align`: `left` | `center` | `right`

## 🔧 다른 프로젝트에서 사용하기

### 방법 1: 로컬 파일 시스템

```json
// package.json
{
  "dependencies": {
    "@dbds/components": "file:../DBDS/packages/components",
    "@dbds/tokens": "file:../DBDS/packages/tokens",
    "@dbds/theme": "file:../DBDS/packages/theme"
  }
}
```

### 방법 2: Private NPM Registry

```bash
# 1. Private Registry 설정
npm config set @dbds:registry http://your-registry.com

# 2. 패키지 발행 (DBDS에서)
cd packages/components
pnpm publish

# 3. 설치 (다른 프로젝트에서)
pnpm add @dbds/components @dbds/theme
```

### 프로젝트 설정

#### 1. Tailwind 설정

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@dbds/theme')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@dbds/components/dist/**/*.js',
  ],
};
```

#### 2. 스타일 import

```tsx
// App.tsx 또는 index.tsx
import '@dbds/components/dist/styles.css';
```

#### 3. 컴포넌트 사용

```tsx
import { Button, Input, Card, Typography } from '@dbds/components';
import { colors, typography } from '@dbds/tokens';

function App() {
  return (
    <Card variant="elevated">
      <Typography variant="h2">Welcome to DBDS</Typography>
      <Input label="Email" placeholder="your@email.com" />
      <Button variant="primary" fullWidth>
        Submit
      </Button>
    </Card>
  );
}
```

## 🛠 개발 워크플로우

### 새 컴포넌트 추가

1. `packages/components/src/` 에 컴포넌트 폴더 생성
2. 컴포넌트 작성 (`ComponentName.tsx`)
3. export 추가 (`index.ts`)
4. 메인 export 추가 (`src/index.ts`)
5. Storybook 스토리 작성 (`apps/storybook/stories/ComponentName.stories.tsx`)
6. 빌드 및 테스트

```bash
cd packages/components
pnpm build
cd ../../
pnpm storybook
```

### 디자인 토큰 수정

1. `packages/tokens/src/` 파일 수정
2. 토큰 빌드

```bash
cd packages/tokens
pnpm build
```

3. 컴포넌트 재빌드

```bash
cd ../components
pnpm build
```

## 📚 추가 자료

- [Tailwind CSS 공식 문서](https://tailwindcss.com)
- [Storybook 공식 문서](https://storybook.js.org)
- [pnpm Workspace](https://pnpm.io/workspaces)

## ❓ 문제 해결

### "Cannot find module '@dbds/...'" 에러

워크스페이스 패키지가 빌드되지 않았을 수 있습니다:

```bash
pnpm build
```

### Tailwind 스타일이 적용되지 않음

1. 스타일 import 확인: `import '@dbds/components/dist/styles.css'`
2. Tailwind config의 content 경로 확인
3. PostCSS 설정 확인

### Storybook이 시작되지 않음

```bash
# 캐시 삭제 후 재시작
rm -rf node_modules/.cache/storybook
pnpm storybook
```

---

Happy Building! 🎨✨
