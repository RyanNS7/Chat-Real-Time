import { httpResponse } from "../../../../../http/http";
import { badRequest, ok } from "../../../../../http/statusCode/statusCode";
import { ClientDB } from "../../config/clientDB";
import { config } from "../../config/configDB";
import { EndDB } from "../../config/endDB";
import { findWithUniqueID } from "../uniqueID/findWithUniqueID";

export class findContact {

    private config: config

    constructor(config: config){
        this.config = config
    }


    async find(uniqueID_user: string, uniqueID_contact: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        const find_user = await new findWithUniqueID(this.config).find(uniqueID_user)
        const find_contact = await new findWithUniqueID(this.config).find(uniqueID_contact)

        if(find_user.statusCode === 400){
            return badRequest(find_user.body.error, false)
        }

        if(find_contact.statusCode === 400){
            return badRequest(find_contact.body.error, false)
        }

        const query = {
            text: `SELECT * FROM "contact" WHERE id_user = $1 AND id_unique_contact = $2`,
            values: [find_user.body.data.rows[0].id_user, find_contact.body.data.rows[0].id_unique]
        }

        const findContact = await client.query(query)

        if(findContact.rowCount === 0){
            return badRequest("Error when trying to find the user's contact", false)
        }

        await new EndDB(this.config).endConnection()

        return ok(findContact, true)
        
    }

}