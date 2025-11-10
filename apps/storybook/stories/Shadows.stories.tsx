import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Typography } from '@design-system/components';
import { shadows } from '@design-system/tokens';

const meta = {
  title: 'Design System/Shadows',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShadowScale: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <Typography variant="h1" className="mb-8">
        Shadow Tokens
      </Typography>

      <Card variant="bordered" padding="lg">
        <Typography variant="h2" className="mb-6">
          Elevation System
        </Typography>
        <Typography variant="body2" className="text-slate-600 mb-8">
          그림자를 통해 요소의 계층과 깊이를 표현합니다.
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(shadows).map(([key, value]) => (
            <div key={key} className="space-y-3">
              <code className="text-sm font-mono text-slate-600">{key}</code>
              <div
                className="w-full h-32 bg-white rounded-lg border border-slate-200 flex items-center justify-center"
                style={{ boxShadow: value }}
              >
                <Typography variant="body2" className="text-slate-500">
                  {key === 'none' ? 'No Shadow' : `shadow-${key}`}
                </Typography>
              </div>
              <code className="text-xs text-slate-400 break-all block">
                {value}
              </code>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-slate-50 rounded">
          <Typography variant="body2" className="text-slate-600">
            <strong>사용 예시:</strong> className="shadow-sm", "shadow-md", "shadow-lg"
          </Typography>
        </div>
      </Card>
    </div>
  ),
};

