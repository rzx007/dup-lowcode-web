export type Taction = { componentId: string; actionType: string }
export type TactionFn = {
  actionType: string
  callback: (arg: Taction) => void
}
export class Actions {
  name = 'default.actions'
  private currentId: string | null = null
  private actions: TactionFn[] = []
  public executeAction(action: Taction) {
    this.currentId = action.componentId
  }
  public updateComponent() {}
  public use(actionFn: TactionFn) {
    this.actions.push(actionFn)
  }
  public async execute(action: Taction) {
    for await (const item of this.actions) {
      action.actionType === item.actionType && item.callback(action)
    }
  }
}
