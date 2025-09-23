import { PdfBlendMode } from '../pdf';

/** Extra UI sentinel for “multiple different values selected”. */
export const MixedBlendMode = Symbol('mixed');
export type UiBlendModeValue = PdfBlendMode | typeof MixedBlendMode;

export type CssBlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

interface BlendModeInfo {
  /** Pdf enum value */
  id: PdfBlendMode;
  /** Human label for UI */
  label: string;
  /** CSS mix-blend-mode token */
  css: CssBlendMode;
}

/** Canonical ordered descriptor list (matches enum numeric order). */
const BLEND_MODE_INFOS: readonly BlendModeInfo[] = Object.freeze([
  { id: PdfBlendMode.Normal, label: '正常', css: 'normal' },
  { id: PdfBlendMode.Multiply, label: '正片叠底', css: 'multiply' },
  { id: PdfBlendMode.Screen, label: '滤色', css: 'screen' },
  { id: PdfBlendMode.Overlay, label: '叠加', css: 'overlay' },
  { id: PdfBlendMode.Darken, label: '变暗', css: 'darken' },
  { id: PdfBlendMode.Lighten, label: '变亮', css: 'lighten' },
  { id: PdfBlendMode.ColorDodge, label: '颜色减淡', css: 'color-dodge' },
  { id: PdfBlendMode.ColorBurn, label: '颜色加深', css: 'color-burn' },
  { id: PdfBlendMode.HardLight, label: '强光', css: 'hard-light' },
  { id: PdfBlendMode.SoftLight, label: '柔光', css: 'soft-light' },
  { id: PdfBlendMode.Difference, label: '差值', css: 'difference' },
  { id: PdfBlendMode.Exclusion, label: '排除', css: 'exclusion' },
  { id: PdfBlendMode.Hue, label: '色相', css: 'hue' },
  { id: PdfBlendMode.Saturation, label: '饱和度', css: 'saturation' },
  { id: PdfBlendMode.Color, label: '颜色', css: 'color' },
  { id: PdfBlendMode.Luminosity, label: '明度', css: 'luminosity' },
]);

/* Build O(1) maps once */
const enumToInfo: Record<PdfBlendMode, BlendModeInfo> = BLEND_MODE_INFOS.reduce(
  (m, info) => {
    m[info.id] = info;
    return m;
  },
  {} as Record<PdfBlendMode, BlendModeInfo>,
);

const cssToEnum = BLEND_MODE_INFOS.reduce<Record<CssBlendMode, PdfBlendMode>>(
  (m, info) => {
    m[info.css] = info.id;
    return m;
  },
  {} as Record<CssBlendMode, PdfBlendMode>,
);

/** Get descriptor (falls back to Normal if unknown number sneaks in).
 *
 * @public
 */
export function getBlendModeInfo(mode: PdfBlendMode): BlendModeInfo {
  return enumToInfo[mode] ?? enumToInfo[PdfBlendMode.Normal];
}

/** Convert enum → CSS value for `mix-blend-mode`.
 *
 * @public
 */
export function blendModeToCss(mode: PdfBlendMode): CssBlendMode {
  return getBlendModeInfo(mode).css;
}

/** Convert CSS token → enum (returns undefined if not recognized).
 *
 * @public
 */
export function cssToBlendMode(value: CssBlendMode): PdfBlendMode | undefined {
  return cssToEnum[value];
}

/** Enum → UI label.
 *
 * @public
 */
export function blendModeLabel(mode: PdfBlendMode): string {
  return getBlendModeInfo(mode).label;
}

/**
 * For a selection of annotations: returns the common enum value, or Mixed sentinel.
 *
 * @public
 */
export function reduceBlendModes(modes: readonly PdfBlendMode[]): UiBlendModeValue {
  if (!modes.length) return PdfBlendMode.Normal;
  const first = modes[0];
  return modes.every((m) => m === first) ? first : MixedBlendMode;
}

/** Options for a <select>.
 *
 * @public
 */
export const blendModeSelectOptions = BLEND_MODE_INFOS.map((info) => ({
  value: info.id,
  label: info.label,
}));

/** Provide a label when Mixed sentinel used (UI convenience).
 *
 * @public
 */
export function uiBlendModeDisplay(value: UiBlendModeValue): string {
  return value === MixedBlendMode ? '(mixed)' : blendModeLabel(value);
}
