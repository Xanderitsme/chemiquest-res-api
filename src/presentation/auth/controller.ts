import { type Request, type Response } from 'express'
import { type AuthRepository, CustomError, type TokenAuthenticator, RegisterUserDto } from '../../domain'
import { RegisterUser } from '../../domain/use-cases'

export class AuthController {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly tokenAuthenticator: TokenAuthenticator
  ) {}

  private readonly handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }

    res.status(500).json({ error: 'Internal Server Error' })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)

    if (error !== undefined || registerUserDto === undefined) {
      res.status(404).json({ error })
      return
    }

    const registerUser = new RegisterUser(this.authRepository, this.tokenAuthenticator)

    registerUser.execute(registerUserDto)
      .then(userToken => res.status(200).json(userToken))
      .catch(error => { this.handleError(error, res) })
  }
}
