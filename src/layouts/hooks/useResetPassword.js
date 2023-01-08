import { ref, reactive } from 'vue'
import { resetPassword } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { useRouter } from 'vue-router'


const useRestPassword = (drawerIns) => {
  const formRef = ref(null)
  const router = useRouter()

  const form = reactive({
    oldPassword: '',
    resetPassword: '',
    confirmPassword: ''
  })
  
  const rules = reactive({
    oldPassword: [
      { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    newPassword: [
      { required: true, message: '请输入新密码', trigger: 'blur' }
    ],
    confirmPassword: [
      { required: true, message: '请再次输入新密码', trigger: 'blur' }
    ],
  })

  const onSubmit = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        drawerIns.value.showLoading()
        resetPassword(form.value).then(() => {
          removeToken()
          router.push('/login')
        }).finally(() => {
          drawerIns.value.hideLoading()
        })
      } else {
        console.log('error submit!', fields)
      }
    }) 
  }

  return {
    formRef,
    form,
    rules,
    onSubmit
  }
}

export default useRestPassword