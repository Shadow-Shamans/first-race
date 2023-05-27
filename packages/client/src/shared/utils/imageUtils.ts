import type { RcFile } from 'antd/es/upload/interface'
import { message } from 'antd'
import { RESOURCES_BASE_URL } from '@/shared/constants/'

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export const validateImage = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

export const getPathImg = (src: unknown) => {
  if (typeof src === 'string' && src.length > 0) {
    return `${RESOURCES_BASE_URL}${src}`
  }

  return null
}
