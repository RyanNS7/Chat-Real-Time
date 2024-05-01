import { sendMessageController } from "../../../../controllers/chat/sendMessageController"
import { userRepository } from "../../../../domain/usecases/user/userRepository"
import { httpResponse } from "../../../../http/http"
import { badRequest, ok } from "../../../../http/statusCode/statusCode"
import { ClientDB } from "../config/clientDB"
import { config } from "../config/configDB"
import { findWithUniqueID } from "../user/uniqueID/findWithUniqueID"
import { findChat } from "./findChat"
import { v4 as uuidv4 } from 'uuid'

type informationsMessage = {
    message: string
    id_unique_user: string
    id_unique_another_user: string
}

export class sendMessageInDB {
    private config: config
    userProps: userRepository

    constructor(config: config, userProps: userRepository){
        this.config = config
        this.userProps = userProps
    }

    async send(informationsMessage: informationsMessage): Promise<httpResponse>{
        const client = await new ClientDB(this.config).connection()
        const find_user = await new findWithUniqueID(this.config).find(informationsMessage.id_unique_user)
        const find_another_user = await new findWithUniqueID(this.config).find(informationsMessage.id_unique_another_user)

        if(find_user.statusCode === 400){
            return badRequest(find_user.body.error, false)
        }

        if(find_another_user.statusCode === 400){
            return badRequest(find_user.body.error, false)
        }

        const request = {
            body: {
                message: informationsMessage.message,
                id_User: find_user.body.data.rows[0].id_user
            }
        }

        const send_message = await new sendMessageController(this.userProps).sendMessage(request)

        if(send_message.body.status === false){
            return badRequest(send_message.body.error, false)
        }

        let find_chat = await new findChat(this.config).find(informationsMessage.id_unique_user, informationsMessage.id_unique_another_user)
    
        if(!find_chat.body.status){
            find_chat = await new findChat(this.config).find(informationsMessage.id_unique_another_user, informationsMessage.id_unique_user)
        }

        const query = {
            text: `INSERT INTO "message" (id_message, message, id_user, id_chat) VALUES ($1, $2, $3, $4)`,
            values: [ uuidv4() ,send_message.body.data.message ,send_message.body.data.id_User, find_chat.body.data.rows[0].id_chat] 
        }

        const sendMessage = await client.query(query)

        if(sendMessage.rowCount === 0){
            return badRequest('Error when sending message', false)
        }

        return ok({message: send_message.body.data.message, id_user: send_message.body.data.id_User}, true)
    }
}