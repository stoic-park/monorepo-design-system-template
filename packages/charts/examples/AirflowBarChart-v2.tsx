import React from 'react';
import { EChart } from '../EChart';
import { createAirflowBarOption } from '../templates';

/**
 * Airflow Bar Chart v2 (ECharts 버전)
 *
 * @description Chart.js BarChart의 ECharts 대체 버전
 * @note 기존 airflow/features/charts/BarChart.tsx와 병행 개발
 */

export interface AirflowBarChartV2Props {
  data: {
    label: string;
    runId: string;
    runDuration: number;
    state: string;
    runType: string;
  }[];
  height: number;
  selectedIndex: number;
  onBarClick: (index: number, runId: string) => void;
  statusColors: Record<string, string>;
}

export const AirflowBarChartV2: React.FC<AirflowBarChartV2Props> = ({
  data,
  height,
  selectedIndex,
  onBarClick,
  statusColors,
}) => {
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.runDuration);
  const states = data.map((item) => item.state);
  const runTypes = data.map((item) => item.runType);

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
      const runId = data[index].runId;
      onBarClick(index, runId);
    },
  };

  return <EChart option={option} height={height} onEvents={onEvents} />;
};

export default AirflowBarChartV2;

/**
 * 사용 예시:
 *
 * import AirflowBarChartV2 from 'components/charts-v2/examples/AirflowBarChart-v2';
 *
 * <AirflowBarChartV2
 *   data={dagRunData}
 *   height={400}
 *   selectedIndex={selectedBarIndex}
 *   onBarClick={(index, runId) => {
 *     setSelectedBarIndex(index);
 *     setSelectedRunId(runId);
 *   }}
 *   statusColors={{
 *     success: '#4CAF50',
 *     failed: '#F44336',
 *     running: '#2196F3',
 *   }}
 * />
 */
