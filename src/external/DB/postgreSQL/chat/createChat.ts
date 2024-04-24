import { httpResponse } from "../../../../http/http"
import { badRequest, created } from "../../../../http/statusCode/statusCode"
import { ClientDB } from "../config/clientDB"
import { config } from "../config/configDB"
import { findWithUniqueID } from "../user/uniqueID/findWithUniqueID"
import { v4 as uuidv4 } from 'uuid'

export class createChat {
    config: config

    constructor(config: config){
        this.config = config
    }

    async create(unique_id_user: string, unique_id_another_user: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        const firstUser = await new findWithUniqueID(this.config).find(unique_id_user)
        const secondUser = await new findWithUniqueID(this.config).find(unique_id_another_user)

        if(firstUser.statusCode === 400){
            return badRequest( firstUser.body.error , false)
        }

        if(secondUser.statusCode === 400){
            return badRequest( secondUser.body.error , false)
        }

        const query = {
            text: `INSERT INTO "chat" (id_chat, id_user, id_another_user) VALUES ($1, $2, $3)`,
            values: [ uuidv4() ,firstUser.body.data.rows[0].id_user, secondUser.body.data.rows[0].id_user] 
        }

        const chat = await client.query(query)

        if(chat.rowCount === 0){
            return badRequest('Error when trying to create chat', false)
        }

        return created(chat, true)

    }
}