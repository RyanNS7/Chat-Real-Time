require('dotenv').config()
import { config } from "../../../../../../external/DB/postgreSQL/config/configDB"
import { userRepository } from "../../../../../../domain/usecases/user/userRepository"
import { ClientDB } from "../../../../../../external/DB/postgreSQL/config/clientDB"
import {expect, jest, it} from '@jest/globals';
import { createUserDB } from "../../../../../../external/DB/postgreSQL/user/createUserDB";
import { addingContact } from "../../../../../../external/DB/postgreSQL/user/contact/addingContact";

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

const requestUserOne = {
    body: {
    name: "User1",
    email: "TiveQueFazerOutroEmail@test.com",
    password: "FamousPassword123"
    }
}

const requestUserTwo = {
    body: {
    name: "UserTwo",
    email: "userTwo@testing.com",
    password: "FamousPassword123"
    }
}

describe("adding users in contact", () => {

    it("should be contact must be adding successfully", async() => {

        const userOne = await new createUserDB(userRepositoryMock, configDB).create(requestUserOne)
        const userTwo = await new createUserDB(userRepositoryMock, configDB).create(requestUserTwo)

        const sut = await new addingContact(configDB).create(userOne.body.data.uniqueID, userTwo.body.data.uniqueID)

        expect(sut.body.data.rowCount).toBe(1)
        expect(sut).toMatchObject({statusCode: 201})

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