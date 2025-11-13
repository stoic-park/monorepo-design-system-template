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

Based on [shadcn/ui](https://ui.shadcn.com/colors) and Tailwind CSS color palette.

```typescript
import { colors } from '@design-system/tokens';

// Pure colors
colors.white; // '#FFFFFF'
colors.black; // '#000000'

// Neutral colors (Slate - primary)
colors.slate[50]; // '#F8FAFC' - Lightest
colors.slate[500]; // '#64748B' - Medium
colors.slate[900]; // '#0F172A' - Darkest

// Alternative neutrals
colors.gray[500]; // '#6B7280'
colors.zinc[500]; // '#71717A'

// Semantic colors
colors.success.DEFAULT; // '#10B981' - Emerald-500
colors.error.DEFAULT; // '#EF4444' - Red-500
colors.warning.DEFAULT; // '#F59E0B' - Amber-500
colors.info.DEFAULT; // '#3B82F6' - Blue-500

// Chart colors (data visualization)
colors.chart[1]; // Slate-900
colors.chart[2]; // Blue-500
colors.chart[3]; // Emerald-500
// ... up to colors.chart[10]
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

## 🚀 Deployment

### Docker Compose로 배포

```bash
# 배포
docker-compose up -d

# 확인
curl http://localhost/health
```

**접속:** http://localhost

### 자동 배포 스크립트

```bash
./deploy/scripts/deploy.sh
```

**백업/복구:**

```bash
./deploy/scripts/backup.sh
./deploy/scripts/restore.sh [backup_file]
```

**모니터링:**

```bash
./deploy/scripts/monitoring-setup.sh
docker-compose -f docker-compose.monitoring.yml up -d
```

- Grafana: http://localhost:3001
- Prometheus: http://localhost:9090

더 자세한 내용은 [아키텍처 가이드](./docs/ARCHITECTURE.md) 참고

---

## Documentation

- [아키텍처 & 배포 가이드](./docs/ARCHITECTURE.md)
- [Linting and Formatting](./docs/guides/LINTING_AND_FORMATTING.md)
- [Design System Overview](./docs/design-system/OVERVIEW.md)

---

## 커스터마이징

이 템플릿은 프로젝트에 맞게 커스터마이징하도록 설계되었습니다.

### 주요 커스터마이징 포인트

- 브랜드 색상으로 디자인 토큰 변경 (`packages/tokens`)
- 커스텀 컴포넌트 추가 (`packages/components`)
- 새 앱 추가 (`apps/` - [가이드](./docs/ARCHITECTURE.md#새-앱-추가하기) 참고)
- 상태 관리 라이브러리 통합
- 테스트 프레임워크 추가

---

## License

MIT License - feel free to use this template for your projects!

---

## Credits

- Built with [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build/)
- UI components powered by [Tailwind CSS](https://tailwindcss.com/)

---

## 🎨 Figma Integration

이 디자인 시스템의 모든 토큰을 Figma로 내보낼 수 있습니다.

### 토큰 Export

```bash
# Figma Tokens Studio 형식으로 export
pnpm export:figma
```

생성된 `figma-tokens.json` 파일을 Figma에서 사용할 수 있습니다.

### Figma에서 Import 방법

1. **Figma Tokens Studio 플러그인 설치**
   - Figma → Plugins → Browse plugins
   - "Tokens Studio for Figma" 검색 및 설치

2. **토큰 Import**
   - 플러그인 열기
   - Settings → Load from JSON/File
   - `figma-tokens.json` 파일 선택
   - "Apply to document" 클릭

3. **결과**
   - ✅ 모든 색상이 Figma Color Styles로 생성됨
   - ✅ Typography가 Text Styles로 생성됨
   - ✅ Spacing, Shadows, Radius가 토큰으로 적용됨

### 양방향 동기화

Figma에서 토큰을 수정한 후, JSON을 다시 export하여 코드에 반영할 수 있습니다.

**워크플로우:**

```
코드 → figma-tokens.json → Figma
Figma → figma-tokens.json → 코드
```

---

## Related

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turborepo Handbook](https://turbo.build/repo/docs/handbook)
- [Design Tokens](https://spectrum.adobe.com/page/design-tokens/)
- [Tokens Studio for Figma](https://tokens.studio/)
- [Radix UI](https://www.radix-ui.com/)

---

Happy coding!
