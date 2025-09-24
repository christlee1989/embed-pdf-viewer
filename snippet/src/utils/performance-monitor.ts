/**
 * PDF查看器性能监控工具
 * 用于监控和优化PDF加载和渲染性能
 */

export interface PerformanceMetrics {
  wasmLoadTime: number;
  documentLoadTime: number;
  firstPageRenderTime: number;
  totalPages: number;
  cacheHitRate: number;
  memoryUsage: number;
  averagePageRenderTime: number;
}

export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private startTimes: Map<string, number> = new Map();
  private pageRenderTimes: number[] = [];
  private cacheHits = 0;
  private cacheMisses = 0;

  /**
   * 开始计时
   */
  startTiming(label: string): void {
    this.startTimes.set(label, performance.now());
  }

  /**
   * 结束计时并记录
   */
  endTiming(label: string): number {
    const startTime = this.startTimes.get(label);
    if (!startTime) return 0;

    const duration = performance.now() - startTime;
    this.startTimes.delete(label);

    // 记录特定指标
    switch (label) {
      case 'wasmLoad':
        this.metrics.wasmLoadTime = duration;
        break;
      case 'documentLoad':
        this.metrics.documentLoadTime = duration;
        break;
      case 'firstPageRender':
        this.metrics.firstPageRenderTime = duration;
        break;
      case 'pageRender':
        this.pageRenderTimes.push(duration);
        this.metrics.averagePageRenderTime = 
          this.pageRenderTimes.reduce((a, b) => a + b, 0) / this.pageRenderTimes.length;
        break;
    }

    return duration;
  }

  /**
   * 记录缓存命中
   */
  recordCacheHit(): void {
    this.cacheHits++;
    this.updateCacheHitRate();
  }

  /**
   * 记录缓存未命中
   */
  recordCacheMiss(): void {
    this.cacheMisses++;
    this.updateCacheHitRate();
  }

  /**
   * 更新缓存命中率
   */
  private updateCacheHitRate(): void {
    const total = this.cacheHits + this.cacheMisses;
    this.metrics.cacheHitRate = total > 0 ? (this.cacheHits / total) * 100 : 0;
  }

  /**
   * 记录内存使用情况
   */
  recordMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
    }
  }

  /**
   * 设置总页数
   */
  setTotalPages(count: number): void {
    this.metrics.totalPages = count;
  }

  /**
   * 获取性能指标
   */
  getMetrics(): PerformanceMetrics {
    this.recordMemoryUsage();
    return this.metrics as PerformanceMetrics;
  }

  /**
   * 获取性能报告
   */
  getReport(): string {
    const metrics = this.getMetrics();
    
    return `
PDF查看器性能报告
================
WASM加载时间: ${metrics.wasmLoadTime?.toFixed(2) || 'N/A'}ms
文档加载时间: ${metrics.documentLoadTime?.toFixed(2) || 'N/A'}ms
首页渲染时间: ${metrics.firstPageRenderTime?.toFixed(2) || 'N/A'}ms
平均页面渲染时间: ${metrics.averagePageRenderTime?.toFixed(2) || 'N/A'}ms
总页数: ${metrics.totalPages || 'N/A'}
缓存命中率: ${metrics.cacheHitRate?.toFixed(1) || 'N/A'}%
内存使用: ${metrics.memoryUsage?.toFixed(2) || 'N/A'}MB

性能建议:
${this.getPerformanceSuggestions()}
    `.trim();
  }

  /**
   * 获取性能优化建议
   */
  private getPerformanceSuggestions(): string {
    const suggestions: string[] = [];
    const metrics = this.getMetrics();

    if (metrics.wasmLoadTime && metrics.wasmLoadTime > 2000) {
      suggestions.push('• WASM加载较慢，考虑使用CDN或预加载');
    }

    if (metrics.documentLoadTime && metrics.documentLoadTime > 3000) {
      suggestions.push('• 文档加载较慢，考虑压缩PDF或使用渐进式加载');
    }

    if (metrics.firstPageRenderTime && metrics.firstPageRenderTime > 1000) {
      suggestions.push('• 首页渲染较慢，考虑降低初始渲染质量');
    }

    if (metrics.cacheHitRate && metrics.cacheHitRate < 50) {
      suggestions.push('• 缓存命中率较低，考虑增加缓存大小');
    }

    if (metrics.memoryUsage && metrics.memoryUsage > 100) {
      suggestions.push('• 内存使用较高，考虑减少缓存大小');
    }

    if (suggestions.length === 0) {
      suggestions.push('• 性能表现良好，无需特别优化');
    }

    return suggestions.join('\n');
  }

  /**
   * 重置所有指标
   */
  reset(): void {
    this.metrics = {};
    this.startTimes.clear();
    this.pageRenderTimes = [];
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }
}

// 全局性能监控实例
export const performanceMonitor = new PerformanceMonitor();

// 在控制台输出性能报告（开发环境）
if (process.env.NODE_ENV !== 'production') {
  setInterval(() => {
    const report = performanceMonitor.getReport();
    if (report.includes('N/A')) return; // 只在有数据时输出
    console.log(report);
  }, 10000); // 每10秒输出一次
}
