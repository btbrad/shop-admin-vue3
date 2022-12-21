import { ElNotification } from 'element-plus'

// 消息提示
export const toast = (message, type = "success", dangerouslyUseInnerHTMLString = false) => {
  ElNotification({
    message,
    type,
    dangerouslyUseInnerHTMLString,
    duration: 3000
  })
}
