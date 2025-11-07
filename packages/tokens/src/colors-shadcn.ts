/**
 * DBDS Color System (shadcn/ui inspired)
 *
 * shadcn/ui의 세련된 디자인을 DBDS 흑백 철학과 결합
 *
 * 참고: https://ui.shadcn.com/examples/dashboard
 *
 * 핵심 차이:
 * - 순수 흑백 → 중립적인 Slate 계열
 * - 강한 대비 → 부드러운 대비
 * - Flat → Subtle elevation
 */

export const colorsShadcn = {
  // ===== White & Black =====
  white: '#FFFFFF',
  black: '#0F172A', // Slate-900 (Pure black 대신)

  // ===== Gray Scale (Slate) =====
  // 호환성을 위해 gray 객체 제공 (Slate 계열로 매핑)
  gray: {
    50: '#F8FAFC', // Slate-50
    100: '#F1F5F9', // Slate-100
    200: '#E2E8F0', // Slate-200
    300: '#CBD5E1', // Slate-300
    400: '#94A3B8', // Slate-400
    500: '#64748B', // Slate-500
    600: '#475569', // Slate-600
    700: '#334155', // Slate-700
    800: '#1E293B', // Slate-800
    900: '#0F172A', // Slate-900
    950: '#020617', // Slate-950
  },

  // ===== Background =====
  background: {
    DEFAULT: '#FFFFFF', // 순백
    subtle: '#FAFAFA', // 미묘한 회색 (카드 배경)
    muted: '#F8FAFC', // Slate-50 (섹션 배경)
    elevated: '#FFFFFF', // 카드 (shadow로 구분)
  },

  // ===== Foreground (Text) =====
  foreground: {
    DEFAULT: '#0F172A', // Slate-900 (주요 텍스트)
    muted: '#64748B', // Slate-500 (보조 텍스트)
    subtle: '#94A3B8', // Slate-400 (비활성 텍스트)
  },

  // ===== Border =====
  border: {
    DEFAULT: '#E2E8F0', // Slate-200 (기본 보더)
    light: '#F1F5F9', // Slate-100 (밝은 보더) - 차트 호환성
    muted: '#F1F5F9', // Slate-100 (미묘한 보더)
    dark: '#CBD5E1', // Slate-300 (어두운 보더) - 차트 호환성
    strong: '#CBD5E1', // Slate-300 (강조 보더)
  },

  // ===== Primary (Brand) =====
  // shadcn/ui는 커스터마이징 가능하도록 중립적
  primary: {
    DEFAULT: '#0F172A', // Slate-900 (버튼 등)
    hover: '#1E293B', // Slate-800
    active: '#334155', // Slate-700
    foreground: '#FFFFFF', // 흰색 텍스트
  },

  // ===== Secondary =====
  secondary: {
    DEFAULT: '#F1F5F9', // Slate-100 (보조 버튼)
    hover: '#E2E8F0', // Slate-200
    active: '#CBD5E1', // Slate-300
    foreground: '#0F172A', // 어두운 텍스트
  },

  // ===== Muted (비활성, 배경) =====
  muted: {
    DEFAULT: '#F8FAFC', // Slate-50 (비활성 배경)
    foreground: '#64748B', // Slate-500 (비활성 텍스트)
  },

  // ===== Accent (강조) =====
  accent: {
    DEFAULT: '#F8FAFC', // Slate-50 (호버 배경)
    hover: '#F1F5F9', // Slate-100
    foreground: '#0F172A', // Slate-900 (텍스트)
  },

  // ===== Destructive (삭제, 위험) =====
  destructive: {
    DEFAULT: '#EF4444', // Red-500
    hover: '#DC2626', // Red-600
    foreground: '#FFFFFF', // 흰색 텍스트
  },

  // ===== Semantic Colors =====
  text: {
    primary: '#0F172A', // Slate-900
    secondary: '#64748B', // Slate-500
    disabled: '#94A3B8', // Slate-400
    inverse: '#FFFFFF',
  },

  // ===== Status Colors (Semantic) =====
  status: {
    success: {
      DEFAULT: '#10B981', // Emerald-500 (shadcn/ui 스타일)
      light: '#D1FAE5', // Emerald-100
      foreground: '#065F46', // Emerald-800
    },
    warning: {
      DEFAULT: '#F59E0B', // Amber-500
      light: '#FEF3C7', // Amber-100
      foreground: '#92400E', // Amber-800
    },
    error: {
      DEFAULT: '#EF4444', // Red-500
      light: '#FEE2E2', // Red-100
      foreground: '#991B1B', // Red-800
    },
    info: {
      DEFAULT: '#3B82F6', // Blue-500
      light: '#DBEAFE', // Blue-100
      foreground: '#1E40AF', // Blue-800
    },
  },

  // ===== Chart Colors (Data Visualization) =====
  chart: {
    // Status
    success: {
      DEFAULT: '#10B981', // Emerald-500
      light: '#6EE7B7',
      dark: '#059669',
    },
    error: {
      DEFAULT: '#EF4444', // Red-500
      light: '#FCA5A5',
      dark: '#DC2626',
    },
    warning: {
      DEFAULT: '#F59E0B', // Amber-500
      light: '#FCD34D',
      dark: '#D97706',
    },
    info: {
      DEFAULT: '#3B82F6', // Blue-500
      light: '#93C5FD',
      dark: '#2563EB',
    },
    running: {
      DEFAULT: '#06B6D4', // Cyan-500
      light: '#67E8F9',
      dark: '#0891B2',
    },

    // Data series (shadcn/ui inspired - subtle but distinct)
    series: [
      '#0F172A', // Slate-900
      '#3B82F6', // Blue-500
      '#10B981', // Emerald-500
      '#F59E0B', // Amber-500
      '#8B5CF6', // Violet-500
      '#EC4899', // Pink-500
      '#06B6D4', // Cyan-500
      '#64748B', // Slate-500
      '#EF4444', // Red-500
      '#14B8A6', // Teal-500
    ] as const,

    // Special states
    defect: '#EF4444',
    normal: '#10B981',
    abort: '#F59E0B',
    idle: '#CBD5E1',

    // Heatmap
    heatmap: {
      none: '#F1F5F9', // Slate-100
      success: '#10B981', // Emerald-500
      fail: '#EF4444', // Red-500
      mixed: '#F59E0B', // Amber-500
    },

    // Background
    background: {
      band: '#F8FAFC', // Slate-50
      grid: '#FFFFFF',
      highlight: '#F1F5F9', // Slate-100
    },
  },

  // ===== Ring (Focus) =====
  ring: {
    DEFAULT: '#94A3B8', // Slate-400 (포커스 링)
    offset: '#FFFFFF', // 흰색 오프셋
  },

  // ===== Input =====
  input: {
    DEFAULT: '#E2E8F0', // Slate-200 (인풋 보더)
    hover: '#CBD5E1', // Slate-300
    focus: '#94A3B8', // Slate-400
  },

  // ===== Popover, Dropdown =====
  popover: {
    background: '#FFFFFF',
    foreground: '#0F172A',
    border: '#E2E8F0',
  },

  // ===== Card =====
  card: {
    background: '#FFFFFF',
    foreground: '#0F172A',
    border: '#E2E8F0', // Slate-200
  },
} as const;

/**
 * shadcn/ui 스타일 디자인 특징:
 *
 * 1. Slate 계열 사용 (Neutral한 회색)
 * 2. Subtle한 보더 (#E2E8F0)
 * 3. 부드러운 그림자 (shadow-sm)
 * 4. 카드 기반 레이아웃
 * 5. 명확한 계층 구조
 *
 * DBDS와의 차이:
 * - DBDS: 순수 흑백 (#000000, #FFFFFF)
 * - shadcn: Slate 계열 (#0F172A, #F8FAFC)
 *
 * 장점:
 * - 더 세련된 느낌
 * - 눈의 피로도 감소
 * - 모던한 UI/UX
 * - 실제 대시보드에 적합
 */
