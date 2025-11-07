# @design-system/components

> Design System React Components  
> 흑백 미니멀리즘 기반의 완전한 디자인 시스템

---

## 설치

```bash
pnpm add @design-system/components
# 또는
npm install @design-system/components
```

---

## 빠른 시작

```tsx
import {
  Button,
  Input,
  ToastProvider,
  useToast,
} from '@design-system/components';
import '@design-system/components/dist/styles.css';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

function YourApp() {
  const toast = useToast();

  return (
    <div className="p-8 space-y-4">
      <Input label="이름" placeholder="이름을 입력하세요" />
      <Button variant="primary" onClick={() => toast.success('저장 완료')}>
        저장
      </Button>
    </div>
  );
}
```

---

## 컴포넌트 (총 14개)

### Atoms (기본 컴포넌트 - 11개)

| 컴포넌트       | 설명         | 주요 Props                   |
| -------------- | ------------ | ---------------------------- |
| **Button**     | 버튼         | variant, size, fullWidth     |
| **Input**      | 텍스트 입력  | label, error, errorMessage   |
| **Select**     | 드롭다운     | options, label, error        |
| **Checkbox**   | 체크박스     | label, description, error    |
| **Radio**      | 라디오 버튼  | label, description, error    |
| **TextArea**   | 여러 줄 입력 | label, rows, resize          |
| **Typography** | 타이포그래피 | variant (h1~h6, body, small) |
| **Badge**      | 배지         | variant, size                |
| **Alert**      | 알림         | variant, title, closable     |
| **Divider**    | 구분선       | orientation, label           |
| **Spinner**    | 로딩         | size, variant                |

### Molecules (조합 컴포넌트 - 1개)

| 컴포넌트 | 설명          |
| -------- | ------------- |
| **Card** | 카드 컨테이너 |

### Organisms (복잡한 컴포넌트 - 2개)

| 컴포넌트  | 설명             |
| --------- | ---------------- |
| **Modal** | 모달 다이얼로그  |
| **Toast** | 전역 알림 시스템 |

---

## 문서

### 핵심 문서

- **[Design Principles](./DESIGN_PRINCIPLES.md)** - 디자인 철학 및 원칙
- **[Guidelines](./GUIDELINES.md)** - 사용 가이드라인
- **[Patterns](./PATTERNS.md)** - 재사용 가능한 UI 패턴
- **[Storybook](http://localhost:6006)** - 인터랙티브 컴포넌트 문서

### 빠른 링크

```
컴포넌트 API → Storybook
디자인 원칙 → DESIGN_PRINCIPLES.md
사용 방법 → GUIDELINES.md
실전 예제 → PATTERNS.md
```

---

## 디자인 시스템 구성

```
@design-system/components
├── Principles (원칙)
│   └── Less is More, Monochrome Excellence
├── Tokens (토큰)
│   ├── Colors (흑백 + Accent)
│   ├── Typography (폰트 시스템)
│   ├── Spacing (간격)
│   └── Shadows (그림자)
├── Components (컴포넌트)
│   ├── Atoms (11개)
│   ├── Molecules (1개)
│   └── Organisms (2개)
├── Guidelines (가이드라인)
│   ├── 컴포넌트 사용법
│   ├── 레이아웃 규칙
│   └── 색상/타이포그래피
└── Patterns (패턴)
    ├── 인증 (로그인, 회원가입)
    ├── 폼 (CRUD, 검색, 필터링)
    └── 피드백 (성공, 실패, 로딩)
```

---

## 주요 특징

### 1. 흑백 미니멀리즘

- 화려한 색상 없이 흑백 중심
- Accent 컬러는 상태 표시에만 사용
- 깔끔하고 전문적인 느낌

### 2. 완전한 타입 지원

- 모든 컴포넌트 TypeScript 완전 지원
- Props 자동 완성
- 컴파일 타임 오류 검출

### 3. 접근성 (a11y)

- WCAG AA 준수
- 키보드 네비게이션
- 스크린 리더 지원

### 4. 성능 최적화

- Tree-shaking 지원
- 작은 번들 사이즈 (~30KB)
- React.memo 최적화

---

## 사용 예시

### 로그인 폼

```tsx
import { Input, Button, Checkbox, Divider } from '@design-system/components';

function LoginForm() {
  return (
    <form className="max-w-md mx-auto space-y-4">
      <Input label="이메일" type="email" required fullWidth />
      <Input label="비밀번호" type="password" required fullWidth />
      <Checkbox label="로그인 상태 유지" />
      <Button variant="primary" type="submit" fullWidth>
        로그인
      </Button>
      <Divider label="또는" />
      <Button variant="outline" fullWidth>
        소셜 로그인
      </Button>
    </form>
  );
}
```

### CRUD 폼

```tsx
import {
  Input,
  Select,
  TextArea,
  Radio,
  Button,
  Modal,
} from '@design-system/components';

function UserForm({ open, onClose, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title="사용자 등록">
      <Modal.Body>
        <div className="space-y-4">
          <Input label="이름" required fullWidth />
          <Input label="이메일" type="email" required fullWidth />
          <Select label="부서" options={departments} required fullWidth />
          <TextArea label="소개" rows={4} fullWidth />

          <div>
            <label className="text-sm font-medium block mb-2">사용 여부</label>
            <div className="flex gap-4">
              <Radio name="useYn" value="Y" label="Y" defaultChecked />
              <Radio name="useYn" value="N" label="N" />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button variant="primary" onClick={onSave}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
```

### Toast 알림

```tsx
import { useToast, Button } from '@design-system/components';

function MyComponent() {
  const toast = useToast();

  const handleSave = async () => {
    try {
      await save();
      toast.success('저장되었습니다');
    } catch (error) {
      toast.error('저장에 실패했습니다');
    }
  };

  return <Button onClick={handleSave}>저장</Button>;
}
```

---

## 디자인 토큰

### 색상

```typescript
import { colors } from '@design-system/tokens';

// 기본 흑백
colors.black; // #000000
colors.white; // #FFFFFF
colors.gray[500]; // #737373

// Accent (상태 표시용)
colors.chart.success.DEFAULT; // #22c55e
colors.chart.error.DEFAULT; // #ef4444
colors.chart.warning.DEFAULT; // #f59e0b
colors.chart.info.DEFAULT; // #3b82f6
```

### 타이포그래피

```typescript
import { typography } from '@design-system/tokens';

typography.fontSize.sm; // 0.875rem (14px)
typography.fontSize.base; // 1rem (16px)
typography.fontSize.lg; // 1.125rem (18px)
```

### 간격

```typescript
import { spacing } from '@design-system/tokens';

spacing[4]; // 16px
spacing[6]; // 24px
spacing[8]; // 32px
```

---

## 고급 사용법

### 테마 커스터마이징

```typescript
// tailwind.config.js
module.exports = {
  presets: [require('@design-system/theme')],
  theme: {
    extend: {
      colors: {
        // 프로젝트 특화 컬러 추가
        brand: {
          primary: '#your-color',
        },
      },
    },
  },
};
```

### 컴포넌트 확장

```tsx
// 커스텀 버튼
import { Button, ButtonProps } from '@design-system/components';

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
    </Button>
  );
};
```

---

## 번들 사이즈

```
@design-system/components: ~30KB (gzip)
@design-system/tokens: ~5KB (gzip)
Total: ~35KB (gzip)
```

Tree-shaking 지원으로 실제 사용하는 컴포넌트만 번들에 포함됩니다.

---

## 기여하기

새로운 컴포넌트가 필요하거나 개선사항이 있다면:

1. 이슈 작성
2. 디자인 원칙 검토
3. PR 제출
4. Storybook 스토리 작성 필수

---

## 라이센스

MIT

---

**Design System - Design Beyond Design System**  
**흑백의 아름다움, 본질의 디자인**
