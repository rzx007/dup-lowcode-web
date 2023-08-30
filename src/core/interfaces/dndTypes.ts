import { ITreeSchema } from './component'

export const DndTypes = {
  ITEM: 'item',
  SHELL: 'shell',
}

export interface IDragItems {
  source: 'tree' | ''
  schema: ITreeSchema
}
