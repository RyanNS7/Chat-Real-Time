import { Router, Request, Response } from "express";
import { createUserDB } from "../external/DB/postgreSQL/user/createUserDB";
import { config } from "../external/DB/postgreSQL/config/configDB";
import { userRoutes } from "./routes/userRoutes";
import { uniqueIdRoutes } from "./routes/uniqueIdRoutes";
import { contactRoutes } from "./routes/contactRoutes";
import { chatRoutes } from "./routes/chatRoutes";
import { messageRoutes } from "./routes/messageRoutes";

export function routes(route: Router, config: config){

    userRoutes(route, config)

    uniqueIdRoutes(route, config)

    contactRoutes(route, config)

    chatRoutes(route, config)

    messageRoutes(route, config)
}