import { ref } from 'vue'

const useDrawer = () => {
  const formDrawerRef = ref(null)

  return {
    formDrawerRef
  }
}

export default useDrawer