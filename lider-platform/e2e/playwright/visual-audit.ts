/**
 * Lider Platform - Nano-Scroll Visual Audit Navigator
 * 
 * 기능:
 * 1. 작은 스크롤 단위(50-100px)로 페이지 끝까지 이동
 * 2. 각 스크롤 위치에서 스크린샷 캡처
 * 3. 각 스크린샷에서 UI 요소(버튼, 카드, 입력 필드 등) 검출
 * 4. 검수 보고서 생성
 */

import { chromium, Browser, Page, BrowserContext } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// 설정
const CONFIG = {
  // 스크롤 단위 (px) - 나노단위 검수를 위해 50~100px 권장
  SCROLL_STEP: 80, // 80px 단위로 스크롤
  
  // 뷰포트 크기
  VIEWPORT: { width: 1920, height: 1080 },
  
  // 모바일 뷰포트 (반응형 테스트용)
  MOBILE_VIEWPORT: { width: 375, height: 812 },
  
  // 타겟 URL
  TARGET_URL: process.env.TARGET_URL || 'http://localhost:8080',
  
  // 출력 디렉토리
  OUTPUT_DIR: process.env.OUTPUT_DIR || './audit-output',
  
  // 대기 시간 (ms)
  WAIT_TIME: 500,
  
  // UI 요소 선택자
  UI_SELECTORS: {
    buttons: 'button, [role="button"], .btn, .button, input[type="submit"], input[type="button"]',
    inputs: 'input, textarea, select, [contenteditable="true"]',
    cards: '.card, [class*="card"], .panel, .box, .container',
    navigation: 'nav, .nav, .navbar, [role="navigation"], header, .header',
    links: 'a, [role="link"]',
    images: 'img, svg, [role="img"]',
    text: 'h1, h2, h3, h4, h5, h6, p, span, label',
    interactive: '[onclick], [data-action], [data-target]'
  }
};

// 감지된 UI 요소 타입
interface UIElement {
  type: string;
  tag: string;
  text: string;
  className: string;
  id: string;
  visible: boolean;
  position: { x: number; y: number; width: number; height: number };
  scrollY: number;
}

// 스크린샷 메타데이터
interface ScreenshotMeta {
  index: number;
  scrollY: number;
  viewportHeight: number;
  pageHeight: number;
  timestamp: string;
  elements: UIElement[];
  fileName: string;
}

// 검수 보고서
interface AuditReport {
  url: string;
  timestamp: string;
  viewport: { width: number; height: number };
  scrollStep: number;
  totalScreenshots: number;
  pageHeight: number;
  screenshots: ScreenshotMeta[];
  summary: {
    totalElements: number;
    elementTypes: Record<string, number>;
    issues: string[];
  };
}

class NanoScrollAuditor {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private report: AuditReport;
  private outputDir: string;

  constructor() {
    this.outputDir = path.resolve(CONFIG.OUTPUT_DIR);
    this.report = {
      url: CONFIG.TARGET_URL,
      timestamp: new Date().toISOString(),
      viewport: CONFIG.VIEWPORT,
      scrollStep: CONFIG.SCROLL_STEP,
      totalScreenshots: 0,
      pageHeight: 0,
      screenshots: [],
      summary: {
        totalElements: 0,
        elementTypes: {},
        issues: []
      }
    };
  }

  async init(): Promise<void> {
    console.log('🚀 Playwright Nano-Scroll Auditor 초기화...');
    
    // 출력 디렉토리 생성
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    
    // 브라우저 시작
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.context = await this.browser.newContext({
      viewport: CONFIG.VIEWPORT,
      deviceScaleFactor: 1
    });
    
    this.page = await this.context.newPage();
    
    console.log('✅ 브라우저 준비 완료');
  }

  async navigate(url: string): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');
    
    console.log(`🌐 페이지 로딩: ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // 초기 대기
    await this.page.waitForTimeout(CONFIG.WAIT_TIME);
    
    console.log('✅ 페이지 로드 완료');
  }

  async getPageHeight(): Promise<number> {
    if (!this.page) throw new Error('Browser not initialized');
    
    return await this.page.evaluate(() => {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
    });
  }

  async detectUIElements(scrollY: number): Promise<UIElement[]> {
    if (!this.page) throw new Error('Browser not initialized');
    
    const elements = await this.page.evaluate((selectors, currentScrollY) => {
      const detected: UIElement[] = [];
      const viewportHeight = window.innerHeight;
      
      // 모든 UI 요소 선택자 순회
      for (const [type, selector] of Object.entries(selectors)) {
        const nodes = document.querySelectorAll(selector);
        
        nodes.forEach((node, index) => {
          const rect = node.getBoundingClientRect();
          const element = node as HTMLElement;
          
          // 뷰포트 내에 있는 요소만 감지 (현재 스크롤 위치 기준)
          const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
          const isVisible = isInViewport && 
                           rect.width > 0 && 
                           rect.height > 0 &&
                           window.getComputedStyle(element).visibility !== 'hidden' &&
                           window.getComputedStyle(element).display !== 'none';
          
          if (isVisible) {
            detected.push({
              type,
              tag: node.tagName.toLowerCase(),
              text: element.innerText?.substring(0, 100) || '',
              className: element.className || '',
              id: element.id || '',
              visible: isVisible,
              position: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
              },
              scrollY: currentScrollY
            });
          }
        });
      }
      
      return detected;
    }, CONFIG.UI_SELECTORS, scrollY);
    
    return elements;
  }

  async captureScrollScreenshots(): Promise<void> {
    if (!this.page) throw new Error('Browser not initialized');
    
    const pageHeight = await this.getPageHeight();
    this.report.pageHeight = pageHeight;
    
    console.log(`\n📏 페이지 높이: ${pageHeight}px`);
    console.log(`📐 뷰포트: ${CONFIG.VIEWPORT.width}x${CONFIG.VIEWPORT.height}`);
    console.log(`📊 스크롤 단위: ${CONFIG.SCROLL_STEP}px`);
    console.log(`🎯 예상 스크린샷 수: ${Math.ceil(pageHeight / CONFIG.SCROLL_STEP)}개\n`);
    
    // 처음으로 스크롤 (최상단)
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(300);
    
    let scrollY = 0;
    let screenshotIndex = 0;
    
    // 페이지 끝까지 나노단위 스크롤
    while (scrollY < pageHeight) {
      // 현재 스크롤 위치로 이동
      await this.page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await this.page.waitForTimeout(CONFIG.WAIT_TIME);
      
      // 실제 스크롤 위치 확인
      const actualScrollY = await this.page.evaluate(() => window.scrollY);
      
      // UI 요소 감지
      const elements = await this.detectUIElements(actualScrollY);
      
      // 스크린샷 캡처
      const fileName = `screenshot_${String(screenshotIndex).padStart(4, '0')}_scroll_${actualScrollY}px.png`;
      const filePath = path.join(this.outputDir, fileName);
      
      await this.page.screenshot({
        path: filePath,
        fullPage: false // 뷰포트만 캡처
      });
      
      // 메타데이터 저장
      const meta: ScreenshotMeta = {
        index: screenshotIndex,
        scrollY: actualScrollY,
        viewportHeight: CONFIG.VIEWPORT.height,
        pageHeight,
        timestamp: new Date().toISOString(),
        elements,
        fileName
      };
      
      this.report.screenshots.push(meta);
      
      // 요약 업데이트
      elements.forEach(el => {
        this.report.summary.totalElements++;
        this.report.summary.elementTypes[el.type] = 
          (this.report.summary.elementTypes[el.type] || 0) + 1;
      });
      
      // 진행 상황 출력
      const progress = Math.min(100, Math.round((scrollY / pageHeight) * 100));
      console.log(`[${progress}%] Scroll ${actualScrollY}px - ${elements.length}개 UI 요소 감지 - ${fileName}`);
      
      // 다음 스크롤 위치
      scrollY += CONFIG.SCROLL_STEP;
      screenshotIndex++;
    }
    
    this.report.totalScreenshots = screenshotIndex;
    
    // 마지막으로 페이지 전체 스크린샷
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(500);
    
    const fullPagePath = path.join(this.outputDir, 'screenshot_fullpage.png');
    await this.page.screenshot({ path: fullPagePath, fullPage: true });
    console.log(`\n📸 전체 페이지 스크린샷: screenshot_fullpage.png`);
  }

  async analyzeForIssues(): Promise<void> {
    console.log('\n🔍 이슈 분석 중...');
    
    // 중복 요소 체크
    const elementMap = new Map<string, number>();
    this.report.screenshots.forEach(screenshot => {
      screenshot.elements.forEach(el => {
        const key = `${el.tag}-${el.className}-${el.text.substring(0, 20)}`;
        elementMap.set(key, (elementMap.get(key) || 0) + 1);
      });
    });
    
    // 여러 스크린샷에 중복되어 나타나는 요소 체크 (정상적인 중복일 수 있음)
    const duplicates = Array.from(elementMap.entries())
      .filter(([_, count]) => count > this.report.totalScreenshots * 0.8);
    
    if (duplicates.length > 0) {
      this.report.summary.issues.push(
        `스티키/고정 요소 ${duplicates.length}개 감지 (모든 스크린샷에 표시됨)`
      );
    }
    
    // 요소 타입별 통계
    const typeStats = Object.entries(this.report.summary.elementTypes)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => `  - ${type}: ${count}개`)
      .join('\n');
    
    console.log(`\n📊 UI 요소 통계:`);
    console.log(typeStats);
  }

  generateHTMLReport(): string {
    const screenshotsHtml = this.report.screenshots.map(screenshot => `
      <div class="screenshot-card">
        <div class="screenshot-header">
          <h3>#${screenshot.index} - Scroll ${screenshot.scrollY}px</h3>
          <span class="badge">${screenshot.elements.length} elements</span>
        </div>
        <div class="screenshot-img">
          <img src="${screenshot.fileName}" loading="lazy" alt="Screenshot at ${screenshot.scrollY}px">
        </div>
        <div class="elements-list">
          ${screenshot.elements.slice(0, 10).map(el => `
            <div class="element-tag ${el.type}">
              <span class="el-type">${el.type}</span>
              <span class="el-tag">&lt;${el.tag}&gt;</span>
              <span class="el-text">${el.text.substring(0, 30)}${el.text.length > 30 ? '...' : ''}</span>
            </div>
          `).join('')}
          ${screenshot.elements.length > 10 ? `<div class="more">...외 ${screenshot.elements.length - 10}개</div>` : ''}
        </div>
      </div>
    `).join('');

    const issuesHtml = this.report.summary.issues.length > 0 
      ? this.report.summary.issues.map(issue => `<li class="issue">${issue}</li>`).join('')
      : '<li class="no-issue">감지된 이슈 없음</li>';

    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lider Visual Audit Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0f; 
      color: #e0e0e0;
      line-height: 1.6;
    }
    .header { 
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 2rem;
      border-bottom: 1px solid #2a2a4a;
    }
    .header h1 { color: #4fc3f7; font-size: 1.8rem; margin-bottom: 0.5rem; }
    .meta { display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 1rem; }
    .meta-item { 
      background: rgba(255,255,255,0.05);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.9rem;
    }
    .meta-label { color: #888; font-size: 0.75rem; }
    .meta-value { color: #4fc3f7; font-weight: 600; }
    
    .stats { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      padding: 2rem;
      background: #12121a;
    }
    .stat-card { 
      background: #1a1a2e;
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid #2a2a4a;
      text-align: center;
    }
    .stat-value { font-size: 2rem; font-weight: 700; color: #4fc3f7; }
    .stat-label { font-size: 0.85rem; color: #888; margin-top: 0.25rem; }
    
    .issues { padding: 2rem; background: #12121a; }
    .issues h2 { color: #ff6b6b; margin-bottom: 1rem; }
    .issues ul { list-style: none; }
    .issue { 
      background: rgba(255,107,107,0.1);
      border-left: 3px solid #ff6b6b;
      padding: 0.75rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 0 6px 6px 0;
    }
    .no-issue { color: #4caf50; }
    
    .screenshots { padding: 2rem; }
    .screenshots h2 { color: #4fc3f7; margin-bottom: 1.5rem; }
    .screenshot-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
    }
    .screenshot-card {
      background: #1a1a2e;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #2a2a4a;
    }
    .screenshot-header {
      padding: 1rem;
      background: #0f0f1a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .screenshot-header h3 { font-size: 0.95rem; color: #e0e0e0; }
    .badge {
      background: #4fc3f7;
      color: #0a0a0f;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .screenshot-img img {
      width: 100%;
      height: auto;
      display: block;
    }
    .elements-list {
      padding: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .element-tag {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255,255,255,0.05);
      padding: 0.4rem 0.6rem;
      border-radius: 6px;
      font-size: 0.75rem;
    }
    .el-type { 
      background: #4fc3f7; 
      color: #0a0a0f; 
      padding: 0.15rem 0.4rem; 
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.65rem;
      text-transform: uppercase;
    }
    .el-tag { color: #888; font-family: monospace; }
    .el-text { color: #ccc; max-width: 150px; overflow: hidden; text-overflow: ellipsis; }
    .more { color: #666; font-size: 0.7rem; }
    
    .element-tag.buttons .el-type { background: #ff9800; }
    .element-tag.inputs .el-type { background: #4caf50; }
    .element-tag.cards .el-type { background: #9c27b0; }
    .element-tag.navigation .el-type { background: #2196f3; }
    .element-tag.links .el-type { background: #ff5722; }
    
    .footer {
      text-align: center;
      padding: 2rem;
      color: #666;
      font-size: 0.85rem;
      border-top: 1px solid #2a2a4a;
    }
  </style>
</head>
<body>
  <header class="header">
    <h1>🔍 Lider Visual Audit Report</h1>
    <p>Nano-Scroll Inspection Results</p>
    <div class="meta">
      <div class="meta-item">
        <div class="meta-label">URL</div>
        <div class="meta-value">${this.report.url}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Timestamp</div>
        <div class="meta-value">${new Date(this.report.timestamp).toLocaleString('ko-KR')}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Scroll Step</div>
        <div class="meta-value">${this.report.scrollStep}px</div>
      </div>
    </div>
  </header>
  
  <section class="stats">
    <div class="stat-card">
      <div class="stat-value">${this.report.totalScreenshots}</div>
      <div class="stat-label">Screenshots</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${this.report.summary.totalElements.toLocaleString()}</div>
      <div class="stat-label">Total UI Elements</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${this.report.pageHeight.toLocaleString()}px</div>
      <div class="stat-label">Page Height</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${Object.keys(this.report.summary.elementTypes).length}</div>
      <div class="stat-label">Element Types</div>
    </div>
  </section>
  
  <section class="issues">
    <h2>⚠️ Detected Issues</h2>
    <ul>
      ${issuesHtml}
    </ul>
  </section>
  
  <section class="screenshots">
    <h2>📸 Scroll Screenshots (${this.report.totalScreenshots} images)</h2>
    <div class="screenshot-grid">
      ${screenshotsHtml}
    </div>
  </section>
  
  <footer class="footer">
    <p>Generated by Lider Playwright Nano-Scroll Auditor</p>
  </footer>
</body>
</html>`;
  }

  async saveReport(): Promise<void> {
    // JSON 보고서 저장
    const jsonPath = path.join(this.outputDir, 'audit-report.json');
    fs.writeFileSync(jsonPath, JSON.stringify(this.report, null, 2), 'utf-8');
    console.log(`\n📝 JSON 보고서: ${jsonPath}`);
    
    // HTML 보고서 저장
    const htmlContent = this.generateHTMLReport();
    const htmlPath = path.join(this.outputDir, 'audit-report.html');
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log(`🌐 HTML 보고서: ${htmlPath}`);
    
    // 요약 콘솔 출력
    console.log('\n' + '='.repeat(60));
    console.log('✅ 검수 완료!');
    console.log('='.repeat(60));
    console.log(`📸 스크린샷: ${this.report.totalScreenshots}개`);
    console.log(`🎯 UI 요소: ${this.report.summary.totalElements.toLocaleString()}개`);
    console.log(`📄 페이지 높이: ${this.report.pageHeight.toLocaleString()}px`);
    console.log(`📁 출력 디렉토리: ${this.outputDir}`);
    console.log('='.repeat(60));
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      console.log('\n👋 브라우저 종료');
    }
  }
}

// 메인 실행
async function main() {
  const auditor = new NanoScrollAuditor();
  
  try {
    await auditor.init();
    await auditor.navigate(CONFIG.TARGET_URL);
    await auditor.captureScrollScreenshots();
    await auditor.analyzeForIssues();
    await auditor.saveReport();
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  } finally {
    await auditor.close();
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main();
}

export { NanoScrollAuditor, CONFIG };
