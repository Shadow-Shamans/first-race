import React, { FC, useEffect } from 'react'
import styled from './YandexOAuth.module.css'
import yandex from '@/assets/icons/yandex.svg'
import { useLazyGetOauthDataQuery } from '@/shared/services/AuthService'

export const YandexOAuth: FC = () => {
  const [getServiceId, resultServiceId] = useLazyGetOauthDataQuery()

  function handleOAuth() {
    try {
      getServiceId()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (resultServiceId.data) {
      document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${resultServiceId.data.service_id}&redirect_uri=https://shamans-firstrace-24.ya-praktikum.tech/`
    }
  }, [resultServiceId])

  return (
    <>
      <img
        className={styled.yandex}
        src={yandex}
        alt="yandex"
        onClick={handleOAuth}
      />
    </>
  )
}
