import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Divider } from '@design-system/components';
import { colors } from '@design-system/tokens';

console.log('Colors imported:', colors);
console.log('slate colors:', colors.slate);

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 색상 스와치 컴포넌트
const ColorBox: React.FC<{
  name: string;
  color: string;
  shade: string;
}> = ({ name, color, shade }) => {
  console.log('ColorBox:', name, shade, color);
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

// 팔레트 섹션 컴포넌트
const PaletteSection: React.FC<{
  title: string;
  colors: Array<{ shade: string; color: string }>;
}> = ({ title, colors }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-11 gap-3">
      {colors.map(({ shade, color }) => (
        <ColorBox key={shade} name={title} color={color} shade={shade} />
      ))}
    </div>
  </div>
);

// 전체 컬러 팔레트
export const AllColors: Story = {
  render: () => (
    <div className="min-h-screen bg-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">Color Tokens</h1>
          <p className="text-base text-slate-600 mb-2">
            Complete color palette based on{' '}
            <a
              href="https://ui.shadcn.com/colors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-900"
            >
              shadcn/ui
            </a>{' '}
            and Tailwind CSS.
          </p>
          <p className="text-sm text-slate-500">
            Click any color to copy the hex value.
          </p>
        </div>

        {/* 색상 팔레트 */}
        <div className="space-y-12">
          {/* Neutrals */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Neutral Colors</h2>
            <div className="space-y-8">
              <PaletteSection
                title="slate"
                colors={Object.entries(colors.slate).map(([shade, color]) => ({
                  shade,
                  color,
                }))}
              />
              <PaletteSection
                title="gray"
                colors={Object.entries(colors.gray).map(([shade, color]) => ({
                  shade,
                  color,
                }))}
              />
              <PaletteSection
                title="zinc"
                colors={Object.entries(colors.zinc).map(([shade, color]) => ({
                  shade,
                  color,
                }))}
              />
            </div>
          </div>

          <Divider className="my-12" />

          {/* Warm Colors */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Warm Colors</h2>
            <div className="space-y-8">
              <PaletteSection
                title="red"
                colors={Object.entries(colors.red).map(([shade, color]) => ({
                  shade,
                  color,
                }))}
              />
              <PaletteSection
                title="orange"
                colors={Object.entries(colors.orange).map(([shade, color]) => ({
                  shade,
                  color,
                }))}
              />
              <PaletteSection
                title="amber"
                colors={Object.entries(colors.amber).map(([shade, color]) => ({
                  shade,
                  color,
                }))}
              />
            </div>
          </div>

          <Divider className="my-12" />

          {/* Cool Colors */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Cool Colors</h2>
            <div className="space-y-8">
              <PaletteSection
                title="green"
                colors={Object.entries(colors.green).map(([shade, color]) => ({
                  shade,
                  color,
                }))}
              />
              <PaletteSection
                title="emerald"
                colors={Object.entries(colors.emerald).map(
                  ([shade, color]) => ({
                    shade,
                    color,
                  })
                )}
              />
              <PaletteSection
                title="blue"
                colors={Object.entries(colors.blue).map(([shade, color]) => ({
                  shade,
                  color,
                }))}
              />
            </div>
          </div>

          <Divider className="my-12" />

          {/* Semantic Colors */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Semantic Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="bordered" padding="md">
                <h4 className="text-xl font-semibold mb-4 text-emerald-600">
                  Success
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Light</div>
                    <ColorBox
                      name="success"
                      color={colors.success.light}
                      shade="100"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Default</div>
                    <ColorBox
                      name="success"
                      color={colors.success.DEFAULT}
                      shade="500"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Dark</div>
                    <ColorBox
                      name="success"
                      color={colors.success.dark}
                      shade="700"
                    />
                  </div>
                </div>
              </Card>

              <Card variant="bordered" padding="md">
                <h4 className="text-xl font-semibold mb-4 text-red-600">
                  Error
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Light</div>
                    <ColorBox
                      name="error"
                      color={colors.error.light}
                      shade="100"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Default</div>
                    <ColorBox
                      name="error"
                      color={colors.error.DEFAULT}
                      shade="500"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Dark</div>
                    <ColorBox
                      name="error"
                      color={colors.error.dark}
                      shade="700"
                    />
                  </div>
                </div>
              </Card>

              <Card variant="bordered" padding="md">
                <h4 className="text-xl font-semibold mb-4 text-amber-600">
                  Warning
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Light</div>
                    <ColorBox
                      name="warning"
                      color={colors.warning.light}
                      shade="100"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Default</div>
                    <ColorBox
                      name="warning"
                      color={colors.warning.DEFAULT}
                      shade="500"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Dark</div>
                    <ColorBox
                      name="warning"
                      color={colors.warning.dark}
                      shade="700"
                    />
                  </div>
                </div>
              </Card>

              <Card variant="bordered" padding="md">
                <h4 className="text-xl font-semibold mb-4 text-blue-600">
                  Info
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Light</div>
                    <ColorBox
                      name="info"
                      color={colors.info.light}
                      shade="100"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Default</div>
                    <ColorBox
                      name="info"
                      color={colors.info.DEFAULT}
                      shade="500"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Dark</div>
                    <ColorBox
                      name="info"
                      color={colors.info.dark}
                      shade="700"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
