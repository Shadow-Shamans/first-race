export type TPasswordChangeRes = string | { reason: string }
export type TPasswordChangeDTO = {
  oldPassword: 'string'
  newPassword: 'string'
}
