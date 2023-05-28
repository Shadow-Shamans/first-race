import { useMemo, FC, PropsWithChildren, createContext } from 'react'

import { notification } from 'antd'
import { NotificationInstance, ArgsProps } from 'antd/es/notification/interface'

type NotificationType = keyof NotificationInstance

interface NotificationContextData {
  handleNotification: (props: {
    opt: ArgsProps
    type: NotificationType
  }) => void
}

export const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
)

NotificationContext.displayName = 'NotificationContext'

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()

  const handleNotification = (props: {
    opt: ArgsProps
    type: NotificationType
  }) => {
    const { type, opt } = props
    if (type === 'info') {
      api.info(opt)
    }
    if (type === 'warning') {
      api.warning(opt)
    }
    if (type === 'success') {
      api.success(opt)
    }
    if (type === 'error') {
      api.error(opt)
    }
  }

  const contextValue = useMemo<NotificationContextData>(
    () => ({ handleNotification }),
    []
  )

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}
