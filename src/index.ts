import { config } from "./external/DB/postgreSQL/config/configDB"
import { connectionSocket } from "./external/socket/connectionSocket"
import { App } from "./main/app"
import { parses } from "./main/parser"
import { routes } from "./main/routes"
import { initServer } from "./main/server"
import { Router } from "express"

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_DATABASE
}

const app = App()
const router = Router()

parses(app)

routes(router, configDB )

const server = initServer(app)

const io = connectionSocket.on(server)

export {io}