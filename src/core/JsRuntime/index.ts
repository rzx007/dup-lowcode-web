export interface ExecuteResult {
  value: any
  error: any
  success: boolean
}

export type InjectVMVarsType = Record<string, unknown>

interface IBrowserRuntimeVMWindow extends Window {
  __INJECT_VARS__?: InjectVMVarsType
  eval: typeof window.eval
}

class BrowserRuntimeVM {
  private iframe: HTMLIFrameElement | null = null

  constructor() {
    this.iframe = this.createRuntmieContext()
  }
  private createRuntmieContext() {
    let iframe = document.getElementById('RuntimeCtxId') as HTMLIFrameElement
    try {
      if (!iframe) {
        iframe = document.createElement('iframe')
        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts')
        iframe.style.display = 'none'
        iframe.id = 'RuntimeCtxId'
        document.documentElement.appendChild(iframe)
      }
      return iframe
    } catch (error) {
      console.error('初始化执行容器失败')
      return null
    }
  }
  private executeCode(code: string, globalScope: InjectVMVarsType) {
    if (!this.iframe) {
      this.iframe = this.createRuntmieContext()!
    }
    const sandbox = this.iframe.contentWindow as IBrowserRuntimeVMWindow
    sandbox.__INJECT_VARS__ = globalScope

    return sandbox.eval(`
      (() => {
        with (window.__INJECT_VARS__) { 
          return (${code})
        }
      })()
    `)
  }

  public execute(code: string, globalScope: InjectVMVarsType) {
    try {
      const value = this.executeCode(code, {
        ...globalScope
      })
      return { value, success: true }
    } catch (err) {
      return { success: false, error: err, value: null }
    }
  }

  // 加载脚本
  public async loadJS(url: string) {
    if (!this.iframe) {
      this.iframe = this.createRuntmieContext()!
    }

    const contentWindow = this.iframe.contentWindow!
    const contentDocument = this.iframe.contentDocument!

    return new Promise((resolve, _reject) => {
      // 先查一遍，看看是否存在已经加载的script
      const matchingElements = contentDocument.querySelectorAll(`script[src="${url}"]`)

      if (matchingElements.length > 0) {
        resolve(true)
      } else {
        const saveWindowKeys = Object.keys(contentWindow)
        const script = contentDocument.createElement('script')

        script.setAttribute('src', url)

        // 执行过程中发生错误
        contentWindow.addEventListener('error', _evt => {
          resolve(false)
        })

        script.onload = () => {
          console.log('加载成功: ', url)
          const curWindowKeys = Object.keys(contentWindow)
          const diffKey = difference(curWindowKeys, saveWindowKeys)
          console.log(curWindowKeys.length, saveWindowKeys.length, diffKey, '比对window的长度')
          resolve(true)
        }

        script.onerror = () => {
          resolve(false)
        }

        // 添加到 iframe 里面
        this.iframe!.contentDocument!.head.appendChild(script)
      }
    })
  }
}

export const browserRuntimeVM = new BrowserRuntimeVM()

// 获取两数组不相交的元素
function difference<T>(arr1: T[], arr2: T[]) {
  return arr1.filter(x => !arr2.includes(x))
}
