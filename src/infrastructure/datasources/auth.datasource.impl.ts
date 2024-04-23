import { UserModel } from '../../data/mongodb'
import { UserEntity, type RegisterUserDto } from '../../domain'
import { CustomError } from '../../domain/errors'

export class AuthDatasourceImpl {
  async register (registerUserDto: RegisterUserDto) {
    try {
      const isEmailAlreadyRegistered = UserModel.find({ email: registerUserDto.email })

      if (isEmailAlreadyRegistered !== null) throw CustomError.badRequest('Invalid credentials')

      const user = await UserModel.create(registerUserDto)

      await user.save()

      return new UserEntity({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password
      })
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServer()
    }
  }
}
