export const AUX_BACKGROUND_COLOR = '#1890ff'
export const AUX_COLOR = '#fff'
export const TOOLBAR_HEIGHT = 20
export function numbToPx(num?: number): string {
  return Math.round(num || 0) + 'px'
}
export function getMaxZIndex(el: Element, max = 0): number {
  const zIndexStr = window.getComputedStyle(el).zIndex
  let zIndex = max
  if (zIndexStr !== 'auto') {
    zIndex = Number(zIndexStr)
  }

  const maxZIndex = Math.max(zIndex, max)
  if (el.parentElement) {
    return getMaxZIndex(el.parentElement, maxZIndex)
  }
  return maxZIndex
}
