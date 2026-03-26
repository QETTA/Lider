#!/usr/bin/env node
/**
 * LIDER 2026 E2E Screenshot Audit System
 * 모든 페이지를 스크롤하며 스크린샷 캡처 + 디자인 검증
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 설정
const CONFIG = {
  baseUrl: process.env.LIDER_URL || 'https://5173-imydkkpclzductzdvuv2s-5634da27.sandbox.novita.ai',
  outputDir: path.join(__dirname, 'e2e-reports', new Date().toISOString().split('T')[0]),
  pages: [
    { name: 'dashboard', path: '/dashboard', scrollSteps: 5 },
    { name: 'mobile-entry', path: '/mobile-entry', scrollSteps: 3 },
    { name: 'documents', path: '/documents', scrollSteps: 4 },
    { name: 'consultation', path: '/consultation', scrollSteps: 4 },
    { name: 'elderly', path: '/elderly', scrollSteps: 4 }
  ],
  viewports: [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 1024, height: 768 },
    { name: 'mobile', width: 375, height: 667 }
  ],
  emotionModes: ['morning', 'focus', 'evening', 'calm']
};

class LIDERScreenshotAudit {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
  }

  async init() {
    // 출력 디렉토리 생성
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }
    
    // 브라우저 시작 (샌드박스 환경 최적화)
    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-extensions',
        '--single-process'
      ]
    });
    
    console.log('🚀 LIDER E2E Screenshot Audit System Started');
    console.log(`📍 Base URL: ${CONFIG.baseUrl}`);
    console.log(`📁 Output: ${CONFIG.outputDir}`);
  }

  async auditAll() {
    for (const viewport of CONFIG.viewports) {
      console.log(`\n📱 Viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
      
      for (const page of CONFIG.pages) {
        // 브라우저가 죽었는지 확인하고 재시작
        if (!this.browser || this.browser.isConnected === false) {
          console.log('  🔄 브라우저 재시작...');
          await this.restartBrowser();
        }
        
        await this.auditPage(page, viewport);
        await new Promise(r => setTimeout(r, 1000)); // 페이지 간 안정화 대기
      }
    }
  }

  async restartBrowser() {
    try {
      if (this.browser) await this.browser.close();
    } catch (e) { /* 무시 */ }
    
    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-extensions',
        '--single-process'
      ]
    });
    console.log('  ✅ 브라우저 재시작 완료');
  }

  async auditPage(pageConfig, viewport) {
    const context = await this.browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    const url = `${CONFIG.baseUrl}${pageConfig.path}`;
    
    console.log(`  🔍 Auditing: ${pageConfig.name}`);
    
    try {
      // 페이지 로드
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000); // 애니메이션 안정화
      
      const pageResults = {
        name: pageConfig.name,
        viewport: viewport.name,
        url: url,
        screenshots: [],
        validations: [],
        timestamp: new Date().toISOString()
      };

      // 1. 초기 스크린샷 (상단)
      const topScreenshot = await this.captureScreenshot(
        page, 
        `${pageConfig.name}_${viewport.name}_top.png`
      );
      pageResults.screenshots.push({ type: 'top', ...topScreenshot });

      // 2. 전체 높이 측정 및 스크롤 캡처
      const totalHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = viewport.height;
      const scrollIncrement = Math.max((totalHeight - viewportHeight) / pageConfig.scrollSteps, 100);

      for (let i = 1; i <= pageConfig.scrollSteps; i++) {
        const scrollY = Math.min(scrollIncrement * i, totalHeight - viewportHeight);
        await page.evaluate((y) => window.scrollTo(0, y), scrollY);
        await page.waitForTimeout(500); // 스크롤 안정화

        const scrollScreenshot = await this.captureScreenshot(
          page,
          `${pageConfig.name}_${viewport.name}_scroll_${i}.png`
        );
        pageResults.screenshots.push({ type: `scroll-${i}`, position: scrollY, ...scrollScreenshot });
      }

      // 3. 디자인 검증
      pageResults.validations = await this.validateDesign(page, viewport);

      // 4. 감정 모드 테스트 (Emotion Mode)
      for (const mode of CONFIG.emotionModes) {
        await this.testEmotionMode(page, mode, pageResults);
      }

      this.results.push(pageResults);
      console.log(`    ✅ ${pageResults.screenshots.length} screenshots captured`);
      
    } catch (error) {
      console.error(`    ❌ Error: ${error.message}`);
      this.results.push({
        name: pageConfig.name,
        viewport: viewport.name,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      try {
        await context.close();
        await new Promise(r => setTimeout(r, 500)); // 브라우저 안정화 대기
      } catch (e) {
        // 브라우저가 이미 종료된 경우 무시
      }
    }
  }

  async captureScreenshot(page, filename) {
    const filepath = path.join(CONFIG.outputDir, filename);
    await page.screenshot({ 
      path: filepath,
      fullPage: false,
      type: 'png'
    });
    
    const stats = fs.statSync(filepath);
    return {
      filename,
      filepath,
      size: stats.size,
      timestamp: new Date().toISOString()
    };
  }

  async validateDesign(page, viewport) {
    const validations = [];

    // 1. Glassmorphism 검증
    const glassCheck = await page.evaluate(() => {
      const glassElements = document.querySelectorAll('.glass-card, .glass, .glass-header');
      const results = [];
      glassElements.forEach((el, i) => {
        const styles = window.getComputedStyle(el);
        results.push({
          index: i,
          className: el.className,
          hasBackdropFilter: styles.backdropFilter !== 'none',
          hasBackground: styles.background.includes('rgba') || styles.backgroundColor.includes('rgba'),
          opacity: styles.opacity
        });
      });
      return { count: glassElements.length, elements: results };
    });
    validations.push({ type: 'glassmorphism', ...glassCheck, status: glassCheck.count > 0 ? 'pass' : 'warn' });

    // 2. Bento Grid 검증
    const bentoCheck = await page.evaluate(() => {
      const bentoElements = document.querySelectorAll('.bento-grid, .bento-card');
      return {
        gridCount: document.querySelectorAll('.bento-grid').length,
        cardCount: document.querySelectorAll('.bento-card').length,
        hasGridLayout: !!document.querySelector('.bento-grid')
      };
    });
    validations.push({ type: 'bento-grid', ...bentoCheck, status: bentoCheck.hasGridLayout ? 'pass' : 'warn' });

    // 3. 색상 팔레트 검증 (2026 Design System)
    const colorCheck = await page.evaluate(() => {
      const computed = getComputedStyle(document.documentElement);
      const colors = {
        primary: computed.getPropertyValue('--color-primary-500'),
        healing: computed.getPropertyValue('--color-healing-500'),
        calm: computed.getPropertyValue('--color-calm-500')
      };
      return { colors, hasVariables: Object.values(colors).some(c => c && c.trim() !== '') };
    });
    validations.push({ type: 'color-system', ...colorCheck, status: colorCheck.hasVariables ? 'pass' : 'warn' });

    // 4. 반응형 레이아웃 검증
    const responsiveCheck = await page.evaluate((vw) => {
      const width = window.innerWidth;
      const bodyClasses = document.body.className;
      return {
        actualWidth: width,
        expectedViewport: vw,
        hasMobileClass: bodyClasses.includes('mobile') || document.querySelector('.mobile-layout') !== null,
        hasDesktopClass: bodyClasses.includes('desktop') || document.querySelector('.desktop-layout') !== null
      };
    }, viewport.name);
    validations.push({ type: 'responsive', ...responsiveCheck, status: 'pass' });

    // 5. 애니메이션/마이크로 인터랙션
    const animationCheck = await page.evaluate(() => {
      const animatedElements = document.querySelectorAll('[class*="animate"], .animated-number, .pulse-dot');
      return {
        animatedCount: animatedElements.length,
        hasAnimatedNumbers: !!document.querySelector('.animated-number'),
        hasPulseAnimation: !!document.querySelector('.pulse-dot, .animate-pulse')
      };
    });
    validations.push({ type: 'animations', ...animationCheck, status: animationCheck.animatedCount > 0 ? 'pass' : 'info' });

    return validations;
  }

  async testEmotionMode(page, mode, pageResults) {
    try {
      // Emotion Mode 버튼 클릭
      await page.click('[data-testid="emotion-selector"], .emotion-selector button, [class*="emotion"] button');
      await page.waitForTimeout(300);
      
      // 특정 모드 선택
      const modeButton = await page.$(`[data-mode="${mode}"], button:has-text("${mode}")`);
      if (modeButton) {
        await modeButton.click();
        await page.waitForTimeout(500);
        
        // 모드 적용 후 스크린샷
        const screenshot = await this.captureScreenshot(
          page,
          `${pageResults.name}_${pageResults.viewport}_emotion_${mode}.png`
        );
        pageResults.screenshots.push({ type: `emotion-${mode}`, ...screenshot });
      }
    } catch (e) {
      // Emotion selector not found, skip
    }
  }

  generateReport() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    const report = {
      summary: {
        totalPages: CONFIG.pages.length,
        totalViewports: CONFIG.viewports.length,
        totalScreenshots: this.results.reduce((sum, r) => sum + (r.screenshots?.length || 0), 0),
        duration: `${duration}s`,
        timestamp: new Date().toISOString(),
        status: this.results.every(r => !r.error) ? 'success' : 'partial'
      },
      results: this.results,
      config: CONFIG
    };

    // JSON 리포트 저장
    const reportPath = path.join(CONFIG.outputDir, 'audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // HTML 리포트 생성
    this.generateHTMLReport(report, CONFIG.outputDir);

    console.log(`\n📊 Audit Complete!`);
    console.log(`   Duration: ${duration}s`);
    console.log(`   Screenshots: ${report.summary.totalScreenshots}`);
    console.log(`   Report: ${reportPath}`);
    
    return report;
  }

  generateHTMLReport(report, outputDir) {
    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LIDER 2026 E2E Audit Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #1a202c;
      margin-bottom: 8px;
      font-size: 2.5rem;
    }
    .subtitle {
      color: #718096;
      margin-bottom: 30px;
    }
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .summary-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 24px;
      border-radius: 16px;
      text-align: center;
    }
    .summary-card h3 {
      font-size: 2rem;
      margin-bottom: 8px;
    }
    .summary-card p { opacity: 0.9; }
    .page-section {
      margin-bottom: 40px;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
    }
    .page-header {
      background: linear-gradient(90deg, #f7fafc 0%, #edf2f7 100%);
      padding: 20px 24px;
      border-bottom: 1px solid #e2e8f0;
    }
    .page-header h2 {
      color: #2d3748;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .status-badge {
      display: inline-flex;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .status-pass { background: #c6f6d5; color: #22543d; }
    .status-warn { background: #feebc8; color: #744210; }
    .status-error { background: #fed7d7; color: #742a2a; }
    .screenshots-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 24px;
    }
    .screenshot-card {
      background: #f7fafc;
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .screenshot-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    .screenshot-card img {
      width: 100%;
      height: auto;
      display: block;
      border-bottom: 1px solid #e2e8f0;
    }
    .screenshot-info {
      padding: 12px 16px;
    }
    .screenshot-info h4 {
      font-size: 14px;
      color: #4a5568;
      margin-bottom: 4px;
    }
    .screenshot-info p {
      font-size: 12px;
      color: #a0aec0;
    }
    .validation-list {
      padding: 0 24px 24px;
    }
    .validation-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 8px;
      background: #f7fafc;
    }
    .validation-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    .icon-pass { background: #c6f6d5; }
    .icon-warn { background: #feebc8; }
    .icon-error { background: #fed7d7; }
    .footer {
      text-align: center;
      padding-top: 40px;
      color: #718096;
      font-size: 14px;
    }
    @media (max-width: 768px) {
      .container { padding: 20px; border-radius: 16px; }
      h1 { font-size: 1.8rem; }
      .screenshots-grid { grid-template-columns: 1fr; padding: 16px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 LIDER 2026 E2E Audit Report</h1>
    <p class="subtitle">Generated: ${new Date(report.summary.timestamp).toLocaleString('ko-KR')}</p>
    
    <div class="summary-cards">
      <div class="summary-card">
        <h3>${report.summary.totalPages}</h3>
        <p>Pages Tested</p>
      </div>
      <div class="summary-card">
        <h3>${report.summary.totalViewports}</h3>
        <p>Viewports</p>
      </div>
      <div class="summary-card">
        <h3>${report.summary.totalScreenshots}</h3>
        <p>Screenshots</p>
      </div>
      <div class="summary-card">
        <h3>${report.summary.duration}</h3>
        <p>Duration</p>
      </div>
    </div>

    ${report.results.map(page => `
    <div class="page-section">
      <div class="page-header">
        <h2>
          📄 ${page.name}
          <span class="status-badge status-${page.error ? 'error' : 'pass'}">
            ${page.error ? 'ERROR' : 'PASS'}
          </span>
        </h2>
        <p style="color: #718096; margin-top: 8px; font-size: 14px;">
          Viewport: ${page.viewport} | URL: ${page.url || 'N/A'}
        </p>
      </div>
      
      ${page.error ? `
      <div style="padding: 24px; color: #742a2a; background: #fff5f5;">
        ❌ Error: ${page.error}
      </div>
      ` : ''}
      
      ${page.screenshots ? `
      <div class="screenshots-grid">
        ${page.screenshots.map(ss => `
        <div class="screenshot-card">
          <img src="${ss.filename}" alt="${ss.type}" loading="lazy">
          <div class="screenshot-info">
            <h4>${ss.type.toUpperCase()}</h4>
            <p>${(ss.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
        `).join('')}
      </div>
      ` : ''}
      
      ${page.validations ? `
      <div class="validation-list">
        <h3 style="margin-bottom: 16px; color: #2d3748;">🎨 Design Validation</h3>
        ${page.validations.map(v => `
        <div class="validation-item">
          <span class="validation-icon icon-${v.status}">
            ${v.status === 'pass' ? '✓' : v.status === 'warn' ? '!' : 'i'}
          </span>
          <div>
            <strong style="color: #2d3748;">${v.type.toUpperCase()}</strong>
            <p style="color: #718096; font-size: 13px; margin-top: 4px;">
              ${JSON.stringify(v).slice(0, 100)}...
            </p>
          </div>
        </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
    `).join('')}

    <div class="footer">
      <p>🚀 LIDER 2026 Design System | Automated E2E Testing</p>
      <p style="margin-top: 8px;">Powered by Playwright</p>
    </div>
  </div>
</body>
</html>`;

    const htmlPath = path.join(outputDir, 'index.html');
    fs.writeFileSync(htmlPath, html);
    console.log(`   HTML Report: ${htmlPath}`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// 실행
async function main() {
  const audit = new LIDERScreenshotAudit();
  
  try {
    await audit.init();
    await audit.auditAll();
    audit.generateReport();
  } catch (error) {
    console.error('Audit failed:', error);
    process.exit(1);
  } finally {
    await audit.close();
  }
}

// 반복 실행 모드
if (process.argv.includes('--watch')) {
  const interval = parseInt(process.env.AUDIT_INTERVAL) || 300000; // 5분 기본
  console.log(`👁️ Watch mode enabled (interval: ${interval}ms)`);
  
  main();
  setInterval(main, interval);
} else {
  main();
}

module.exports = { LIDERScreenshotAudit, CONFIG };
