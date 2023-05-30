import { Role } from '../init/db'

export const getByRoleName = async (name: string) => {
  try {
    return await Role.findOne({
      where: {
        name,
      },
    })
  } catch (err) {
    throw new Error(`GET: Failed to get role by name ${name}`)
  }
}
