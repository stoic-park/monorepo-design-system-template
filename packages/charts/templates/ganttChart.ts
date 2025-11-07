import { EChartsOption } from 'echarts';

export interface GanttData {
  taskId: string;
  startTime: Date;
  endTime: Date;
  state: string;
  queuedDuration?: number;
  runDuration?: number;
}

/**
 * Gantt Chart 템플릿
 *
 * @description Airflow Task 실행 타임라인
 * @param tasks Task 데이터 배열
 * @param statusColors 상태별 색상 맵
 * @param showAnnotation 현재 시간 표시 여부
 */
export const createGanttChartOption = (
  tasks: GanttData[],
  statusColors: Record<string, string>,
  showAnnotation = true
): EChartsOption => {
  const minTime = Math.min(...tasks.map((t) => t.startTime.getTime() / 1000));
  const maxTime = Math.max(...tasks.map((t) => t.endTime.getTime() / 1000));

  return {
    tooltip: {
      formatter: (params: any) => {
        const task = tasks[params.dataIndex];
        return `
          <strong>${task.taskId}</strong><br/>
          Queued: ${task.queuedDuration || 0}s<br/>
          Running: ${task.runDuration || 0}s<br/>
          Start: ${task.startTime.toLocaleString()}<br/>
          End: ${task.endTime.toLocaleString()}
        `;
      },
    },
    grid: {
      left: 100,
      right: 50,
      top: 50,
      bottom: 30,
      containLabel: false,
    },
    xAxis: {
      type: 'value',
      min: minTime,
      max: maxTime,
      position: 'top',
      axisLabel: {
        formatter: (value: number) => {
          return (
            new Date(value * 1000).toLocaleTimeString('en-GB', {
              hour12: false,
              timeZone: 'UTC',
            }) + ' UTC'
          );
        },
        rotate: 30,
      },
    },
    yAxis: {
      type: 'category',
      data: tasks.map((t) => t.taskId),
    },
    series: [
      // Queued duration
      ...(tasks[0].queuedDuration !== undefined
        ? [
            {
              name: 'Queued',
              type: 'bar' as const,
              stack: 'total',
              data: tasks.map((t) => ({
                value: [t.queuedDuration || 0, t.taskId],
                itemStyle: {
                  color: '#FFC107',
                },
              })),
              barWidth: 10,
            },
          ]
        : []),
      // Running duration
      {
        name: 'Running',
        type: 'bar' as const,
        stack: 'total',
        data: tasks.map((t) => ({
          value: [
            t.queuedDuration !== undefined
              ? t.runDuration || 0
              : (t.endTime.getTime() - t.startTime.getTime()) / 1000,
            t.taskId,
          ],
          itemStyle: {
            color: statusColors[t.state] || '#9E9E9E',
          },
        })),
        barWidth: 10,
      },
    ],
    // 현재 시간 표시 (annotation 대체)
    ...(showAnnotation
      ? {
          markLine: {
            symbol: 'none',
            data: [
              {
                name: 'Current Time',
                xAxis: Date.now() / 1000,
                lineStyle: {
                  color: 'red',
                  type: 'solid',
                  width: 2,
                },
                label: {
                  formatter: 'Now',
                  position: 'end',
                },
              },
            ],
          },
        }
      : {}),
  };
};
