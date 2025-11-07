import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToastProvider, useToast, Button } from '@design-system/components';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastProvider>;

export default meta;

const ToastDemo = () => {
  const toast = useToast();

  return (
    <div className="flex flex-col gap-3 p-8">
      <h3 className="text-lg font-bold mb-2">Toast ?åÏä§??/h3>

      <Button onClick={() => toast.success('?ëÏóÖ???ÑÎ£å?òÏóà?µÎãà??)}>
        Success Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => toast.error('?§Î•òÍ∞Ä Î∞úÏÉù?àÏäµ?àÎã§')}
      >
        Error Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => toast.warning('Ï£ºÏùòÍ∞Ä ?ÑÏöî?©Îãà??)}
      >
        Warning Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => toast.info('?àÎ°ú???åÎ¶º???àÏäµ?àÎã§')}
      >
        Info Toast
      </Button>

      <Button
        variant="ghost"
        onClick={() => toast.success('?Ä?•Îêò?àÏäµ?àÎã§', '?±Í≥µ')}
      >
        Toast with Title
      </Button>

      <Button
        variant="ghost"
        onClick={() => {
          toast.success('Ï≤?Î≤àÏß∏ ?åÎ¶º');
          setTimeout(() => toast.info('??Î≤àÏß∏ ?åÎ¶º'), 500);
          setTimeout(() => toast.warning('??Î≤àÏß∏ ?åÎ¶º'), 1000);
        }}
      >
        Multiple Toasts
      </Button>
    </div>
  );
};

export const Interactive: StoryObj = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const Usage: StoryObj = {
  render: () => (
    <div className="p-8 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Toast ?¨Ïö© Î∞©Î≤ï</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">1. Provider ?§Ï†ï</h3>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-auto">
            {`import { ToastProvider } from '@design-system/components';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}`}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold mb-2">2. Toast ?∏Ï∂ú</h3>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-auto">
            {`import { useToast } from '@design-system/components';

function MyComponent() {
  const toast = useToast();

  const handleSave = () => {
    toast.success('?Ä?•Îêò?àÏäµ?àÎã§');
    // toast.error('?§Î•ò Î∞úÏÉù');
    // toast.warning('Í≤ΩÍ≥†');
    // toast.info('?ïÎ≥¥');
  };
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
};
