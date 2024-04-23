import { type RegisterUserDto } from '../dtos'
import { type UserEntity } from '../entities/user.entity'

export abstract class AuthRepository {
  abstract register (registerUserDto: RegisterUserDto): Promise<UserEntity>
}
