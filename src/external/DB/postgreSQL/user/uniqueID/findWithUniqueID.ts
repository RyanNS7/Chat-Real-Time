import { httpResponse } from "../../../../../http/http";
import { badRequest, ok } from "../../../../../http/statusCode/statusCode";
import { ClientDB } from "../../config/clientDB";
import { config } from "../../config/configDB";
import { EndDB } from "../../config/endDB";

export class findWithUniqueID{

    private config: config

    constructor(config: config){
        this.config = config
    }

    async find(uniqueID: string): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()

        const query = {
            text: `SELECT * FROM uniqueid WHERE id_unique = $1`,
            values: [uniqueID]
        }
        
        const find_user_unique_ID = await client.query(query)

        if(find_user_unique_ID.rowCount === 0){
            return badRequest("Unique ID not found", false)
        }

        await new EndDB(this.config).endConnection()

        return ok(find_user_unique_ID, true)

    }

}