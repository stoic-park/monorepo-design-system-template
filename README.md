# ?렓 Monorepo Design System Template

A production-ready monorepo template with a minimal design system, built with **pnpm**, **Turborepo**, **React**, and **Tailwind CSS**.

## ??Features

### ?벀 Monorepo Structure
- **pnpm Workspaces** - Efficient dependency management
- **Turborepo** - Fast, smart build system
- **TypeScript** - Type safety across packages

### ?렓 Design System
- **Design Tokens** - Colors, typography, spacing, shadows, radius
- **React Components** - 15+ reusable UI components
- **Charts** - ECharts-based chart library
- **Tailwind Theme** - Shared configuration

### ?썱截?Developer Experience
- **ESLint & Prettier** - Code quality and formatting
- **Storybook** - Component documentation and development
- **Hot Module Replacement** - Fast development feedback

---

## ?? Quick Start

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

## ?뱚 Project Structure

```
monorepo-design-system-template/
?쒋?? apps/
??  ?붴?? storybook/              # Component documentation
?쒋?? packages/
??  ?쒋?? tokens/                 # Design tokens (colors, spacing, etc.)
??  ?쒋?? components/             # React UI components
??  ?쒋?? charts/                 # ECharts-based charts
??  ?붴?? theme/                  # Tailwind CSS preset
?쒋?? docs/                       # Documentation
?쒋?? package.json                # Root workspace config
?쒋?? pnpm-workspace.yaml         # pnpm workspace config
?붴?? turbo.json                  # Turborepo config
```

---

## ?벀 Packages

### `@dbds/tokens`

Design tokens for consistent styling across applications.

```typescript
import { colors, typography, spacing, shadows, radius } from '@dbds/tokens';
```

**Features:**
- Colors (Classic & shadcn/ui inspired)
- Typography (font family, size, weight, line height)
- Spacing (consistent spacing scale)
- Shadows (elevation system)
- Border Radius (rounded corners)

---

### `@dbds/components`

React UI component library with minimal design.

```typescript
import { Button, Input, Card, Badge, Alert } from '@dbds/components';
```

**Components:**
- Button, Input, TextArea, Select
- Card, Badge, Alert
- Modal, Toast
- Checkbox, Radio
- Typography, Divider, Stack
- Spinner

---

### `@dbds/charts`

ECharts-based chart library with design system integration.

```typescript
import { EChart, barChartTemplate, lineChartTemplate } from '@dbds/charts';
```

**Features:**
- Bar, Line, Scatter charts
- Gantt, Calendar Heatmap, Radar charts
- Design token integration
- TypeScript support

---

### `@dbds/theme`

Tailwind CSS preset with design tokens.

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@dbds/theme')],
  content: ['./src/**/*.{ts,tsx}'],
};
```

---

## ?렓 Design Tokens

### Color Systems

The template includes two color systems:

#### 1. Classic (Default)
Minimal black & white design.

```typescript
import { colors } from '@dbds/tokens';
// colors.black = '#000000'
// colors.white = '#FFFFFF'
```

#### 2. shadcn/ui Inspired
Modern slate-based color palette.

```typescript
import { colorsShadcn } from '@dbds/tokens';
// colorsShadcn.primary.DEFAULT = '#0F172A'
```

### Switching Color Systems

```typescript
// In packages/tokens/src/index.ts
// Change the default export:
export { colorsShadcn as colors } from './colors-shadcn';
```

---

## ?썱截?Development Workflow

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
    "@dbds/components": "workspace:*",
    "@dbds/tokens": "workspace:*",
    "@dbds/theme": "workspace:*"
  }
}
```

---

## ?뱴 Documentation

- [Getting Started](./docs/guides/GETTING_STARTED.md)
- [Monorepo Dependency Strategy](./docs/guides/MONOREPO_DEPENDENCY_STRATEGY.md)
- [Linting and Formatting](./docs/guides/LINTING_AND_FORMATTING.md)
- [Design System Overview](./docs/design-system/OVERVIEW.md)

---

## ?쩃 Contributing

This template is designed to be forked and customized for your projects.

### Customization Ideas

- Replace color tokens with your brand colors
- Add custom components
- Integrate your preferred state management
- Add testing frameworks (Vitest, Jest)
- Add E2E testing (Playwright, Cypress)

---

## ?뱞 License

MIT License - feel free to use this template for your projects!

---

## ?솋 Credits

- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Built with [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build/)
- UI components powered by [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Apache ECharts](https://echarts.apache.org/)

---

## ?뵕 Related

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turborepo Handbook](https://turbo.build/repo/docs/handbook)
- [Design Tokens](https://spectrum.adobe.com/page/design-tokens/)

---

Happy coding! ??
