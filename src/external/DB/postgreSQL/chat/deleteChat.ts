import { httpResponse } from "../../../../http/http"
import { badRequest, ok } from "../../../../http/statusCode/statusCode"
import { ClientDB } from "../config/clientDB"
import { config } from "../config/configDB"
import { findWithUniqueID } from "../user/uniqueID/findWithUniqueID"
import { findChat } from "./findChat"

export class deleteChat {
    config: config

    constructor(config: config){
        this.config = config
    }

    async delete(unique_id_user: string, unique_id_another_user: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        const firstUser = await new findWithUniqueID(this.config).find(unique_id_user)
        const secondUser = await new findWithUniqueID(this.config).find(unique_id_another_user)

        if(firstUser.statusCode === 400){
            return badRequest( firstUser.body.error , false)
        }

        if(secondUser.statusCode === 400){
            return badRequest( secondUser.body.error , false)
        }

        const find_chat = await new findChat(this.config).find(firstUser.body.data.rows[0].id_unique, secondUser.body.data.rows[0].id_unique)

        if(find_chat.statusCode === 400){
            return badRequest(find_chat.body.error, false)
        }

        const query = {
            text: `DELETE FROM "chat" WHERE id_chat = $1`,
            values: [ find_chat.body.data.rows[0].id_chat] 
        }

        const delete_chat = await client.query(query)

        if(delete_chat.rowCount === 0){
            return badRequest('Error when trying to delete the chat', false)
        }

        return ok(delete_chat, true)
    }
}