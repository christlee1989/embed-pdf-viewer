import { h } from 'preact';
import { Icon } from '../ui/icon';

export const EmptyState = () => (
  <div class="flex flex-col items-center gap-2 p-4 text-gray-500">
    <Icon icon="palette" className="h-18 w-18 text-gray-500" />
    <div className="max-w-[150px] text-center text-sm text-gray-500">
      选择一个标注即可查看样式。
    </div>
  </div>
);
