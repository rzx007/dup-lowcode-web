export class Actions {
  name = 'default.actions'
  private currentId: string | null = null
  public executeAction(action: { componentId: string; actionType: string }) {
    this.currentId = action.componentId
  }
  public updateComponent() {}
}
