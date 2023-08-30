import { ResourceCollapsePannel } from './ResourceCollapsePannel'
import { ResourcesTitle } from './ResourcesTitle'
import { ComponentResourceWidget } from '../ComponentResourceWidget'
import { defineComponent } from 'vue'
import './style.scss'
import { materials } from '@/core/materials'
import { DndTypes } from '@/core/interfaces/dndTypes'
export const ResourceWidget = defineComponent({
  name: 'ResourceWidget',
  props: {
    accept: { type: String, default: DndTypes.SHELL },
  },
  setup(props) {
    return () => (
      <div class='zth-resource-contianer'>
        <ResourcesTitle />
        <div style={{ flex: 1 }}>
          {materials.map((group) => {
            return (
              <ResourceCollapsePannel key={group.titleKey} title={group.titleKey}>
                {group.items.map((material) => {
                  return (
                    <ComponentResourceWidget key={material.componentName} accept={props.accept} meterial={material} />
                  )
                })}
              </ResourceCollapsePannel>
            )
          })}
        </div>
      </div>
    )
  },
})
