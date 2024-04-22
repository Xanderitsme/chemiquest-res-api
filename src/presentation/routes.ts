import { Router } from 'express'

export class AppRoutes {
  static get routes () {
    const router = Router()

    router.get('/api', (_req, res) => {
      res.status(200).json({ message: 'Api route' })
    })

    router.use((_req, res) => {
      return res.status(404).contentType('text/plain; charset=utf-8').send('Not Found')
    })

    return router
  }
}
