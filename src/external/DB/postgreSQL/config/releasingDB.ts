import { PoolClient } from "pg"
import { ClientDB } from "./clientDB"
import { config } from "./configDB"

export class ReleasingClient {

    config: config

    constructor(config: config){
        this.config = config
    }

    async releasing(client: PoolClient){

        return client.release()
    }
}