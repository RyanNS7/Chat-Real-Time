require('dotenv').config()
import { config } from "../../../../../external/DB/postgreSQL/config/configDB"
import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { createUserDB } from "../../../../../external/DB/postgreSQL/user/createUserDB"
import { ClientDB } from "../../../../../external/DB/postgreSQL/config/clientDB"
import {expect, jest, it} from '@jest/globals';

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("create user in database", () => {

    it("should be create user in database successfully", async () => {

        const request = {
            body: {
            name: "Ryan",
            email: "Email123@test.test",
            password: "Password123"
        }
    }

        const sut = await new createUserDB(userRepositoryMock, configDB).create(request)
        
        console.log(sut.body)

        expect(sut.body.data.user).toBeDefined()
        expect(sut.body.data.uniqueID).toBeDefined()
        expect(sut.body.status).toBeTruthy()
    })

    afterEach(async() => {
        const client = await new ClientDB(configDB).connection()

        client.query(`
        DELETE FROM "contact";
        DELETE FROM "message";
        DELETE FROM "chat";
        DELETE FROM "uniqueid";
        DELETE FROM "user";`)
    })

})