import { EChartsOption } from 'echarts';

export interface ScatterData {
  value: number;
  target: boolean;
  category: string;
  index: number;
}

export interface CategoryBounds {
  upper: number;
  lower: number;
}

/**
 * Scatter Chart 템플릿 (카테고리별 산점도)
 *
 * @description 카테고리별로 그룹화된 산점도 + 상한/하한 밴드
 * @param data 산점도 데이터
 * @param categories 카테고리 배열
 * @param categoryBounds 카테고리별 상한/하한
 * @param yRange Y축 범위
 * @param title 차트 제목
 * @param targetCategory 강조할 카테고리
 */
export const createScatterChartOption = (
  data: ScatterData[],
  categories: string[],
  categoryBounds: Record<string, CategoryBounds>,
  yRange: number[],
  title?: string,
  targetCategory?: string
): EChartsOption => {
  const margin = (yRange[1] - yRange[0]) * 0.15;
  const yMin = yRange[0] - margin;
  const yMax = yRange[1] + margin;

  return {
    title: title
      ? {
          text: title.toUpperCase(),
          left: 'center',
          textStyle: {
            fontSize: 12,
            fontWeight: 700,
            color: '#424242',
          },
        }
      : undefined,
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const item = data[params.dataIndex];
        return `
          <strong>Category:</strong> ${item.category}<br/>
          <strong>Value:</strong> ${item.value.toFixed(2)}<br/>
          <strong>Index:</strong> ${item.index}
        `;
      },
    },
    grid: {
      left: 60,
      right: 30,
      top: 40,
      bottom: 80,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(250, 250, 250, 0.3)', 'rgba(200, 200, 200, 0.1)'],
        },
      },
    },
    yAxis: {
      type: 'value',
      min: yMin,
      max: yMax,
      name: 'Value',
      nameLocation: 'middle',
      nameGap: 50,
    },
    series: [
      // 상한/하한 영역 (Custom Series)
      {
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const categoryIndex = params.dataIndex;
          const category = categories[categoryIndex];
          const bounds = categoryBounds[category];

          if (!bounds) return null;

          const xCenter = api.coord([categoryIndex, 0])[0];
          const yUpper = api.coord([0, bounds.upper])[1];
          const yLower = api.coord([0, bounds.lower])[1];
          const width = api.size([1, 0])[0] * 0.8;

          return {
            type: 'group',
            children: [
              // 영역
              {
                type: 'rect',
                shape: {
                  x: xCenter - width / 2,
                  y: yUpper,
                  width: width,
                  height: yLower - yUpper,
                },
                style: {
                  fill: 'rgba(111, 220, 227, 0.2)',
                },
              },
              // 상한선
              {
                type: 'line',
                shape: {
                  x1: xCenter - width / 2,
                  y1: yUpper,
                  x2: xCenter + width / 2,
                  y2: yUpper,
                },
                style: {
                  stroke: '#FF8F00',
                  lineWidth: 1.5,
                },
              },
              // 하한선
              {
                type: 'line',
                shape: {
                  x1: xCenter - width / 2,
                  y1: yLower,
                  x2: xCenter + width / 2,
                  y2: yLower,
                },
                style: {
                  stroke: '#26355D',
                  lineWidth: 1.5,
                },
              },
            ],
          };
        },
        data: categories.map((_, i) => i),
        z: 1,
      },
      // 산점도
      {
        type: 'scatter',
        name: 'Data Points',
        data: data.map((d) => ({
          value: [categories.indexOf(d.category), d.value],
          itemStyle: {
            color:
              targetCategory && d.category === targetCategory
                ? d.target
                  ? '#F5004F'
                  : '#9F70FD'
                : d.target
                  ? '#F5004F'
                  : '#94B4C1',
            borderColor: d.target ? '#F5004F' : 'transparent',
            borderWidth: 2,
          },
          symbolSize: d.target ? 6 : 4,
        })),
        z: 2,
      },
    ],
  };
};
