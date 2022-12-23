import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

// 消息提示
export const toast = (message, type = "success", dangerouslyUseInnerHTMLString = false) => {
  ElNotification({
    message,
    type,
    dangerouslyUseInnerHTMLString,
    duration: 3000
  })
}

export const showModal = (content="提示内容", type="warning", title="") => {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    }
  )
}

// 显示进度条
export const showLoadingBar = () => {
  nprogress.start()
}
// 隐藏进度条
export const hideLoadingBar = () => {
  nprogress.done()
}