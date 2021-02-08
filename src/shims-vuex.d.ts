import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { ChildTimer } from './types/utils'

declare module '@vue/runtime-core' {
  interface State {
    timerArr: Array<ChildTimer>;
  }

  interface ComponentCustomProperties {
    $state: Store<State>;
  }
}
