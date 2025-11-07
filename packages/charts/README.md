# ECharts v2 차트 컴포넌트

> **목적:** 기존 차트 라이브러리(Chart.js, Billboard.js, Plotly.js)를 ECharts로 대체  
> **상태:** 🟡 개발 중 (병행 개발, 기존 차트와 공존)  
> **작성일:** 2025-11-04

## 📁 디렉토리 구조

```
charts-v2/
├── EChart.tsx              # 공통 Wrapper
├── templates/              # 차트 타입별 템플릿
│   ├── index.ts
│   ├── lineChart.ts
│   ├── barChart.ts
│   ├── radarChart.ts
│   ├── scatterChart.ts
│   ├── calendarHeatmap.ts
│   ├── ganttChart.ts
│   └── waferGanttChart.ts
└── README.md
```

## 🚀 사용법

### 1. Line Chart (Billboard.js → ECharts)

**Before:**

```typescript
import LineGraph from 'components/graph/LineGraph';

<LineGraph
  columns={[
    ['Target', 10, 20, 30],
    ['Sample1', 15, 25, 35],
  ]}
  min={0}
  yName="Sensor Value"
/>
```

**After:**

```typescript
import { EChart } from 'components/charts-v2/EChart';
import { createLineChartOption } from 'components/charts-v2/templates';

const option = createLineChartOption(
  [
    { name: 'Target', data: [10, 20, 30] },
    { name: 'Sample1', data: [15, 25, 35] },
  ],
  ['Point 1', 'Point 2', 'Point 3'],
  'Sensor Value',
  undefined, // bandData
  'Sensor Value', // yAxisName
  0 // yAxisMin
);

<EChart option={option} height={400} />
```

### 2. Radar Chart (Billboard.js → ECharts)

**Before:**

```typescript
import RadarGraph from 'components/graph/RadarGraph';

<RadarGraph
  width={500}
  height={400}
  columns={[
    ['type', 'MIN', 'MAX', 'AVG', 'STD'],
    ['Upper', 0.5, 0.7, 0.6, 0.4],
    ['Lower', 0.4, 0.6, 0.5, 0.3],
  ]}
/>
```

**After:**

```typescript
import { EChart } from 'components/charts-v2/EChart';
import { createRadarFromColumns } from 'components/charts-v2/templates';

const option = createRadarFromColumns([
  ['type', 'MIN', 'MAX', 'AVG', 'STD'],
  ['Upper', 0.5, 0.7, 0.6, 0.4],
  ['Lower', 0.4, 0.6, 0.5, 0.3],
]);

<EChart option={option} height={400} />
```

### 3. Calendar Heatmap (react-calendar-heatmap → ECharts)

**Before:**

```typescript
import CalendarHeatmap from 'react-calendar-heatmap';

<CalendarHeatmap
  startDate={startDate}
  endDate={endDate}
  values={calendarValues}
  classForValue={(value) => {
    // 색상 로직
  }}
/>
```

**After:**

```typescript
import { EChart } from 'components/charts-v2/EChart';
import { createCalendarHeatmapOption } from 'components/charts-v2/templates';

const option = createCalendarHeatmapOption(
  calendarValues,
  startDate,
  endDate
);

const onEvents = {
  click: (params: any) => {
    const date = params.value[0];
    handleDateClick(date);
  },
};

<EChart option={option} height={400} onEvents={onEvents} />
```

### 4. Airflow Bar Chart (Chart.js → ECharts)

**Before:**

```typescript
import { Bar } from 'react-chartjs-2';

const chartData = {
  labels: data.map(d => d.runId),
  datasets: [{
    label: 'Duration',
    data: data.map(d => d.runDuration),
  }],
};

<Bar data={chartData} options={options} />
```

**After:**

```typescript
import { EChart } from 'components/charts-v2/EChart';
import { createAirflowBarOption } from 'components/charts-v2/templates';

const option = createAirflowBarOption(
  labels,
  values,
  states,
  runTypes,
  selectedIndex,
  statusColors
);

const onEvents = {
  click: (params: any) => {
    const index = params.dataIndex;
    handleBarClick(index);
  },
};

<EChart option={option} height={400} onEvents={onEvents} />
```

### 5. Wafer Gantt Chart (Plotly.js → ECharts) 🔥

**Before:**

```typescript
import Plot from 'react-plotly.js';
import WaferGanttChart from 'components/graph/WaferGanttChart';

<WaferGanttChart
  waferData={waferData}
  pmData={pmData}
  height={600}
  colorMapping={colorMap}
  timeRange={[startDate, endDate]}
  onItemClick={handleWaferClick}
/>
```

**After:**

```typescript
import { EChart } from 'components/charts-v2/EChart';
import { createWaferGanttChartOption } from 'components/charts-v2/templates';

const option = createWaferGanttChartOption(
  waferData,
  pmData,
  [startDate, endDate],
  colorMapping,
  hiddenTypes,
  600
);

const onEvents = {
  click: (params: any) => {
    if (params.data.dataType === 'wafer') {
      handleWaferClick(params.data);
    }
  },
};

<EChart option={option} height={600} onEvents={onEvents} />
```

## 🎨 디자인 시스템 자동 적용

모든 차트에 **DBDS 디자인 토큰**이 자동으로 적용됩니다.

### 차트 전용 컬러 팔레트

```typescript
import { colors } from '@dbds/tokens';

// 상태 컬러
colors.chart.success; // #22c55e (녹색)
colors.chart.error; // #ef4444 (빨간색)
colors.chart.warning; // #f59e0b (주황색)
colors.chart.info; // #3b82f6 (파란색)
colors.chart.running; // #06b6d4 (청록색)

// 데이터 시리즈 컬러 (흑백 중심 + 포인트 컬러)
colors.chart.series; // [#000, #525252, #3b82f6, #737373, #22c55e, ...]

// 특수 상태
colors.chart.defect; // 불량
colors.chart.normal; // 정상
colors.chart.abort; // 중단

// 히트맵 전용
colors.chart.heatmap.success; // 성공만
colors.chart.heatmap.fail; // 실패만
colors.chart.heatmap.mixed; // 혼합
colors.chart.heatmap.none; // 데이터 없음
```

### 자동 적용 예시

```typescript
// 디자인 토큰이 이미 차트 템플릿에 적용되어 있음
const option = createLineChartOption(data, xAxis);
// ✅ 흑백 미니멀 스타일 + 포인트 컬러 자동 적용

// 커스텀 컬러 사용 (필요시)
const option = createGanttChartOption(data, {
  success: colors.chart.success.DEFAULT,
  failed: colors.chart.error.DEFAULT,
  running: colors.chart.running.DEFAULT,
});
```

## 📊 예상 효과

### 번들 크기

```
Before: 4,030KB (6개 라이브러리)
After:    800KB (ECharts 만)
절감:  3,230KB (80% 감소)
```

### 성능

- 초기 로딩: 2-3초 단축
- 차트 렌더링: Canvas 기반 최적화
- 메모리 사용: 50% 감소

### 개발 생산성

- 학습 곡선: 6개 → 1개
- API 일관성: 모든 차트 동일 패턴
- 유지보수: 단일 문서 참조

## ⚠️ 마이그레이션 가이드

### 점진적 전환 전략

1. **병행 개발** (현재)
   - 기존: `components/graph/*`
   - 신규: `components/charts-v2/*`
   - 동시 존재, 서로 영향 없음

2. **선택적 사용**

   ```typescript
   // 새 기능부터 ECharts 사용
   import { EChart } from 'components/charts-v2/EChart';

   // 기존 기능은 그대로
   import LineGraph from 'components/graph/LineGraph';
   ```

3. **검증 완료 후 전환**

   ```typescript
   // 신규 버전 검증 완료 시
   import { EChart } from 'components/charts-v2/EChart';
   // import LineGraph from 'components/graph/LineGraph'; // 삭제
   ```

4. **최종 정리**
   - `components/graph/*` 삭제
   - `charts-v2` → `charts`로 rename
   - 기존 라이브러리 제거

## 🔗 참고 문서

- [차트*마이그레이션*분석.md](../../../차트_마이그레이션_분석.md) - 상세 분석
- [프로젝트*개선*계획.md](../../../프로젝트_개선_계획.md) - #008 항목
- [ECharts 공식 문서](https://echarts.apache.org/en/index.html)

## ✅ 구현 완료 상태

- [x] EChart Wrapper 컴포넌트
- [x] Line Chart 템플릿 (Billboard.js 대체)
- [x] Bar Chart 템플릿 (Chart.js 대체)
- [x] Radar Chart 템플릿 (Billboard.js 대체)
- [x] Calendar Heatmap 템플릿 (react-calendar-heatmap 대체)
- [x] Scatter Chart 템플릿 (D3 대체)
- [x] Gantt Chart 템플릿 (Chart.js 대체)
- [x] Wafer Gantt Chart 템플릿 (Plotly.js 대체)
- [ ] ForceGraph 템플릿 (D3 - 선택적)
- [ ] 각 차트별 Storybook 스토리
- [ ] 단위 테스트

## 🎯 다음 단계

1. **실제 데이터로 테스트**
   - 각 차트를 실제 프로젝트 데이터로 검증
   - 기존 차트와 나란히 비교

2. **피드백 수집**
   - 팀원들과 UI/UX 검토
   - 필요한 기능 추가

3. **점진적 적용**
   - 검증 완료된 차트부터 프로덕션 적용
   - 문제 발생 시 즉시 롤백 가능

4. **완전 전환**
   - 모든 차트 ECharts로 전환
   - 기존 라이브러리 제거
   - 번들 크기 80% 감소 달성!
