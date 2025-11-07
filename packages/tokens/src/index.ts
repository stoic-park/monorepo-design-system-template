// SEMES tokens (기본값)
export * from './colors-semes';
export * from './shadows-shadcn';
export * from './radius-shadcn';

// 기존 토큰 (호환성 유지)
export { colors as colorsClassic } from './colors';
export { colorsShadcn } from './colors-shadcn';
export { shadows as shadowsClassic } from './shadows';
export { radius as radiusClassic } from './radius';

// Rename for default import
export { colorsSemes as colors } from './colors-semes';
export { shadowsShadcn as shadows } from './shadows-shadcn';
export { radiusShadcn as radius } from './radius-shadcn';

// 기타 토큰
export * from './typography';
export * from './spacing';
