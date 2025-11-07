/**
 * DBDS Radius System (shadcn/ui inspired)
 *
 * shadcn/ui의 부드러운 모서리 반경
 */

export const radiusShadcn = {
  none: '0',
  sm: '0.375rem', // 6px - 작은 요소
  DEFAULT: '0.5rem', // 8px - 기본 (shadcn/ui 기본값)
  md: '0.5rem', // 8px - 버튼, 인풋
  lg: '0.75rem', // 12px - 카드
  xl: '1rem', // 16px - 큰 카드
  '2xl': '1.5rem', // 24px
  full: '9999px', // 완전한 둥근 모서리
} as const;

/**
 * shadcn/ui vs DBDS 반경 비교:
 *
 * shadcn/ui:
 * - 기본값 8px (더 부드러움)
 * - 카드 12px
 * - 일관된 느낌
 *
 * DBDS 기존:
 * - 기본값 6px (날카로움)
 * - 미니멀 강조
 *
 * 적용 권장:
 * - 8px를 기본으로 (더 모던함)
 */
