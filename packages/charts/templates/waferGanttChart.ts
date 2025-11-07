import { EChartsOption } from 'echarts';

export interface WaferData {
  pmSno: number;
  fileSno: number;
  startTime: Date;
  endTime: Date;
  isDefect: boolean;
  recipe: string;
  type: string;
  lot?: string;
  waferNo?: string;
  isAbort: boolean;
  value?: number;
  layer: number;
  percent: number;
}

export interface PmData {
  startTime: Date;
  endTime: Date;
  pmSno: number;
  result: string;
}

export interface ColorMapping {
  AGING: string;
  RUN: string;
  'N/I': string;
  defect: string;
  abort: string;
  normal_pm: string;
  inspection_pm: string;
}

/**
 * Wafer Gantt Chart 템플릿 (Multi-layer)
 *
 * @description Plotly.js WaferGanttChart 대체
 * @param waferData 웨이퍼 데이터
 * @param pmData PM 데이터
 * @param timeRange 시간 범위
 * @param colorMapping 타입별 색상
 * @param hiddenTypes 숨길 타입
 * @param height 차트 높이
 */
export const createWaferGanttChartOption = (
  waferData: WaferData[],
  pmData: PmData[],
  timeRange: [Date, Date],
  colorMapping: ColorMapping,
  hiddenTypes: Set<string> = new Set(),
  showAnnotation = true
): EChartsOption => {
  const layers = ['PM/BM', 'Wafer', 'Abort', 'RF On-time'];

  // 숨기지 않은 wafer 데이터만 필터링
  const visibleWaferData = waferData.filter((w) => !hiddenTypes.has(w.type));

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const data = params.data;

        if (data.dataType === 'pm') {
          return `
            <strong>PM ${data.result === 'C' ? '정상' : '불량'}</strong><br/>
            PM No: ${data.pmSno}<br/>
            Start: ${new Date(data.value[1]).toLocaleString()}<br/>
            End: ${new Date(data.value[2]).toLocaleString()}
          `;
        }

        if (data.dataType === 'wafer') {
          return `
            <strong>Wafer ${data.waferNo || data.fileSno}</strong><br/>
            Lot: ${data.lot || 'N/A'}<br/>
            Recipe: ${data.recipe}<br/>
            Type: ${data.type}<br/>
            ${data.isDefect ? '<span style="color: red;">⚠️ Defect</span><br/>' : ''}
            ${data.isAbort ? '<span style="color: orange;">⚠️ Abort</span><br/>' : ''}
            Start: ${new Date(data.value[1]).toLocaleString()}<br/>
            End: ${new Date(data.value[2]).toLocaleString()}
          `;
        }

        return '';
      },
    },
    grid: {
      left: 100,
      right: 50,
      top: 20,
      bottom: 30,
    },
    xAxis: {
      type: 'time',
      min: timeRange[0].getTime(),
      max: timeRange[1].getTime(),
      axisLabel: {
        formatter: (value: number) => {
          return new Date(value).toLocaleTimeString('ko-KR', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(211, 211, 211, 0.5)',
          type: 'dashed',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: layers,
      axisLabel: {
        fontSize: 12,
      },
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'none',
      },
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'none',
        bottom: 5,
      },
    ],
    series: [
      // Layer 0: PM/BM
      {
        type: 'custom',
        name: 'PM',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const height = api.size([0, 1])[1] * 0.6;
          const result = api.value(3);

          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: start[1] - height / 2,
              width: Math.max(end[0] - start[0], 2),
              height: height,
            },
            style: {
              fill:
                result === 'C'
                  ? colorMapping.normal_pm
                  : colorMapping.inspection_pm,
            },
          };
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: pmData.map((pm) => ({
          value: [
            0, // PM/BM layer
            pm.startTime.getTime(),
            pm.endTime.getTime(),
            pm.result,
          ],
          dataType: 'pm',
          pmSno: pm.pmSno,
          result: pm.result,
        })),
        z: 1,
      },
      // Layer 1: Wafer
      {
        type: 'custom',
        name: 'Wafer',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const height = api.size([0, 1])[1] * 0.6;
          const waferType = api.value(3);
          const isDefect = api.value(4);

          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: start[1] - height / 2,
              width: Math.max(end[0] - start[0], 2),
              height: height,
            },
            style: {
              fill: colorMapping[waferType as keyof ColorMapping] || '#9E9E9E',
              stroke: isDefect ? colorMapping.defect : 'none',
              lineWidth: isDefect ? 2 : 0,
            },
          };
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: visibleWaferData
          .filter((w) => !w.isAbort)
          .map((w) => ({
            value: [
              1, // Wafer layer
              w.startTime.getTime(),
              w.endTime.getTime(),
              w.type,
              w.isDefect,
            ],
            dataType: 'wafer',
            ...w,
          })),
        z: 2,
      },
      // Layer 2: Abort
      {
        type: 'custom',
        name: 'Abort',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const height = api.size([0, 1])[1] * 0.6;

          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: start[1] - height / 2,
              width: Math.max(end[0] - start[0], 2),
              height: height,
            },
            style: {
              fill: colorMapping.abort,
            },
          };
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: visibleWaferData
          .filter((w) => w.isAbort)
          .map((w) => ({
            value: [
              2, // Abort layer
              w.startTime.getTime(),
              w.endTime.getTime(),
            ],
            dataType: 'wafer',
            ...w,
          })),
        z: 2,
      },
      // Layer 3: RF On-time (Line Chart)
      {
        type: 'line',
        name: 'RF On-time',
        data: visibleWaferData
          .filter(
            (w) =>
              w.value !== undefined &&
              (w.recipe === 'RUN' || w.recipe === 'AGING')
          )
          .map((w) => [w.startTime.getTime(), w.value]),
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: {
          color: '#2196F3',
        },
        yAxisIndex: 1, // 별도 Y축 사용
        z: 3,
      },
    ],
    // 두 번째 Y축 (RF On-time용)
    ...(visibleWaferData.some((w) => w.value !== undefined)
      ? {
          yAxis: [
            {
              type: 'category' as const,
              data: layers,
            },
            {
              type: 'value' as const,
              name: 'RF On-time',
              position: 'right',
              axisLabel: {
                formatter: '{value}',
              },
            },
          ],
        }
      : {}),
    // 현재 시간 표시
    ...(showAnnotation
      ? {
          markLine: {
            symbol: 'none',
            data: [
              {
                xAxis: Date.now(),
                lineStyle: {
                  color: 'red',
                  type: 'solid',
                  width: 2,
                },
              },
            ],
          },
        }
      : {}),
  };
};
