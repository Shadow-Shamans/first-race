import { useState } from 'react'
import { validateImage } from '@/shared/utils'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { getBase64 } from '@/shared/utils'

export function useUploadImg(imgSrc: string) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(imgSrc)
  const [formData, setFormData] = useState<FormData | null>(null)

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      const img = info.file.originFileObj as File

      getBase64(img as RcFile, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const beforeUpload = (file: RcFile) => {
    if (validateImage(file)) {
      const _formData = new FormData()

      _formData.append('avatar', file, `${file?.name}`)

      setFormData(_formData)
    }
  }

  return { handleChange, imageUrl, beforeUpload, loading, formData }
}
