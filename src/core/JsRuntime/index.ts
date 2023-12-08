export interface ExecuteResult {
  value: any
  error: any
  success: boolean
}

export type InjectVMVarsType = Record<string, unknown>

// 判断一个对象的值是否是函数字符串
export function isFunctionString(value: any) {
  return typeof value === 'string' && (value.startsWith('function') || value.startsWith('()'))
}

// 判断是否是函数调用
export function isFunctionCall(value: any) {
  return typeof value === 'string' && value.includes('(') && value.includes(')')
}
// 截取字符串一对小括号
export function getBracketContent(value: string) {
  const reg = /\((.+)\)/
  const result = reg.exec(value)
  if (result) {
    return [result[0], result[1]]
  }
  return [null, null]
}
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
    console.log('执行的代码', code)
    // 判断是否是函数调用
    // 简单判断链式函数调用, 如 dayjs().format("YYYY-MM-DD")
    const [bracket, params] = getBracketContent(code)
    if (bracket && !code.includes('.')) {
      code = code.replace(bracket, '')
    }
    return sandbox.eval(`
      (() => {
        with (__INJECT_VARS__) { 
          const fn  = ${code}
          // console.log('fn', __INJECT_VARS__)
          if(fn.startsWith('function') || fn.startsWith('(')) {
           const result =  eval(fn)(${params})
           return {value: result, scopStr: __INJECT_VARS__}
          }
          return ({value: fn, scopStr: __INJECT_VARS__})
        }
      })()
    `)
    // const fn = ${code}
    // return eval(fn)()
  }

  public execute(code: string, globalScope: InjectVMVarsType) {
    try {
      const result = this.executeCode(code, {
        ...globalScope
      })
      return { value: result.value, scope: result.scopStr, success: true }
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
