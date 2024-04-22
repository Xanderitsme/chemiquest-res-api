import { Router } from 'express'
import { AuthController } from './controller'

export class AuthRoutes {
  static get routes () {
    const router = Router()

    router.post('/register', AuthController.registerUser)

    return router
  }
}
