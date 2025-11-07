# Button Variants

버튼 컴포넌트의 다양한 변형과 사용 예시입니다.

## 📦 Import

```typescript
import { Button } from '@dbds/components';
```

---

## 🎨 Variants (변형)

### 1. Primary

**기본 버튼** - 주요 액션에 사용

```tsx
<Button variant="primary">Primary Button</Button>
```

**특징:**
- 검은색 배경 (#000000)
- 흰색 텍스트
- 호버 시 어두운 회색

**사용 예시:**
- 폼 제출
- 주요 CTA (Call to Action)
- 확인/저장 버튼

---

### 2. Secondary

**보조 버튼** - 부차적인 액션에 사용

```tsx
<Button variant="secondary">Secondary Button</Button>
```

**특징:**
- 밝은 회색 배경
- 검은색 텍스트
- 호버 시 진한 회색

**사용 예시:**
- 폼 리셋
- 보조 액션
- 추가 옵션

---

### 3. Outline

**외곽선 버튼** - 강조가 덜한 액션

```tsx
<Button variant="outline">Outline Button</Button>
```

**특징:**
- 투명 배경
- 회색 테두리
- 검은색 텍스트

**사용 예시:**
- 취소 버튼
- 선택 해제
- 필터/정렬 버튼

---

### 4. Ghost

**고스트 버튼** - 최소한의 스타일

```tsx
<Button variant="ghost">Ghost Button</Button>
```

**특징:**
- 완전히 투명한 배경
- 검은색 텍스트
- 호버 시만 배경 표시

**사용 예시:**
- 메뉴 아이템
- 드롭다운 트리거
- 아이콘 버튼

---

## 📏 Sizes (크기)

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (기본)</Button>
<Button size="lg">Large</Button>
```

---

## 🎛️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | 버튼 변형 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼 크기 |
| `fullWidth` | `boolean` | `false` | 전체 너비 사용 여부 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `children` | `React.ReactNode` | - | 버튼 내용 |

---

## 💡 Examples

### 기본 사용

```tsx
<Button variant="primary">Submit</Button>
```

### 전체 너비

```tsx
<Button variant="primary" fullWidth>
  Full Width Button
</Button>
```

### 비활성화

```tsx
<Button variant="primary" disabled>
  Disabled
</Button>
```

### 조합 예시

```tsx
<div className="flex gap-2">
  <Button variant="outline" onClick={onCancel}>
    Cancel
  </Button>
  <Button variant="primary" onClick={onSubmit}>
    Submit
  </Button>
</div>
```

---

## 🎨 Customization

### Tailwind 클래스 추가

```tsx
<Button 
  variant="primary" 
  className="shadow-lg hover:scale-105 transition-transform"
>
  Custom Button
</Button>
```

### 아이콘과 함께 사용

```tsx
<Button variant="primary">
  <Icon className="mr-2" />
  Button with Icon
</Button>
```

---

## ♿ Accessibility

버튼 컴포넌트는 웹 접근성을 준수합니다:

- ✅ 키보드 포커스 표시
- ✅ `disabled` 상태 처리
- ✅ 적절한 색상 대비
- ✅ 포커스 링 (focus ring)

---

## 📚 Related Components

- [Input](./INPUT.md) - 입력 필드
- [Card](./CARD.md) - 카드 컨테이너
- [Modal](./MODAL.md) - 모달 다이얼로그
