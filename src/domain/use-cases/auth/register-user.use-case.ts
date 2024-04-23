import { type RegisterUserDto } from '../../dtos/auth/register-user.dto'
import { type AuthRepository } from '../../repositories'

interface RegisterUserUseCase {
  execute: (registerUserDto: RegisterUserDto) => Promise<any>
}

export class RegisterUser implements RegisterUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  async execute (registerUserDto: RegisterUserDto) {
    const user = await this.authRepository.register(registerUserDto)

    return user
  }
}
