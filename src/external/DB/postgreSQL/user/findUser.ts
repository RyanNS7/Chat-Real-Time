import { httpResponse } from "../../../../http/http"
import { badRequest, ok } from "../../../../http/statusCode/statusCode"
import { ClientDB } from "../config/clientDB"
import { config } from "../config/configDB"
import { validate } from 'uuid'
import { EndDB } from "../config/endDB"

export class findUser {

    private config: config

    constructor(config: config){
        this.config = config
    }

    async find(id_user: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        if(!validate(id_user)){
            return badRequest("The passed value is not an ID", false)
        }

        const find_user = await client.query(`SELECT * FROM "user" WHERE id_user = '${id_user}'`)

        if(find_user.rowCount === 0){
            return badRequest('User not found', false)
        }

        await new EndDB(this.config).endConnection()

        return ok(find_user, true)

    }
}