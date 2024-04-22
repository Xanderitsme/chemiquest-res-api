import express from 'express'

interface ServerOptions {
  port?: number
}

export class Server {
  public readonly app = express()
  private readonly port: number

  constructor (options: ServerOptions) {
    const { port = 3000 } = options
    this.port = port
  }

  async start () {
    // raw JSON support
    this.app.use(express.json())

    // x-www-form-urlencoded support
    this.app.use(express.urlencoded({ extended: true }))

    this.app.disable('x-powered-by')

    this.app.get('/api', (_req, res) => {
      res.status(200).json({ message: 'Api route' })
    })

    this.app.listen(this.port, () => {
      console.log(`Server running on port: http://localhost:${this.port}`)
    })
  }
}
