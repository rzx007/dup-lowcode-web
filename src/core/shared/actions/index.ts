export class Actions {
  name = 'default.actions'
  private currentId: string | null = null
  private actions: any[]
  public executeAction(action: { componentId: string; actionType: string }) {
    this.currentId = action.componentId
  }
  public updateComponent() {}
  public use(action) {
    this.actions.push(action)
  }
}
