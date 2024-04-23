import { UserModel } from '../../data/mongodb'
import { UserEntity, type RegisterUserDto } from '../../domain'

export class AuthDatasourceImpl {
  async register (registerUserDto: RegisterUserDto) {
    try {
      const isEmailAlreadyRegistered = UserModel.find({ email: registerUserDto.email })

      if (isEmailAlreadyRegistered !== null) {
        throw new Error('Invalid credentials')
      }

      const user = await UserModel.create({
        ...registerUserDto
      })

      await user.save()

      return new UserEntity({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password
      })
    } catch (error) {
      console.log(error)
    }
  }
}
