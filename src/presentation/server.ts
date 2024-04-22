import express, { type Router } from 'express'

interface ServerOptions {
  port?: number
  routes: Router
}

export class Server {
  public readonly app = express()
  private readonly port: number
  private readonly routes: Router

  constructor (options: ServerOptions) {
    const {
      port = 3000,
      routes
    } = options

    this.port = port
    this.routes = routes
  }

  async start () {
    // raw JSON support
    this.app.use(express.json())

    // x-www-form-urlencoded support
    this.app.use(express.urlencoded({ extended: true }))

    this.app.disable('x-powered-by')

    this.app.use(this.routes)

    this.app.listen(this.port, () => {
      console.log(`Server running on port: http://localhost:${this.port}`)
    })
  }
}
