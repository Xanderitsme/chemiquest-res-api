import { type AuthDatasource } from '../../domain/datasources/auth.datasource'
import { type RegisterUserDto } from '../../domain/dtos'
import { type UserEntity } from '../../domain/entities/user.entity'
import { type authRepository } from '../../domain/repositories/auth.repository'

export class AuthRepositoryImpl implements authRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async register (registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return await this.authDatasource.register(registerUserDto)
  }
}
