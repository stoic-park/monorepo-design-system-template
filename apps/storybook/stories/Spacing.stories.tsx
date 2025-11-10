import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Typography } from '@design-system/components';
import { spacing } from '@design-system/tokens';

const meta = {
  title: 'Design System/Spacing',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacingScale: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <Typography variant="h1" className="mb-8">
        Spacing Tokens
      </Typography>

      <Card variant="bordered" padding="lg">
        <Typography variant="h2" className="mb-6">
          Spacing Scale
        </Typography>
        <Typography variant="body2" className="text-slate-600 mb-8">
          일관된 간격 시스템으로 레이아웃의 조화를 유지합니다.
        </Typography>

        <div className="space-y-4">
          {Object.entries(spacing).map(([key, value]) => (
            <div key={key} className="flex items-center gap-6">
              <code className="text-sm font-mono text-slate-600 w-16">{key}</code>
              <span className="text-slate-400 w-24">{value}</span>
              <div
                className="h-8 bg-slate-900 rounded"
                style={{ width: value }}
              />
              <span className="text-xs text-slate-500">
                {parseInt(value) * 4}px
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-slate-50 rounded">
          <Typography variant="body2" className="text-slate-600">
            <strong>사용 예시:</strong> className="p-4 gap-6 space-y-8"
          </Typography>
        </div>
      </Card>
    </div>
  ),
};

