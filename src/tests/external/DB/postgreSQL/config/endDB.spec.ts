require('dotenv').config()
import { config } from "../../../../../external/DB/postgreSQL/config/configDB"
import { EndDB } from "../../../../../external/DB/postgreSQL/config/endDB"
import { PoolDB } from "../../../../../external/DB/postgreSQL/config/poolDB"
import {expect, it} from '@jest/globals';

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("closing the database", () => {
    it("should be must close the pool successfully", async () => {

        const sut = await new EndDB(configDB).endConnection()

        expect(sut).toBeUndefined

    })
})