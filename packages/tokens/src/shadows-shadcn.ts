/**
 * DBDS Shadow System (shadcn/ui inspired)
 *
 * shadcn/ui의 subtle한 그림자 시스템
 * Elevation을 표현하되 과하지 않게
 */

export const shadowsShadcn = {
  // shadcn/ui 스타일의 미묘한 그림자
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // Inner shadow (인풋 등)
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // None
  none: '0 0 #0000',
} as const;

/**
 * shadcn/ui vs DBDS 그림자 비교:
 *
 * shadcn/ui:
 * - 매우 미묘함 (0.05 ~ 0.1 opacity)
 * - 카드에 입체감 부여
 * - 계층 구조 명확
 *
 * DBDS 기존:
 * - 거의 없음 (flat 디자인)
 * - 보더로만 구분
 *
 * 적용 권장:
 * - Card: shadow-sm
 * - Modal: shadow-lg
 * - Dropdown: shadow-md
 * - Input: shadow-none (border만)
 */
