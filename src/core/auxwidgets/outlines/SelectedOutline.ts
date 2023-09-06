import { AUX_BACKGROUND_COLOR, getMaxZIndex, numbToPx } from '../contants'

export class SelectedOutline {
  name = 'default.actived-outline'
  resizeObserver: ResizeObserver
  private outline: HTMLElement | null = null
  private currentId: string | null = null
  constructor() {
    this.resizeObserver = new ResizeObserver(() => { })
  }
  handleSelectChange = (activedId: string | undefined | null): void => {
    this.resizeObserver.disconnect()
    this.clearLine()
    if (activedId) {
      this.currentId = activedId
      this.render(activedId)
    }
  }
  handleOutNode = (): void => {
    this.clearLine()
    this.currentId = null
  }
  refresh = () => {
    if (!this.currentId) {
      return
    }
    this.render(this.currentId)
  }
  private render(id: string) {
    const element = document.querySelector(`div[data-handler-id=${id}]`)
    element?.classList.add('zth-shell-select')
    // const canvas = document.body
    // if (element) {
    //   const rect = element.getBoundingClientRect()
    //   const htmlDiv = document.createElement('div')
    //   htmlDiv.style.backgroundColor = 'transparent'
    //   htmlDiv.style.position = 'fixed'
    //   htmlDiv.style.border = `solid 2px ${AUX_BACKGROUND_COLOR}`
    //   htmlDiv.style.pointerEvents = 'none'
    //   htmlDiv.style.left = numbToPx(rect.left)
    //   htmlDiv.style.top = numbToPx(rect.top)
    //   htmlDiv.style.height = numbToPx(rect.height - 4)
    //   htmlDiv.style.width = numbToPx(rect.width - 4)
    //   htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString()
    //   canvas?.appendChild(htmlDiv)
    //   this.outline = htmlDiv
    //   this.resizeObserver.observe(element)
    // }
  }
  private clearLine() {
    const element = document.querySelector(`div[data-handler-id=${this.currentId}]`)
    element?.classList.remove('zth-shell-select')
    if (this.outline) {
      this.outline.remove()
    }
    this.outline = null
  }
}
