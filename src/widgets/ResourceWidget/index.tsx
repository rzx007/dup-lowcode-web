import { ResourceCollapsePannel } from './ResourceCollapsePannel'
import { ResourcesTitle } from './ResourcesTitle'
import { ComponentResourceWidget } from '../ComponentResourceWidget'
import { defineComponent } from 'vue'
import './style.scss'
import { materials } from '@/core/materials'
export const ResourceWidget = defineComponent({
  name: 'ResourceWidget',
  setup() {
    return () => (
      <div class='zth-resource-contianer'>
        <ResourcesTitle />
        <div style={{ flex: 1 }}>
          {materials.map((group) => {
            return (
              <ResourceCollapsePannel key={group.titleKey} title={group.titleKey}>
                {group.items.map((material) => {
                  return <ComponentResourceWidget key={material.componentName} meterial={material} />
                })}
              </ResourceCollapsePannel>
            )
          })}
        </div>
      </div>
    )
  },
})
