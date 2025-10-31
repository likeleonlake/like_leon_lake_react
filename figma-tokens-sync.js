// tokens-sync.js
// Script para sincronizar design tokens desde Tokens Studio a CSS

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
  tokensJsonPath: './src/styles/tokens/figma-tokens.json',
  outputDir: './src/styles/tokens',
  coreFile: 'core.css',
  themeFile: 'theme.css'
};

// ============================================
// UTILIDADES
// ============================================

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function resolveTokenReference(value, tokens) {
  // Resuelve referencias tipo {dimension.100}
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;
  
  const path = match[1].split('.');
  let current = tokens;
  
  for (const key of path) {
    current = current[key];
    if (!current) return value;
  }
  
  return current.value;
}

// ============================================
// GENERACIÓN DE CSS
// ============================================

function generateCoreCSS(tokens) {
  let css = ':root{\n';

  // Colores (convertir hex a RGB separado)
  if (tokens.color) {
    Object.entries(tokens.color).forEach(([name, token]) => {
      const rgb = hexToRgb(token.value);
      if (rgb) {
        css += `    --color-${name}: ${rgb.r} ${rgb.g} ${rgb.b};\n`;
      }
    });
    css += '\n';
  }

  // Alphas
  if (tokens.alpha) {
    Object.entries(tokens.alpha).forEach(([name, token]) => {
      css += `    --alpha-${name}: ${token.value};\n`;
    });
    css += '\n';
  }

  // Dimensions
  if (tokens.dimension) {
    // Ordenar por el valor numérico del nombre
    const sortedDimensions = Object.entries(tokens.dimension).sort((a, b) => {
      const numA = parseFloat(a[0]);
      const numB = parseFloat(b[0]);
      return numA - numB;
    });

    sortedDimensions.forEach(([name, token]) => {
      css += `    --dimension-${name}: ${token.value}px;\n`;
    });
    css += '\n';
  }

  // Font family
  if (tokens['font-family']) {
    Object.entries(tokens['font-family']).forEach(([name, token]) => {
      css += `    --font-family-${name}: '${token.value}', system-ui, sans-serif;\n`;
    });
    css += '\n';
  }

  // Font weight
  if (tokens['font-weight']) {
    Object.entries(tokens['font-weight']).forEach(([name, token]) => {
      css += `    --font-weight-${name}: ${token.value};\n`;
    });
    css += '\n';
  }

  // Font size (con referencias resueltas)
  if (tokens['font-size']) {
    Object.entries(tokens['font-size']).forEach(([name, token]) => {
      const value = typeof token.value === 'string' ? token.value : token.value.toString();
      const dimensionName = value.match(/\{dimension\.(.+)\}/)?.[1];
      
      if (dimensionName) {
        css += `    --font-size-${name}: var(--dimension-${dimensionName});\n`;
      } else {
        css += `    --font-size-${name}: ${value}px;\n`;
      }
    });
    css += '\n';
  }

  // Line height (con referencias resueltas)
  if (tokens['line-height']) {
    Object.entries(tokens['line-height']).forEach(([name, token]) => {
      const value = typeof token.value === 'string' ? token.value : token.value.toString();
      const dimensionName = value.match(/\{dimension\.(.+)\}/)?.[1];
      
      if (dimensionName) {
        css += `    --line-height-${name}: var(--dimension-${dimensionName});\n`;
      } else {
        css += `    --line-height-${name}: ${token.value}px;\n`;
      }
    });
    css += '\n';
  }

  // Border width
  if (tokens['border-width']) {
    Object.entries(tokens['border-width']).forEach(([name, token]) => {
      const value = typeof token.value === 'string' ? token.value : token.value.toString();
      const dimensionName = value.match(/\{dimension\.(.+)\}/)?.[1];
      
      if (dimensionName) {
        // Caso especial: border-width no tiene nombre en tu CSS actual
        css += `    --border-width: var(--dimension-${dimensionName});\n`;
      } else {
        css += `    --border-width: ${token.value}px;\n`;
      }
    });
    css += '\n';
  }

  // Border radii
  if (tokens['border-radii']) {
    Object.entries(tokens['border-radii']).forEach(([name, token]) => {
      const value = typeof token.value === 'string' ? token.value : token.value.toString();
      const dimensionName = value.match(/\{dimension\.(.+)\}/)?.[1];
      
      if (dimensionName) {
        css += `    --border-radii-${name}: var(--dimension-${dimensionName});\n`;
      } else if (token.value === 1000 || token.value >= 9999) {
        css += `    --border-radii-${name}: 9999px;\n`;
      } else {
        css += `    --border-radii-${name}: ${token.value}px;\n`;
      }
    });
  }

  css += '}';
  return css;
}

function parseThemeCSS(themePath) {
  if (!fs.existsSync(themePath)) {
    console.log('⚠️  theme.css no encontrado, se omitirá la regeneración');
    return [];
  }

  const themeContent = fs.readFileSync(themePath, 'utf8');
  const rules = [];
  
  // Expresión regular para extraer variables y sus composiciones
  const regex = /--([\w-]+):\s*rgba?\(var\(--([\w-]+)\)\s*\/\s*var\(--([\w-]+)\)\);/g;
  let match;

  while ((match = regex.exec(themeContent)) !== null) {
    rules.push({
      name: match[1],
      color: match[2],
      alpha: match[3]
    });
  }

  return rules;
}

function generateThemeCSS(rules) {
  if (rules.length === 0) {
    return null;
  }

  let css = "@import url('./core.css');\n\n\n:root{\n";

  rules.forEach(rule => {
    // Usar rgb o rgba según el caso
    const func = rule.name.includes('shadow') ? 'rgba' : 
                 rule.name.includes('background') && rule.name.includes('reset') ? 'rgb' : 'rgba';
    css += `    --${rule.name}: ${func}(var(--${rule.color}) / var(--${rule.alpha}));\n`;
  });

  css += '}';
  return css;
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('🚀 Iniciando sincronización de tokens desde Tokens Studio...\n');

  // 1. Leer JSON de Tokens Studio
  console.log('📖 Leyendo figma-tokens.json...');
  const tokensPath = path.resolve(CONFIG.tokensJsonPath);
  
  if (!fs.existsSync(tokensPath)) {
    console.error(`❌ No se encontró el archivo: ${tokensPath}`);
    console.error('   Asegúrate de exportar los tokens desde Tokens Studio a este path.');
    process.exit(1);
  }

  const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
  console.log('✅ Tokens cargados correctamente\n');

  // 2. Generar core.css
  console.log('📝 Generando core.css...');
  const coreCSS = generateCoreCSS(tokensData);
  const coreOutputPath = path.join(CONFIG.outputDir, CONFIG.coreFile);
  
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  fs.writeFileSync(coreOutputPath, coreCSS);
  console.log(`✅ core.css generado en ${coreOutputPath}\n`);

  // 3. Leer reglas del theme.css actual
  console.log('📖 Leyendo reglas de theme.css...');
  const themeInputPath = path.join(CONFIG.outputDir, CONFIG.themeFile);
  const themeRules = parseThemeCSS(themeInputPath);
  
  if (themeRules.length > 0) {
    console.log(`✅ ${themeRules.length} reglas extraídas\n`);

    // 4. Regenerar theme.css con las mismas reglas
    console.log('📝 Regenerando theme.css...');
    const themeCSS = generateThemeCSS(themeRules);
    const themeOutputPath = path.join(CONFIG.outputDir, CONFIG.themeFile);
    fs.writeFileSync(themeOutputPath, themeCSS);
    console.log(`✅ theme.css regenerado en ${themeOutputPath}\n`);
  } else {
    console.log('⚠️  No se encontraron reglas en theme.css, se omite regeneración\n');
  }

  console.log('🎉 ¡Sincronización completada exitosamente!');
  console.log('\n📊 Resumen:');
  console.log(`   - Colores: ${Object.keys(tokensData.color || {}).length}`);
  console.log(`   - Alphas: ${Object.keys(tokensData.alpha || {}).length}`);
  console.log(`   - Dimensions: ${Object.keys(tokensData.dimension || {}).length}`);
  if (themeRules.length > 0) {
    console.log(`   - Theme rules: ${themeRules.length}`);
  }
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});