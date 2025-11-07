import React, { useState } from 'react';
import { EChart } from '../EChart';
import {
  createWaferGanttChartOption,
  WaferData,
  PmData,
  ColorMapping,
} from '../templates';
import { colors } from '@dbds/tokens';

/**
 * WaferGanttChart v2 (ECharts 버전)
 *
 * @description Plotly.js WaferGanttChart의 ECharts 대체 버전
 * @note 기존 WaferGanttChart.tsx와 병행 개발 (비교 검증용)
 */

export interface WaferGanttChartV2Props {
  waferData: WaferData[];
  pmData: PmData[];
  height?: number;
  colorMapping?: ColorMapping;
  timeRange: [Date, Date];
  onItemClick?: (wafer: WaferData) => void;
}

const defaultColorMap: ColorMapping = {
  AGING: colors.chart.warning.DEFAULT,
  RUN: colors.chart.info.DEFAULT,
  'N/I': colors.gray[500],
  defect: colors.chart.defect,
  abort: colors.chart.abort,
  normal_pm: colors.chart.normal,
  inspection_pm: colors.chart.error.DEFAULT,
};

export const WaferGanttChartV2: React.FC<WaferGanttChartV2Props> = ({
  waferData = [],
  pmData = [],
  height = 600,
  colorMapping = defaultColorMap,
  timeRange,
  onItemClick,
}) => {
  const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(new Set());

  const colors = { ...defaultColorMap, ...colorMapping };

  const option = createWaferGanttChartOption(
    waferData,
    pmData,
    timeRange,
    colors,
    hiddenTypes
  );

  const onEvents = {
    click: (params: any) => {
      if (params.data?.dataType === 'wafer' && onItemClick) {
        onItemClick(params.data);
      }
    },
  };

  const toggleType = (type: string) => {
    setHiddenTypes((prev) => {
      const newHidden = new Set(prev);
      if (newHidden.has(type)) {
        newHidden.delete(type);
      } else {
        newHidden.add(type);
      }
      return newHidden;
    });
  };

  // 범례 항목
  const legendItems = [
    { name: 'AGING', color: colors.AGING, clickable: true },
    { name: 'RUN', color: colors.RUN, clickable: true },
    { name: 'N/I', color: colors['N/I'], clickable: true },
    { name: 'NG', color: colors.defect, clickable: false },
    { name: 'Abort', color: colors.abort, clickable: false },
    { name: '정상 PM', color: colors.normal_pm, clickable: false },
    { name: '불량 PM', color: colors.inspection_pm, clickable: false },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 커스텀 범례 */}
      <div
        className="flex justify-between gap-4 px-4"
        style={{
          height: '50px',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div className="flex gap-2">
          {legendItems
            .filter((item) => !item.clickable)
            .map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 px-2 py-1 text-sm rounded"
              >
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
        </div>
        <div className="flex gap-2">
          {legendItems
            .filter((item) => item.clickable)
            .map((item) => (
              <div
                key={item.name}
                onClick={() => toggleType(item.name)}
                className="flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-gray-100 cursor-pointer"
                style={{
                  opacity: hiddenTypes.has(item.name) ? 0.5 : 1,
                  textDecoration: hiddenTypes.has(item.name)
                    ? 'line-through'
                    : 'none',
                }}
              >
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: hiddenTypes.has(item.name)
                      ? 'rgba(200, 200, 200, 0.5)'
                      : item.color,
                  }}
                />
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>

      {/* ECharts */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <EChart option={option} height="100%" onEvents={onEvents} />
      </div>
    </div>
  );
};

export default WaferGanttChartV2;
