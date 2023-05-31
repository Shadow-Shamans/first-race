import { useEffect } from 'react'
import { Avatar, Upload } from 'antd'
import placeholderAvatar from '@/assets/placeholder_avatar.svg'

import styled from './Profile.module.css'

import { selectUserData } from '@/features/User/selectors'
import { useAppSelector } from '@/app'
import { useLazyGetUserDataQuery } from '@/shared/services/AuthService'
import { useUploadImg } from '@/shared/hooks'
import { getPathImg } from '@/shared/utils'

export const ProfileAvatar = () => {
  const data = useAppSelector(selectUserData)
  const [getUserData] = useLazyGetUserDataQuery()
  const srcAvatar = getPathImg(data.avatar) || placeholderAvatar

  const {
    imageUrl: avatarImgUrl,
    handleChange,
    beforeUpload,
    status: statusUploadAvatar,
  } = useUploadImg(srcAvatar)

  useEffect(() => {
    if (statusUploadAvatar === 'done') {
      getUserData()
    }
  }, [statusUploadAvatar])

  return (
    <Upload
      action="https://ya-praktikum.tech/api/v2/user/profile/avatar"
      withCredentials={true}
      method="PUT"
      name="avatar"
      listType="picture-circle"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      className={styled.avatar}>
      <Avatar src={avatarImgUrl} alt="avatar" className={styled.avatarImg} />
    </Upload>
  )
}
