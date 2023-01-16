import { mainStore } from '@/store/index'

const hasPermission = (value, el = false) => {
  const store = mainStore()
  if(!Array.isArray(value)) {
    throw new Error('需要配置权限, 例如v-permission="[xxxx]"')
  }
  const hasAuth = !!store.ruleNames.filter(v => value.includes(v)).length
  if (el && !hasAuth) {
    el.parentNode.removeChild(el)
  }
  return hasAuth
}

export default {
  install(app){
    app.directive('permission', {
      mounted(el, binding){
        hasPermission(binding.value, el)
      }
    })
  }
}