/** @jsxImportSource preact */
import { h } from 'preact';
import { PdfAnnotationSubtype, PdfAnnotationObject } from '@embedpdf/models';
import { SidebarPropsBase } from './common';
import { InkSidebar } from './ink-sidebar';
import { TextMarkupSidebar } from './text-markup-sidebar';
import { ShapeSidebar } from './shape-sidebar';
import { PolygonSidebar } from './polygon-sidebar';
import { LineSidebar } from './line-sidebar';
import { FreeTextSidebar } from './free-text-sidebar';
import { StampSidebar } from './stamp-sidebar';

type SidebarComponent<S extends PdfAnnotationSubtype> = (
  p: SidebarPropsBase<Extract<PdfAnnotationObject, { type: S }>>,
) => h.JSX.Element | null;

interface SidebarEntry<S extends PdfAnnotationSubtype> {
  component: SidebarComponent<S>;
  title?: string | ((p: SidebarPropsBase<Extract<PdfAnnotationObject, { type: S }>>) => string);
}

type SidebarRegistry = Partial<{
  [K in PdfAnnotationSubtype]: SidebarEntry<K>;
}>;

export const SIDEbars: SidebarRegistry = {
  [PdfAnnotationSubtype.INK]: { component: InkSidebar, title: '绘制' },
  [PdfAnnotationSubtype.POLYGON]: { component: PolygonSidebar, title: '多边形' },
  [PdfAnnotationSubtype.SQUARE]: { component: ShapeSidebar, title: '矩形' },
  [PdfAnnotationSubtype.CIRCLE]: { component: ShapeSidebar, title: '圆形' },

  [PdfAnnotationSubtype.LINE]: {
    component: LineSidebar,
    title: (p) => (p.activeTool?.id === 'lineArrow' ? '箭头' : '直线'),
  },
  [PdfAnnotationSubtype.POLYLINE]: { component: LineSidebar, title: '折线' },

  [PdfAnnotationSubtype.HIGHLIGHT]: { component: TextMarkupSidebar, title: '高亮' },
  [PdfAnnotationSubtype.UNDERLINE]: { component: TextMarkupSidebar, title: '下划线' },
  [PdfAnnotationSubtype.STRIKEOUT]: { component: TextMarkupSidebar, title: '删除线' },
  [PdfAnnotationSubtype.SQUIGGLY]: { component: TextMarkupSidebar, title: '波浪线' },
  [PdfAnnotationSubtype.FREETEXT]: { component: FreeTextSidebar, title: '文字' },
  [PdfAnnotationSubtype.STAMP]: { component: StampSidebar, title: '图章' },
};
