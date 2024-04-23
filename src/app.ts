import { envs } from './config'
import { MongoDatabase } from './data/mongodb'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

const main = async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  })

  await server.start()
}

(() => {
  void main()
})()
