import { EChartsOption } from 'echarts';

export interface RadarChartData {
  name: string;
  value: number[];
  color?: string;
}

/**
 * Radar Chart 템플릿
 *
 * @description 다차원 데이터 비교 (MIN, MAX, AVG, STD 등)
 * @param indicators 축 이름 배열
 * @param data 데이터 배열
 * @param max 최대값 (기본: 1)
 */
export const createRadarChartOption = (
  indicators: string[],
  data: RadarChartData[],
  max = 1
): EChartsOption => ({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: data.map((d) => d.name),
    bottom: 0,
  },
  radar: {
    indicator: indicators.map((name) => ({
      name,
      max,
    })),
    shape: 'polygon',
    splitNumber: 4,
    splitLine: {
      lineStyle: {
        color: '#E0E0E0',
      },
    },
    splitArea: {
      areaStyle: {
        color: ['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.05)'],
      },
    },
    axisLine: {
      lineStyle: {
        color: '#9E9E9E',
      },
    },
  },
  series: [
    {
      name: 'Radar',
      type: 'radar',
      data: data.map((item) => ({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: item.color,
        },
        areaStyle: {
          opacity: 0.3,
        },
      })),
      emphasis: {
        lineStyle: {
          width: 3,
        },
      },
    },
  ],
});

/**
 * Billboard.js RadarGraph 마이그레이션용
 */
export const createRadarFromColumns = (columns: any[]): EChartsOption => {
  // columns[0]이 indicator (축 이름)
  const indicators = columns[0].slice(1);

  // columns[1:] 이 데이터
  const radarData: RadarChartData[] = columns.slice(1).map((col) => ({
    name: col[0],
    value: col.slice(1),
    color: col[0] === 'Upper' ? 'red' : col[0] === 'Target' ? 'blue' : 'pink',
  }));

  return createRadarChartOption(indicators, radarData, 1);
};
