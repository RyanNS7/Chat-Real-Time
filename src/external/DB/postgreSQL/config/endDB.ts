import { Pool } from "pg";
import { config } from "./configDB";
import { PoolDB } from "./poolDB";

export class EndDB {
    config: config

    constructor(config: config){
        this.config = config
    }

    async endConnection(pool: Pool){

        return pool.end()
    }
}