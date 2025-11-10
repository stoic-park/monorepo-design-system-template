import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Typography } from '@design-system/components';
import { radius } from '@design-system/tokens';

const meta = {
  title: 'Design System/Radius',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadiusScale: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <Typography variant="h1" className="mb-8">
        Radius Tokens
      </Typography>

      <Card variant="bordered" padding="lg">
        <Typography variant="h2" className="mb-6">
          Border Radius
        </Typography>
        <Typography variant="body2" className="text-slate-600 mb-8">
          모서리 반경으로 요소의 부드러움을 조절합니다.
        </Typography>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(radius).map(([key, value]) => (
            <div key={key} className="space-y-3">
              <code className="text-sm font-mono text-slate-600">{key}</code>
              <div
                className="w-full h-24 bg-slate-900 flex items-center justify-center"
                style={{ borderRadius: value }}
              >
                <Typography variant="caption" className="text-white">
                  {value}
                </Typography>
              </div>
              <code className="text-xs text-slate-400 block">
                rounded-{key}
              </code>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-slate-50 rounded">
          <Typography variant="body2" className="text-slate-600">
            <strong>사용 예시:</strong> className="rounded-lg", "rounded-full"
          </Typography>
        </div>
      </Card>
    </div>
  ),
};

