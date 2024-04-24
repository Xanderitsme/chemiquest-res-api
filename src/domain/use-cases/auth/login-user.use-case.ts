import { type LoginUserDto } from '../../dtos'
import { CustomError } from '../../errors'
import { type TokenAuthenticator, type LoginUserUseCase } from '../../interfaces'
import { type AuthRepository } from '../../repositories'
import { type UserToken } from '../../types'

export class LoginUser implements LoginUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly tokenAuthenticator: TokenAuthenticator
  ) {}

  async execute (loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto)

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
