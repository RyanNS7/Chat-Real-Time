import { httpResponse } from "../../../../http/http"
import { badRequest, ok } from "../../../../http/statusCode/statusCode"
import { ClientDB } from "../config/clientDB"
import { config } from "../config/configDB"
import { EndDB } from "../config/endDB"

export class findUserWithEmail {

    private config: config

    constructor(config: config){
        this.config = config
    }

    async find(email: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        const find_user_with_email = await client.query(`SELECT * FROM "user" WHERE email = '${email}'`)

        if(find_user_with_email.rowCount === 0){
            return badRequest('User not found', false)
        }

        await new EndDB(this.config).endConnection()

        return ok(find_user_with_email, true)

    }
}