import { CustomError, UserEntity } from '../../domain'

export class UserMapper {
  static userEntityFromObject (input: any) {
    const {
      id,
      _id,
      username,
      email,
      password
    } = input

    if (_id === undefined || id === undefined) throw CustomError.badRequest('Missing id')
    if (username === undefined) throw CustomError.badRequest('Missing username')
    if (email === undefined) throw CustomError.badRequest('Missing email')
    if (password === undefined) throw CustomError.badRequest('Missing password')

    return new UserEntity({
      id: _id ?? id,
      username,
      email,
      password
    })
  }
}
