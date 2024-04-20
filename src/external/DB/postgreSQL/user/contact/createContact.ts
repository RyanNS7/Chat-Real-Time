import { httpResponse } from "../../../../../http/http";
import { badRequest, created } from "../../../../../http/statusCode/statusCode";
import { ClientDB } from "../../config/clientDB";
import { config } from "../../config/configDB";
import { findWithUniqueID } from "../uniqueID/findWithUniqueID";
import {v4 as uuidv4} from 'uuid'


export class createContact {

    config: config

    constructor(config: config){
        this.config = config
    }

    async create(uniqueID_user: string, uniqueID_contact: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()
    
        const find_user = await new findWithUniqueID(this.config).find(uniqueID_user)
        const find_contact = await new findWithUniqueID(this.config).find(uniqueID_contact)

        if(find_user.statusCode === 400){
            return badRequest(find_user.body, false)
        }

        if(find_contact.statusCode === 400){
            return badRequest(find_contact.body, false)
        }

        const query = {
            text: `INSERT INTO "contact" (id_contact, id_user, id_unique_contact) VALUES ($1, $2, $3)`,
            values: [ uuidv4() ,find_user.body.data.rows[0].id_user, find_contact.body.data.rows[0].id_unique]
        }

        const contact = await client.query(query)

        if(contact.rowCount === 0){
            return badRequest("Error adding contact", false)
        }

        return created(contact, true)

    }

}