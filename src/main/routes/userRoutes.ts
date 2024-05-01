import { Router, Request, Response } from "express";
import { findUser } from "../../external/DB/postgreSQL/user/findUser";
import { config } from "../../external/DB/postgreSQL/config/configDB";
import { deleteUser } from "../../external/DB/postgreSQL/user/deleteUser";
import { createUserDB } from "../../external/DB/postgreSQL/user/createUserDB";
import { exitsUser } from "../../external/DB/postgreSQL/userProps";

export function userRoutes(route: Router, config: config){

    route.post("/user/create", async (req: Request, res: Response) => {

        const exist = await new exitsUser(config).exits(req.body.email)

        const create_user = await new createUserDB(exist.data.status, config).create(req)

        res.json(create_user.body.data)
    })


    route.delete("/user/delete", async (req: Request, res: Response) => {
        const delete_user = await new deleteUser(config).delete(req.body.unique_id)

        res.json(delete_user.body.data)
    })


    route.get("/user/find", async (req: Request, res: Response) => {
        const find_user = await new findUser(config).find(req.body.id_user)

        res.json(find_user.body.data)
    })

}