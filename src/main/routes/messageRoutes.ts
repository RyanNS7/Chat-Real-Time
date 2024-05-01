import { Router, Request, Response } from "express";
import { config } from "../../external/DB/postgreSQL/config/configDB";
import { sendMessageInDB } from "../../external/DB/postgreSQL/chat/sendMessageInDB";
import { exitsUser } from "../../external/DB/postgreSQL/userProps";

export function messageRoutes(route: Router, config: config){

    route.post("/message/send", async (req: Request, res: Response) => {

        const informationsUser = {
            message: req.body.message,
            id_unique_user: req.body.unique_id,
            id_unique_another_user: req.body.unique_id_user
        }

        const exist = await new exitsUser(config).exits(req.body.email)

        const send_message = await new sendMessageInDB(config, exist.data.status).send(informationsUser)

        res.json(send_message.body.data)
    })

}