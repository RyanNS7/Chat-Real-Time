// import { Pool } from "pg";
import { config } from "./configDB";
import { PoolDB } from "./poolDB";

export class EndDB {
    private config: config

    constructor(config: config){
        this.config = config
    }

    async endConnection(){

        const pool = await PoolDB.connectPool(this.config)

        return pool.end()
    }
}