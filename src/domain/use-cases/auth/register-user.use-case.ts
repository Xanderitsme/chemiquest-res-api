import { type RegisterUserDto } from '../../dtos'
import { CustomError } from '../../errors'
import { type TokenAuthenticator, type RegisterUserUseCase } from '../../interfaces'
import { type AuthRepository } from '../../repositories'
import { type UserToken } from '../../types'

export class RegisterUser implements RegisterUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly tokenAuthenticator: TokenAuthenticator
  ) {}

  async execute (registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto)

    const token = await this.tokenAuthenticator.generateToken({ id: user.id })

    if (token === null) throw CustomError.internalServer('Error generating token')

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
  }
}
