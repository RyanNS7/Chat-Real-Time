require('dotenv').config()
import { config } from "../../../../../external/DB/postgreSQL/config/configDB"
import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { ClientDB } from "../../../../../external/DB/postgreSQL/config/clientDB"
import { createUserDB } from "../../../../../external/DB/postgreSQL/user/createUserDB"
import {expect, jest, it} from '@jest/globals';
import { findUserWithEmail } from "../../../../../external/DB/postgreSQL/user/findUserWithEmail"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("find user in database", () => {       

    it("should be successfully finding the user", async() => {
        
        const request = {
            body: {
            name: "User",
            email: "newEmail@test.test",
            password: "Password123"
            }
        }

        const userDB = await new createUserDB(userRepositoryMock, configDB).create(request)

        const sut = await new findUserWithEmail(configDB).find(userDB.body.data.user.email)

        expect(sut.body.data.rowCount).toBe(1)
        expect(sut.body.data.rows).toBeDefined()

    })

    it("should be error because the user was not found", async() => {

        const sut = await new findUserWithEmail(configDB).find("6d9b4e2b-b496-4082-9023-176f618cb244")

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toMatchObject({error: 'User not found'})

    })

    it("should be error because the value passed is not an ID", async() => {

        const sut = await new findUserWithEmail(configDB).find("id_criado_exclusivamente_para_este_teste")

        expect(sut.statusCode).toBe(400)
        expect(sut.body.error).toBeDefined()

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