require('dotenv').config()
import { config } from "../../../../../../external/DB/postgreSQL/config/configDB"
import { userRepository } from "../../../../../../domain/usecases/user/userRepository"
import { ClientDB } from "../../../../../../external/DB/postgreSQL/config/clientDB"
import {expect, jest, it} from '@jest/globals';
import { findUniqueID } from "../../../../../../external/DB/postgreSQL/user/uniqueID/findUniqueID";
import { createUserDB } from "../../../../../../external/DB/postgreSQL/user/createUserDB";


const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("find unique id", () => {

    it("should be error because the value passed is not an ID", async() => {
        
        const sut = await new findUniqueID(configDB).find("id_created_specifically_for_this_test")

        expect(sut).toMatchObject({statusCode: 400})
        expect(sut.body).toMatchObject({error: 'The passed value is not an ID'})

    })

    it("should be the unique ID must be found successfully", async() => {
        
        const request = {
            body: {
            name: "Usuario123",
            email: "criativeEmail@email.email",
            password: "FamousPassword123"
            }
        }

        const userDB = await new createUserDB(userRepositoryMock, configDB).create(request)

        const sut = await new findUniqueID(configDB).find(userDB.body.data.user.id_user)

        expect(sut).toMatchObject({statusCode: 200})
        expect(sut.body.data.rows[0].id_unique).toBeDefined()
        expect(sut.body.data.rowCount).toBe(1)

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