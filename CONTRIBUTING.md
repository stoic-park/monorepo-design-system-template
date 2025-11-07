# Contributing

This template is designed to be customized for your own projects. Here are some ideas for customization:

## Customization Ideas

### 1. Brand Colors

Replace the default colors with your brand colors:

```typescript
// packages/tokens/src/colors.ts
export const colors = {
  primary: {
    DEFAULT: '#YOUR_BRAND_COLOR',
    // ...
  },
};
```

### 2. Add More Components

Create new components in `packages/components/src/`:
- Dropdown
- Tabs
- Accordion
- DatePicker
- etc.

### 3. State Management

Add your preferred state management:
- Zustand
- Redux Toolkit
- Jotai
- Recoil

### 4. Testing

Add testing frameworks:
- Vitest for unit tests
- Playwright or Cypress for E2E tests
- React Testing Library for component tests

### 5. Documentation

Add more documentation:
- API documentation
- Component usage examples
- Design guidelines
- Contribution guidelines

## Naming Conventions

When customizing, consider changing:
- Package scope: `@design-system/*` to `@your-company/*`
- Component prefix: if needed
- File naming conventions

## Keeping Up to Date

Since this is a template, not a library:
1. Fork or copy the template
2. Customize for your needs
3. Maintain your own version

## Sharing Improvements

If you make improvements that could benefit others:
1. Create a GitHub repository
2. Share your customized version
3. Document your changes

---

Happy customizing!
