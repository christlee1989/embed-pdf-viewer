import { h } from 'preact';
import { Icon } from '../ui/icon';

export const EmptyState = () => (
  <div class="flex flex-col items-center gap-2 p-4 text-gray-500">
    <Icon icon="comment" className="h-18 w-18 text-gray-500" />
    <div className="max-w-[150px] text-center text-sm text-gray-500">
      添加标注后即可对其进行评论。
    </div>
  </div>
);
