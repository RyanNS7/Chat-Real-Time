import { httpResponse } from "../../../../../http/http";
import { badRequest, ok } from "../../../../../http/statusCode/statusCode";
import { ClientDB } from "../../config/clientDB";
import { config } from "../../config/configDB";
import { findUser } from "../findUser";

export class findUniqueID{

    config: config

    constructor(config: config){
        this.config = config
    }

    async find(user_id: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        const id_user = await new findUser(this.config).find(user_id)

        if(id_user.statusCode === 400){
            return badRequest( id_user.body.error , false)
        }

        const query = {
            text: `SELECT * FROM uniqueid WHERE id_user = $1`,
            values: [user_id]
        }
        
        const find_user_unique_ID = await client.query(query)

        return ok(find_user_unique_ID, true)

    }

}