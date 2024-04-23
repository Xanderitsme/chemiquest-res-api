export class UserEntity {
  public readonly id: string
  public readonly username: string
  public readonly email: string
  public readonly password: string

  constructor (user: UserEntity) {
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.password = user.password
  }
}
