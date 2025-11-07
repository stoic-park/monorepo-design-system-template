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
} from '@design-system/components';

/**
 * ?îÏûê???úÏä§??Í∞úÏöî
 *
 * ?îÏûê?¥ÎÑàÎ•??ÑÌïú ?ÑÏ≤¥ ?îÏûê???úÏä§??ÎØ∏Î¶¨Î≥¥Í∏∞
 * - Ïª¨Îü¨ ?îÎ†à?? * - ?Ä?¥Ìè¨Í∑∏Îûò?? * - Ïª¥Ìè¨?åÌä∏ Î≥Ä?? * - ?àÏù¥?ÑÏõÉ ?àÏãú
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

// Ïª¨Îü¨ ?îÎ†à??Ïª¥Ìè¨?åÌä∏
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

// ?ÑÏ≤¥ ?îÏûê???úÏä§??Í∞úÏöî
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
            ?îÏûê?¥ÎÑàÎ•??ÑÌïú ?ÑÏ≤¥ ?îÏûê???úÏä§??ÎØ∏Î¶¨Î≥¥Í∏∞
          </Typography>
          <div className="flex gap-8">
            <Badge variant="success">?ÑÏÑ±??85%</Badge>
            <Badge variant="info">shadcn/ui inspired</Badge>
            <Badge>13 Components</Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-12 py-32">
        <Stack spacing="4xl">
          {/* 1. Ïª¨Îü¨ ?úÏä§??*/}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?é® Ïª¨Îü¨ ?úÏä§??/Typography>

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

          {/* 2. ?Ä?¥Ìè¨Í∑∏Îûò??*/}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?î§ ?Ä?¥Ìè¨Í∑∏Îûò??/Typography>

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

          {/* 3. Î≤ÑÌäº */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?îò Î≤ÑÌäº (Buttons)</Typography>

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

          {/* 4. ?∏Ìíã */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?ìù ?∏Ìíã (Input Fields)</Typography>

                <Stack spacing="2xl" className="max-w-md">
                  <Input label="Í∏∞Î≥∏ ?ÖÎ†•" placeholder="?¥Î¶Ñ???ÖÎ†•?òÏÑ∏?? />
                  <Input
                    label="?êÎü¨ ?ÅÌÉú"
                    placeholder="?¥Î©î???ÖÎ†•"
                    error
                    errorMessage="?¥Î©î???ïÏãù???¨Î∞îÎ•¥Ï? ?äÏäµ?àÎã§"
                  />
                  <Input label="ÎπÑÌôú?±Ìôî" placeholder="?òÏ†ï Î∂àÍ?" disabled />
                  <Select
                    label="?†ÌÉù"
                    options={[
                      { label: '?†ÌÉù?òÏÑ∏??, value: '' },
                      { label: '?µÏÖò 1', value: '1' },
                      { label: '?µÏÖò 2', value: '2' },
                    ]}
                  />
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 5. Ïπ¥Îìú */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?Éè Ïπ¥Îìú (Cards)</Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <Card variant="default">
                    <Typography variant="h4" className="mb-2">
                      Default
                    </Typography>
                    <Typography variant="body2" className="text-slate-600">
                      Í∏∞Î≥∏ Ïπ¥Îìú ?§Ì???                    </Typography>
                  </Card>
                  <Card variant="bordered">
                    <Typography variant="h4" className="mb-2">
                      Bordered
                    </Typography>
                    <Typography variant="body2" className="text-slate-600">
                      Î≥¥Îçî Í∞ïÏ°∞ Ïπ¥Îìú
                    </Typography>
                  </Card>
                  <Card variant="elevated">
                    <Typography variant="h4" className="mb-2">
                      Elevated
                    </Typography>
                    <Typography variant="body2" className="text-slate-600">
                      Í∑∏Î¶º?êÍ? ?àÎäî Ïπ¥Îìú
                    </Typography>
                  </Card>
                </div>
              </Stack>
            </Card>
          </section>

          {/* 6. Î∞∞Ï? */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?è∑Ô∏?Î∞∞Ï? (Badges)</Typography>

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

          {/* 7. ?åÎ¶º */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?ì¢ ?åÎ¶º (Alerts)</Typography>

                <Stack spacing="2xl">
                  <Alert variant="success" title="?±Í≥µ">
                    ?ëÏóÖ???±Í≥µ?ÅÏúºÎ°??ÑÎ£å?òÏóà?µÎãà??
                  </Alert>
                  <Alert variant="error" title="?§Î•ò">
                    ?§Î•òÍ∞Ä Î∞úÏÉù?àÏäµ?àÎã§. ?§Ïãú ?úÎèÑ?¥Ï£º?∏Ïöî.
                  </Alert>
                  <Alert variant="warning" title="Í≤ΩÍ≥†">
                    ???ëÏóÖ?Ä ?òÎèåÎ¶????ÜÏäµ?àÎã§.
                  </Alert>
                  <Alert variant="info" title="?àÎÇ¥">
                    ?àÎ°ú??Í∏∞Îä•??Ï∂îÍ??òÏóà?µÎãà??
                  </Alert>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 8. Í∞ÑÍ≤© ?úÏä§??*/}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?ìè Í∞ÑÍ≤© ?úÏä§??(Spacing)</Typography>

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

          {/* 9. Í∑∏Î¶º??*/}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?å´Ô∏?Í∑∏Î¶º??(Shadows)</Typography>

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

          {/* 10. Î™®ÏÑúÎ¶?Î∞òÍ≤Ω */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">‚≠?Î™®ÏÑúÎ¶?Î∞òÍ≤Ω (Radius)</Typography>

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

          {/* 11. ?§Ï†Ñ ?àÏãú - ??*/}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">?ìã ?§Ï†Ñ ?àÏãú - Î°úÍ∑∏????/Typography>

                <Stack spacing="2xl" className="max-w-md mx-auto">
                  <Alert variant="info">
                    shadcn/ui ?§Ì??ºÏù¥ ?ÅÏö©?????àÏãú?ÖÎãà??
                  </Alert>

                  <Input
                    label="?¥Î©î??
                    type="email"
                    placeholder="your@email.com"
                    fullWidth
                  />

                  <Input
                    label="ÎπÑÎ?Î≤àÌò∏"
                    type="password"
                    placeholder="?¢‚Ä¢‚Ä¢‚Ä¢‚Ä¢‚Ä¢‚Ä¢‚Ä?
                    fullWidth
                  />

                  <Stack direction="horizontal" spacing="md">
                    <Button variant="outline" fullWidth>
                      Ï∑®ÏÜå
                    </Button>
                    <Button variant="primary" fullWidth>
                      Î°úÍ∑∏??                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </section>

          {/* 12. ?§Ï†Ñ ?àÏãú - ?Ä?úÎ≥¥??Ïπ¥Îìú */}
          <section>
            <Card variant="elevated" padding="lg">
              <Stack spacing="3xl" className="p-10">
                <Typography variant="h2">
                  ?ìä ?§Ï†Ñ ?àÏãú - ?Ä?úÎ≥¥??Ïπ¥Îìú
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
              shadcn/ui inspired ???ÑÏÑ±??85% ???ÑÎ°ú?ïÏÖò Ï§ÄÎπ??ÑÎ£å
            </Typography>
          </Stack>
        </Stack>
      </div>
    </div>
  ),
};

// Ïª¨Îü¨ ?îÎ†à?∏Îßå (figr ?§Ì???
export const ColorPalette: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* ?ºÏ™Ω: ?§Î™Ö */}
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
                during interface use??success (green), error (red), warning
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

        {/* ?§Î•∏Ï™? ?âÏÉÅ ?îÎ†à??*/}
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

// Ïª¥Ìè¨?åÌä∏ Í∞§Îü¨Î¶?(figr ?§Ì???
export const ComponentShowcase: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* ?ºÏ™Ω: ?§Î™Ö */}
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
                Basic building blocks?îButton, Input, Badge, Typography, and
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
                Combined atoms creating functional units?îCard and Stack
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
                Complex, feature-rich components?îModal and Toast with global
                state management for advanced interactions.
              </Typography>
            </div>
          </Stack>
        </div>

        {/* ?§Î•∏Ï™? Ïª¥Ìè¨?åÌä∏ ?ºÏ??¥Ïä§ */}
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
