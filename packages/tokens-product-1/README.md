# @design-system/tokens-product-1

Product 1 전용 디자인 토큰 패키지

## 브랜드 컬러

**St Tropaz** - 제품 1의 브랜드 컬러

- Primary: `#3B79BC` (st-tropaz-500)
- 팔레트: 50-950 shade 제공

## 사용법

```typescript
import { colors, typography, spacing } from '@design-system/tokens-product-1';

// 브랜드 컬러 사용
const primaryColor = colors.primary.DEFAULT; // #3B79BC

// 브랜드 팔레트 사용
const brandLight = colors.brand[100]; // #E6EDF8
const brandDark = colors.brand[900];  // #20395A

// 베이스 토큰도 사용 가능
const neutralGray = colors.slate[500];
const headingSize = typography.fontSize['2xl'];
```

## 특징

- ✅ 베이스 토큰 상속 (@design-system/tokens)
- ✅ Product 1 브랜드 컬러 (St Tropaz) 적용
- ✅ Semantic colors를 브랜드 컬러로 매핑
- ✅ 타입 안정성 보장

## 빌드

```bash
# 패키지 빌드
pnpm build

# 개발 모드 (watch)
pnpm dev
```

