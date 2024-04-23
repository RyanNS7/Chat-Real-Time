import { httpResponse } from "../../../../../http/http"
import { badRequest, ok } from "../../../../../http/statusCode/statusCode"
import { ClientDB } from "../../config/clientDB"
import { config } from "../../config/configDB"
import { findContact } from "./findContact"


export class deleteContact{

    config: config

    constructor(config: config){
        this.config = config
    }

    async delete(uniqueID_user: string, uniqueID_contact: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        const find_contact = await new findContact(this.config).find(uniqueID_user, uniqueID_contact)

        if(find_contact.statusCode === 400){
            return badRequest(find_contact.body.error, false)
        }

        const query = {
            text: `DELETE FROM "contact" WHERE id_contact = $1`,
            values: [find_contact.body.id_contact]
        }

        const delete_contact = await client.query(query)

        return ok(delete_contact, true)

    }

}