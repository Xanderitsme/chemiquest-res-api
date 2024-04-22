import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

const main = async () => {
  const server = new Server({
    routes: AppRoutes.routes
  })

  await server.start()
}

(() => {
  void main()
})()
