import { AUX_BACKGROUND_COLOR, getMaxZIndex, numbToPx } from '../contants'

export class ActivedOutline {
  name = 'default.actived-outline'
  resizeObserver: ResizeObserver
  private outline: HTMLElement | null = null
  private currentId: string | null = null
  constructor() {
    this.resizeObserver = new ResizeObserver(() => {})
  }
  handleActivedChange = (activedId: string | undefined | null): void => {
    this.resizeObserver.disconnect()
    this.clearLine()
    if (activedId) {
      this.currentId = activedId
      this.renderLine(activedId)
    }
  }
  handleOutNode = (e: MouseEvent): void => {
    this.clearLine()
    this.currentId = null
  }
  refresh = () => {
    if (!this.currentId) {
      return
    }
    this.renderLine(this.currentId)
  }
  private renderLine(id: string) {
    const element = document.querySelector(`div[data-handler-id=${id}]`)
    const canvas = document.body
    if (element) {
      const rect = element.getBoundingClientRect()
      const htmlDiv = document.createElement('div')
      htmlDiv.style.backgroundColor = 'transparent'
      htmlDiv.style.position = 'fixed'
      htmlDiv.style.border = `dashed 1px ${AUX_BACKGROUND_COLOR}`
      htmlDiv.style.pointerEvents = 'none'
      htmlDiv.style.left = numbToPx(rect.left)
      htmlDiv.style.top = numbToPx(rect.top)
      htmlDiv.style.height = numbToPx(rect.height - 2)
      htmlDiv.style.width = numbToPx(rect.width - 2)
      htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString()
      canvas?.appendChild(htmlDiv)
      this.outline = htmlDiv
      this.resizeObserver.observe(element)
    }
  }
  private clearLine() {
    if (this.outline) {
      this.outline.remove()
    }
    this.outline = null
  }
}
