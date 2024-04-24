import { UserModel } from '../../data/mongodb'
import { type AuthDatasource, CustomError, type Encryptor, type RegisterUserDto, type LoginUserDto, type UserEntity } from '../../domain'
import { UserMapper } from '../mappers'

export class AuthDatasourceImpl implements AuthDatasource {
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

  async login (loginUserDto: LoginUserDto): Promise<UserEntity> {
    try {
      const user = await UserModel.findOne({
        $or: [
          { username: loginUserDto.usernameEmail },
          { email: loginUserDto.usernameEmail }
        ]
      })

      if (user === null) throw CustomError.badRequest('Incorrect username or password')

      const isMatch = await this.encryptor.compare(loginUserDto.password, user.password)

      if (!isMatch) throw CustomError.badRequest('Incorrect username or password')

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServer()
    }
  }
}
