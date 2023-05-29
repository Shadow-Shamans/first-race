import { useMemo, FC, PropsWithChildren, createContext } from 'react'

import { notification } from 'antd'
import { NotificationInstance, ArgsProps } from 'antd/es/notification/interface'

type TNotificationType = keyof NotificationInstance

interface INotificationContextData {
  handleNotification: (props: {
    opt: ArgsProps
    type: TNotificationType
  }) => void
}

export const NotificationContext = createContext<INotificationContextData>(
  {} as INotificationContextData
)

NotificationContext.displayName = 'NotificationContext'

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()

  const handleNotification = (props: {
    opt: ArgsProps
    type: TNotificationType
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

  const contextValue = useMemo<INotificationContextData>(
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
