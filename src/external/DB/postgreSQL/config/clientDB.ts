import { PoolClient } from "pg";
import { PoolDB } from "./poolDB";
import { config } from "./configDB";

export class ClientDB {

    private config: config

    constructor(config: config){
        this.config = config
    }

    async connection(): Promise<PoolClient>{
        
        const pool = await PoolDB.connectPool(this.config)

        return pool.connect()
    }
}