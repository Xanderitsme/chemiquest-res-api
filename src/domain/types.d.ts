import { type UserEntity } from './entities'

export interface UserToken {
  token: string
  user: Omit<UserEntity, 'password'>
}
