#!/usr/bin/env node
/**
 * LIDER 2026 E2E Continuous Runner
 * 반복 검수 및 회귀 테스트 자동화
 */

const { LIDERScreenshotAudit, CONFIG } = require('./e2e-screenshot-audit.cjs');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class LIDERContinuousRunner {
  constructor(options = {}) {
    this.options = {
      interval: options.interval || 300000, // 5분
      maxRuns: options.maxRuns || Infinity,
      compareMode: options.compareMode !== false, // 이전 실행과 비교
      alertOnRegression: options.alertOnRegression !== false,
      slackWebhook: options.slackWebhook || process.env.SLACK_WEBHOOK,
      outputDir: options.outputDir || path.join(__dirname, 'e2e-reports')
    };
    
    this.runCount = 0;
    this.runs = [];
    this.baseline = null;
  }

  async start() {
    console.log('🔄 LIDER E2E Continuous Runner Started');
    console.log(`   Interval: ${this.options.interval}ms`);
    console.log(`   Compare Mode: ${this.options.compareMode}`);
    console.log(`   Max Runs: ${this.options.maxRuns === Infinity ? '∞' : this.options.maxRuns}`);
    
    // 첫 실행
    await this.runAudit();
    
    // 반복 실행
    if (this.options.maxRuns > 1) {
      const timer = setInterval(async () => {
        if (this.runCount >= this.options.maxRuns) {
          clearInterval(timer);
          console.log('\n✅ Max runs reached. Stopping.');
          this.generateFinalReport();
          return;
        }
        await this.runAudit();
      }, this.options.interval);
    }
  }

  async runAudit() {
    this.runCount++;
    console.log(`\n🏃 Run #${this.runCount} - ${new Date().toLocaleString('ko-KR')}`);
    
    const audit = new LIDERScreenshotAudit();
    const runStart = Date.now();
    
    try {
      await audit.init();
      await audit.auditAll();
      const report = audit.generateReport();
      
      const runData = {
        runId: this.runCount,
        timestamp: new Date().toISOString(),
        duration: Date.now() - runStart,
        report,
        changes: null,
        regressions: []
      };

      // 베이스라인과 비교
      if (this.options.compareMode && this.baseline) {
        runData.changes = this.compareWithBaseline(report, this.baseline);
        runData.regressions = this.detectRegressions(runData.changes);
        
        if (runData.regressions.length > 0 && this.options.alertOnRegression) {
          await this.sendRegressionAlert(runData.regressions);
        }
      }

      // 새 베이스라인 설정 (첫 실행 또는 개선된 경우)
      if (!this.baseline || (runData.regressions.length === 0 && this.runCount === 1)) {
        this.baseline = report;
        console.log('   📌 New baseline established');
      }

      this.runs.push(runData);
      
      // 실시간 요약 출력
      this.printRunSummary(runData);
      
    } catch (error) {
      console.error(`   ❌ Run #${this.runCount} failed:`, error.message);
      this.runs.push({
        runId: this.runCount,
        timestamp: new Date().toISOString(),
        error: error.message,
        duration: Date.now() - runStart
      });
    } finally {
      await audit.close();
    }
  }

  compareWithBaseline(current, baseline) {
    const changes = {
      newScreenshots: [],
      modifiedPages: [],
      validationDiffs: []
    };

    // 스크린샷 수 비교
    const currentScreenshots = current.summary.totalScreenshots;
    const baselineScreenshots = baseline.summary.totalScreenshots;
    
    if (currentScreenshots !== baselineScreenshots) {
      changes.newScreenshots.push({
        type: 'count_change',
        before: baselineScreenshots,
        after: currentScreenshots,
        diff: currentScreenshots - baselineScreenshots
      });
    }

    // 페이지별 검증 결과 비교
    current.results.forEach(currPage => {
      const basePage = baseline.results.find(p => p.name === currPage.name && p.viewport === currPage.viewport);
      
      if (basePage && currPage.validations && basePage.validations) {
        currPage.validations.forEach((currVal, idx) => {
          const baseVal = basePage.validations[idx];
          if (baseVal && currVal.status !== baseVal.status) {
            changes.validationDiffs.push({
              page: currPage.name,
              viewport: currPage.viewport,
              type: currVal.type,
              before: baseVal.status,
              after: currVal.status
            });
          }
        });
      }
    });

    return changes;
  }

  detectRegressions(changes) {
    const regressions = [];
    
    // 검증 상태가 pass에서 warn/error로 변경된 경우
    changes.validationDiffs.forEach(diff => {
      if (diff.before === 'pass' && (diff.after === 'warn' || diff.after === 'error')) {
        regressions.push({
          type: 'validation_regression',
          ...diff,
          severity: diff.after === 'error' ? 'high' : 'medium'
        });
      }
    });

    // 스크린샷 수가 감소한 경우
    changes.newScreenshots.forEach(screenshot => {
      if (screenshot.diff < 0) {
        regressions.push({
          type: 'screenshot_loss',
          count: Math.abs(screenshot.diff),
          severity: 'high'
        });
      }
    });

    return regressions;
  }

  printRunSummary(runData) {
    if (runData.error) {
      console.log(`   ❌ FAILED: ${runData.error}`);
      return;
    }

    const { report, changes, regressions } = runData;
    console.log(`   ✅ SUCCESS - ${report.summary.totalScreenshots} screenshots`);
    
    if (changes && changes.validationDiffs.length > 0) {
      console.log(`   📝 ${changes.validationDiffs.length} validation changes`);
    }
    
    if (regressions.length > 0) {
      console.log(`   🚨 ${regressions.length} REGRESSIONS DETECTED:`);
      regressions.forEach(r => {
        console.log(`      - ${r.type}: ${r.severity} severity`);
      });
    }
  }

  async sendRegressionAlert(regressions) {
    const message = {
      text: '🚨 LIDER E2E Regression Detected',
      blocks: regressions.map(r => ({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${r.type}*\nPage: ${r.page || 'N/A'} | Severity: ${r.severity}`
        }
      }))
    };

    if (this.options.slackWebhook) {
      try {
        execSync(`curl -X POST -H 'Content-type: application/json' --data '${JSON.stringify(message)}' ${this.options.slackWebhook}`, {
          stdio: 'pipe'
        });
        console.log('   📤 Slack alert sent');
      } catch (e) {
        console.log('   ⚠️ Failed to send Slack alert');
      }
    } else {
      // 콘솔 알림
      console.log('   🔔 REGRESSION ALERT (Slack not configured)');
    }
  }

  generateFinalReport() {
    const reportPath = path.join(this.options.outputDir, 'continuous-run-summary.json');
    
    const summary = {
      totalRuns: this.runCount,
      successfulRuns: this.runs.filter(r => !r.error).length,
      failedRuns: this.runs.filter(r => r.error).length,
      totalRegressions: this.runs.reduce((sum, r) => sum + (r.regressions?.length || 0), 0),
      runs: this.runs,
      generatedAt: new Date().toISOString()
    };

    fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
    
    console.log('\n📊 Final Summary Report');
    console.log(`   Total Runs: ${summary.totalRuns}`);
    console.log(`   Successful: ${summary.successfulRuns}`);
    console.log(`   Failed: ${summary.failedRuns}`);
    console.log(`   Regressions: ${summary.totalRegressions}`);
    console.log(`   Report: ${reportPath}`);
  }
}

// CLI 실행
const args = process.argv.slice(2);
const options = {
  interval: args.includes('--interval') ? parseInt(args[args.indexOf('--interval') + 1]) : 300000,
  maxRuns: args.includes('--runs') ? parseInt(args[args.indexOf('--runs') + 1]) : Infinity,
  compareMode: !args.includes('--no-compare'),
  alertOnRegression: !args.includes('--no-alert')
};

const runner = new LIDERContinuousRunner(options);
runner.start();

module.exports = { LIDERContinuousRunner };
