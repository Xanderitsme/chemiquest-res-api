import { type AuthRepository, type AuthDatasource, type RegisterUserDto, type UserEntity } from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async register (registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return await this.authDatasource.register(registerUserDto)
  }
}
