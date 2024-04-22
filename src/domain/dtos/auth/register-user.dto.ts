import { Validators } from '../../../config'

export class RegisterUserDto {
  public username: string
  public email: string
  public password: string

  private constructor (user: RegisterUserDto) {
    this.username = user.username
    this.email = user.email
    this.password = user.password
  }

  static create (input: any): [string?, RegisterUserDto?] {
    const {
      username,
      email,
      password
    } = input

    if (username === undefined || typeof username !== 'string' || !Validators.username(username)) {
      return ['Missing or incorrect username', undefined]
    }

    if (email === undefined || typeof email !== 'string' || !Validators.email(email)) {
      return ['Missing or incorrect email', undefined]
    }

    if (password === undefined || typeof password !== 'string' || !Validators.password(password)) {
      return ['Missing or incorrect password, it should contain at least 6 characters, 1 uppercase letter, 1 lowercase letter and 1 number', undefined]
    }

    return [
      undefined,
      new RegisterUserDto({
        username,
        email,
        password
      })
    ]
  }
}
