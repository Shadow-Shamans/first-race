export interface ApiError {
  status: number
  reason: string
}

export const instanceOfApiError = (obj: ApiError | object) => {
  return 'status' in obj && 'reason' in obj
}
