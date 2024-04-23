import jwt from 'jsonwebtoken'

const JWT_SEED = 'random_seed'

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
