import jwt from 'jsonwebtoken'
import { envs } from './envs'

const JWT_SEED = envs.JWT_SEED

export class JwtAdapter {
  static async generateToken (payload: object, duration: string = '2h'): Promise<string | null> {
    return await new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
        if (error !== null || token === undefined || typeof token !== 'string') {
          resolve(null)
          return
        }

        resolve(token)
      })
    })
  }
}
