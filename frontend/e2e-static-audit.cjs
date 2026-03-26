#!/usr/bin/env node
/**
 * LIDER 2026 Static Design Audit
 * 브라우저 없이 CSS/TSX 파일 정적 분석으로 디자인 시스템 검증
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class LIDERStaticAudit {
  constructor() {
    this.srcDir = path.join(__dirname, 'src');
    this.issues = [];
    this.stats = {
      filesChecked: 0,
      componentsFound: 0,
      cssClassesFound: new Set(),
      emotionModesImplemented: new Set()
    };
  }

  async run() {
    console.log('🔍 LIDER 2026 Static Design Audit');
    console.log('   Mode: Static Analysis (No Browser Required)\n');

    // 1. 컴포넌트 구조 분석
    this.auditComponents();
    
    // 2. CSS/스타일 분석
    this.auditStyles();
    
    // 3. 디자인 시스템 준수 검사
    this.auditDesignSystem();
    
    // 4. 접근성 검사
    this.auditAccessibility();

    // 리포트 생성
    this.generateReport();
    
    return this.stats;
  }

  auditComponents() {
    console.log('📦 Auditing Components...');
    
    const componentDirs = [
      path.join(this.srcDir, 'components', 'ui'),
      path.join(this.srcDir, 'components', 'layout'),
      path.join(this.srcDir, 'pages')
    ];

    componentDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
        this.stats.filesChecked += files.length;
        
        files.forEach(file => {
          const content = fs.readFileSync(path.join(dir, file), 'utf8');
          this.analyzeComponent(file, content);
        });
      }
    });

    console.log(`   ✅ Found ${this.stats.componentsFound} components in ${this.stats.filesChecked} files`);
  }

  analyzeComponent(filename, content) {
    const patterns = {
      // 2026 Design System Classes
      glassmorphism: /className.*glass[-\w]*/g,
      bentoGrid: /className.*bento[-\w]*/g,
      emotionMode: /emotion|mode.*morning|mode.*focus|mode.*evening|mode.*calm/gi,
      animatedNumber: /AnimatedNumber|animated-number/g,
      accessibility: /aria-|role=|tabIndex|focus-visible/g,
      
      // React patterns
      hooks: /useState|useEffect|useCallback|useMemo/g,
      typescript: /interface|type\s+\w+|Props/g
    };

    const results = {};
    for (const [key, pattern] of Object.entries(patterns)) {
      const matches = content.match(pattern) || [];
      results[key] = matches.length;
      
      // 클래스명 수집
      if (key === 'glassmorphism' || key === 'bentoGrid') {
        matches.forEach(m => this.stats.cssClassesFound.add(m));
      }
    }

    // 컴포넌트로 카운트 (export가 있는 파일)
    if (content.includes('export') && (content.includes('function') || content.includes('=>'))) {
      this.stats.componentsFound++;
    }

    // Emotion Mode 구현 확인
    if (results.emotionMode > 0) {
      const modes = ['morning', 'focus', 'evening', 'calm'];
      modes.forEach(mode => {
        if (content.toLowerCase().includes(mode)) {
          this.stats.emotionModesImplemented.add(mode);
        }
      });
    }

    // 문제점 검사
    this.checkComponentIssues(filename, content, results);
  }

  checkComponentIssues(filename, content, results) {
    // 1. 스타일링 없는 컴포넌트
    if (!content.includes('className') && !content.includes('style=')) {
      this.issues.push({
        type: 'warning',
        file: filename,
        message: 'Component may lack styling (no className or style found)'
      });
    }

    // 2. 접근성 누락
    if (content.includes('onClick') && !content.includes('aria-')) {
      const hasButton = content.includes('<button') || content.includes('role="button"');
      if (!hasButton) {
        this.issues.push({
          type: 'accessibility',
          file: filename,
          message: 'Click handler without accessibility attributes'
        });
      }
    }

    // 3. 이미지 without alt
    const imgMatches = content.match(/<img[^>]*>/g) || [];
    imgMatches.forEach(img => {
      if (!img.includes('alt=')) {
        this.issues.push({
          type: 'accessibility',
          file: filename,
          message: 'Image without alt text'
        });
      }
    });

    // 4. Glassmorphism without backdrop-filter
    if (content.includes('glass') && !content.includes('backdrop')) {
      this.issues.push({
        type: 'design-system',
        file: filename,
        message: 'Glass class used but backdrop-filter may be missing'
      });
    }
  }

  auditStyles() {
    console.log('\n🎨 Auditing Styles...');
    
    const styleFiles = [
      path.join(this.srcDir, 'styles', 'design-system.css'),
      path.join(this.srcDir, 'styles', 'accessibility.css'),
      path.join(this.srcDir, 'index.css')
    ];

    const designTokens = {
      colors: /--color-[\w-]+:\s*#[0-9a-fA-F]+/g,
      spacing: /--spacing-[\w-]+:\s*[\d.]+/g,
      radii: /--radius-[\w-]+:\s*[\d.]+/g,
      animations: /@keyframes\s+\w+/g
    };

    styleFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        console.log(`   📄 ${path.basename(file)}`);
        
        for (const [token, pattern] of Object.entries(designTokens)) {
          const matches = content.match(pattern) || [];
          console.log(`      ${token}: ${matches.length} tokens`);
        }

        // CSS 변수 정의 검사
        if (content.includes('--color-primary-500')) {
          console.log('      ✅ Primary color system defined');
        }
        if (content.includes('backdrop-filter')) {
          console.log('      ✅ Glassmorphism effects defined');
        }
      }
    });
  }

  auditDesignSystem() {
    console.log('\n✨ Design System Compliance Check');
    
    const checks = [
      { name: 'Glassmorphism', files: ['GlassCard.tsx', 'Header2026.tsx'], classes: ['glass-card', 'glass'] },
      { name: 'Bento Grid', files: ['BentoGrid.tsx', 'Dashboard2026.tsx'], classes: ['bento-grid', 'bento-card'] },
      { name: 'Emotion Mode', files: ['EmotionModeSelector.tsx'], classes: ['emotion', 'mode'] },
      { name: 'Animated Numbers', files: ['AnimatedNumber.tsx'], classes: ['animated-number'] },
      { name: '2026 Layout', files: ['Layout.tsx', 'Sidebar2026.tsx', 'Header2026.tsx'], classes: ['glass-header'] }
    ];

    checks.forEach(check => {
      const found = check.files.some(f => {
        const paths = [
          path.join(this.srcDir, 'components', 'ui', f),
          path.join(this.srcDir, 'components', 'layout', f),
          path.join(this.srcDir, 'pages', f)
        ];
        return paths.some(p => fs.existsSync(p));
      });

      const status = found ? '✅' : '❌';
      console.log(`   ${status} ${check.name}: ${found ? 'Implemented' : 'Missing'}`);
    });

    // Emotion Mode 구현 상세
    console.log(`\n   🎭 Emotion Modes Implemented: ${this.stats.emotionModesImplemented.size}/4`);
    ['morning', 'focus', 'evening', 'calm'].forEach(mode => {
      const has = this.stats.emotionModesImplemented.has(mode);
      console.log(`      ${has ? '✅' : '❌'} ${mode}`);
    });
  }

  auditAccessibility() {
    console.log('\n♿ Accessibility Audit');
    
    const a11yIssues = this.issues.filter(i => i.type === 'accessibility');
    const warnings = this.issues.filter(i => i.type === 'warning');
    
    console.log(`   Issues found: ${a11yIssues.length} accessibility, ${warnings.length} warnings`);
    
    if (a11yIssues.length > 0) {
      console.log('\n   Accessibility Issues:');
      a11yIssues.slice(0, 5).forEach(issue => {
        console.log(`      ⚠️  ${issue.file}: ${issue.message}`);
      });
      if (a11yIssues.length > 5) {
        console.log(`      ... and ${a11yIssues.length - 5} more`);
      }
    }

    // 접근성 CSS 확인
    const a11yCss = path.join(this.srcDir, 'styles', 'accessibility.css');
    if (fs.existsSync(a11yCss)) {
      console.log('   ✅ accessibility.css exists');
    } else {
      console.log('   ❌ accessibility.css not found');
    }
  }

  generateReport() {
    const outputDir = path.join(__dirname, 'e2e-reports', 'static');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        filesChecked: this.stats.filesChecked,
        componentsFound: this.stats.componentsFound,
        issuesFound: this.issues.length,
        designSystemScore: this.calculateScore()
      },
      details: {
        emotionModes: [...this.stats.emotionModesImplemented],
        cssClasses: [...this.stats.cssClassesFound].slice(0, 50),
        issues: this.issues
      }
    };

    // JSON 저장
    fs.writeFileSync(
      path.join(outputDir, 'static-audit.json'),
      JSON.stringify(report, null, 2)
    );

    // HTML 생성
    this.generateHTMLReport(report, outputDir);

    console.log('\n📊 Static Audit Complete!');
    console.log(`   Design System Score: ${report.summary.designSystemScore}/100`);
    console.log(`   Report: ${outputDir}/index.html`);
    
    return report;
  }

  calculateScore() {
    let score = 0;
    
    // 기본 점수
    if (this.stats.componentsFound > 0) score += 20;
    if (this.stats.filesChecked > 10) score += 10;
    
    // 디자인 시스템
    if (this.stats.cssClassesFound.size > 0) score += 15;
    if (this.stats.emotionModesImplemented.size >= 2) score += 15;
    if (this.stats.emotionModesImplemented.size === 4) score += 10;
    
    // 접근성
    const a11yCount = this.issues.filter(i => i.type === 'accessibility').length;
    score += Math.max(0, 20 - a11yCount * 2);
    
    // 파일 존재 확인
    const criticalFiles = [
      'src/styles/design-system.css',
      'src/styles/accessibility.css',
      'src/components/ui/GlassCard.tsx',
      'src/components/ui/BentoGrid.tsx',
      'src/components/layout/Layout.tsx'
    ];
    
    criticalFiles.forEach(f => {
      if (fs.existsSync(path.join(__dirname, f))) score += 2;
    });
    
    return Math.min(100, score);
  }

  generateHTMLReport(report, outputDir) {
    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>LIDER 2026 Static Audit Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      max-width: 900px;
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
    }
    .subtitle { color: #718096; margin-bottom: 30px; }
    .score-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 30px;
    }
    .score-number {
      font-size: 5rem;
      font-weight: 700;
      line-height: 1;
    }
    .score-label {
      font-size: 1.2rem;
      margin-top: 10px;
      opacity: 0.9;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: #f7fafc;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #4a5568;
    }
    .stat-label {
      color: #718096;
      font-size: 0.9rem;
      margin-top: 4px;
    }
    .section {
      margin-top: 30px;
    }
    .section h2 {
      color: #2d3748;
      margin-bottom: 16px;
    }
    .issue-list {
      list-style: none;
    }
    .issue-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background: #fff5f5;
      border-left: 4px solid #fc8181;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    .issue-item.warning {
      background: #fffff0;
      border-color: #f6e05e;
    }
    .issue-icon {
      font-size: 20px;
      flex-shrink: 0;
    }
    .issue-content h4 {
      color: #2d3748;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .issue-content p {
      color: #718096;
      font-size: 13px;
    }
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .tag {
      background: #e2e8f0;
      color: #4a5568;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
    }
    .tag.success {
      background: #c6f6d5;
      color: #22543d;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      color: #718096;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 LIDER 2026 Static Audit Report</h1>
    <p class="subtitle">Generated: ${new Date().toLocaleString('ko-KR')}</p>

    <div class="score-card">
      <div class="score-number">${report.summary.designSystemScore}</div>
      <div class="score-label">Design System Score / 100</div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${report.summary.filesChecked}</div>
        <div class="stat-label">Files Checked</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${report.summary.componentsFound}</div>
        <div class="stat-label">Components</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${report.summary.issuesFound}</div>
        <div class="stat-label">Issues Found</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${report.details.emotionModes.length}</div>
        <div class="stat-label">Emotion Modes</div>
      </div>
    </div>

    <div class="section">
      <h2>🎭 Emotion Modes</h2>
      <div class="tag-list">
        ${report.details.emotionModes.map(m => `<span class="tag success">${m}</span>`).join('')}
        ${['morning', 'focus', 'evening', 'calm'].filter(m => !report.details.emotionModes.includes(m)).map(m => `<span class="tag">${m} (missing)</span>`).join('')}
      </div>
    </div>

    ${report.details.issues.length > 0 ? `
    <div class="section">
      <h2>⚠️ Issues (${report.details.issues.length})</h2>
      <ul class="issue-list">
        ${report.details.issues.slice(0, 10).map(i => `
        <li class="issue-item ${i.type}">
          <span class="issue-icon">${i.type === 'accessibility' ? '♿' : i.type === 'design-system' ? '🎨' : '⚠️'}</span>
          <div class="issue-content">
            <h4>${i.file}</h4>
            <p>${i.message}</p>
          </div>
        </li>
        `).join('')}
      </ul>
      ${report.details.issues.length > 10 ? `<p style="text-align: center; color: #718096; margin-top: 16px;">... and ${report.details.issues.length - 10} more issues</p>` : ''}
    </div>
    ` : ''}

    <div class="footer">
      <p>🚀 LIDER 2026 Design System | Static Analysis Mode</p>
    </div>
  </div>
</body>
</html>`;

    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  }
}

// 실행
new LIDERStaticAudit().run().catch(console.error);

module.exports = { LIDERStaticAudit };
