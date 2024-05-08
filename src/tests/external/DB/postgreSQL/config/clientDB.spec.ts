require('dotenv').config()
import { ClientDB } from "../../../../../external/DB/postgreSQL/config/clientDB"
import { config } from "../../../../../external/DB/postgreSQL/config/configDB"
import {expect, it} from '@jest/globals';

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("starting the database", () => {
    it("should be success when starting the database", async() => {

        const sut = await new ClientDB(configDB).connection()

        expect(sut).toMatchObject({_connected: true})
    })
})