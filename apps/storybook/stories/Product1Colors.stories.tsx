import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from '@design-system/components';
import { colors } from '@design-system/tokens-product-1';

const meta = {
  title: 'Product 1/Brand Colors',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

// 색상 스와치 컴포넌트
const ColorBox: React.FC<{
  name: string;
  color: string;
  shade: string;
}> = ({ name, color, shade }) => {
  return (
    <div className="group relative">
      <div
        className="rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        style={{
          backgroundColor: color,
          width: '100%',
          height: '80px',
          minHeight: '80px',
        }}
        onClick={() => navigator.clipboard.writeText(color)}
        title={`${name}-${shade}: ${color} (클릭하여 복사)`}
      />
      <div className="mt-2 text-center">
        <div className="text-xs font-medium text-slate-900">{shade}</div>
        <div className="text-xs text-slate-500 font-mono">{color}</div>
      </div>
    </div>
  );
};

export const BrandColors: Story = {
  render: () => (
    <div className="min-h-screen bg-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">Product 1 - Brand Colors</h1>
          <p className="text-base text-slate-600 mb-2">
            St Tropaz 브랜드 컬러 기반 디자인 토큰
          </p>
          <p className="text-sm text-slate-500">
            Click any color to copy the hex value.
          </p>
        </div>

        {/* 브랜드 컬러 */}
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">Brand Color - St Tropaz</h2>
            <div className="grid grid-cols-5 md:grid-cols-11 gap-3 mb-8">
              {Object.entries(colors.brand).map(([shade, color]) => (
                <ColorBox key={shade} name="st-tropaz" color={color} shade={shade} />
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          {/* Semantic Colors */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Semantic Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="bordered" padding="md">
                <h4 className="text-xl font-semibold mb-4" style={{ color: colors.primary.DEFAULT }}>
                  Primary (Brand)
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Light</div>
                    <ColorBox name="primary" color={colors.primary.light} shade="100" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Default</div>
                    <ColorBox name="primary" color={colors.primary.DEFAULT} shade="500" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Dark</div>
                    <ColorBox name="primary" color={colors.primary.dark} shade="700" />
                  </div>
                </div>
              </Card>

              <Card variant="bordered" padding="md">
                <h4 className="text-xl font-semibold mb-4" style={{ color: colors.info.DEFAULT }}>
                  Info (Brand)
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Light</div>
                    <ColorBox name="info" color={colors.info.light} shade="100" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Default</div>
                    <ColorBox name="info" color={colors.info.DEFAULT} shade="500" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Dark</div>
                    <ColorBox name="info" color={colors.info.dark} shade="700" />
                  </div>
                </div>
              </Card>

              <Card variant="bordered" padding="md">
                <h4 className="text-xl font-semibold mb-4 text-emerald-600">
                  Success (Base)
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Light</div>
                    <ColorBox name="success" color={colors.success.light} shade="100" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Default</div>
                    <ColorBox name="success" color={colors.success.DEFAULT} shade="500" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Dark</div>
                    <ColorBox name="success" color={colors.success.dark} shade="700" />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          {/* 컴포넌트 미리보기 */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Component Preview</h2>
            <div className="space-y-6 p-8 border rounded-lg">
              <div>
                <h3 className="font-semibold mb-3">Buttons</h3>
                <div className="flex gap-3">
                  <button
                    className="px-4 py-2 rounded-lg text-white transition-colors"
                    style={{
                      backgroundColor: colors.primary.DEFAULT,
                    }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg border-2 transition-colors"
                    style={{
                      borderColor: colors.primary.DEFAULT,
                      color: colors.primary.DEFAULT,
                    }}
                  >
                    Outline Button
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Alert</h3>
                <div
                  className="p-4 rounded-lg border-2"
                  style={{
                    backgroundColor: colors.info.light,
                    borderColor: colors.info.DEFAULT,
                    color: colors.info.dark,
                  }}
                >
                  <strong>알림:</strong> Product 1 브랜드 컬러가 적용된 알림입니다.
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Links</h3>
                <a
                  href="#"
                  className="underline hover:no-underline"
                  style={{ color: colors.primary.DEFAULT }}
                >
                  Product 1 브랜드 링크
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ComparisonWithBase: Story = {
  render: () => {
    const baseColors = {
      50: '#EFF6FF',
      500: '#3B82F6',
      900: '#1E3A8A',
    };

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Base vs Product 1 Comparison</h1>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Base Blue</h2>
            <div className="space-y-3">
              <div
                className="h-20 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: baseColors[500] }}
              >
                #3B82F6
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Product 1 - St Tropaz</h2>
            <div className="space-y-3">
              <div
                className="h-20 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: colors.brand[500] }}
              >
                {colors.brand[500]}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

