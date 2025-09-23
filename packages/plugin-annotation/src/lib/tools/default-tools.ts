import {
  PdfAnnotationBorderStyle,
  PdfAnnotationLineEnding,
  PdfAnnotationSubtype,
  PdfBlendMode,
  PdfStandardFont,
  PdfTextAlignment,
  PdfVerticalAlignment,
} from '@embedpdf/models';
import { AnnotationTool } from './types';

export const defaultTools = [
  // Text Markup Tools
  {
    id: 'highlight' as const,
    name: '高亮',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.HIGHLIGHT ? 1 : 0),
    interaction: {
      exclusive: false,
      textSelection: true,
    },
    defaults: {
      type: PdfAnnotationSubtype.HIGHLIGHT,
      color: '#FFCD45',
      opacity: 1,
      blendMode: PdfBlendMode.Multiply,
    },
  },
  {
    id: 'underline' as const,
    name: '下划线',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.UNDERLINE ? 1 : 0),
    interaction: {
      exclusive: false,
      textSelection: true,
    },
    defaults: {
      type: PdfAnnotationSubtype.UNDERLINE,
      color: '#E44234',
      opacity: 1,
    },
  },
  {
    id: 'strikeout' as const,
    name: '删除线',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.STRIKEOUT ? 1 : 0),
    interaction: {
      exclusive: false,
      textSelection: true,
    },
    defaults: {
      type: PdfAnnotationSubtype.STRIKEOUT,
      color: '#E44234',
      opacity: 1,
    },
  },
  {
    id: 'squiggly' as const,
    name: '波浪线',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.SQUIGGLY ? 1 : 0),
    interaction: {
      exclusive: false,
      textSelection: true,
    },
    defaults: {
      type: PdfAnnotationSubtype.SQUIGGLY,
      color: '#E44234',
      opacity: 1,
    },
  },

  // Drawing Tools
  {
    id: 'ink' as const,
    name: '绘制',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.INK && a.intent !== 'InkHighlight' ? 5 : 0),
    interaction: {
      exclusive: false,
      cursor: 'crosshair',
    },
    defaults: {
      type: PdfAnnotationSubtype.INK,
      color: '#E44234',
      opacity: 1,
      strokeWidth: 6,
    },
  },
  {
    id: 'inkHighlighter' as const,
    name: '荧光笔',
    matchScore: (a) =>
      a.type === PdfAnnotationSubtype.INK && a.intent === 'InkHighlight' ? 10 : 0,
    interaction: {
      exclusive: false,
      cursor: 'crosshair',
    },
    defaults: {
      type: PdfAnnotationSubtype.INK,
      intent: 'InkHighlight',
      color: '#FFCD45',
      opacity: 1,
      strokeWidth: 14,
      blendMode: PdfBlendMode.Multiply,
    },
  },

  // Shape Tools
  {
    id: 'circle' as const,
    name: '圆形',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.CIRCLE ? 1 : 0),
    interaction: { exclusive: false, cursor: 'crosshair' },
    defaults: {
      type: PdfAnnotationSubtype.CIRCLE,
      color: 'transparent',
      opacity: 1,
      strokeWidth: 6,
      strokeColor: '#E44234',
      strokeStyle: PdfAnnotationBorderStyle.SOLID,
    },
    clickBehavior: {
      enabled: true,
      defaultSize: { width: 100, height: 100 },
    },
  },
  {
    id: 'square' as const,
    name: '矩形',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.SQUARE ? 1 : 0),
    interaction: { exclusive: false, cursor: 'crosshair' },
    defaults: {
      type: PdfAnnotationSubtype.SQUARE,
      color: 'transparent',
      opacity: 1,
      strokeWidth: 6,
      strokeColor: '#E44234',
      strokeStyle: PdfAnnotationBorderStyle.SOLID,
    },
    clickBehavior: {
      enabled: true,
      defaultSize: { width: 100, height: 100 },
    },
  },
  {
    id: 'line' as const,
    name: '直线',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.LINE && a.intent !== 'LineArrow' ? 5 : 0),
    interaction: { exclusive: false, cursor: 'crosshair' },
    defaults: {
      type: PdfAnnotationSubtype.LINE,
      color: 'transparent',
      opacity: 1,
      strokeWidth: 6,
      strokeColor: '#E44234',
    },
    clickBehavior: {
      enabled: true,
      defaultLength: 100,
      defaultAngle: 0,
    },
  },
  {
    id: 'lineArrow' as const,
    name: '箭头',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.LINE && a.intent === 'LineArrow' ? 10 : 0),
    interaction: { exclusive: false, cursor: 'crosshair' },
    defaults: {
      type: PdfAnnotationSubtype.LINE,
      intent: 'LineArrow',
      color: 'transparent',
      opacity: 1,
      strokeWidth: 6,
      strokeColor: '#E44234',
      lineEndings: {
        start: PdfAnnotationLineEnding.None,
        end: PdfAnnotationLineEnding.OpenArrow,
      },
    },
    clickBehavior: {
      enabled: true,
      defaultLength: 100,
      defaultAngle: 0,
    },
  },
  {
    id: 'polyline' as const,
    name: '折线',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.POLYLINE ? 1 : 0),
    interaction: { exclusive: false, cursor: 'crosshair' },
    defaults: {
      type: PdfAnnotationSubtype.POLYLINE,
      color: 'transparent',
      opacity: 1,
      strokeWidth: 6,
      strokeColor: '#E44234',
    },
  },
  {
    id: 'polygon' as const,
    name: '多边形',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.POLYGON ? 1 : 0),
    interaction: { exclusive: false, cursor: 'crosshair' },
    defaults: {
      type: PdfAnnotationSubtype.POLYGON,
      color: 'transparent',
      opacity: 1,
      strokeWidth: 6,
      strokeColor: '#E44234',
    },
  },

  // Text & Stamp
  {
    id: 'freeText' as const,
    name: '文字',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.FREETEXT ? 1 : 0),
    interaction: { exclusive: false, cursor: 'crosshair' },
    defaults: {
      type: PdfAnnotationSubtype.FREETEXT,
      contents: '在此输入文字',
      fontSize: 14,
      fontColor: '#E44234',
      fontFamily: PdfStandardFont.Helvetica,
      textAlign: PdfTextAlignment.Left,
      verticalAlign: PdfVerticalAlignment.Top,
      backgroundColor: 'transparent',
      opacity: 1,
    },
    clickBehavior: {
      enabled: true,
      defaultSize: { width: 100, height: 20 },
      defaultContent: '在此输入文字',
    },
  },
  {
    id: 'stamp' as const,
    name: '图片',
    matchScore: (a) => (a.type === PdfAnnotationSubtype.STAMP ? 1 : 0),
    interaction: { exclusive: false, cursor: 'copy' },
    defaults: {
      type: PdfAnnotationSubtype.STAMP,
      // No imageSrc by default, which tells the UI to open a file picker
    },
  },
] satisfies readonly AnnotationTool[];
