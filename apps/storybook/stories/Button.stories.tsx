import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@design-system/components';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'sidebar'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },

    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
      description: 'Active state (for sidebar variant)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ê¸°ë³¸ ë²„íŠ¼
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

// ?†• Sidebar Variant
export const Sidebar: Story = {
  args: {
    children: 'Sidebar Button',
    variant: 'sidebar',
    active: false,
  },
};

export const SidebarActive: Story = {
  args: {
    children: 'Active Sidebar Button',
    variant: 'sidebar',
    active: true,
  },
};

// ?¬ê¸°
export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

// ?íƒœ
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    variant: 'primary',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// Alignment Examples ?†•
export const AlignmentExamples: Story = {
  args: {
    children: 'Alignment Examples',
  },
  render: () => (
    <div className="w-96 space-y-2 p-4 bg-white border border-slate-200 rounded-lg">
      <Button variant="primary" align="left" fullWidth>
        Left Aligned Button
      </Button>
      <Button variant="primary" align="center" fullWidth>
        Center Aligned Button (Default)
      </Button>
      <Button variant="primary" align="right" fullWidth>
        Right Aligned Button
      </Button>
    </div>
  ),
};

// Sidebar Examples
export const SidebarExamples: Story = {
  args: {
    children: 'Sidebar Examples',
  },
  render: () => (
    <div className="w-64 space-y-2 p-4 bg-white border border-slate-200 rounded-lg">
      <Button variant="sidebar" align="left" fullWidth>
        Dashboard
      </Button>
      <Button variant="sidebar" align="left" active fullWidth>
        Analytics (Active)
      </Button>
      <Button variant="sidebar" align="left" fullWidth>
        Settings
      </Button>
      <div className="ml-4 space-y-1">
        <Button variant="sidebar" align="left" fullWidth className="text-sm">
          Sub Menu 1
        </Button>
        <Button
          variant="sidebar"
          align="left"
          active
          fullWidth
          className="text-sm"
        >
          Sub Menu 2 (Active)
        </Button>
        <Button variant="sidebar" align="left" fullWidth className="text-sm">
          Sub Menu 3
        </Button>
      </div>
    </div>
  ),
};
