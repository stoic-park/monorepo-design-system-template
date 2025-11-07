# Monorepo Design System Template

A production-ready monorepo template with a minimal design system, built with **pnpm**, **Turborepo**, **React**, and **Tailwind CSS**.

## Features

### Monorepo Structure

- **pnpm Workspaces** - Efficient dependency management
- **Turborepo** - Fast, smart build system
- **TypeScript** - Type safety across packages

### Design System

- **Design Tokens** - Colors, typography, spacing, shadows, radius
- **React Components** - 15+ reusable UI components
- **Tailwind Theme** - Shared configuration

### Developer Experience

- **ESLint & Prettier** - Code quality and formatting
- **Storybook** - Component documentation and development
- **Hot Module Replacement** - Fast development feedback

---

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

```bash
# Install pnpm globally
npm install -g pnpm
```

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Run Storybook (component development)
pnpm storybook

# Format code
pnpm format

# Lint code
pnpm lint

# Build all packages
pnpm build
```

---

## Project Structure

```
monorepo-design-system-template/
├── apps/
│   └── storybook/              # Component documentation
├── packages/
│   ├── tokens/                 # Design tokens (colors, spacing, etc.)
│   ├── components/             # React UI components
│   └── theme/                  # Tailwind CSS preset
├── docs/                       # Documentation
├── package.json                # Root workspace config
├── pnpm-workspace.yaml         # pnpm workspace config
└── turbo.json                  # Turborepo config
```

---

## Packages

### `@design-system/tokens`

Design tokens for consistent styling across applications.

```typescript
import {
  colors,
  typography,
  spacing,
  shadows,
  radius,
} from '@design-system/tokens';
```

**Features:**

- Colors (Minimal black & white with functional accents)
- Typography (font family, size, weight, line height)
- Spacing (consistent spacing scale)
- Shadows (elevation system)
- Border Radius (rounded corners)

---

### `@design-system/components`

React UI component library with minimal design.

```typescript
import { Button, Input, Card, Badge, Alert } from '@design-system/components';
```

**Components:**

- Button, Input, TextArea, Select
- Card, Badge, Alert
- Modal, Toast
- Checkbox, Radio
- Typography, Divider, Stack
- Spinner

---

### `@design-system/theme`

Tailwind CSS preset with design tokens.

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@design-system/theme')],
  content: ['./src/**/*.{ts,tsx}'],
};
```

---

## Design Tokens

### Color System

Minimal black & white design with functional accent colors.

```typescript
import { colors } from '@design-system/tokens';

// Pure black & white
colors.black; // '#000000'
colors.white; // '#FFFFFF'

// Gray scale
colors.gray[50]; // Lightest
colors.gray[500]; // Medium
colors.gray[900]; // Darkest

// Functional colors (for status indication only)
colors.chart.success.DEFAULT; // Green
colors.chart.error.DEFAULT; // Red
colors.chart.warning.DEFAULT; // Orange
colors.chart.info.DEFAULT; // Blue
```

---

## Development Workflow

### Adding a New Component

1. Create component in `packages/components/src/YourComponent/`
2. Export from `packages/components/src/index.ts`
3. Build the package: `cd packages/components && pnpm build`
4. Add Storybook story in `apps/storybook/stories/`

### Creating a New App

1. Create app folder: `apps/your-app/`
2. Add to `pnpm-workspace.yaml`
3. Install dependencies: `pnpm install`
4. Use design system packages:

```json
{
  "dependencies": {
    "@design-system/components": "workspace:*",
    "@design-system/tokens": "workspace:*",
    "@design-system/theme": "workspace:*"
  }
}
```

---

## Documentation

- [Getting Started](./docs/guides/GETTING_STARTED.md)
- [Monorepo Dependency Strategy](./docs/guides/MONOREPO_DEPENDENCY_STRATEGY.md)
- [Linting and Formatting](./docs/guides/LINTING_AND_FORMATTING.md)
- [Design System Overview](./docs/design-system/OVERVIEW.md)

---

## Contributing

This template is designed to be forked and customized for your projects.

### Customization Ideas

- Replace color tokens with your brand colors
- Add custom components
- Integrate your preferred state management
- Add testing frameworks (Vitest, Jest)
- Add E2E testing (Playwright, Cypress)

---

## License

MIT License - feel free to use this template for your projects!

---

## Credits

- Built with [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build/)
- UI components powered by [Tailwind CSS](https://tailwindcss.com/)

---

## Related

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turborepo Handbook](https://turbo.build/repo/docs/handbook)
- [Design Tokens](https://spectrum.adobe.com/page/design-tokens/)

---

Happy coding!
