import { Router, Request, Response } from "express";
import { config } from "../../external/DB/postgreSQL/config/configDB";
import { createChat } from "../../external/DB/postgreSQL/chat/createChat";
import { deleteChat } from "../../external/DB/postgreSQL/chat/deleteChat";
import { findChat } from "../../external/DB/postgreSQL/chat/findChat";

export function chatRoutes(route: Router, config: config){

    route.post("/chat/create", async (req: Request, res: Response) => {
        const create_chat = await new createChat(config).create(req.body.unique_id, req.body.unique_id_user)

        res.json(create_chat.body.data)
    })

    route.delete("/chat/delete", async (req: Request, res: Response) => {
        const delete_chat = await new deleteChat(config).delete(req.body.unique_id, req.body.unique_id_user)

        res.json(delete_chat.body.data)
    })

    route.get("/chat/find", async (req: Request, res: Response) => {
        const find_chat = await new findChat(config).find(req.body.unique_id, req.body.unique_id_user)

        res.json(find_chat.body.data)
    })

}