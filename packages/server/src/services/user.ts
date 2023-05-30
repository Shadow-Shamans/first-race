import { UserWithRole, IUser } from '../utils/types/user'
import { TRoles } from '../models/types'
import { getUser } from '../utils/yandex/user'
import { ApiError, instanceOfApiError } from '../utils/types/api'
import { Role, User } from '../init/db'
import { getByRoleName } from './role'
import { USUAL } from '../utils/constants/other'

const getUserById = async (userId: number) => {
  try {
    return await User.findOne({
      where: {
        id: userId,
      },
      include: [{ model: Role, attributes: ['name'] }],
    })
  } catch (err) {
    throw new Error(`GET: Failed to get user by id ${userId}`)
  }
}

const getUserHelper = async (userId: number) => {
  let user = await getUserById(userId)
  if (!user) {
    let role = await getByRoleName(USUAL)
    if (!role) {
      await Role.create({ name: USUAL })
      role = await getByRoleName(USUAL)
    }
    await User.create({ id: userId, roleId: role?.id })
    user = await getUserById(userId)
  }
  console.log(user, 'user in getUserHelper')
  return user
}

const findUserRole = async (userId: number): Promise<TRoles | null> => {
  const user = await getUserHelper(userId)
  // @ts-ignore
  return user.role.name
}

export const findUserWithRoleService = async (
  cookies?: string,
  user?: IUser,
  role?: TRoles
): Promise<UserWithRole> => {
  let yandexApiUser: IUser | ApiError | undefined = user
  if (!user) {
    yandexApiUser = await getUser(cookies)
  }

  if (yandexApiUser && instanceOfApiError(yandexApiUser)) {
    throw new Error((yandexApiUser as ApiError).reason)
  }

  const userId = (yandexApiUser as IUser).id

  let userRole: TRoles | null | undefined = role
  if (!userRole) {
    userRole = await findUserRole(userId)
    if (!userRole) {
      throw new Error(`Unable to get role for user with id ${userId}`)
    }
  }

  const {
    id,
    login,
    first_name,
    second_name,
    email,
    phone,
    display_name,
    avatar,
  } = yandexApiUser as IUser
  return {
    id,
    login,
    first_name,
    second_name,
    email,
    phone,
    display_name,
    avatar,
    role: userRole,
  }
}
