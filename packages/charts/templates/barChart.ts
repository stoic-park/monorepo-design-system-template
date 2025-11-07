import { EChartsOption } from 'echarts';
import { colors } from '@dbds/tokens';

export interface BarChartData {
  name: string;
  data: number[];
}

export interface BarChartAnnotation {
  value: number;
  label: string;
  color?: string;
}

/**
 * Bar Chart 템플릿
 *
 * @description 기본 바 차트 (수직/수평)
 * @param data 바 차트 데이터
 * @param xAxisData X축 레이블 (카테고리)
 * @param title 차트 제목
 * @param horizontal 수평 바 차트 여부
 * @param stacked 스택 바 차트 여부
 * @param annotations 주석선 (예: Manual/Scheduled 구분선)
 */
export const createBarChartOption = (
  data: BarChartData[],
  xAxisData: string[],
  title?: string,
  horizontal = false,
  stacked = false,
  annotations?: BarChartAnnotation[]
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
      type: 'shadow',
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
      ...(stacked
        ? {
            magicType: {
              type: ['stack', 'bar'],
            },
          }
        : {}),
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
  ...(horizontal
    ? {
        xAxis: {
          type: 'value' as const,
        },
        yAxis: {
          type: 'category' as const,
          data: xAxisData,
          inverse: true,
        },
      }
    : {
        xAxis: {
          type: 'category' as const,
          data: xAxisData,
        },
        yAxis: {
          type: 'value' as const,
        },
      }),
  series: data.map((item) => ({
    name: item.name,
    type: 'bar' as const,
    data: item.data,
    stack: stacked ? 'total' : undefined,
    emphasis: {
      focus: 'series',
    },
  })),
  // Annotations (ChartJS annotation plugin 대체)
  ...(annotations && annotations.length > 0
    ? {
        markLine: {
          data: annotations.map((anno) => ({
            [horizontal ? 'xAxis' : 'yAxis']: anno.value,
            label: {
              formatter: anno.label,
              position: 'end',
            },
            lineStyle: {
              color: anno.color || 'red',
              type: 'dashed' as const,
              width: 2,
            },
          })),
        },
      }
    : {}),
});

/**
 * Airflow DAG Duration Bar Chart 전용 옵션
 */
export const createAirflowBarOption = (
  labels: string[],
  values: number[],
  states: string[],
  runTypes: string[],
  selectedIndex: number,
  statusColors: Record<string, string>
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: (params: any) => {
      const index = params[0].dataIndex;
      const duration = values[index];
      const h = Math.floor(duration / 3600);
      const m = Math.floor((duration % 3600) / 60);
      const s = duration % 60;
      const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

      return `
        <strong>Run ID:</strong> ${labels[index]}<br/>
        <strong>Duration:</strong> ${formatted}<br/>
        <strong>State:</strong> ${states[index]}<br/>
        <strong>Type:</strong> ${runTypes[index]}
      `;
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: labels,
    axisLabel: {
      interval: 0,
      rotate: 45,
    },
  },
  yAxis: {
    type: 'value',
    name: 'Duration (seconds)',
  },
  series: [
    {
      name: 'Duration',
      type: 'bar',
      data: values.map((value, index) => ({
        value,
        itemStyle: {
          color: statusColors[states[index]] || '#9E9E9E',
          borderColor: index === selectedIndex ? '#000' : 'transparent',
          borderWidth: index === selectedIndex ? 3 : 0,
        },
      })),
      barMaxWidth: 30,
      emphasis: {
        focus: 'self',
        itemStyle: {
          borderColor: '#000',
          borderWidth: 3,
        },
      },
    },
  ],
});
