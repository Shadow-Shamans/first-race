export type TPath =
  | '/main'
  | '/login'
  | '/registration'
  | '/profile'
  | '/forum'
  | '/game'
  | '/rating'

export type TMenuItem = {
  label: string
  path: TPath
  isPrivate: boolean
  isAuthHidden: boolean
}
