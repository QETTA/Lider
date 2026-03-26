#!/usr/bin/env node
/**
 * LIDER 2026 E2E Report Comparator
 * 두 개의 E2E 실행 결과를 비교하여 변경점 감지
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class E2EComparator {
  constructor(run1Path, run2Path) {
    this.run1 = JSON.parse(fs.readFileSync(run1Path, 'utf8'));
    this.run2 = JSON.parse(fs.readFileSync(run2Path, 'utf8'));
    this.differences = [];
    this.similarities = [];
  }

  compare() {
    console.log('🔍 Comparing E2E Runs...\n');

    // 1. 스크린샷 수 비교
    this.compareScreenshotCounts();

    // 2. 페이지별 결과 비교
    this.comparePageResults();

    // 3. 검증 상태 비교
    this.compareValidations();

    // 4. 시각적 비교 (pixelmatch)
    this.visualComparison();

    return this.generateComparisonReport();
  }

  compareScreenshotCounts() {
    const count1 = this.run1.summary?.totalScreenshots || 0;
    const count2 = this.run2.summary?.totalScreenshots || 0;

    if (count1 !== count2) {
      this.differences.push({
        type: 'screenshot_count',
        severity: 'medium',
        message: `Screenshot count changed: ${count1} → ${count2} (${count2 - count1 > 0 ? '+' : ''}${count2 - count1})`
      });
    } else {
      this.similarities.push({
        type: 'screenshot_count',
        message: `Screenshot count stable: ${count1}`
      });
    }
  }

  comparePageResults() {
    const pages1 = this.run1.results || [];
    const pages2 = this.run2.results || [];

    // 새로 추가된 페이지
    const pageNames1 = new Set(pages1.map(p => `${p.name}_${p.viewport}`));
    const pageNames2 = new Set(pages2.map(p => `${p.name}_${p.viewport}`));

    const added = [...pageNames2].filter(p => !pageNames1.has(p));
    const removed = [...pageNames1].filter(p => !pageNames2.has(p));

    if (added.length > 0) {
      this.differences.push({
        type: 'pages_added',
        severity: 'low',
        message: `New pages added: ${added.join(', ')}`
      });
    }

    if (removed.length > 0) {
      this.differences.push({
        type: 'pages_removed',
        severity: 'high',
        message: `Pages removed: ${removed.join(', ')}`
      });
    }

    // 오류 상태 변경
    pages1.forEach(p1 => {
      const p2 = pages2.find(p => p.name === p1.name && p.viewport === p1.viewport);
      if (p2) {
        if (p1.error && !p2.error) {
          this.differences.push({
            type: 'error_fixed',
            severity: 'good',
            page: p1.name,
            viewport: p1.viewport,
            message: `Error fixed on ${p1.name}/${p1.viewport}`
          });
        } else if (!p1.error && p2.error) {
          this.differences.push({
            type: 'new_error',
            severity: 'high',
            page: p1.name,
            viewport: p1.viewport,
            message: `New error on ${p1.name}/${p1.viewport}: ${p2.error}`
          });
        }
      }
    });
  }

  compareValidations() {
    const validations1 = this.extractValidations(this.run1);
    const validations2 = this.extractValidations(this.run2);

    validations1.forEach(v1 => {
      const v2 = validations2.find(v => 
        v.page === v1.page && 
        v.viewport === v1.viewport && 
        v.type === v1.type
      );

      if (v2) {
        if (v1.status !== v2.status) {
          const isRegression = v1.status === 'pass' && (v2.status === 'warn' || v2.status === 'error');
          const isImprovement = (v1.status === 'warn' || v1.status === 'error') && v2.status === 'pass';

          this.differences.push({
            type: 'validation_change',
            severity: isRegression ? 'high' : isImprovement ? 'low' : 'medium',
            page: v1.page,
            viewport: v1.viewport,
            validation: v1.type,
            message: `${v1.type} on ${v1.page}/${v1.viewport}: ${v1.status} → ${v2.status}`,
            before: v1,
            after: v2,
            isRegression,
            isImprovement
          });
        }
      }
    });
  }

  extractValidations(report) {
    const validations = [];
    (report.results || []).forEach(page => {
      (page.validations || []).forEach(val => {
        validations.push({
          page: page.name,
          viewport: page.viewport,
          ...val
        });
      });
    });
    return validations;
  }

  visualComparison() {
    // 동일한 파일명을 가진 스크린샷 비교
    const dir1 = path.dirname(this.run1.config?.outputDir || '');
    const dir2 = path.dirname(this.run2.config?.outputDir || '');

    if (!dir1 || !dir2) return;

    const screenshots1 = this.listScreenshots(dir1);
    const screenshots2 = this.listScreenshots(dir2);

    const common = screenshots1.filter(s => screenshots2.includes(s));

    console.log(`📸 ${common.length} screenshots available for visual comparison`);

    // TODO: pixelmatch를 사용한 픽셀 단위 비교
  }

  listScreenshots(dir) {
    try {
      return fs.readdirSync(dir)
        .filter(f => f.endsWith('.png'))
        .map(f => f.replace(/_\d{4}-\d{2}-\d{2}.*$/, '')); // 타임스탬프 제거
    } catch {
      return [];
    }
  }

  generateComparisonReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalDifferences: this.differences.length,
        regressions: this.differences.filter(d => d.isRegression).length,
        improvements: this.differences.filter(d => d.isImprovement).length,
        highSeverity: this.differences.filter(d => d.severity === 'high').length,
        mediumSeverity: this.differences.filter(d => d.severity === 'medium').length,
        lowSeverity: this.differences.filter(d => d.severity === 'low').length
      },
      differences: this.differences.sort((a, b) => {
        const severityOrder = { high: 0, medium: 1, low: 2, good: 3 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      }),
      similarities: this.similarities
    };

    // 콘솔 출력
    console.log('='.repeat(60));
    console.log('📊 COMPARISON SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Differences: ${report.summary.totalDifferences}`);
    console.log(`  🔴 Regressions: ${report.summary.regressions}`);
    console.log(`  🟢 Improvements: ${report.summary.improvements}`);
    console.log(`  ⚪ Neutral: ${report.summary.totalDifferences - report.summary.regressions - report.summary.improvements}`);
    console.log('');
    console.log('Severity Breakdown:');
    console.log(`  🔴 High: ${report.summary.highSeverity}`);
    console.log(`  🟡 Medium: ${report.summary.mediumSeverity}`);
    console.log(`  🟢 Low: ${report.summary.lowSeverity}`);
    console.log('');

    if (report.differences.length > 0) {
      console.log('📝 DETAILED DIFFERENCES:');
      console.log('-'.repeat(60));
      report.differences.forEach((diff, i) => {
        const icon = diff.severity === 'high' ? '🔴' : diff.severity === 'medium' ? '🟡' : diff.isImprovement ? '🟢' : '⚪';
        console.log(`${i + 1}. ${icon} [${diff.type}] ${diff.message}`);
      });
    }

    // HTML 리포트 생성
    this.generateHTMLReport(report);

    return report;
  }

  generateHTMLReport(report) {
    const outputDir = 'e2e-reports';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>LIDER E2E Comparison Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      margin: 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 { color: #1a202c; }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .summary-card {
      padding: 24px;
      border-radius: 16px;
      text-align: center;
      color: white;
    }
    .card-high { background: linear-gradient(135deg, #fc8181 0%, #c53030 100%); }
    .card-medium { background: linear-gradient(135deg, #f6e05e 0%, #d69e2e 100%); }
    .card-low { background: linear-gradient(135deg, #68d391 0%, #276749 100%); }
    .card-total { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .diff-list { margin-top: 30px; }
    .diff-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 12px;
      background: #f7fafc;
      border-left: 4px solid;
    }
    .diff-high { border-color: #c53030; background: #fff5f5; }
    .diff-medium { border-color: #d69e2e; background: #fffff0; }
    .diff-low { border-color: #276749; background: #f0fff4; }
    .diff-good { border-color: #38a169; background: #f0fff4; }
    .diff-icon {
      font-size: 24px;
      flex-shrink: 0;
    }
    .diff-content h3 {
      margin: 0 0 8px 0;
      font-size: 16px;
      color: #2d3748;
    }
    .diff-content p {
      margin: 0;
      font-size: 14px;
      color: #718096;
    }
    .tag {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 8px;
    }
    .tag-regression { background: #fed7d7; color: #742a2a; }
    .tag-improvement { background: #c6f6d5; color: #22543d; }
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    .badge-pass { background: #c6f6d5; color: #22543d; }
    .badge-warn { background: #feebc8; color: #744210; }
    .badge-error { background: #fed7d7; color: #742a2a; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 LIDER E2E Comparison Report</h1>
    <p style="color: #718096;">Generated: ${new Date().toLocaleString('ko-KR')}</p>

    <div class="summary-grid">
      <div class="summary-card card-total">
        <h2>${report.summary.totalDifferences}</h2>
        <p>Total Changes</p>
      </div>
      <div class="summary-card card-high">
        <h2>${report.summary.highSeverity}</h2>
        <p>High Severity</p>
      </div>
      <div class="summary-card card-medium">
        <h2>${report.summary.mediumSeverity}</h2>
        <p>Medium Severity</p>
      </div>
      <div class="summary-card card-low">
        <h2>${report.summary.lowSeverity}</h2>
        <p>Low Severity</p>
      </div>
    </div>

    <div class="diff-list">
      <h2>Detailed Changes</h2>
      ${report.differences.map(diff => `
      <div class="diff-item diff-${diff.severity === 'high' ? 'high' : diff.severity === 'medium' ? 'medium' : diff.isImprovement ? 'low' : 'low'}">
        <span class="diff-icon">${diff.severity === 'high' ? '🔴' : diff.severity === 'medium' ? '🟡' : diff.isImprovement ? '🟢' : '⚪'}</span>
        <div class="diff-content">
          <h3>${diff.type.replace(/_/g, ' ').toUpperCase()}</h3>
          <p>${diff.message}</p>
          ${diff.isRegression ? '<span class="tag tag-regression">REGRESSION</span>' : ''}
          ${diff.isImprovement ? '<span class="tag tag-improvement">IMPROVEMENT</span>' : ''}
          ${diff.before && diff.after ? `
          <div style="margin-top: 12px; display: flex; gap: 16px; align-items: center;">
            <span>Before: <span class="badge badge-${diff.before.status}">${diff.before.status}</span></span>
            <span>→</span>
            <span>After: <span class="badge badge-${diff.after.status}">${diff.after.status}</span></span>
          </div>
          ` : ''}
        </div>
      </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

    const outputPath = path.join(outputDir, `comparison-${Date.now()}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`\n📄 HTML Report saved: ${outputPath}`);
  }
}

// CLI
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node e2e-compare.cjs <run1-report.json> <run2-report.json>');
  console.log('Example: node e2e-compare.cjs e2e-reports/2024-01-15/audit-report.json e2e-reports/2024-01-16/audit-report.json');
  process.exit(1);
}

const comparator = new E2EComparator(args[0], args[1]);
comparator.compare();

module.exports = { E2EComparator };
