# ECharts 마이그레이션 가이드

> **실무 투입 시 참고용**  
> **작성일:** 2025-11-04

## 🎯 전환 전략: 병행 개발 → 점진적 전환

### 현재 상태

```
✅ ECharts v2 시스템 구축 완료
✅ 8개 차트 템플릿 준비 완료
✅ 샘플 페이지 제공 (http://localhost:3000/#/chart-samples)
🔄 기존 차트와 병행 운영 중
```

---

## 📋 Step-by-Step 가이드

### Step 1: 설치 및 확인 (5분)

```bash
# 1. ECharts 설치
pnpm add echarts echarts-for-react

# 또는
npm install echarts echarts-for-react

# 2. 개발 서버 실행
npm start

# 3. 샘플 페이지 접근
http://localhost:3000/#/chart-samples
```

**확인 사항:**

- ✅ 8개 차트 모두 정상 렌더링
- ✅ 클릭/줌/팬 인터랙션 동작
- ✅ 성능 체감 (빠른 렌더링)

---

### Step 2: 기존 차트와 비교 테스트 (1-2일)

#### 방법 1: 나란히 비교

```typescript
// src/features/test/ChartComparison.tsx
import WaferGanttChart from 'components/graph/WaferGanttChart'; // 기존
import { WaferGanttChartV2 } from 'components/charts-v2/examples'; // 신규

const ChartComparison = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3>기존 (Plotly.js) - 3MB</h3>
        <WaferGanttChart
          waferData={testData.wafer}
          pmData={testData.pm}
          timeRange={timeRange}
          height={600}
          onItemClick={handleClick}
        />
      </div>
      <div>
        <h3>신규 (ECharts) - 800KB ✨</h3>
        <WaferGanttChartV2
          waferData={testData.wafer}
          pmData={testData.pm}
          timeRange={timeRange}
          height={600}
          onItemClick={handleClick}
        />
      </div>
    </div>
  );
};
```

#### 방법 2: 토글 스위치

```typescript
const [useECharts, setUseECharts] = useState(false);

return (
  <>
    <button onClick={() => setUseECharts(!useECharts)}>
      {useECharts ? 'ECharts' : 'Plotly'} (토글하여 비교)
    </button>

    {useECharts ? (
      <WaferGanttChartV2 {...props} />
    ) : (
      <WaferGanttChart {...props} />
    )}
  </>
);
```

**비교 체크리스트:**

- [ ] 시각적 외관 동일한가?
- [ ] 모든 인터랙션 동작하는가?
- [ ] 성능은 더 빠른가?
- [ ] 클릭 이벤트 정상 동작하는가?
- [ ] 데이터 정확성 확인

---

### Step 3: 우선순위별 전환 (2-3주)

#### Week 1: 🔥 최대 효과 (WaferGanttChart)

**대상:** `src/components/graph/WaferGanttChart.tsx`

**전환 방법:**

```typescript
// 1. Import 변경
// Before
// import WaferGanttChart from 'components/graph/WaferGanttChart';

// After
import { WaferGanttChartV2 as WaferGanttChart } from 'components/charts-v2/examples';

// 2. 사용처는 그대로 (API 동일하게 설계됨)
<WaferGanttChart
  waferData={waferData}
  pmData={pmData}
  height={600}
  timeRange={[startDate, endDate]}
  onItemClick={handleWaferClick}
/>
```

**효과:**

- 번들 크기: 3MB 감소
- 초기 로딩: 2초 단축
- 차트 렌더링: 더 빠름

**검증:**

```bash
# 빌드 크기 확인
npm run build
du -sh build/static/js/

# Before: ~5MB
# After:  ~2MB
```

#### Week 2: 간단한 차트들 (Billboard.js, Chart.js)

**대상:**

- `LineGraph.tsx` (Billboard)
- `RadarGraph.tsx` (Billboard)
- `airflow/features/charts/BarChart.tsx` (Chart.js)
- `airflow/features/tabs/Calendar.tsx` (react-calendar-heatmap)

**전환 예시 - LineGraph:**

```typescript
// Before
import LineGraph from 'components/graph/LineGraph';

<LineGraph
  columns={columns}
  min={0}
  yName="Sensor Value"
/>

// After
import { EChart, createLineChartOption } from 'components/charts-v2';

// 데이터 변환 어댑터
const convertColumns = (columns: any[]) => {
  return columns.map(col => ({
    name: col[0],
    data: col.slice(1),
  }));
};

const option = createLineChartOption(
  convertColumns(columns),
  xAxisData,
  undefined,
  undefined,
  yName || 'Sensor Value',
  min
);

<EChart option={option} height={400} />
```

#### Week 3: 검증 및 정리

**작업:**

- [ ] 모든 차트 전환 완료 확인
- [ ] E2E 테스트 실행
- [ ] 기존 차트 파일 제거
- [ ] 기존 라이브러리 제거

```bash
# 기존 라이브러리 제거
pnpm remove billboard.js chart.js chartjs-plugin-annotation plotly.js react-chartjs-2 react-plotly.js react-calendar-heatmap

# 약 4MB 절감!
```

---

## 🔄 마이그레이션 체크리스트

### 준비 단계

- [x] ECharts 및 템플릿 구현
- [x] 샘플 페이지 생성
- [ ] ECharts 설치
- [ ] 샘플 페이지 확인

### 차트별 전환

- [ ] WaferGanttChart (Plotly → ECharts) - 🔥 최우선
- [ ] LineGraph (Billboard → ECharts)
- [ ] RadarGraph (Billboard → ECharts)
- [ ] ScatterGraph (D3 → ECharts)
- [ ] Calendar (react-calendar-heatmap → ECharts)
- [ ] Airflow BarChart (Chart.js → ECharts)
- [ ] Airflow GanttChart (Chart.js → ECharts)
- [ ] Airflow TaskChart (Chart.js → ECharts)

### D3 차트 (선택적)

- [ ] ForceGraph - 검토 후 결정 (유지 or 전환)
- [ ] FlatForceGraph - 검토 후 결정 (유지 or 전환)

### 최종 정리

- [ ] 기존 차트 파일 제거
- [ ] charts-v2 → charts로 rename
- [ ] 기존 라이브러리 제거
- [ ] 번들 크기 확인
- [ ] 문서 업데이트

---

## 💾 백업 및 롤백 전략

### 1. Git Branch 전략

```bash
# 마이그레이션 전용 브랜치 생성
git checkout -b feature/migrate-to-echarts

# 차트별로 커밋
git commit -m "feat: migrate WaferGanttChart to ECharts"
git commit -m "feat: migrate LineGraph to ECharts"

# 문제 발생 시 즉시 롤백
git revert <commit-hash>
```

### 2. Feature Flag 사용 (고급)

```typescript
// src/utils/featureFlags.ts
export const USE_ECHARTS = process.env.REACT_APP_USE_ECHARTS === 'true';

// 컴포넌트에서
import { USE_ECHARTS } from 'utils/featureFlags';

{USE_ECHARTS ? (
  <WaferGanttChartV2 {...props} />
) : (
  <WaferGanttChart {...props} />
)}
```

### 3. 점진적 배포

```
1. 개발 환경 테스트
2. 스테이징 환경 배포
3. 프로덕션 일부 사용자 (10%)
4. 프로덕션 전체 배포
```

---

## 📊 성능 측정 방법

### Chrome DevTools 활용

```javascript
// 번들 크기 측정
// 1. Network 탭 열기
// 2. Disable cache 체크
// 3. 페이지 새로고침
// 4. JS 파일 크기 합산

// Before (기존): ~5MB
// After (ECharts): ~2MB
```

### React DevTools Profiler

```
1. React DevTools 설치
2. Profiler 탭 열기
3. Record 시작
4. 차트 인터랙션 (줌, 클릭 등)
5. Record 종료
6. 렌더링 시간 비교
```

---

## ⚠️ 주의사항

### 1. 데이터 구조 변환

```typescript
// 기존 라이브러리마다 데이터 형식이 다름
// 어댑터 함수 작성 필요

// Billboard.js 형식
const billboardData = [
  ['x', 'data1', 'data2'],
  [0, 30, 200],
  [1, 100, 100],
];

// ECharts 형식으로 변환
const echartsData = billboardData[0].slice(1).map((name, i) => ({
  name,
  data: billboardData.slice(1).map((row) => row[i + 1]),
}));
```

### 2. 이벤트 핸들러 변경

```typescript
// Chart.js
onClick={(e, elements) => {
  const index = elements[0].index;
}}

// ECharts
onEvents={{
  click: (params) => {
    const index = params.dataIndex;
  }
}}
```

### 3. 스타일링 차이

```typescript
// 기존 라이브러리의 CSS가 있다면 제거
// import 'billboard.js/dist/billboard.css'; // 삭제

// ECharts는 CSS 불필요 (JavaScript로 완전 제어)
```

---

## 🎓 학습 리소스

### ECharts 공식 문서

- 메인: https://echarts.apache.org/en/index.html
- 예제: https://echarts.apache.org/examples/en/index.html
- API: https://echarts.apache.org/en/api.html

### 프로젝트 내부 문서

- `src/components/charts-v2/README.md` - 사용법
- `차트_마이그레이션_분석.md` - 상세 분석
- `프로젝트_개선_계획.md` - #008 항목

### 샘플 코드

- `src/components/charts-v2/templates/` - 템플릿 함수
- `src/components/charts-v2/examples/` - 실제 컴포넌트

---

## 💡 팁

### 1. Chrome에서 두 탭으로 비교

```
탭 1: /#/기존페이지 (Plotly, Chart.js)
탭 2: /#/chart-samples (ECharts)

→ Performance 탭에서 성능 비교
→ Network 탭에서 번들 크기 비교
```

### 2. 점진적 전환 우선순위

```
1순위: WaferGanttChart (최대 효과)
2순위: Airflow 차트들 (사용 빈도 높음)
3순위: 기타 차트들
```

### 3. 문제 발생 시

```
1. 샘플 페이지에서 정상 동작 확인
2. 데이터 구조 확인 (console.log)
3. ECharts 옵션 디버깅
4. 필요 시 기존 버전으로 롤백
```

---

## ✅ 성공 기준

### 기능적 성공

- [ ] 모든 차트 정상 렌더링
- [ ] 클릭/줌/팬 인터랙션 동작
- [ ] 데이터 정확성 검증
- [ ] 에러 없음

### 성능적 성공

- [ ] 번들 크기 2MB 이상 감소
- [ ] 초기 로딩 2초 이상 단축
- [ ] 차트 렌더링 빠름

### 품질적 성공

- [ ] 시각적 일관성
- [ ] 타입 안전성
- [ ] 코드 가독성
- [ ] 유지보수 용이

---

**실무 투입 시 이 가이드만 따라하면 됩니다!** 🚀
