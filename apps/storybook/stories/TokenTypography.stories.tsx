import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Typography as TypographyComponent } from '@design-system/components';
import { typography } from '@design-system/tokens';

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontSizes: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <TypographyComponent variant="h1" className="mb-8">
        Typography Tokens
      </TypographyComponent>

      <div className="space-y-12">
        {/* Font Family */}
        <Card variant="bordered" padding="lg">
          <TypographyComponent variant="h2" className="mb-6">
            Font Families
          </TypographyComponent>
          <div className="space-y-4">
            {Object.entries(typography.fontFamily).map(([key, value]) => {
              const fontFamilyString = Array.isArray(value) ? value.join(', ') : value;
              return (
                <div key={key} className="py-2 border-b border-slate-100">
                  <div className="flex items-center gap-6 mb-2">
                    <code className="text-sm font-mono text-slate-600 w-24">{key}</code>
                    <span className="text-slate-400 text-xs">{fontFamilyString}</span>
                  </div>
                  <div style={{ fontFamily: fontFamilyString }} className="text-lg">
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Font Sizes */}
        <Card variant="bordered" padding="lg">
          <TypographyComponent variant="h2" className="mb-6">
            Font Sizes
          </TypographyComponent>
          <div className="space-y-4">
            {Object.entries(typography.fontSize).map(([key, value]) => {
              const fontSize = Array.isArray(value) ? value[0] : value;
              const lineHeight = Array.isArray(value) && typeof value[1] === 'object' 
                ? value[1].lineHeight 
                : undefined;
              return (
                <div key={key} className="flex items-baseline gap-6 py-2 border-b border-slate-100">
                  <code className="text-sm font-mono text-slate-600 w-24">{key}</code>
                  <span className="text-slate-400 w-32">{String(fontSize)}</span>
                  <div style={{ fontSize: String(fontSize) }}>The quick brown fox</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Font Weights */}
        <Card variant="bordered" padding="lg">
          <TypographyComponent variant="h2" className="mb-6">
            Font Weights
          </TypographyComponent>
          <div className="space-y-4">
            {Object.entries(typography.fontWeight).map(([key, value]) => (
              <div key={key} className="flex items-center gap-6 py-2 border-b border-slate-100">
                <code className="text-sm font-mono text-slate-600 w-24">{key}</code>
                <span className="text-slate-400 w-32">{String(value)}</span>
                <div style={{ fontWeight: String(value) }} className="text-xl">
                  The quick brown fox
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Line Heights */}
        <Card variant="bordered" padding="lg">
          <TypographyComponent variant="h2" className="mb-6">
            Line Heights
          </TypographyComponent>
          <div className="space-y-4">
            {Object.entries(typography.lineHeight).map(([key, value]) => (
              <div key={key} className="py-2 border-b border-slate-100">
                <div className="flex items-center gap-6 mb-2">
                  <code className="text-sm font-mono text-slate-600 w-24">{key}</code>
                  <span className="text-slate-400">{String(value)}</span>
                </div>
                <div style={{ lineHeight: String(value) }} className="text-sm bg-slate-50 p-3 rounded">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Letter Spacing */}
        <Card variant="bordered" padding="lg">
          <TypographyComponent variant="h2" className="mb-6">
            Letter Spacing
          </TypographyComponent>
          <div className="space-y-4">
            {Object.entries(typography.letterSpacing).map(([key, value]) => (
              <div key={key} className="flex items-center gap-6 py-2 border-b border-slate-100">
                <code className="text-sm font-mono text-slate-600 w-24">{key}</code>
                <span className="text-slate-400 w-32">{String(value)}</span>
                <div style={{ letterSpacing: String(value) }} className="text-lg">
                  The quick brown fox
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  ),
};

