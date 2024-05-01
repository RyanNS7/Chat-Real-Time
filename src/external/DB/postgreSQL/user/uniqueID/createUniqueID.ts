import { httpResponse } from "../../../../../http/http";
import { badRequest, created} from "../../../../../http/statusCode/statusCode";
import { Unique_ID } from "../../../../cryptography/unique_id";
import { ClientDB } from "../../config/clientDB";
import { config } from "../../config/configDB";
import { EndDB } from "../../config/endDB";
import { findUser } from "../findUser";
import { findUniqueID } from "./findUniqueID";

export class createUniqueID {

    private config: config

    constructor(config: config){
        this.config = config
    }

    async create(id_user: string): Promise<httpResponse> {

        const client = await new ClientDB(this.config).connection()
        const find_user = await new findUser(this.config).find(id_user)
        const findUniqueId = await new findUniqueID(this.config).find(id_user)
        const unique_id = Unique_ID.creationUniqueID()

        if(findUniqueId.statusCode === 400){
            return badRequest(`It is not possible to create a uniqueID because value is ${findUniqueId.body.data}`, false)
        }

        if(findUniqueId.body.data.rowCount !== 0){
            return badRequest('User already has a uniqueID', false)
        }

        if(unique_id.statusCode === 400){
            return badRequest(`${unique_id.body}`, false)
        }

        const query = {
            text: `INSERT INTO "uniqueid" (id_unique, id_user) VALUES ($1, $2)`,
            values: [ unique_id.body.data, find_user.body.data.rows[0].id_user]
        }
        
        const uniqueID = await client.query(query)

        if(uniqueID.rowCount === 0){
            return badRequest("error when creating unique id", false)
        }

        await new EndDB(this.config).endConnection()

        return created(uniqueID, true)
    }

}