import { httpResponse } from "../../../../http/http"
import { badRequest, ok } from "../../../../http/statusCode/statusCode"
import { ClientDB } from "../config/clientDB"
import { config } from "../config/configDB"
import { findWithUniqueID } from "../user/uniqueID/findWithUniqueID"


export class findChat {
    private config: config

    constructor(config: config){
        this.config = config
    }

    async find(unique_id_user: string, unique_id_another_user: string): Promise<httpResponse>{

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
            text: `SELECT * FROM "chat" WHERE id_user = $1 AND id_another_user = $2`,
            values: [ firstUser.body.data.rows[0].id_user, secondUser.body.data.rows[0].id_user] 
        }

        const find_chat = await client.query(query)

        if(find_chat.rowCount === 0){

            const query = {
                text: `SELECT * FROM "chat" WHERE id_user = $1 AND id_another_user = $2`,
                values: [ secondUser.body.data.rows[0].id_user, firstUser.body.data.rows[0].id_user] 
            }
    
            const find_chat = await client.query(query)

            if(find_chat.rowCount === 0){
                return badRequest('Error when trying to find the chat', false)
            }

            return ok(find_chat, true)

        }

        return ok(find_chat, true)
    }
}