import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EChart, AirflowBarChartV2, WaferGanttChartV2 } from '@dbds/charts';
import {
  createLineChartOption,
  createBarChartOption,
  createRadarChartOption,
  createCalendarHeatmapOption,
  createScatterChartOption,
  createGanttChartOption,
} from '@dbds/charts';
import { subDays, eachDayOfInterval, format } from 'date-fns';

/**
 * ECharts 기반 통합 차트 컴포넌트
 *
 * - 모든 차트 라이브러리를 ECharts로 통합
 * - DBDS 디자인 시스템 자동 적용 (흑백 미니멀 스타일)
 * - 번들 크기 80% 감소
 */
const meta = {
  title: 'Charts/EChart',
  component: EChart,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof EChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Line Chart 예시
export const LineChart: Story = {
  args: {
    option: createLineChartOption(
      [
        { name: 'Sales', data: [120, 200, 150, 80, 70, 110, 130] },
        { name: 'Revenue', data: [80, 150, 130, 90, 100, 140, 160] },
        { name: 'Profit', data: [60, 100, 90, 70, 80, 100, 110] },
      ],
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      'Weekly Performance',
      undefined,
      'Amount ($)'
    ),
    height: 400,
    width: '100%',
  },
  parameters: {
    docs: {
      description: {
        story:
          '시계열 데이터 시각화를 위한 라인 차트입니다. DBDS 흑백 컬러 시스템이 자동 적용됩니다.',
      },
    },
  },
};

// Line Chart with Area
export const AreaChart: Story = {
  args: {
    option: createLineChartOption(
      [
        {
          name: 'Target',
          data: [100, 120, 140, 160, 180, 200, 220],
          areaStyle: true,
        },
        {
          name: 'Actual',
          data: [90, 110, 135, 155, 175, 190, 210],
          areaStyle: true,
        },
      ],
      ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
      'Target vs Actual',
      undefined,
      'Value'
    ),
    height: 400,
    width: '100%',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Area 스타일이 적용된 라인 차트입니다. 영역을 채워 추세를 더 명확하게 표시합니다.',
      },
    },
  },
};

// Bar Chart 예시
export const BarChart: Story = {
  args: {
    option: createBarChartOption(
      [
        { name: 'Product A', data: [120, 200, 150, 80, 70, 110] },
        { name: 'Product B', data: [80, 150, 130, 90, 100, 140] },
        { name: 'Product C', data: [60, 100, 90, 70, 80, 100] },
      ],
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      'Monthly Sales by Product'
    ),
    height: 400,
    width: '100%',
  },
  parameters: {
    docs: {
      description: {
        story:
          '카테고리별 비교를 위한 바 차트입니다. 미니멀한 회색조로 표현됩니다.',
      },
    },
  },
};

// Stacked Bar Chart 예시
export const StackedBarChart: Story = {
  args: {
    option: createBarChartOption(
      [
        { name: 'Direct', data: [320, 302, 301, 334, 390, 330] },
        { name: 'Email', data: [120, 132, 101, 134, 90, 230] },
        { name: 'Union Ads', data: [220, 182, 191, 234, 290, 330] },
      ],
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      'Traffic Sources',
      false,
      true // stacked
    ),
    height: 400,
    width: '100%',
  },
  parameters: {
    docs: {
      description: {
        story: '누적 바 차트로 전체 대비 각 항목의 비율을 시각화합니다.',
      },
    },
  },
};

// Radar Chart 예시
export const RadarChart: Story = {
  args: {
    option: createRadarChartOption(
      ['Sales', 'Marketing', 'Development', 'Support', 'R&D', 'Admin'],
      [
        {
          name: 'Product A',
          value: [4300, 10000, 28000, 35000, 50000, 19000],
        },
        {
          name: 'Product B',
          value: [5000, 14000, 28000, 31000, 42000, 21000],
        },
      ],
      60000
    ),
    height: 400,
    width: '100%',
  },
  parameters: {
    docs: {
      description: {
        story: '다차원 데이터 비교를 위한 레이더 차트입니다.',
      },
    },
  },
};

// 인터랙션 예시
export const WithInteraction: Story = {
  args: {
    option: createLineChartOption(
      [
        { name: 'Series 1', data: [10, 20, 30, 40, 50, 60, 70] },
        { name: 'Series 2', data: [20, 30, 40, 50, 60, 70, 80] },
      ],
      ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      'Interactive Chart'
    ),
    height: 400,
    width: '100%',
    onEvents: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      click: (params: any) => {
        alert(`Clicked: ${params.name} - ${params.value}`);
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 이벤트가 추가된 차트입니다. 데이터 포인트를 클릭해보세요.',
      },
    },
  },
};

// 로딩 상태
export const LoadingState: Story = {
  args: {
    option: createLineChartOption(
      [{ name: 'Data', data: [10, 20, 30, 40, 50] }],
      ['A', 'B', 'C', 'D', 'E']
    ),
    height: 400,
    width: '100%',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: '데이터 로딩 중일 때의 상태입니다.',
      },
    },
  },
};

// 📊 특수 차트: Airflow Bar Chart
export const AirflowBarChart: StoryObj = {
  render: () => {
    const airflowData = Array.from({ length: 10 }, (_, i) => ({
      label: `Run ${i + 1}`,
      runId: `run_${i + 1}`,
      runDuration: Math.floor(Math.random() * 3600),
      state: ['success', 'failed', 'running'][Math.floor(Math.random() * 3)],
      runType: i < 5 ? 'scheduled' : 'manual',
    }));

    return (
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <AirflowBarChartV2
          data={airflowData}
          height={400}
          selectedIndex={2}
          onBarClick={(index, runId) => {
            alert(`Clicked: ${runId} (Index: ${index})`);
          }}
          statusColors={{
            success: '#22c55e',
            failed: '#ef4444',
            running: '#06b6d4',
          }}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Airflow DAG Run Duration을 시각화하는 특수 바 차트입니다. Chart.js 대체용입니다.',
      },
    },
  },
};

// 📊 특수 차트: Wafer Gantt Chart
export const WaferGanttChart: StoryObj = {
  render: () => {
    const now = new Date();

    const waferData = Array.from({ length: 20 }, (_, i) => {
      const start = new Date(now.getTime() - (20 - i) * 600000);
      const end = new Date(start.getTime() + Math.random() * 300000);
      return {
        pmSno: 1,
        fileSno: i + 1,
        startTime: start,
        endTime: end,
        isDefect: Math.random() > 0.8,
        recipe: ['RUN', 'AGING', 'N/I'][Math.floor(Math.random() * 3)],
        type: ['RUN', 'AGING', 'N/I'][Math.floor(Math.random() * 3)],
        lot: `LOT${i + 1}`,
        waferNo: `W${i + 1}`,
        isAbort: Math.random() > 0.9,
        value: Math.random() * 100,
        layer: 1,
        percent: Math.random() * 100,
      };
    });

    const pmData = Array.from({ length: 3 }, (_, i) => {
      const start = new Date(now.getTime() - (3 - i) * 7200000);
      const end = new Date(start.getTime() + 3600000);
      return {
        startTime: start,
        endTime: end,
        pmSno: i + 1,
        result: i % 2 === 0 ? 'C' : 'E',
      };
    });

    return (
      <div style={{ width: '100%', maxWidth: '1400px' }}>
        <WaferGanttChartV2
          waferData={waferData}
          pmData={pmData}
          height={600}
          timeRange={[
            new Date(waferData[0]?.startTime || Date.now()),
            new Date(waferData[waferData.length - 1]?.endTime || Date.now()),
          ]}
          onItemClick={(wafer) => {
            alert(`Selected Wafer: ${wafer.waferNo} (Lot: ${wafer.lot})`);
          }}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '반도체 제조 공정의 Wafer 생산 타임라인을 시각화하는 특수 Gantt 차트입니다. Plotly.js 대체용으로 번들 크기를 3MB에서 800KB로 감소시켰습니다.',
      },
    },
  },
};

// 📊 차트 갤러리 - 모든 차트 한번에 보기
export const ChartGallery: Story = {
  args: { option: {}, height: 400, width: '100%' },
  render: () => {
    // 샘플 데이터 생성
    const today = new Date();
    const startDate = subDays(today, 90);
    const dateRange = eachDayOfInterval({ start: startDate, end: today });
    const calendarValues = dateRange.map((date) => ({
      date: format(date, 'yyyy-MM-dd'),
      success: Math.floor(Math.random() * 10),
      fail: Math.floor(Math.random() * 3),
    }));

    const scatterData = Array.from({ length: 50 }, (_, i) => ({
      value: Math.random() * 10,
      target: i % 10 === 0,
      category: ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D'][i % 4],
      index: i,
    }));

    const now = new Date();
    const ganttData = Array.from({ length: 5 }, (_, i) => {
      const start = new Date(now.getTime() - (5 - i) * 3600000);
      const end = new Date(start.getTime() + Math.random() * 7200000);
      return {
        taskId: `Task ${i + 1}`,
        startTime: start,
        endTime: end,
        state: ['success', 'failed', 'running'][Math.floor(Math.random() * 3)],
        queuedDuration: Math.floor(Math.random() * 300),
        runDuration: Math.floor(Math.random() * 1800),
      };
    });

    return (
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            📊 ECharts 차트 갤러리
          </h1>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            모든 차트 타입을 한눈에 확인할 수 있습니다. DBDS 흑백 디자인
            시스템이 모든 차트에 자동 적용됩니다.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#22c55e',
                }}
              >
                -80%
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                번들 크기 감소
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#3b82f6',
                }}
              >
                6 → 1
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                라이브러리 통합
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#a855f7',
                }}
              >
                통일된 API
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                개발 생산성 향상
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* 1. Line Chart */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              1. Line Chart
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              시계열 데이터 시각화 (Billboard.js 대체)
            </p>
            <EChart
              option={createLineChartOption(
                [
                  { name: 'Sales', data: [120, 200, 150, 80, 70, 110, 130] },
                  { name: 'Revenue', data: [80, 150, 130, 90, 100, 140, 160] },
                  { name: 'Profit', data: [60, 100, 90, 70, 80, 100, 110] },
                ],
                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                'Weekly Performance',
                undefined,
                'Amount ($)'
              )}
              height={300}
              width="100%"
            />
          </section>

          {/* 2. Bar Chart */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              2. Bar Chart
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              카테고리별 비교 (Chart.js 대체)
            </p>
            <EChart
              option={createBarChartOption(
                [
                  { name: 'Product A', data: [120, 200, 150, 80, 70, 110] },
                  { name: 'Product B', data: [80, 150, 130, 90, 100, 140] },
                  { name: 'Product C', data: [60, 100, 90, 70, 80, 100] },
                ],
                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                'Monthly Sales by Product'
              )}
              height={300}
              width="100%"
            />
          </section>

          {/* 3. Stacked Bar Chart */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              3. Stacked Bar Chart
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              누적 바 차트로 전체 대비 비율 시각화
            </p>
            <EChart
              option={createBarChartOption(
                [
                  { name: 'Direct', data: [320, 302, 301, 334, 390, 330] },
                  { name: 'Email', data: [120, 132, 101, 134, 90, 230] },
                  { name: 'Union Ads', data: [220, 182, 191, 234, 290, 330] },
                ],
                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                'Traffic Sources',
                false,
                true // stacked
              )}
              height={300}
              width="100%"
            />
          </section>

          {/* 4. Radar Chart */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              4. Radar Chart
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              다차원 데이터 비교 (Billboard.js 대체)
            </p>
            <EChart
              option={createRadarChartOption(
                [
                  'Sales',
                  'Marketing',
                  'Development',
                  'Support',
                  'R&D',
                  'Admin',
                ],
                [
                  {
                    name: 'Product A',
                    value: [4300, 10000, 28000, 35000, 50000, 19000],
                  },
                  {
                    name: 'Product B',
                    value: [5000, 14000, 28000, 31000, 42000, 21000],
                  },
                ],
                60000
              )}
              height={400}
              width="100%"
            />
          </section>

          {/* 5. Calendar Heatmap */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              5. Calendar Heatmap
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              일별 성공/실패 건수 히트맵 (react-calendar-heatmap 대체)
            </p>
            <EChart
              option={createCalendarHeatmapOption(
                calendarValues,
                startDate,
                today
              )}
              height={200}
              width="100%"
            />
          </section>

          {/* 6. Scatter Chart */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              6. Scatter Chart
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              카테고리별 산점도 + 상한/하한 밴드 (D3 대체)
            </p>
            <EChart
              option={createScatterChartOption(
                scatterData,
                ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D'],
                {
                  'Sensor A': { upper: 8, lower: 2 },
                  'Sensor B': { upper: 7, lower: 3 },
                  'Sensor C': { upper: 9, lower: 1 },
                  'Sensor D': { upper: 6, lower: 4 },
                },
                [0, 10],
                'Sensor Analysis',
                'Sensor A'
              )}
              height={300}
              width="100%"
            />
          </section>

          {/* 7. Gantt Chart */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              7. Gantt Chart
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              Task 실행 타임라인 (Chart.js 대체)
            </p>
            <EChart
              option={createGanttChartOption(
                ganttData,
                {
                  success: '#22c55e',
                  failed: '#ef4444',
                  running: '#06b6d4',
                },
                true
              )}
              height={300}
              width="100%"
            />
          </section>

          {/* 8. Airflow Bar Chart (특수) */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              8. Airflow Bar Chart 🔥
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              DAG Run Duration 시각화 (Chart.js 대체)
            </p>
            <AirflowBarChartV2
              data={Array.from({ length: 10 }, (_, i) => ({
                label: `Run ${i + 1}`,
                runId: `run_${i + 1}`,
                runDuration: Math.floor(Math.random() * 3600),
                state: ['success', 'failed', 'running'][
                  Math.floor(Math.random() * 3)
                ],
                runType: i < 5 ? 'scheduled' : 'manual',
              }))}
              height={300}
              selectedIndex={2}
              onBarClick={(index, runId) => {
                alert(`Selected: ${runId}`);
              }}
              statusColors={{
                success: '#22c55e',
                failed: '#ef4444',
                running: '#06b6d4',
              }}
            />
          </section>

          {/* 9. Wafer Gantt Chart (특수) */}
          <section
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              9. Wafer Gantt Chart 🔥🔥🔥
            </h2>
            <p
              style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}
            >
              반도체 제조 공정 타임라인 (Plotly.js 대체, 3MB → 800KB)
            </p>
            {(() => {
              const now = new Date();
              const waferData = Array.from({ length: 20 }, (_, i) => {
                const start = new Date(now.getTime() - (20 - i) * 600000);
                const end = new Date(start.getTime() + Math.random() * 300000);
                return {
                  pmSno: 1,
                  fileSno: i + 1,
                  startTime: start,
                  endTime: end,
                  isDefect: Math.random() > 0.8,
                  recipe: ['RUN', 'AGING', 'N/I'][
                    Math.floor(Math.random() * 3)
                  ],
                  type: ['RUN', 'AGING', 'N/I'][Math.floor(Math.random() * 3)],
                  lot: `LOT${i + 1}`,
                  waferNo: `W${i + 1}`,
                  isAbort: Math.random() > 0.9,
                  value: Math.random() * 100,
                  layer: 1,
                  percent: Math.random() * 100,
                };
              });

              const pmData = Array.from({ length: 2 }, (_, i) => {
                const start = new Date(now.getTime() - (2 - i) * 7200000);
                const end = new Date(start.getTime() + 3600000);
                return {
                  startTime: start,
                  endTime: end,
                  pmSno: i + 1,
                  result: i % 2 === 0 ? 'C' : 'E',
                };
              });

              return (
                <WaferGanttChartV2
                  waferData={waferData}
                  pmData={pmData}
                  height={500}
                  timeRange={[
                    new Date(waferData[0]?.startTime || Date.now()),
                    new Date(
                      waferData[waferData.length - 1]?.endTime || Date.now()
                    ),
                  ]}
                  onItemClick={(wafer) => {
                    alert(`Wafer: ${wafer.waferNo}, Lot: ${wafer.lot}`);
                  }}
                />
              );
            })()}
          </section>
        </div>

        {/* 사용 가이드 */}
        <div
          style={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}
          >
            📚 사용 가이드
          </h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                1. 기본 사용
              </h4>
              <pre
                style={{
                  backgroundColor: '#262626',
                  color: '#22c55e',
                  padding: '12px',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '13px',
                }}
              >
                {`import { EChart, createLineChartOption } from '@dbds/charts';

const option = createLineChartOption(data, xAxis, 'Title');
<EChart option={option} height={400} />`}
              </pre>
            </div>
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                2. 디자인 시스템 자동 적용
              </h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                모든 차트에 DBDS 흑백 디자인 토큰이 자동으로 적용됩니다. 별도의
                스타일 설정 없이 일관된 디자인을 유지할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '모든 차트 타입을 한 화면에서 확인할 수 있는 갤러리입니다. 실제 프로젝트에 적용할 때의 모습을 미리 볼 수 있습니다.',
      },
    },
  },
};
