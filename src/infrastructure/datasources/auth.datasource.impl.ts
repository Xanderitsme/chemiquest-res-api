import { UserModel } from '../../data/mongodb'
import { CustomError, type Encryptor, type RegisterUserDto } from '../../domain'
import { UserMapper } from '../mappers'

export class AuthDatasourceImpl {
  constructor (
    private readonly encryptor: Encryptor
  ) {}

  private regExpCaseInsensitive (value: string) {
    return new RegExp(['^', value, '$'].join(''), 'i')
  }

  async register (registerUserDto: RegisterUserDto) {
    try {
      const isEmailAlreadyRegistered = await UserModel.findOne({ email: { $regex: this.regExpCaseInsensitive(registerUserDto.email) } })
      if (isEmailAlreadyRegistered !== null) throw CustomError.badRequest('Invalid credentials')

      const isUsernameAlreadyRegistered = await UserModel.findOne({ username: { $regex: this.regExpCaseInsensitive(registerUserDto.username) } })
      if (isUsernameAlreadyRegistered !== null) throw CustomError.badRequest('Invalid credentials')

      const hashedPassword = await this.encryptor.hash(registerUserDto.password)

      const user = await UserModel.create({
        ...registerUserDto,
        password: hashedPassword
      })

      await user.save()

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServer()
    }
  }
}
