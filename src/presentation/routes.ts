import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { LoggerMiddleware } from './middlewares'

export class AppRoutes {
  static get routes () {
    const router = Router()

    router.use(LoggerMiddleware.requests)

    router.use('/api/auth', AuthRoutes.routes)

    router.use((_req, res) => {
      return res.status(404).contentType('text/plain; charset=utf-8').send('Not Found')
    })

    return router
  }
}
