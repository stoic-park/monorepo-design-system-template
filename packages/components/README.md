# @design-system/components

흑백 미니멀리즘 기반의 React 컴포넌트 라이브러리

## 설치

```bash
pnpm add @design-system/components
```

## 빠른 시작

```tsx
import { Button, Input, ToastProvider, useToast } from '@design-system/components';
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

## 컴포넌트 (14개)

### 기본 컴포넌트 (11개)
- **Button** - 버튼 (variant: primary, secondary, outline, ghost)
- **Input** - 텍스트 입력
- **Select** - 드롭다운
- **Checkbox** - 체크박스
- **Radio** - 라디오 버튼
- **TextArea** - 여러 줄 입력
- **Typography** - 타이포그래피 (h1~h6, body, small)
- **Badge** - 배지
- **Alert** - 알림
- **Divider** - 구분선
- **Spinner** - 로딩

### 조합 컴포넌트 (3개)
- **Card** - 카드 컨테이너
- **Modal** - 모달 다이얼로그
- **Toast** - 전역 알림 시스템

## 주요 사용 예시

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
import { Input, Select, TextArea, Button, Modal } from '@design-system/components';

function UserForm({ open, onClose, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title="사용자 등록">
      <Modal.Body>
        <div className="space-y-4">
          <Input label="이름" required fullWidth />
          <Input label="이메일" type="email" required fullWidth />
          <Select label="부서" options={departments} required fullWidth />
          <TextArea label="소개" rows={4} fullWidth />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={onClose}>취소</Button>
        <Button variant="primary" onClick={onSave}>저장</Button>
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

## 디자인 원칙

### 1. 흑백 미니멀리즘
- 화려한 색상 없이 흑백 중심
- Accent 컬러는 상태 표시에만 사용 (success, error, warning, info)
- 깔끔하고 전문적인 느낌

### 2. 일관된 간격
```tsx
// Tailwind 간격 시스템 사용
<div className="space-y-4">  {/* 16px */}
<div className="space-y-6">  {/* 24px */}
<div className="space-y-8">  {/* 32px */}
```

### 3. 명확한 계층
```tsx
// 주요 액션은 1개만
<Modal.Footer>
  <Button variant="outline">취소</Button>
  <Button variant="primary">확인</Button>  {/* Primary는 1개 */}
</Modal.Footer>
```

## 버튼 사용 가이드

| Variant | 용도 | 예시 |
|---------|------|------|
| **primary** | 페이지의 주요 액션 (1개만!) | 저장, 제출, 확인 |
| **secondary** | 보조 액션 | 취소, 닫기 |
| **outline** | 추가 옵션 | 더보기, 설정 |
| **ghost** | 최소 강조 | 삭제, 편집 |

## 폼 필드 규칙

```tsx
// 필수 필드는 required prop 사용
<Input label="이름" required />

// 에러 표시
<Input 
  label="이메일" 
  error 
  errorMessage="올바른 이메일을 입력하세요" 
/>

// 풀너비 (모바일 친화적)
<Input label="주소" fullWidth />
```

## 접근성 (a11y)

- WCAG AA 준수
- 키보드 네비게이션 지원
- 스크린 리더 지원
- `aria-label`, `aria-describedby` 자동 설정

## 성능

```
번들 사이즈: ~30KB (gzip)
Tree-shaking: 지원
React.memo: 최적화 완료
```

## TypeScript

모든 컴포넌트는 완전한 타입 지원:

```tsx
import { ButtonProps, InputProps } from '@design-system/components';

// Props 자동 완성
// 컴파일 타임 오류 검출
// 타입 안전성 보장
```

## 테마 커스터마이징

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@design-system/theme')],
  theme: {
    extend: {
      colors: {
        brand: '#your-color',
      },
    },
  },
};
```

## 문서

- **Storybook**: 인터랙티브 컴포넌트 문서 (http://localhost:6006)
- **루트 README**: 전체 모노레포 가이드

---

**흑백의 아름다움, 본질의 디자인**
