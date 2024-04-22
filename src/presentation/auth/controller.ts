import { type Request, type Response } from 'express'
import { RegisterUserDto } from '../../domain/dtos'

export class AuthController {
  static registerUser = (req: Request, res: Response) => {
    const [error, user] = RegisterUserDto.create(req.body)

    if (error !== undefined) {
      res.status(404).json({ error })
    }

    res.status(200).json(user)
  }
}
