import { h } from 'preact';
import { PdfStampAnnoObject } from '@embedpdf/models';
import { SidebarPropsBase } from './common';

export const StampSidebar = (_props: SidebarPropsBase<PdfStampAnnoObject>) => {
  return <div className="text-sm text-gray-500">图章暂无样式可设置。</div>;
};
