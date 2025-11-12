/**
 * Product 1 Color Tokens
 * Brand Color: St Tropaz
 */

// 베이스 토큰 import (neutral colors, semantic colors 등)
import { colors as baseColors } from '@design-system/tokens';

// Product 1 브랜드 컬러 팔레트
const stTropaz = {
  50: '#F3F6FC',
  100: '#E6EDF8',
  200: '#C8DAEF',
  300: '#97BAE2',
  400: '#6096D0',
  500: '#3B79BC',
  600: '#2B5F9E',
  700: '#265189',
  800: '#21416B',
  900: '#20395A',
  950: '#15243C',
} as const;

// Product 1 전용 컬러 시스템
export const colors = {
  // 베이스 neutral colors 상속
  white: baseColors.white,
  black: baseColors.black,
  slate: baseColors.slate,
  gray: baseColors.gray,
  zinc: baseColors.zinc,

  // Product 1 브랜드 컬러
  brand: stTropaz,
  
  // Product 1 Semantic colors (브랜드 컬러 기반)
  primary: {
    light: stTropaz[100],
    DEFAULT: stTropaz[500],
    dark: stTropaz[700],
  },

  // 기타 semantic colors는 베이스 상속
  success: baseColors.success,
  error: baseColors.error,
  warning: baseColors.warning,
  info: {
    light: stTropaz[100],    // info는 브랜드 컬러 사용
    DEFAULT: stTropaz[500],
    dark: stTropaz[700],
  },

  // 추가 컬러 (필요시)
  accent: stTropaz,
  
  // UI Colors
  background: baseColors.white,
  foreground: baseColors.black,
  border: baseColors.slate[200],
  input: baseColors.slate[200],
  ring: stTropaz[500],
} as const;

export type ProductColors = typeof colors;

