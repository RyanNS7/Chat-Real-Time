import { Pool } from "pg";
import { config } from "./configDB";

export class PoolDB {

    static async connectPool(config: config){
        return new Pool(config)
    }
    
}