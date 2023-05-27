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
      const img = info.file.originFileObj as File
      const _formData = new FormData()
      console.log({ img })

      _formData.append('avatar', img, `${img?.name}`)

      setFormData(_formData)
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  return { handleChange, imageUrl, validateImage, loading, formData }
}
