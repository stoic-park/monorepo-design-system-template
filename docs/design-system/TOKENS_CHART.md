# 차트 디자인 토큰 가이드

> DBDS 디자인 시스템의 차트 전용 컬러 팔레트

## 📊 컨셉

**"Minimal Black & White + Strategic Accent Colors"**

- 기본은 흑백(grayscale) 중심
- 상태 표시와 데이터 구분을 위한 포인트 컬러 추가
- 너무 화려하지 않으면서도 가독성 확보

## 🎨 컬러 팔레트

### 1. 상태 컬러 (Status Colors)

```typescript
// 성공 상태
colors.chart.success.DEFAULT; // #22c55e
colors.chart.success.light; // #86efac
colors.chart.success.dark; // #16a34a

// 에러 상태
colors.chart.error.DEFAULT; // #ef4444
colors.chart.error.light; // #fca5a5
colors.chart.error.dark; // #dc2626

// 경고 상태
colors.chart.warning.DEFAULT; // #f59e0b
colors.chart.warning.light; // #fcd34d
colors.chart.warning.dark; // #d97706

// 정보 상태
colors.chart.info.DEFAULT; // #3b82f6
colors.chart.info.light; // #93c5fd
colors.chart.info.dark; // #2563eb

// 실행 중 상태
colors.chart.running.DEFAULT; // #06b6d4
colors.chart.running.light; // #67e8f9
colors.chart.running.dark; // #0891b2
```

### 2. 데이터 시리즈 컬러

**차트에 여러 데이터를 표시할 때 자동으로 순서대로 적용됩니다.**

```typescript
colors.chart.series = [
  '#000000', // 1. Pure black
  '#525252', // 2. Dark gray
  '#3b82f6', // 3. Blue accent (첫 포인트 컬러)
  '#737373', // 4. Medium gray
  '#22c55e', // 5. Green accent
  '#a3a3a3', // 6. Light gray
  '#f59e0b', // 7. Amber accent
  '#262626', // 8. Very dark gray
  '#ef4444', // 9. Red accent
  '#d4d4d4', // 10. Very light gray
];
```

**사용 예시:**

- Line Chart에 3개 라인 → 1번(검정), 2번(진회색), 3번(파랑) 자동 할당
- Bar Chart에 5개 바 → 순서대로 자동 할당

### 3. 제조/공정 특화 컬러

```typescript
colors.chart.defect; // #ef4444 (불량품)
colors.chart.normal; // #22c55e (정상)
colors.chart.abort; // #f59e0b (중단)
colors.chart.idle; // #d4d4d4 (대기)
```

### 4. 히트맵 전용 컬러

```typescript
colors.chart.heatmap.none; // #e5e5e5 (데이터 없음)
colors.chart.heatmap.success; // #22c55e (성공만)
colors.chart.heatmap.fail; // #ef4444 (실패만)
colors.chart.heatmap.mixed; // #f59e0b (성공+실패 혼합)
```

### 5. 배경 컬러

```typescript
colors.chart.background.band; // #f5f5f5 (Area 밴드)
colors.chart.background.grid; // #fafafa (Grid 배경)
colors.chart.background.highlight; // #e5e5e5 (하이라이트 영역)
```

## 💡 사용 방법

### 자동 적용 (권장)

대부분의 경우 디자인 토큰이 이미 적용되어 있습니다:

```typescript
import { createLineChartOption } from '@dbds/charts';

// ✅ 자동으로 chart.series 컬러가 적용됨
const option = createLineChartOption(
  [
    { name: 'Sales', data: [10, 20, 30] }, // → #000000 (검정)
    { name: 'Revenue', data: [15, 25, 35] }, // → #525252 (진회색)
    { name: 'Profit', data: [8, 18, 28] }, // → #3b82f6 (파랑)
  ],
  ['Jan', 'Feb', 'Mar']
);
```

### 수동 지정

특정 상태를 표시할 때:

```typescript
import { colors } from '@dbds/tokens';
import { createGanttChartOption } from '@dbds/charts';

const option = createGanttChartOption(ganttData, {
  success: colors.chart.success.DEFAULT, // 녹색
  failed: colors.chart.error.DEFAULT, // 빨간색
  running: colors.chart.running.DEFAULT, // 청록색
});
```

### Calendar Heatmap

```typescript
// ✅ 이미 heatmap 컬러가 자동 적용됨
const option = createCalendarHeatmapOption(calendarValues, start, end);

// 컬러 의미:
// - 데이터 없음 → 연한 회색
// - 성공만 → 녹색
// - 실패만 → 빨간색
// - 혼합 → 주황색
```

## 🎯 마이그레이션

기존 하드코딩된 컬러를 디자인 토큰으로 교체:

**Before:**

```typescript
const colorMap = {
  success: '#4CAF50', // ❌ 하드코딩
  failed: '#F44336',
  running: '#2196F3',
};
```

**After:**

```typescript
import { colors } from '@dbds/tokens';

const colorMap = {
  success: colors.chart.success.DEFAULT, // ✅ 디자인 토큰
  failed: colors.chart.error.DEFAULT,
  running: colors.chart.running.DEFAULT,
};
```

## 📏 디자인 원칙

1. **흑백 우선**: 첫 번째, 두 번째 데이터는 흑백으로
2. **포인트 컬러**: 세 번째부터 accent 컬러로 구분
3. **상태는 명확하게**: success(녹색), error(빨간색), warning(주황색)
4. **일관성**: 프로젝트 전체에서 동일한 컬러 사용

## 🔄 확장

새로운 컬러가 필요하면 `packages/tokens/src/colors.ts`에 추가:

```typescript
export const colors = {
  // ...
  chart: {
    // ...
    custom: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
};
```

---

**작성일**: 2025-11-05  
**버전**: 1.0.0
