import { type RegisterUserDto } from './dtos'
import { type UserToken } from './types'

export interface RegisterUserUseCase {
  execute: (registerUserDto: RegisterUserDto) => Promise<UserToken>
}

export interface TokenAuthenticator {
  generateToken: (payload: object, duration?: string) => Promise<string | null>
}

export interface Encryptor {
  hash: (password: string) => Promise<string>
  compare: (password: string, hash: string) => Promise<boolean>
}
