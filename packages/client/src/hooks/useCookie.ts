// Как использовать

// const [cookie, updateCookie] = useCookie("username"); - вы выбираете работу с cookie с таким key (названием)
// в cookie - вы получите текущее значение
// изменить куки - updateCookie('value - новое значение', 'numberOfDays - жизнь куки в часах', 'secure - по дефолту true')
// удалить куки numberOfDays = -1
import React from 'react'

export interface ICookie {
  key: string
  value: string
  numberOfDays: number
  secure?: boolean
}

const getItem = (key: string): string =>
  document.cookie.split('; ').reduce((total, currentCookie) => {
    const item = currentCookie.split('=')
    const storedKey = item[0]
    const storedValue = item[1]

    return key === storedKey ? decodeURIComponent(storedValue) : total
  }, '')

const setItem = ({
  key,
  value,
  numberOfDays,
  secure = true,
}: ICookie): void => {
  const now = new Date()

  now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000)

  document.cookie = `${key}=${value}; expires=${now.toUTCString()}; ${
    secure ? 'secure' : ''
  }`
}

const useCookie = (
  key: string
): [
  string,
  (value: string, numberOfDays: number, secure?: boolean) => void
] => {
  const getCookie = () => getItem(key)
  const [cookie, setCookie] = React.useState(getCookie())

  const updateCookie = (
    value: string,
    numberOfDays: number,
    secure?: boolean
  ) => {
    setCookie(value)
    setItem({ key, value, numberOfDays, secure })
  }

  return [cookie, updateCookie]
}

export default useCookie
