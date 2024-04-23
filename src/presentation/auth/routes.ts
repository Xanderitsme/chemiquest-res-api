import { Router } from 'express'
import { AuthController } from './controller'
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repository.impl'
import { AuthDatasourceImpl } from '../../infrastructure/datasources/auth.datasource.impl'

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
