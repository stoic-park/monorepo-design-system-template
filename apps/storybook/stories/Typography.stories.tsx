import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@design-system/components';
import React from 'react';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body1',
        'body2',
        'caption',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled'],
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1 - Regular paragraph text',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2 - Smaller paragraph text',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption - Small supplementary text',
  },
};

export const SecondaryColor: Story = {
  args: {
    variant: 'body1',
    color: 'secondary',
    children: 'Secondary text color',
  },
};

export const DisabledColor: Story = {
  args: {
    variant: 'body1',
    color: 'disabled',
    children: 'Disabled text color',
  },
};

export const AllHeadings: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const AllWeights: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-2 w-96">
      <Typography weight="light">Light weight text</Typography>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
    </div>
  ),
};

export const AllAlignments: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
    </div>
  ),
};

export const ArticleExample: Story = {
  args: { children: '' },
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Typography variant="h1">The Art of Minimal Design</Typography>
      <Typography variant="body2" color="secondary">
        By Design Team · 5 min read
      </Typography>
      <Typography variant="h3" className="mt-6">
        Introduction
      </Typography>
      <Typography variant="body1">
        Minimal design is not about using less, it&apos;s about making every
        element count. In a world filled with visual noise, simplicity becomes a
        powerful tool for communication.
      </Typography>
      <Typography variant="body1">
        The black and white color scheme enforces focus and eliminates
        distractions, allowing content to take center stage.
      </Typography>
      <Typography variant="caption" color="secondary" className="mt-6">
        Last updated: November 5, 2025
      </Typography>
    </div>
  ),
};
