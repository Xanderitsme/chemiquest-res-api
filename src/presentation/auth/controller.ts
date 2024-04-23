import { type Request, type Response } from 'express'
import { RegisterUserDto } from '../../domain/dtos'
import { RegisterUser } from '../../domain/use-cases'
import { type AuthRepository } from '../../domain/repositories'
import { CustomError } from '../../domain/errors'

export class AuthController {
  constructor (
    private readonly authRepository: AuthRepository
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

    const registerUser = new RegisterUser(this.authRepository)

    registerUser.execute(registerUserDto)
      .then(user => res.status(200).json(user))
      .catch(error => { this.handleError(error, res) })
  }
}
