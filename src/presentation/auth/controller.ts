import { type Request, type Response } from 'express'

export class AuthController {
  static registerUser = (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Register user' })
  }
}
