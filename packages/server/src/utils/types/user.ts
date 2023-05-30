import { TRoles } from '../../models/types'

export interface IUser {
  id: number
  login: string
  first_name: string
  second_name: string
  email: string
  phone: string
  display_name: string
  avatar: string
}

export interface UserWithRole extends IUser {
  role: TRoles
}
