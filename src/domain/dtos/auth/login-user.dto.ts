import { Validators } from '../../../config'

export class LoginUserDto {
  public usernameEmail: string
  public password: string

  private constructor (user: LoginUserDto) {
    this.usernameEmail = user.usernameEmail
    this.password = user.password
  }

  static create (input: any): [string?, LoginUserDto?] {
    const {
      username,
      password
    } = input

    if (username === undefined ||
      typeof username !== 'string' ||
      (!Validators.username(username) &&
      !Validators.email(username)) ||
      password === undefined ||
      typeof password !== 'string' ||
      !Validators.password(password)
    ) {
      return ['Incorrect username or password', undefined]
    }

    return [
      undefined,
      new LoginUserDto({
        usernameEmail: username,
        password
      })
    ]
  }
}
