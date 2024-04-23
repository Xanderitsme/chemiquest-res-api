import { type RegisterUserDto } from '../../dtos/auth/register-user.dto'

interface RegisterUserUseCase {
  execute: (registerUserDto: RegisterUserDto) => Promise<any>
}

export class RegisterUser implements RegisterUserUseCase {
  async execute () {

  }
}
