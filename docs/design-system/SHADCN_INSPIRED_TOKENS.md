# shadcn/ui 영감을 받은 디자인 토큰

> **참고**: [shadcn/ui Dashboard](https://ui.shadcn.com/examples/dashboard)  
> **목적**: DBDS를 더 세련되게 업그레이드  
> **철학**: 흑백 미니멀리즘 + shadcn/ui 세련미

---

## 🎨 shadcn/ui 디자인 분석

### 핵심 특징

1. **Slate 계열** 🎨
   - 순수 흑백이 아닌 중립적인 Slate
   - `#0F172A` (Slate-900) vs `#000000` (Pure Black)
   - 눈에 부드러움

2. **Subtle 보더** 📏
   - `#E2E8F0` (Slate-200)
   - 강하지 않지만 명확함

3. **미묘한 그림자** 🌫️
   - `shadow-sm`: 0.05 opacity
   - 카드에 입체감
   - 과하지 않음

4. **부드러운 반경** ⭕
   - 기본 8px (DBDS는 6px)
   - 카드 12px
   - 더 모던한 느낌

---

## 📊 색상 비교

### Background

| 용도      | DBDS 기존 | shadcn/ui | 차이        |
| --------- | --------- | --------- | ----------- |
| 메인 배경 | `#FFFFFF` | `#FFFFFF` | 동일        |
| 카드 배경 | `#FFFFFF` | `#FAFAFA` | 미묘한 차이 |
| 섹션 배경 | `#F5F5F5` | `#F8FAFC` | Slate 계열  |

### Text

| 용도          | DBDS 기존 | shadcn/ui | 차이      |
| ------------- | --------- | --------- | --------- |
| 주요 텍스트   | `#000000` | `#0F172A` | Slate-900 |
| 보조 텍스트   | `#525252` | `#64748B` | Slate-500 |
| 비활성 텍스트 | `#A3A3A3` | `#94A3B8` | Slate-400 |

### Border

| 용도        | DBDS 기존 | shadcn/ui | 차이      |
| ----------- | --------- | --------- | --------- |
| 기본 보더   | `#E5E5E5` | `#E2E8F0` | Slate-200 |
| 미묘한 보더 | `#F5F5F5` | `#F1F5F9` | Slate-100 |

---

## 🎯 적용 방안

### Option 1: 완전 전환 (권장) ⭐⭐⭐⭐⭐

**현재 DBDS → shadcn/ui 스타일**

```typescript
// colors.ts 교체
export const colors = {
  background: {
    DEFAULT: '#FFFFFF',
    subtle: '#FAFAFA', // 새로 추가
    muted: '#F8FAFC', // Slate 계열
  },
  foreground: {
    DEFAULT: '#0F172A', // Slate-900
    muted: '#64748B', // Slate-500
  },
  border: {
    DEFAULT: '#E2E8F0', // Slate-200
  },
  // ...
};
```

**효과**:

- ✅ 더 세련된 느낌
- ✅ 눈의 피로도 감소
- ✅ 모던한 대시보드
- ✅ 실전 적합성 향상

**리스크**:

- 기존 컴포넌트 일부 재조정 필요
- 완전히 다른 느낌

---

### Option 2: 점진적 적용 (안전)

**1단계**: 새로운 토큰 파일 추가

```
packages/tokens/src/
├── colors.ts              (기존 흑백)
├── colors-shadcn.ts       (새로운 Slate)
└── index.ts               (둘 다 export)
```

**2단계**: 컴포넌트별로 선택적 적용

```tsx
// 대시보드 → shadcn 스타일
import { colorsShadcn } from '@dbds/tokens';

// 기존 앱 → 흑백 유지
import { colors } from '@dbds/tokens';
```

**3단계**: 피드백 수집 후 결정

---

### Option 3: 하이브리드 (절충안)

**핵심만 변경**:

```typescript
// 기존 DBDS 유지
primary: '#000000',

// shadcn/ui 요소만 추가
border: '#E2E8F0',         // Slate-200 (더 부드럽게)
shadow: 'shadow-sm',       // 미묘한 그림자
radius: '0.5rem',          // 8px (더 둥글게)
```

---

## 🎨 시각적 비교

### DBDS 기존 (Pure 흑백)

```
┌─────────────────────────┐
│ ■ Title                 │  ← #000000 (강한 대비)
│ ─────────────────────   │  ← #E5E5E5 (보더)
│                         │
│ Content here            │  ← #525252 (회색 텍스트)
│                         │
└─────────────────────────┘  ← shadow: none (flat)
```

**느낌**: 명확, 강함, 미니멀

---

### shadcn/ui (Slate 계열)

```
┌─────────────────────────┐
│ ■ Title                 │  ← #0F172A (부드러운 대비)
│ ─────────────────────   │  ← #E2E8F0 (미묘한 보더)
│                         │
│ Content here            │  ← #64748B (Slate 텍스트)
│                         │
└─────────────────────────┘  ← shadow-sm (입체감)
    ╰ subtle shadow
```

**느낌**: 세련됨, 부드러움, 모던

---

## 📐 구체적 변경 사항

### 1. 색상

#### Before (DBDS)

```typescript
primary: '#000000',         // Pure black
text: '#000000',            // Pure black
border: '#E5E5E5',          // Neutral gray
```

#### After (shadcn/ui inspired)

```typescript
primary: '#0F172A',         // Slate-900
text: '#0F172A',            // Slate-900
border: '#E2E8F0',          // Slate-200
```

---

### 2. 그림자

#### Before (DBDS)

```typescript
shadow: 'none',             // Flat 디자인
```

#### After (shadcn/ui inspired)

```typescript
shadow: {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
}
```

---

### 3. 반경

#### Before (DBDS)

```typescript
radius: {
  DEFAULT: '0.375rem',      // 6px
  md: '0.5rem',             // 8px
}
```

#### After (shadcn/ui inspired)

```typescript
radius: {
  DEFAULT: '0.5rem',        // 8px (기본값 상향)
  lg: '0.75rem',            // 12px (카드)
}
```

---

## 🚀 적용 시간

### Option 1: 완전 전환

- **시간**: 4-6시간
- **작업**:
  1. `colors.ts` 전체 교체
  2. 컴포넌트 스타일 재조정
  3. Storybook 확인
  4. 피드백 반영

### Option 2: 점진적 적용

- **시간**: 2-3시간
- **작업**:
  1. `colors-shadcn.ts` 추가
  2. 새 컴포넌트에만 적용
  3. 점진적으로 확대

### Option 3: 하이브리드

- **시간**: 1-2시간
- **작업**:
  1. 핵심만 변경 (border, shadow)
  2. 텍스트 컬러는 유지
  3. 빠른 개선

---

## 💡 추천

### **Option 1: 완전 전환** ⭐⭐⭐⭐⭐

**이유**:

1. shadcn/ui는 검증된 디자인
2. 실제 대시보드에 더 적합
3. 모던하고 세련됨
4. 업계 표준에 가까움

**단, 조건**:

- ✅ 디자이너 검토 필수
- ✅ 기존 앱 영향도 확인
- ✅ 팀 동의 필요

---

## 📊 예상 효과

### Before (DBDS 흑백)

- 명확함: ⭐⭐⭐⭐⭐
- 세련됨: ⭐⭐⭐
- 모던함: ⭐⭐⭐
- 실용성: ⭐⭐⭐⭐

### After (shadcn/ui inspired)

- 명확함: ⭐⭐⭐⭐⭐
- 세련됨: ⭐⭐⭐⭐⭐ (+2)
- 모던함: ⭐⭐⭐⭐⭐ (+2)
- 실용성: ⭐⭐⭐⭐⭐ (+1)

---

## 🎯 다음 단계

1. **팀 논의** - shadcn/ui 스타일 적용 여부
2. **토큰 적용** - `colors-shadcn.ts` 활성화
3. **컴포넌트 조정** - 새로운 토큰 반영
4. **검증** - Storybook에서 확인

---

**참고 링크**:

- [shadcn/ui Dashboard](https://ui.shadcn.com/examples/dashboard)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

알겠습니다 주인님! 🎨
