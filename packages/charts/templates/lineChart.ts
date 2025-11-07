import { EChartsOption } from 'echarts';
import { colors } from '@dbds/tokens';

export interface LineChartData {
  name: string;
  data: number[];
  smooth?: boolean;
  areaStyle?: boolean;
}

export interface BandData {
  high: number[];
  mid: number[];
  low: number[];
}

/**
 * Line Chart 템플릿
 *
 * @description 센서 데이터 등 시계열 데이터 시각화
 * @param data 라인 데이터 배열
 * @param xAxisData X축 레이블
 * @param title 차트 제목
 * @param bandData 상한/하한 밴드 (선택)
 */
export const createLineChartOption = (
  data: LineChartData[],
  xAxisData: string[],
  title?: string,
  bandData?: BandData,
  yAxisName?: string,
  yAxisMin?: number
): EChartsOption => ({
  title: title
    ? {
        text: title,
        left: 'center',
        textStyle: {
          color: colors.text.primary,
          fontSize: 16,
          fontWeight: 600,
        },
      }
    : undefined,
  tooltip: {
    trigger: 'axis',
    backgroundColor: colors.background.DEFAULT,
    borderColor: colors.border.DEFAULT,
    borderWidth: 1,
    textStyle: {
      color: colors.text.primary,
    },
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: colors.gray[700],
        color: colors.text.inverse,
      },
    },
  },
  legend: {
    data: data.map((d) => d.name),
    bottom: 0,
    textStyle: {
      color: colors.text.secondary,
    },
  },
  color: [...colors.chart.series],
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {
        title: 'Save as Image',
      },
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxisData,
    axisLine: {
      lineStyle: {
        color: colors.border.DEFAULT,
      },
    },
    axisLabel: {
      color: colors.text.secondary,
    },
  },
  yAxis: {
    type: 'value',
    name: yAxisName,
    min: yAxisMin,
    nameTextStyle: {
      color: colors.text.secondary,
    },
    axisLine: {
      lineStyle: {
        color: colors.border.DEFAULT,
      },
    },
    axisLabel: {
      color: colors.text.secondary,
    },
    splitLine: {
      lineStyle: {
        color: colors.border.light,
      },
    },
  },
  series: [
    // Band (상한/하한) - Billboard.js의 areaLineRange 대체
    ...(bandData
      ? [
          {
            name: 'Upper Band',
            type: 'line' as const,
            data: bandData.high,
            lineStyle: {
              opacity: 0,
            },
            stack: 'confidence-band',
            symbol: 'none',
            silent: true,
          },
          {
            name: 'Lower Band',
            type: 'line' as const,
            data: bandData.low,
            lineStyle: {
              opacity: 0,
            },
            areaStyle: {
              color: colors.gray[200],
            },
            stack: 'confidence-band',
            symbol: 'none',
            silent: true,
          },
        ]
      : []),
    // 실제 데이터 라인들
    ...data.map((item) => ({
      name: item.name,
      type: 'line' as const,
      data: item.data,
      smooth: item.smooth ?? true,
      areaStyle: item.areaStyle ? {} : undefined,
      symbol: 'circle',
      symbolSize: 3,
      emphasis: {
        focus: 'series' as const,
      },
    })),
  ],
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100,
    },
    {
      start: 0,
      end: 100,
    },
  ],
});
