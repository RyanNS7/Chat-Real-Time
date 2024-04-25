import { httpResponse } from "../../../../http/http"
import { badRequest, ok } from "../../../../http/statusCode/statusCode"
import { ClientDB } from "../config/clientDB"
import { config } from "../config/configDB"
import { validate } from 'uuid'
import { findWithUniqueID } from "./uniqueID/findWithUniqueID"

export class deleteUser {

    config: config

    constructor(config: config){
        this.config = config
    }

    async delete(unique_id: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        const user = await new findWithUniqueID(this.config).find(unique_id)

        if(user.statusCode === 400){
            return badRequest(user.body.data.error, false)
        }

        const delete_unique_id = await client.query(`DELETE FROM "uniqueid" WHERE id_unique = '${unique_id}'`)
        const delete_user = await client.query(`DELETE FROM "user" WHERE id_user = '${user.body.data.rows[0].id_user}'`)

        if(delete_user.rowCount === 0){
            return badRequest('User not found', false)
        }

        return ok({user: delete_user, unique_id: delete_unique_id}, true)

    }
}