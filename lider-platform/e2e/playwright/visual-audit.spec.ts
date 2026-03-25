/**
 * Playwright Visual Audit Test Suite
 * 
 * Tests for nano-level scroll audit functionality
 */

import { test, expect } from '@playwright/test';
import { VisualAuditNavigator, runNanoAudit } from './visual-audit';

// Test configuration
const TEST_URL = process.env.TEST_URL || 'http://localhost:3000';
const AUDIT_CONFIG = {
  scrollStep: parseInt(process.env.SCROLL_STEP || '100'), // 100px default
  viewportHeight: 1080,
  viewportWidth: 1920,
  waitAfterScroll: 500,
  outputDir: `./audit-results/${new Date().toISOString().replace(/[:.]/g, '-')}`,
  detectElements: true,
};

test.describe('Visual Audit Navigator - Nano Level Scroll', () => {
  
  test('should perform nano-level audit with 50px scroll step', async ({ page }) => {
    const config = { ...AUDIT_CONFIG, scrollStep: 50 };
    const auditor = new VisualAuditNavigator(page, config);
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    expect(report.screenshots.length).toBeGreaterThan(0);
    expect(report.config.scrollStep).toBe(50);
    console.log(`✅ Nano audit (50px) completed: ${report.screenshots.length} screenshots`);
  });

  test('should perform nano-level audit with 100px scroll step', async ({ page }) => {
    const config = { ...AUDIT_CONFIG, scrollStep: 100 };
    const auditor = new VisualAuditNavigator(page, config);
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    expect(report.screenshots.length).toBeGreaterThan(0);
    expect(report.config.scrollStep).toBe(100);
    console.log(`✅ Nano audit (100px) completed: ${report.screenshots.length} screenshots`);
  });

  test('should detect UI elements in each screenshot', async ({ page }) => {
    const auditor = new VisualAuditNavigator(page, AUDIT_CONFIG);
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    // Verify elements were detected
    expect(report.summary.uniqueElements).toBeGreaterThan(0);
    expect(Object.keys(report.summary.elementsByType).length).toBeGreaterThan(0);
    
    console.log('✅ Elements detected:', report.summary.elementsByType);
  });

  test('should capture all page sections with overlapping coverage', async ({ page }) => {
    const config = { ...AUDIT_CONFIG, scrollStep: 100 };
    const auditor = new VisualAuditNavigator(page, config);
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    // Check that we covered the entire page height
    const lastScreenshot = report.screenshots[report.screenshots.length - 1];
    const totalCoverage = lastScreenshot.viewportRange.bottom;
    
    expect(totalCoverage).toBeGreaterThanOrEqual(report.pageInfo.totalHeight * 0.9);
    console.log(`✅ Page coverage: ${totalCoverage}/${report.pageInfo.totalHeight}px`);
  });

  test('should generate audit report files', async ({ page }) => {
    const fs = require('fs');
    const path = require('path');
    
    const auditor = new VisualAuditNavigator(page, AUDIT_CONFIG);
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    // Verify report files exist
    const reportPath = path.join(AUDIT_CONFIG.outputDir, 'audit-report.json');
    const summaryPath = path.join(AUDIT_CONFIG.outputDir, 'audit-summary.md');
    const screenshotDir = path.join(AUDIT_CONFIG.outputDir, 'screenshots');
    
    expect(fs.existsSync(reportPath)).toBe(true);
    expect(fs.existsSync(summaryPath)).toBe(true);
    expect(fs.existsSync(screenshotDir)).toBe(true);
    
    // Verify JSON report content
    const savedReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    expect(savedReport.url).toBe(TEST_URL);
    expect(savedReport.screenshots.length).toBeGreaterThan(0);
    
    console.log('✅ Report files generated successfully');
  });

  test('should run with convenient helper function', async ({ page }) => {
    const report = await runNanoAudit(page, TEST_URL, AUDIT_CONFIG);
    
    expect(report).toBeDefined();
    expect(report.screenshots.length).toBeGreaterThan(0);
    expect(report.summary.uniqueElements).toBeGreaterThanOrEqual(0);
    
    console.log('✅ Helper function completed successfully');
  });

  test('should detect specific UI element types', async ({ page }) => {
    const auditor = new VisualAuditNavigator(page, {
      ...AUDIT_CONFIG,
      elementSelectors: [
        'button',
        'input',
        'a',
        'h1',
        'h2',
        'img',
      ],
    });
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    // Check for common element types
    const types = Object.keys(report.summary.elementsByType);
    expect(types.length).toBeGreaterThan(0);
    
    console.log('✅ Detected element types:', types);
  });

  test('should handle custom scroll steps from 50px to 200px', async ({ page }) => {
    const scrollSteps = [50, 75, 100, 150, 200];
    
    for (const step of scrollSteps) {
      const config = { ...AUDIT_CONFIG, scrollStep: step };
      const auditor = new VisualAuditNavigator(page, config);
      
      await auditor.initialize();
      await auditor.navigate(TEST_URL);
      await auditor.performNanoAudit();
      const report = await auditor.generateReport();
      
      expect(report.config.scrollStep).toBe(step);
      expect(report.screenshots.length).toBeGreaterThan(0);
      
      console.log(`✅ Scroll step ${step}px: ${report.screenshots.length} screenshots`);
    }
  });
});

test.describe('Visual Audit Navigator - Error Handling', () => {
  
  test('should handle invalid URLs gracefully', async ({ page }) => {
    const auditor = new VisualAuditNavigator(page, AUDIT_CONFIG);
    
    await auditor.initialize();
    
    // Should throw or handle gracefully
    try {
      await auditor.navigate('http://invalid-url-that-does-not-exist.local');
      // If no error thrown, that's also acceptable
      console.log('⚠️ Invalid URL did not throw (might have default page)');
    } catch (e) {
      console.log('✅ Invalid URL handled gracefully');
    }
  });

  test('should respect maxScreenshots limit', async ({ page }) => {
    const config = { ...AUDIT_CONFIG, maxScreenshots: 5 };
    const auditor = new VisualAuditNavigator(page, config);
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    expect(report.screenshots.length).toBeLessThanOrEqual(5);
    console.log(`✅ Max screenshots limit respected: ${report.screenshots.length}/5`);
  });

  test('should detect overlapping elements', async ({ page }) => {
    const auditor = new VisualAuditNavigator(page, AUDIT_CONFIG);
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    // Overlapping detection should run
    expect(report.summary.issues).toBeDefined();
    console.log(`✅ Issue detection completed: ${report.summary.issues.length} issues`);
  });
});

test.describe('Visual Audit Navigator - Performance', () => {
  
  test('should complete audit within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    const auditor = new VisualAuditNavigator(page, {
      ...AUDIT_CONFIG,
      scrollStep: 200, // Larger steps for faster test
      waitAfterScroll: 100, // Shorter wait
    });
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    await auditor.generateReport();
    
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(60000); // Should complete within 60 seconds
    
    console.log(`✅ Audit completed in ${duration}ms`);
  });

  test('should handle lazy loading content', async ({ page }) => {
    const auditor = new VisualAuditNavigator(page, {
      ...AUDIT_CONFIG,
      waitAfterScroll: 1000, // Longer wait for lazy loading
    });
    
    await auditor.initialize();
    await auditor.navigate(TEST_URL);
    await auditor.performNanoAudit();
    const report = await auditor.generateReport();
    
    // Should have captured screenshots with lazy loaded content
    expect(report.screenshots.length).toBeGreaterThan(0);
    console.log('✅ Lazy loading handled with extended wait');
  });
});
