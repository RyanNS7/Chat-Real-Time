require('dotenv').config()
import { config } from "../../../../../../external/DB/postgreSQL/config/configDB"
import { userRepository } from "../../../../../../domain/usecases/user/userRepository"
import { ClientDB } from "../../../../../../external/DB/postgreSQL/config/clientDB"
import { createUniqueID } from "../../../../../../external/DB/postgreSQL/user/uniqueID/createUniqueID"
import {expect, jest, it} from '@jest/globals';
import { createUserDB } from "../../../../../../external/DB/postgreSQL/user/createUserDB"
import { v4 as uuidv4 } from 'uuid'
import { createEncryption } from "../../../../../../external/cryptography/hash/createEncryption"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("create unique id", () => {

    it("should be error because the value passed is undefined", async() => {

        const sut = await new createUniqueID(configDB).create("id_created_specifically_for_this_test")

        expect(sut.body).toMatchObject({error: "It is not possible to create a uniqueID because value is undefined"})
        expect(sut.statusCode).toBe(400)

    })

    it("should be error because the user already has a uniqueID", async() => {

        const request = {
            body: {
            name: "Usuario123",
            email: "createidtest@create.com",
            password: "FamousPassword123"
            }
        }

        const userDB = await new createUserDB(userRepositoryMock, configDB).create(request)

        const sut = await new createUniqueID(configDB).create(userDB.body.data.user.id_user)

        expect(sut.body).toMatchObject({error: sut.body.error})
        expect(sut.statusCode).toBe(400)

    })

    it("should be unique ID created successfully", async() => {

        const client = await new ClientDB(configDB).connection()

        const request = {
            body: {
            name: "UserOneTwo",
            email: "AnotherEmailTest@create.com",
            password: "FamousPassword123"
            }
        }

        const encryptedPassword = await createEncryption.encrypt(request.body.password)

        const query = {
            text: `INSERT INTO "user" (id_user, email, name, password) VALUES ($1, $2, $3, $4)`,
            values: [ uuidv4() ,request.body.email, request.body.name, encryptedPassword] 
        }

        const userDB = await client.query(query)

        const sut = await new createUniqueID(configDB).create(query.values[0])

        expect(sut.body.data.rowCount).toBe(1)
        expect(sut.statusCode).toBe(201)

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