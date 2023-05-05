import { createPinia, defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ref } from 'vue'

const store = createPinia();
store.use(piniaPluginPersistedstate);

// export const useSpinStore = defineStore('spin', () => {
//   const spinning = ref(true)
//   return { spinning }
// })

// export const spinStore = useSpinStore(pinia)

export{
  store
}