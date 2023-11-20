export function addHttpPrefix(url: string) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = '//' + url
  }
  return url
}
export const getAppendTargetElement = () => {
  const targetNode = document.querySelector('#EditorCanvasFrame') as HTMLIFrameElement

  if (targetNode) {
    return targetNode.contentWindow
  }
  return window
}
export const injectHeadScriptElement = (urls: string[]) => {
  const fragment = document.createDocumentFragment()
  urls.forEach(url => {
    const scriptDOM = document.createElement('script')
    scriptDOM.src = addHttpPrefix(url)
    scriptDOM.type = 'text/javascript'
    scriptDOM.async = true
    scriptDOM.defer = false
    fragment.appendChild(scriptDOM)
  })

  const targetNode = getAppendTargetElement()
  console.log('useInjectMountJS', targetNode)
  // targetNode?.appendChild(fragment)
}

export const injectHeadLinkElement = (urls: string[]) => {
  const fragment = document.createDocumentFragment()
  urls.forEach(url => {
    const linkDOM = document.createElement('link')
    linkDOM.rel = 'stylesheet'
    linkDOM.href = addHttpPrefix(url)
    fragment.appendChild(linkDOM)
  })

  const targetNode = getAppendTargetElement()
  console.log('useInjectMountCss', targetNode)
  // targetNode?.appendChild(fragment)
}
/**
 * 创建css Link组件
 * @param href css地址
 */
function createCssLink(href: string): HTMLLinkElement {
  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = addHttpPrefix(href)
  return cssLink
}

/**
 * 创建js script地址
 * @param src 脚本地址
 */
function createJsScript(src: string): HTMLScriptElement {
  const jsScript = document.createElement('script')
  jsScript.src = addHttpPrefix(src)
  jsScript.type = 'text/javascript'
  jsScript.async = true
  return jsScript
}

/**
 * 注入预加载资源
 * 返回一个html片段
 */
export const useDynamicHeadInsertion = (
  heads: Array<{
    tag: 'link' | 'script'
    url: string
  }> | null
) => {
  if (!heads) {
    return null
  }
  try {
    const fragment = document.createDocumentFragment()

    heads.forEach(item => {
      if (item.tag === 'link') {
        fragment.appendChild(createCssLink(item.url))
      } else {
        fragment.appendChild(createJsScript(item.url))
      }
    })

    return fragment
  } catch (error) {
    return null
  }
}
