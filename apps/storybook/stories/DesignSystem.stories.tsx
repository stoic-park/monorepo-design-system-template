import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Button,
  Input,
  Select,
  Card,
  Badge,
  Alert,
  Typography,
  Divider,
  Stack,
} from '@dbds/components';

/**
 * 디자인 시스템 개요
 *
 * 디자이너를 위한 전체 디자인 시스템 미리보기
 * - 컬러 팔레트
 * - 타이포그래피
 * - 컴포넌트 변형
 * - 레이아웃 예시
 */
const meta = {
  title: 'Design System/Overview',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 컬러 팔레트 컴포넌트
const ColorSwatch: React.FC<{
  name: string;
  color: string;
  description?: string;
}> = ({ name, color, description }) => (
  <div className="flex items-center gap-6">
    <div
      className="w-20 h-20 rounded-lg border border-slate-200 shadow-sm flex-shrink-0"
      style={{ backgroundColor: color }}
    />
    <div className="space-y-2">
      <div className="font-semibold text-slate-900 text-base">{name}</div>
      <div className="text-sm text-slate-600">{color}</div>
      {description && (
        <div className="text-sm text-slate-500">{description}</div>
      )}
    </div>
  </div>
);

// 전체 디자인 시스템 개요
export const DesignSystemOverview: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-12 py-20">
          <Typography variant="h1" className="mb-12">
            DBDS - Design System Overview
          </Typography>
          <Typography variant="body1" className="text-slate-600 mb-16">
            디자이너를 위한 전체 디자인 시스템 미리보기
          </Typography>
          <div className="flex gap-8">
            <Badge variant="success">완성도 85%</Badge>
            <Badge variant="info">shadcn/ui inspired</Badge>
            <Badge>13 Components</Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-12 py-32">
        <Stack spacing="4xl">
          {/* 1. 컬러 시스템 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">🎨 컬러 시스템</Typography>

                <Stack spacing="3xl">
                  {/* Neutral Colors */}
                  <Stack spacing="3xl">
                    <Typography variant="h3">Neutral (Slate)</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <ColorSwatch
                        name="Slate 900"
                        color="#0F172A"
                        description="Primary text, buttons"
                      />
                      <ColorSwatch
                        name="Slate 500"
                        color="#64748B"
                        description="Secondary text"
                      />
                      <ColorSwatch
                        name="Slate 200"
                        color="#E2E8F0"
                        description="Borders"
                      />
                      <ColorSwatch
                        name="Slate 50"
                        color="#F8FAFC"
                        description="Backgrounds"
                      />
                    </div>
                  </Stack>

                  <Divider />

                  {/* Status Colors */}
                  <Stack spacing="3xl">
                    <Typography variant="h3">Status Colors</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <ColorSwatch
                        name="Success"
                        color="#10B981"
                        description="Emerald-500"
                      />
                      <ColorSwatch
                        name="Error"
                        color="#EF4444"
                        description="Red-500"
                      />
                      <ColorSwatch
                        name="Warning"
                        color="#F59E0B"
                        description="Amber-500"
                      />
                      <ColorSwatch
                        name="Info"
                        color="#3B82F6"
                        description="Blue-500"
                      />
                    </div>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 2. 타이포그래피 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">🔤 타이포그래피</Typography>

                <Stack spacing="2xl">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Typography variant="h1">
                      Heading 1 - 2.25rem (36px)
                    </Typography>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Typography variant="h2">
                      Heading 2 - 1.875rem (30px)
                    </Typography>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Typography variant="h3">
                      Heading 3 - 1.5rem (24px)
                    </Typography>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Typography variant="h4">
                      Heading 4 - 1.25rem (20px)
                    </Typography>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Typography variant="body1">
                      Body 1 - 1rem (16px) - Regular paragraph text
                    </Typography>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Typography variant="body2">
                      Body 2 - 0.875rem (14px) - Smaller paragraph
                    </Typography>
                  </div>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 3. 버튼 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">🔘 버튼 (Buttons)</Typography>

                <Stack spacing="3xl">
                  {/* Variants */}
                  <Stack spacing="xl">
                    <Typography variant="h4">Variants</Typography>
                    <Stack direction="horizontal" spacing="2xl">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </Stack>
                  </Stack>

                  <Divider />

                  {/* Sizes */}
                  <Stack spacing="xl">
                    <Typography variant="h4">Sizes</Typography>
                    <Stack direction="horizontal" spacing="2xl" align="center">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </Stack>
                  </Stack>

                  <Divider />

                  {/* States */}
                  <Stack spacing="xl">
                    <Typography variant="h4">States</Typography>
                    <Stack direction="horizontal" spacing="2xl">
                      <Button>Normal</Button>
                      <Button disabled>Disabled</Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 4. 인풋 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">📝 인풋 (Input Fields)</Typography>

                <Stack spacing="2xl" className="max-w-md">
                  <Input label="기본 입력" placeholder="이름을 입력하세요" />
                  <Input
                    label="에러 상태"
                    placeholder="이메일 입력"
                    error
                    errorMessage="이메일 형식이 올바르지 않습니다"
                  />
                  <Input label="비활성화" placeholder="수정 불가" disabled />
                  <Select
                    label="선택"
                    options={[
                      { label: '선택하세요', value: '' },
                      { label: '옵션 1', value: '1' },
                      { label: '옵션 2', value: '2' },
                    ]}
                  />
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 5. 카드 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">🃏 카드 (Cards)</Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <Card variant="default">
                    <Typography variant="h4" className="mb-2">
                      Default
                    </Typography>
                    <Typography variant="body2" className="text-slate-600">
                      기본 카드 스타일
                    </Typography>
                  </Card>
                  <Card variant="bordered">
                    <Typography variant="h4" className="mb-2">
                      Bordered
                    </Typography>
                    <Typography variant="body2" className="text-slate-600">
                      보더 강조 카드
                    </Typography>
                  </Card>
                  <Card variant="elevated">
                    <Typography variant="h4" className="mb-2">
                      Elevated
                    </Typography>
                    <Typography variant="body2" className="text-slate-600">
                      그림자가 있는 카드
                    </Typography>
                  </Card>
                </div>
              </Stack>
            </Card>
          </section>

          {/* 6. 배지 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">🏷️ 배지 (Badges)</Typography>

                <Stack direction="horizontal" spacing="2xl">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 7. 알림 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">📢 알림 (Alerts)</Typography>

                <Stack spacing="2xl">
                  <Alert variant="success" title="성공">
                    작업이 성공적으로 완료되었습니다.
                  </Alert>
                  <Alert variant="error" title="오류">
                    오류가 발생했습니다. 다시 시도해주세요.
                  </Alert>
                  <Alert variant="warning" title="경고">
                    이 작업은 되돌릴 수 없습니다.
                  </Alert>
                  <Alert variant="info" title="안내">
                    새로운 기능이 추가되었습니다.
                  </Alert>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 8. 간격 시스템 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">📏 간격 시스템 (Spacing)</Typography>

                <Stack spacing="2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-600">4px (xs)</div>
                    <div
                      className="h-2 bg-slate-900"
                      style={{ width: '4px' }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-600">8px (sm)</div>
                    <div
                      className="h-2 bg-slate-900"
                      style={{ width: '8px' }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-600">16px (md)</div>
                    <div
                      className="h-2 bg-slate-900"
                      style={{ width: '16px' }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-600">24px (lg)</div>
                    <div
                      className="h-2 bg-slate-900"
                      style={{ width: '24px' }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-600">32px (xl)</div>
                    <div
                      className="h-2 bg-slate-900"
                      style={{ width: '32px' }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-600">
                      48px (2xl)
                    </div>
                    <div
                      className="h-2 bg-slate-900"
                      style={{ width: '48px' }}
                    />
                  </div>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 9. 그림자 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">🌫️ 그림자 (Shadows)</Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                    <Typography variant="body2" className="text-slate-600">
                      shadow-sm
                    </Typography>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
                    <Typography variant="body2" className="text-slate-600">
                      shadow-md
                    </Typography>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-lg border border-slate-200">
                    <Typography variant="body2" className="text-slate-600">
                      shadow-lg
                    </Typography>
                  </div>
                </div>
              </Stack>
            </Card>
          </section>

          {/* 10. 모서리 반경 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">⭕ 모서리 반경 (Radius)</Typography>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                  <div className="p-4 bg-slate-900 text-white rounded-sm">
                    rounded-sm
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-md">
                    rounded-md
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-lg">
                    rounded-lg
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-xl">
                    rounded-xl
                  </div>
                </div>
              </Stack>
            </Card>
          </section>

          {/* 11. 실전 예시 - 폼 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">📋 실전 예시 - 로그인 폼</Typography>

                <Stack spacing="2xl" className="max-w-md mx-auto">
                  <Alert variant="info">
                    shadcn/ui 스타일이 적용된 폼 예시입니다.
                  </Alert>

                  <Input
                    label="이메일"
                    type="email"
                    placeholder="your@email.com"
                    fullWidth
                  />

                  <Input
                    label="비밀번호"
                    type="password"
                    placeholder="••••••••"
                    fullWidth
                  />

                  <Stack direction="horizontal" spacing="md">
                    <Button variant="outline" fullWidth>
                      취소
                    </Button>
                    <Button variant="primary" fullWidth>
                      로그인
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 12. 실전 예시 - 대시보드 카드 */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">
                  📊 실전 예시 - 대시보드 카드
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                  <Card variant="elevated">
                    <div className="space-y-3">
                      <Typography variant="body2" className="text-slate-600">
                        Total Revenue
                      </Typography>
                      <Typography variant="h2">$1,250</Typography>
                      <div className="flex items-center gap-2">
                        <Badge variant="success" size="sm">
                          +12.5%
                        </Badge>
                        <Typography
                          variant="caption"
                          className="text-slate-500"
                        >
                          vs last month
                        </Typography>
                      </div>
                    </div>
                  </Card>

                  <Card variant="elevated">
                    <div className="space-y-3">
                      <Typography variant="body2" className="text-slate-600">
                        New Customers
                      </Typography>
                      <Typography variant="h2">1,234</Typography>
                      <div className="flex items-center gap-2">
                        <Badge variant="error" size="sm">
                          -20%
                        </Badge>
                        <Typography
                          variant="caption"
                          className="text-slate-500"
                        >
                          vs last month
                        </Typography>
                      </div>
                    </div>
                  </Card>

                  <Card variant="elevated">
                    <div className="space-y-3">
                      <Typography variant="body2" className="text-slate-600">
                        Active Users
                      </Typography>
                      <Typography variant="h2">45,678</Typography>
                      <div className="flex items-center gap-2">
                        <Badge variant="success" size="sm">
                          +12.5%
                        </Badge>
                        <Typography
                          variant="caption"
                          className="text-slate-500"
                        >
                          vs last month
                        </Typography>
                      </div>
                    </div>
                  </Card>

                  <Card variant="elevated">
                    <div className="space-y-3">
                      <Typography variant="body2" className="text-slate-600">
                        Growth Rate
                      </Typography>
                      <Typography variant="h2">4.5%</Typography>
                      <div className="flex items-center gap-2">
                        <Badge variant="info" size="sm">
                          +4.5%
                        </Badge>
                        <Typography
                          variant="caption"
                          className="text-slate-500"
                        >
                          vs last month
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </div>
              </Stack>
            </Card>
          </section>

          {/* Footer */}
          <Stack spacing="md" className="text-center pb-8">
            <Divider label="DBDS Design System" />
            <Typography variant="body2" className="text-slate-500">
              shadcn/ui inspired • 완성도 85% • 프로덕션 준비 완료
            </Typography>
          </Stack>
        </Stack>
      </div>
    </div>
  ),
};

// 컬러 팔레트만 (figr 스타일)
export const ColorPalette: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* 왼쪽: 설명 */}
        <div className="p-16 flex flex-col justify-center bg-white">
          <Typography
            variant="caption"
            className="text-slate-500 mb-4 uppercase tracking-wider"
          >
            DBDS Design System
          </Typography>
          <Typography variant="h1" className="mb-8">
            Color System
          </Typography>
          <Typography
            variant="body1"
            className="text-slate-600 mb-12 leading-relaxed"
          >
            A color palette is a carefully curated set of colors that work
            harmoniously together, designed to convey brand identity and enhance
            user experience through consistent visual language.
          </Typography>

          <Stack spacing="3xl">
            <div>
              <Typography variant="h4" className="font-bold mb-3">
                Neutral Colors (Slate)
              </Typography>
              <Typography
                variant="body2"
                className="text-slate-600 leading-relaxed"
              >
                Gray scale is foundational in UI design, used for text
                hierarchy, form fields, backgrounds, and dividers to create
                visual structure.
              </Typography>
            </div>

            <div>
              <Typography variant="h4" className="font-bold mb-3">
                Status Colors (Semantic)
              </Typography>
              <Typography
                variant="body2"
                className="text-slate-600 leading-relaxed"
              >
                Highlight semantic states to provide immediate visual feedback
                during interface use— success (green), error (red), warning
                (amber), and information (blue).
              </Typography>
            </div>

            <div>
              <Typography variant="h4" className="font-bold mb-3">
                Chart Colors
              </Typography>
              <Typography
                variant="body2"
                className="text-slate-600 leading-relaxed"
              >
                Specialized colors for data visualization, ensuring clarity and
                accessibility in complex charts and diagrams.
              </Typography>
            </div>
          </Stack>
        </div>

        {/* 오른쪽: 색상 팔레트 */}
        <div className="p-16 bg-slate-50 overflow-y-auto">
          <Stack spacing="2xl">
            {/* Neutral (Slate) */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-slate-900"
              >
                Neutral
              </Typography>
              <div className="grid grid-cols-5 gap-4">
                <ColorSwatch name="50" color="#F8FAFC" />
                <ColorSwatch name="100" color="#F1F5F9" />
                <ColorSwatch name="200" color="#E2E8F0" />
                <ColorSwatch name="300" color="#CBD5E1" />
                <ColorSwatch name="400" color="#94A3B8" />
                <ColorSwatch name="500" color="#64748B" />
                <ColorSwatch name="600" color="#475569" />
                <ColorSwatch name="700" color="#334155" />
                <ColorSwatch name="800" color="#1E293B" />
                <ColorSwatch name="900" color="#0F172A" />
              </div>
            </Card>

            {/* Success */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-emerald-600"
              >
                Success
              </Typography>
              <div className="grid grid-cols-3 gap-6">
                <ColorSwatch
                  name="Light"
                  color="#D1FAE5"
                  description="Emerald-100"
                />
                <ColorSwatch
                  name="Default"
                  color="#10B981"
                  description="Emerald-500"
                />
                <ColorSwatch
                  name="Dark"
                  color="#065F46"
                  description="Emerald-800"
                />
              </div>
            </Card>

            {/* Error */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-red-600"
              >
                Error
              </Typography>
              <div className="grid grid-cols-3 gap-6">
                <ColorSwatch
                  name="Light"
                  color="#FEE2E2"
                  description="Red-100"
                />
                <ColorSwatch
                  name="Default"
                  color="#EF4444"
                  description="Red-500"
                />
                <ColorSwatch
                  name="Dark"
                  color="#991B1B"
                  description="Red-800"
                />
              </div>
            </Card>

            {/* Warning */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-amber-600"
              >
                Warning
              </Typography>
              <div className="grid grid-cols-3 gap-6">
                <ColorSwatch
                  name="Light"
                  color="#FEF3C7"
                  description="Amber-100"
                />
                <ColorSwatch
                  name="Default"
                  color="#F59E0B"
                  description="Amber-500"
                />
                <ColorSwatch
                  name="Dark"
                  color="#92400E"
                  description="Amber-800"
                />
              </div>
            </Card>

            {/* Info */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-blue-600"
              >
                Info
              </Typography>
              <div className="grid grid-cols-3 gap-6">
                <ColorSwatch
                  name="Light"
                  color="#DBEAFE"
                  description="Blue-100"
                />
                <ColorSwatch
                  name="Default"
                  color="#3B82F6"
                  description="Blue-500"
                />
                <ColorSwatch
                  name="Dark"
                  color="#1E40AF"
                  description="Blue-800"
                />
              </div>
            </Card>
          </Stack>
        </div>
      </div>
    </div>
  ),
};

// 컴포넌트 갤러리 (figr 스타일)
export const ComponentShowcase: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* 왼쪽: 설명 */}
        <div className="p-16 flex flex-col justify-center bg-white">
          <Typography
            variant="caption"
            className="text-slate-500 mb-4 uppercase tracking-wider"
          >
            DBDS Design System
          </Typography>
          <Typography variant="h1" className="mb-8">
            Components
          </Typography>
          <Typography
            variant="body1"
            className="text-slate-600 mb-12 leading-relaxed"
          >
            A comprehensive collection of reusable UI components built with
            React, TypeScript, and Tailwind CSS, following atomic design
            principles for maximum flexibility and consistency.
          </Typography>

          <Stack spacing="3xl">
            <div>
              <Typography variant="h4" className="font-bold mb-3">
                Atoms (11 components)
              </Typography>
              <Typography
                variant="body2"
                className="text-slate-600 leading-relaxed"
              >
                Basic building blocks—Button, Input, Badge, Typography, and
                more. These fundamental elements form the foundation of your
                interface.
              </Typography>
            </div>

            <div>
              <Typography variant="h4" className="font-bold mb-3">
                Molecules (2 components)
              </Typography>
              <Typography
                variant="body2"
                className="text-slate-600 leading-relaxed"
              >
                Combined atoms creating functional units—Card and Stack
                components for layout and content organization.
              </Typography>
            </div>

            <div>
              <Typography variant="h4" className="font-bold mb-3">
                Organisms (2 components)
              </Typography>
              <Typography
                variant="body2"
                className="text-slate-600 leading-relaxed"
              >
                Complex, feature-rich components—Modal and Toast with global
                state management for advanced interactions.
              </Typography>
            </div>
          </Stack>
        </div>

        {/* 오른쪽: 컴포넌트 쇼케이스 */}
        <div className="p-16 bg-slate-50 overflow-y-auto">
          <Stack spacing="2xl">
            {/* Buttons */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-slate-900"
              >
                Buttons
              </Typography>
              <Stack spacing="xl">
                <Stack direction="horizontal" spacing="md">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </Stack>
                <Stack direction="horizontal" spacing="md">
                  <Button variant="primary" size="sm">
                    Small
                  </Button>
                  <Button variant="primary" size="md">
                    Medium
                  </Button>
                  <Button variant="primary" size="lg">
                    Large
                  </Button>
                </Stack>
              </Stack>
            </Card>

            {/* Form Elements */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-slate-900"
              >
                Form Elements
              </Typography>
              <Stack spacing="xl">
                <Input label="Name" placeholder="Enter your name" />
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                />
                <Select
                  label="Department"
                  options={[
                    { label: 'Select...', value: '' },
                    { label: 'Engineering', value: 'eng' },
                    { label: 'Design', value: 'design' },
                  ]}
                />
              </Stack>
            </Card>

            {/* Badges */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-slate-900"
              >
                Badges
              </Typography>
              <Stack direction="horizontal" spacing="md">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </Stack>
            </Card>

            {/* Alerts */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-slate-900"
              >
                Alerts
              </Typography>
              <Stack spacing="md">
                <Alert variant="success" title="Success">
                  Operation completed successfully
                </Alert>
                <Alert variant="error" title="Error">
                  Something went wrong
                </Alert>
                <Alert variant="warning" title="Warning">
                  Please review before proceeding
                </Alert>
                <Alert variant="info" title="Info">
                  New features available
                </Alert>
              </Stack>
            </Card>

            {/* Typography */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-slate-900"
              >
                Typography
              </Typography>
              <Stack spacing="md">
                <Typography variant="h1">Heading 1</Typography>
                <Typography variant="h2">Heading 2</Typography>
                <Typography variant="h3">Heading 3</Typography>
                <Typography variant="body1">
                  Body text with regular weight
                </Typography>
                <Typography variant="body2">Smaller body text</Typography>
                <Typography variant="caption">Caption text</Typography>
              </Stack>
            </Card>

            {/* Card Variants */}
            <Card variant="elevated" padding="lg">
              <Typography
                variant="h4"
                className="font-bold mb-6 uppercase tracking-wide text-slate-900"
              >
                Card Variants
              </Typography>
              <Stack spacing="md">
                <Card variant="default" padding="md">
                  <Typography variant="body2">Default Card</Typography>
                </Card>
                <Card variant="bordered" padding="md">
                  <Typography variant="body2">Bordered Card</Typography>
                </Card>
                <Card variant="elevated" padding="md">
                  <Typography variant="body2">Elevated Card</Typography>
                </Card>
              </Stack>
            </Card>
          </Stack>
        </div>
      </div>
    </div>
  ),
};
