import { Router } from 'express'
import { AuthController } from './controller'
import { AuthDatasourceImpl } from '../../infrastructure/datasources'
import { AuthRepositoryImpl } from '../../infrastructure/repositories'

export class AuthRoutes {
  static get routes () {
    const router = Router()

    const authDatasource = new AuthDatasourceImpl()
    const authRepository = new AuthRepositoryImpl(authDatasource)
    const authController = new AuthController(authRepository)

    router.post('/register', authController.registerUser)

    return router
  }
}
