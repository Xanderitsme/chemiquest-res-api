import { Router } from 'express'
import { AuthController } from './controller'
import { AuthDatasourceImpl } from '../../infrastructure/datasources'
import { AuthRepositoryImpl } from '../../infrastructure/repositories'
import { BcryptAdapter, JwtAdapter } from '../../config'

export class AuthRoutes {
  static get routes () {
    const router = Router()

    const authDatasource = new AuthDatasourceImpl(BcryptAdapter)
    const authRepository = new AuthRepositoryImpl(authDatasource)
    const authController = new AuthController(authRepository, JwtAdapter)

    router.post('/register', authController.registerUser)
    router.post('/login', authController.loginUser)

    return router
  }
}
