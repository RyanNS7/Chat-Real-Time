require('dotenv').config()
import { config } from "../../../../../../external/DB/postgreSQL/config/configDB"
import { userRepository } from "../../../../../../domain/usecases/user/userRepository"
import { ClientDB } from "../../../../../../external/DB/postgreSQL/config/clientDB"
import {expect, jest, it} from '@jest/globals';
import { createUserDB } from "../../../../../../external/DB/postgreSQL/user/createUserDB";
import { addingContact } from "../../../../../../external/DB/postgreSQL/user/contact/addingContact";
import { findContact } from "../../../../../../external/DB/postgreSQL/user/contact/findContact";

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("find contact", () => {
    it("should be The user added successfully must be found", async() => {

        const requestUserOne = {
            body: {
            name: "UserUm",
            email: "TiveQueFazerOutroEmailParaOUserUm@test.com",
            password: "FamousPassword123"
            }
        }
        
        const requestUserTwo = {
            body: {
            name: "UserDois",
            email: "userDois@esting.com",
            password: "FamousPassword123"
            }
        }

        const userOne = await new createUserDB(userRepositoryMock, configDB).create(requestUserOne)
        const userTwo = await new createUserDB(userRepositoryMock, configDB).create(requestUserTwo)
        const contact = await new addingContact(configDB).create(userOne.body.data.uniqueID, userTwo.body.data.uniqueID)

        const sut = await new findContact(configDB).find(userOne.body.data.uniqueID, userTwo.body.data.uniqueID)

        expect(sut).toMatchObject({statusCode: 200})
        expect(sut.body.data.rowCount).toBe(1)
        expect(sut.body.data.rows).toBeDefined()

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