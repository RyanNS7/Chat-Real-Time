import { Router, Request, Response } from "express";
import { config } from "../../external/DB/postgreSQL/config/configDB";
import { addingContact } from "../../external/DB/postgreSQL/user/contact/addingContact";
import { deleteContact } from "../../external/DB/postgreSQL/user/contact/deleteContact";
import { findContact } from "../../external/DB/postgreSQL/user/contact/findContact";

export function contactRoutes(route: Router, config: config){

    route.post("/contact/add", async (req: Request, res: Response) => {
        const adding_contact = await new addingContact(config).create(req.body.unique_id, req.body.unique_id_contact)

        res.json(adding_contact.body.data)
    })

    route.delete("/contact/delete", async (req: Request, res: Response) => {
        const delete_contact = await new deleteContact(config).delete(req.body.unique_id, req.body.unique_id_contact)

        res.json(delete_contact.body.data)
    })

    route.get("/contact/find", async (req: Request, res: Response) => {
        const find_contact = await new findContact(config).find(req.body.unique_id, req.body.unique_id_contact)

        res.json(find_contact.body.data)
    })

}