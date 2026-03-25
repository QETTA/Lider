#!/usr/bin/env ts-node
/**
 * Visual Audit CLI
 * 
 * 사용법:
 *   npx ts-node audit-cli.ts --url=http://localhost:3000 --step=100
 *   npm run audit -- --url=http://localhost:3000
 */

import { chromium, Browser, Page } from 'playwright';
import { VisualAuditNavigator } from './visual-audit';

interface CliOptions {
  url: string;
  scrollStep: number;
  viewportHeight: number;
  viewportWidth: number;
  waitAfterScroll: number;
  outputDir: string;
  headless: boolean;
  maxScreenshots?: number;
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    url: process.env.TEST_URL || 'http://localhost:3000',
    scrollStep: parseInt(process.env.SCROLL_STEP || '100'),
    viewportHeight: parseInt(process.env.VIEWPORT_HEIGHT || '1080'),
    viewportWidth: parseInt(process.env.VIEWPORT_WIDTH || '1920'),
    waitAfterScroll: parseInt(process.env.WAIT_AFTER_SCROLL || '500'),
    outputDir: `./audit-results/${new Date().toISOString().replace(/[:.]/g, '-')}`,
    headless: process.env.HEADLESS !== 'false',
  };

  for (const arg of args) {
    if (arg.startsWith('--url=')) {
      options.url = arg.replace('--url=', '');
    } else if (arg.startsWith('--step=')) {
      options.scrollStep = parseInt(arg.replace('--step=', ''));
    } else if (arg.startsWith('--viewport=')) {
      const [w, h] = arg.replace('--viewport=', '').split('x').map(Number);
      options.viewportWidth = w;
      options.viewportHeight = h;
    } else if (arg.startsWith('--wait=')) {
      options.waitAfterScroll = parseInt(arg.replace('--wait=', ''));
    } else if (arg.startsWith('--output=')) {
      options.outputDir = arg.replace('--output=', '');
    } else if (arg.startsWith('--max=')) {
      options.maxScreenshots = parseInt(arg.replace('--max=', ''));
    } else if (arg === '--headed') {
      options.headless = false;
    } else if (arg === '--help') {
      showHelp();
      process.exit(0);
    }
  }

  return options;
}

function showHelp(): void {
  console.log(`
Visual Audit CLI - LIDER Platform

사용법:
  npx ts-node audit-cli.ts [옵션]

옵션:
  --url=<URL>         검수 대상 URL (기본: http://localhost:3000)
  --step=<픽셀>       스크롤 단위 (기본: 100px)
  --viewport=<WxH>    뷰포트 크기 (기본: 1920x1080)
  --wait=<ms>         스크롤 후 대기 시간 (기본: 500ms)
  --output=<경로>     출력 디렉토리
  --max=<개수>        최대 스크린샷 수
  --headed            헤드리스 모드 끄기 (브라우저 표시)
  --help              이 도움말 표시

환경 변수:
  TEST_URL            검수 대상 URL
  SCROLL_STEP         스크롤 단위
  HEADLESS            헤드리스 모드 (true/false)

예시:
  # 기본 검수
  npx ts-node audit-cli.ts

  # 50px 나노 검수
  npx ts-node audit-cli.ts --step=50

  # 특정 URL 검수
  npx ts-node audit-cli.ts --url=https://example.com

  # 브라우저 표시 + 느린 스크롤
  npx ts-node audit-cli.ts --headed --wait=2000
`);
}

async function main(): Promise<void> {
  const options = parseArgs();

  console.log('═══════════════════════════════════════════');
  console.log('   LIDER Visual Audit Navigator - CLI');
  console.log('═══════════════════════════════════════════');
  console.log();
  console.log(`URL: ${options.url}`);
  console.log(`Scroll Step: ${options.scrollStep}px (nano-level)`);
  console.log(`Viewport: ${options.viewportWidth}x${options.viewportHeight}`);
  console.log(`Wait: ${options.waitAfterScroll}ms`);
  console.log(`Output: ${options.outputDir}`);
  console.log(`Headless: ${options.headless}`);
  console.log();

  let browser: Browser | null = null;

  try {
    // Launch browser
    browser = await chromium.launch({ headless: options.headless });
    const context = await browser.newContext({
      viewport: { width: options.viewportWidth, height: options.viewportHeight },
    });
    const page = await context.newPage();

    // Create auditor
    const auditor = new VisualAuditNavigator(page, {
      scrollStep: options.scrollStep,
      viewportHeight: options.viewportHeight,
      viewportWidth: options.viewportWidth,
      waitAfterScroll: options.waitAfterScroll,
      outputDir: options.outputDir,
      detectElements: true,
      maxScreenshots: options.maxScreenshots,
    });

    // Run audit
    await auditor.initialize();
    await auditor.navigate(options.url);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();

    // Summary
    console.log();
    console.log('═══════════════════════════════════════════');
    console.log('   Audit Complete!');
    console.log('═══════════════════════════════════════════');
    console.log();
    console.log(`Screenshots: ${report.summary.totalScreenshots}`);
    console.log(`Unique Elements: ${report.summary.uniqueElements}`);
    console.log(`Element Types: ${Object.keys(report.summary.elementsByType).join(', ')}`);
    console.log();
    console.log(`Report: ${options.outputDir}/audit-report.json`);
    console.log(`Summary: ${options.outputDir}/audit-summary.md`);
    console.log();

    if (report.summary.issues.length > 0) {
      console.log(`⚠️  Issues found: ${report.summary.issues.length}`);
      for (const issue of report.summary.issues) {
        const icon = issue.type === 'error' ? '🔴' : issue.type === 'warning' ? '🟡' : '🔵';
        console.log(`   ${icon} ${issue.message}`);
      }
      console.log();
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { main, parseArgs };
