import { compareSync, hashSync } from 'bcryptjs'

export class BcryptAdapter {
  static async hash (password: string) {
    return hashSync(password)
  }

  static async compare (password: string, hash: string) {
    return compareSync(password, hash)
  }
}
