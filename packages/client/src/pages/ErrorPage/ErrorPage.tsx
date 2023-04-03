import { FC } from 'react'
import styled from './ErrorPage.module.css'
import { LinkToPage } from '@/components/LinkToPage'

interface IProps {
  code: string | number
  text: string
}

export const ErrorPage: FC<IProps> = ({ code, text }) => {
  return (
    <div className={styled.inner}>
      <h1 className={styled.title}>{code}</h1>
      <p className={styled.text}>{text}</p>
      <LinkToPage text={'На главную'} to={'/main'} />
    </div>
  )
}
