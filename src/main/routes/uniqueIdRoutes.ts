import { Router, Request, Response } from "express";
import { config } from "../../external/DB/postgreSQL/config/configDB";
import { findUniqueID } from "../../external/DB/postgreSQL/user/uniqueID/findUniqueID";
import { findWithUniqueID } from "../../external/DB/postgreSQL/user/uniqueID/findWithUniqueID";

export function uniqueIdRoutes(route: Router, config: config){

    route.get("/uniqueID/findWithUniqueID", async (req: Request, res: Response) => {
        const find_with_unique_id = await new findWithUniqueID(config).find(req.body.uniqueID)

        res.json(find_with_unique_id.body.data)
    })

    route.get("/uniqueID/find", async (req: Request, res: Response) => {
        const find_unique_id = await new findUniqueID(config).find(req.body.user_id)

        res.json(find_unique_id.body.data)
    })

}