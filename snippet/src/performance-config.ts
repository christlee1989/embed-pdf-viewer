import { PDFViewerConfig } from './components/app';

/**
 * 高性能PDF查看器配置
 * 针对大型PDF文件和快速加载进行了优化
 */
export const HIGH_PERFORMANCE_CONFIG: Partial<PDFViewerConfig> = {
  performance: {
    enableProgressiveRendering: true,
    preloadRange: 3, // 预加载前后3页
    cacheSize: 30, // 缓存30页
    cacheTtl: 60000, // 缓存60秒
  },
  log: false, // 关闭日志以提高性能
};

/**
 * 内存优化配置
 * 适用于内存受限的环境
 */
export const MEMORY_OPTIMIZED_CONFIG: Partial<PDFViewerConfig> = {
  performance: {
    enableProgressiveRendering: true,
    preloadRange: 1, // 只预加载前后1页
    cacheSize: 10, // 缓存10页
    cacheTtl: 30000, // 缓存30秒
  },
  log: false,
};

/**
 * 快速加载配置
 * 优先考虑首次加载速度
 */
export const FAST_LOADING_CONFIG: Partial<PDFViewerConfig> = {
  performance: {
    enableProgressiveRendering: true,
    preloadRange: 2,
    cacheSize: 20,
    cacheTtl: 45000,
  },
  log: false,
};

/**
 * 根据设备性能自动选择配置
 */
export function getOptimalConfig(deviceInfo?: {
  memory?: number;
  cores?: number;
  connection?: 'slow' | 'fast' | 'unknown';
}): Partial<PDFViewerConfig> {
  // 检测设备性能
  const isLowEndDevice = 
    (deviceInfo?.memory && deviceInfo.memory < 4) ||
    (deviceInfo?.cores && deviceInfo.cores < 4) ||
    deviceInfo?.connection === 'slow';

  if (isLowEndDevice) {
    return MEMORY_OPTIMIZED_CONFIG;
  }

  // 检测是否为移动设备
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    return FAST_LOADING_CONFIG;
  }

  // 默认使用高性能配置
  return HIGH_PERFORMANCE_CONFIG;
}
