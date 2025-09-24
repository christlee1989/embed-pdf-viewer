import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

interface ProgressiveLoaderProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
  showProgress?: boolean;
}

export function ProgressiveLoader({ 
  isLoading, 
  progress = 0, 
  message = "正在加载PDF...", 
  showProgress = true 
}: ProgressiveLoaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [dots, setDots] = useState('');

  // 平滑进度条动画
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDisplayProgress(prev => {
          const diff = progress - prev;
          if (Math.abs(diff) < 0.5) return progress;
          return prev + diff * 0.1;
        });
      }, 16); // 60fps
      return () => clearInterval(interval);
    }
  }, [isLoading, progress]);

  // 加载点动画
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDots(prev => {
          if (prev.length >= 3) return '';
          return prev + '.';
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* PDF图标 */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
        </div>

        {/* 加载消息 */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {message}{dots}
        </h3>

        {/* 进度条 */}
        {showProgress && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, displayProgress))}%` }}
            />
          </div>
        )}

        {/* 进度百分比 */}
        {showProgress && (
          <p className="text-sm text-gray-600">
            {Math.round(displayProgress)}%
          </p>
        )}

        {/* 优化提示 */}
        <div className="mt-6 text-xs text-gray-500 space-y-1">
          <p>• 正在优化渲染性能</p>
          <p>• 预加载相邻页面</p>
          <p>• 智能缓存管理</p>
        </div>
      </div>
    </div>
  );
}

// 轻量级加载指示器
export function SimpleLoader({ message = "加载中..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">{message}</span>
      </div>
    </div>
  );
}
