import { mainStore } from '@/store'
import { storeToRefs } from 'pinia'

const useMenuExpand = () => {
  const store = mainStore()

  const { isExpand } = storeToRefs(store)

  const toggle = () => {
    store.toggleMenuExpand()
  }

  return {
    store,
    isExpand,
    toggle
  }
}

export default useMenuExpand