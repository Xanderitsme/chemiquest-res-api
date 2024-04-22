import { type NextFunction, type Request, type Response } from 'express'

export class LoggerMiddleware {
  static requests = (req: Request, _res: Response, next: NextFunction) => {
    const headers = req.headers
    const body = req.body
    const cookies = req.cookies
    const params = req.params
    const query = req.query
    const resource = 'http://' + req.headers.host + req.baseUrl + req.url

    console.log('__________________________________________________')
    console.log('Request logs -------- | ', new Date())
    console.log('START - - - - - - - - - - - - - - - - - - - - - --')
    console.log('resource:', resource)
    console.log('headers:', headers)
    console.log('- - - - - - - - - - - - - - - - - Specific headers')
    console.log('access-control-request-method:', headers['access-control-request-method'])
    console.log('access-control-request-headers:', headers['access-control-request-headers'])
    console.log('- - - - - - - - - - - - - - - - - - - - - - Others')
    console.log('body:', body)
    console.log('cookies:', cookies)
    console.log('params:', params)
    console.log('query:', query)
    console.log('-- - - - - - - - - - - - - - - - - - - - - - - END')
    console.log('__________________________________________________')
    next()
  }
}
