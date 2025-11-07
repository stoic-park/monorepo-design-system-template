# DBDS 디자인 원칙

> **Design Beyond Design System**  
> 흑백 미니멀리즘을 넘어선 본질적 디자인

---

## 🎯 핵심 철학

**"Less is More, Black is Beautiful"**

복잡함을 제거하고 본질에 집중합니다.  
화려한 색상 대신 흑백으로 명확함을 추구합니다.

---

## 📐 5가지 디자인 원칙

### 1. **Minimal First** (미니멀 우선)

**원칙**: 불필요한 요소는 과감히 제거합니다.

**적용**:

- ❌ 그라데이션, 그림자 남용
- ❌ 과도한 애니메이션
- ❌ 복잡한 패턴
- ✅ 명확한 구조
- ✅ 필수 요소만 표시
- ✅ 여백의 미

**예시**:

```tsx
// ❌ Bad: 과도한 장식
<Button className="shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600
                   transform hover:scale-110 transition-all duration-500">
  버튼
</Button>

// ✅ Good: 본질에 집중
<Button variant="primary">
  버튼
</Button>
```

---

### 2. **Monochrome Excellence** (흑백의 우수성)

**원칙**: 흑백 팔레트로 명확성과 전문성을 표현합니다.

**컬러 사용 규칙**:

- **Primary 컬러**: 검정 (`#000000`)
- **Secondary 컬러**: 회색 스케일 (`gray.50` ~ `gray.950`)
- **Accent 컬러**: 최소한으로만 사용
  - Success: `#22c55e` (녹색)
  - Error: `#ef4444` (빨간색)
  - Warning: `#f59e0b` (주황색)
  - Info: `#3b82f6` (파란색)

**적용**:

```tsx
// 기본 UI: 흑백만 사용
<Card>
  <Typography variant="h2">제목</Typography>
  <Button variant="primary">확인</Button>
</Card>

// 상태 표시: Accent 컬러 허용
<Badge variant="success">완료</Badge>
<Alert variant="error">오류</Alert>
```

---

### 3. **Consistency Over Creativity** (일관성이 창의성보다 중요)

**원칙**: 개별 페이지의 독창성보다 전체 제품의 일관성을 우선합니다.

**적용**:

- 모든 버튼은 4가지 variant만 사용
- 모든 입력 필드는 동일한 높이와 패딩
- 간격은 spacing 토큰만 사용 (4, 8, 12, 16, 24, 32...)
- 글꼴은 typography 토큰만 사용

**예시**:

```tsx
// ❌ Bad: 페이지마다 다른 스타일
<button className="px-3 py-1 bg-blue-600">페이지 A</button>
<button className="px-5 py-3 bg-green-500">페이지 B</button>

// ✅ Good: 일관된 컴포넌트 사용
<Button variant="primary">페이지 A</Button>
<Button variant="primary">페이지 B</Button>
```

---

### 4. **Accessibility Always** (항상 접근성 고려)

**원칙**: 모든 사용자가 사용할 수 있도록 설계합니다.

**필수 요구사항**:

- 키보드로 모든 기능 접근 가능
- 명확한 포커스 표시
- 충분한 색상 대비 (WCAG AA 이상)
- 스크린 리더 지원 (ARIA 속성)

**적용**:

```tsx
// ✅ 포커스 표시
<Button>  // focus:ring-2 focus:ring-black

// ✅ ARIA 속성
<Spinner role="status" aria-label="로딩 중" />

// ✅ 키보드 지원
<Modal closeOnEsc />  // ESC로 닫기

// ✅ 색상 대비
text-gray-900 on white  // 대비 21:1 (AAA)
text-gray-600 on white  // 대비 7:1 (AA)
```

---

### 5. **Performance by Default** (기본적으로 성능 우선)

**원칙**: 성능은 선택이 아닌 필수입니다.

**적용**:

- 불필요한 리렌더링 방지 (`React.memo`)
- 지연 로딩 활용 (큰 컴포넌트)
- 번들 크기 최소화
- Tree-shaking 지원

**측정 기준**:

- 컴포넌트 번들: < 50KB
- 초기 로딩: < 3초
- 인터랙션 응답: < 100ms

---

## 🎨 시각적 위계

### Typography 위계

```
h1: 2.25rem (36px) - 페이지 제목
h2: 1.875rem (30px) - 섹션 제목
h3: 1.5rem (24px) - 서브섹션
h4: 1.25rem (20px) - 카드 제목
body: 1rem (16px) - 본문
small: 0.875rem (14px) - 부가 정보
```

### 간격 위계

```
xs: 4px   - 아주 작은 간격
sm: 8px   - 작은 간격
md: 16px  - 기본 간격
lg: 24px  - 큰 간격
xl: 32px  - 섹션 간격
2xl: 48px - 페이지 섹션
```

### 색상 위계

```
1순위: 검정/흰색 (Primary)
2순위: 회색 스케일 (Secondary)
3순위: Accent 컬러 (상태 표시만)
```

---

## 🚫 금지 사항

### 절대 하지 말 것

1. **임의의 색상 사용**

   ```tsx
   // ❌ Bad
   <div style={{ color: '#FF5733' }}>

   // ✅ Good
   <div className="text-gray-900">
   ```

2. **임의의 간격 사용**

   ```tsx
   // ❌ Bad
   <div className="mt-[17px]">

   // ✅ Good
   <div className="mt-4">  // 16px (spacing token)
   ```

3. **컴포넌트 스타일 오버라이드**

   ```tsx
   // ❌ Bad
   <Button className="!bg-red-500 !px-10">

   // ✅ Good
   <Button variant="primary">
   ```

4. **인라인 스타일 남용**

   ```tsx
   // ❌ Bad
   <div style={{ padding: '15px', margin: '10px' }}>

   // ✅ Good
   <div className="p-4 m-2">
   ```

---

## ✅ 권장 사항

### 1. 컴포넌트 재사용

```tsx
// ❌ Bad: 매번 새로 만들기
<div className="px-4 py-2 bg-black text-white rounded">버튼</div>

// ✅ Good: 디자인 시스템 컴포넌트 사용
<Button variant="primary">버튼</Button>
```

### 2. 디자인 토큰 사용

```tsx
// ❌ Bad
const primaryColor = '#000000';

// ✅ Good
import { colors } from '@dbds/tokens';
const primaryColor = colors.primary.DEFAULT;
```

### 3. 의미론적 네이밍

```tsx
// ❌ Bad
<Badge variant="green">완료</Badge>

// ✅ Good
<Badge variant="success">완료</Badge>
```

---

## 📏 레이아웃 원칙

### Grid 시스템

```
12 Column Grid (Desktop)
6 Column Grid (Tablet)
4 Column Grid (Mobile)
```

### 반응형 Breakpoints

```typescript
sm: '640px'; // Mobile
md: '768px'; // Tablet
lg: '1024px'; // Desktop
xl: '1280px'; // Large Desktop
```

### Container 최대 너비

```
max-w-7xl: 1280px (기본)
max-w-6xl: 1152px (좁은 콘텐츠)
max-w-4xl: 896px (폼, 문서)
```

---

## 🎭 모션 원칙

### 애니메이션 지속 시간

```
instant: 0ms      - 즉시 (상태 변경)
fast: 150ms       - 빠른 (호버, 포커스)
normal: 300ms     - 기본 (모달, 드롭다운)
slow: 500ms       - 느린 (페이지 전환)
```

### Easing Functions

```
ease-out: 사용자 액션 (버튼 클릭)
ease-in-out: 자동 애니메이션 (모달 열기)
linear: 로딩, 프로그레스
```

---

## 💬 마이크로카피 원칙

### 버튼 텍스트

```
✅ 동사로 시작: "저장", "삭제", "추가"
❌ 애매한 표현: "OK", "확인"

✅ 구체적: "파일 업로드"
❌ 모호함: "업로드"
```

### 에러 메시지

```
✅ 해결 방법 제시: "이메일 형식이 올바르지 않습니다. (예: user@example.com)"
❌ 단순 거부: "잘못된 입력"

✅ 친절함: "이름을 입력해주세요"
❌ 명령: "이름 입력"
```

---

## 📊 성공 지표

디자인 시스템이 잘 작동하는지 측정:

1. **컴포넌트 재사용률**: > 80%
2. **디자인 일관성**: > 95%
3. **개발 속도 향상**: > 40%
4. **버그 감소**: > 50%
5. **접근성 준수**: WCAG AA 100%

---

## 🔄 진화하는 시스템

디자인 시스템은 완성이 아닌 **지속적 진화**입니다.

### 분기별 리뷰

- 새로운 컴포넌트 필요성 검토
- 기존 컴포넌트 개선점 수집
- 디자인 토큰 업데이트
- 사용 패턴 분석

### 피드백 수집

- 디자이너 피드백
- 개발자 피드백
- 사용자 테스트 결과
- 접근성 감사

---

**DBDS는 단순한 컴포넌트 라이브러리가 아닌,  
제품 전체의 일관성과 품질을 보장하는 시스템입니다.** 🎯

알겠습니다 주인님!
