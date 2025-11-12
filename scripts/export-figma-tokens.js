/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/**
 * Design Tokens를 Figma Tokens Studio 형식으로 변환
 *
 * 사용법:
 * node scripts/export-figma-tokens.js
 *
 * 출력: figma-tokens.json
 */

const fs = require('fs');
const path = require('path');

// TypeScript 모듈을 직접 require할 수 없으므로,
// 빌드된 파일에서 import
const tokensPath = path.join(__dirname, '../packages/tokens/dist/index.js');
const tokens = require(tokensPath);

// Figma Tokens Studio 형식으로 변환
function convertToFigmaTokens() {
  const figmaTokens = {
    colors: {},
    typography: {},
    spacing: {},
    shadows: {},
    borderRadius: {},
  };

  // Colors 변환
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'string') {
        // 단일 색상 (white, black)
        figmaTokens.colors[colorName] = {
          value: colorValue,
          type: 'color',
        };
      } else if (typeof colorValue === 'object') {
        // 색상 팔레트 (slate, gray, etc)
        figmaTokens.colors[colorName] = {};
        Object.entries(colorValue).forEach(([shade, hexValue]) => {
          figmaTokens.colors[colorName][shade] = {
            value: hexValue,
            type: 'color',
          };
        });
      }
    });
  }

  // Typography 변환
  if (tokens.typography) {
    // Font Family
    if (tokens.typography.fontFamily) {
      figmaTokens.typography.fontFamily = {};
      Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
        figmaTokens.typography.fontFamily[key] = {
          value: Array.isArray(value) ? value.join(', ') : value,
          type: 'fontFamilies',
        };
      });
    }

    // Font Size
    if (tokens.typography.fontSize) {
      figmaTokens.typography.fontSize = {};
      Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
        const fontSize = Array.isArray(value) ? value[0] : value;
        figmaTokens.typography.fontSize[key] = {
          value: fontSize,
          type: 'fontSizes',
        };
      });
    }

    // Font Weight
    if (tokens.typography.fontWeight) {
      figmaTokens.typography.fontWeight = {};
      Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
        figmaTokens.typography.fontWeight[key] = {
          value: value,
          type: 'fontWeights',
        };
      });
    }

    // Line Height
    if (tokens.typography.lineHeight) {
      figmaTokens.typography.lineHeight = {};
      Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
        figmaTokens.typography.lineHeight[key] = {
          value: value,
          type: 'lineHeights',
        };
      });
    }

    // Letter Spacing
    if (tokens.typography.letterSpacing) {
      figmaTokens.typography.letterSpacing = {};
      Object.entries(tokens.typography.letterSpacing).forEach(
        ([key, value]) => {
          figmaTokens.typography.letterSpacing[key] = {
            value: value,
            type: 'letterSpacing',
          };
        }
      );
    }
  }

  // Spacing 변환
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      figmaTokens.spacing[key] = {
        value: value,
        type: 'spacing',
      };
    });
  }

  // Shadows 변환
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      figmaTokens.shadows[key] = {
        value: value,
        type: 'boxShadow',
      };
    });
  }

  // Border Radius 변환
  if (tokens.radius) {
    Object.entries(tokens.radius).forEach(([key, value]) => {
      figmaTokens.borderRadius[key] = {
        value: value,
        type: 'borderRadius',
      };
    });
  }

  return figmaTokens;
}

// 메인 실행
try {
  console.log('🚀 디자인 토큰 변환 시작...\n');

  const figmaTokens = convertToFigmaTokens();
  const outputPath = path.join(__dirname, '../figma-tokens.json');

  fs.writeFileSync(outputPath, JSON.stringify(figmaTokens, null, 2), 'utf-8');

  console.log('✅ 변환 완료!');
  console.log(`📁 출력 파일: ${outputPath}`);
  console.log('\n📊 변환된 토큰 통계:');
  console.log(`   - Colors: ${Object.keys(figmaTokens.colors).length}개`);
  console.log(
    `   - Typography: ${Object.keys(figmaTokens.typography).length}개 카테고리`
  );
  console.log(`   - Spacing: ${Object.keys(figmaTokens.spacing).length}개`);
  console.log(`   - Shadows: ${Object.keys(figmaTokens.shadows).length}개`);
  console.log(
    `   - Border Radius: ${Object.keys(figmaTokens.borderRadius).length}개`
  );
  console.log('\n🎨 다음 단계:');
  console.log('   1. Figma에서 "Tokens Studio for Figma" 플러그인 설치');
  console.log('   2. 플러그인 열기 → Load from JSON');
  console.log('   3. figma-tokens.json 파일 선택');
  console.log('   4. Apply to document 클릭\n');
} catch (error) {
  console.error('❌ 에러 발생:', error.message);
  process.exit(1);
}
