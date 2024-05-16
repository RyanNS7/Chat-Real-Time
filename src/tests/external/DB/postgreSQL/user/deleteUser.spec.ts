require('dotenv').config()
import { config } from "../../../../../external/DB/postgreSQL/config/configDB"
import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { createUserDB } from "../../../../../external/DB/postgreSQL/user/createUserDB"
import { ClientDB } from "../../../../../external/DB/postgreSQL/config/clientDB"
import {expect, jest, it} from '@jest/globals';
import { deleteUser } from "../../../../../external/DB/postgreSQL/user/deleteUser"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("deleting user in database", () => {

    it("should be successfully delete the user", async () => {
        const request = {
            body: {
            name: "Ryan",
            email: "UsuarioASerDeletado@test.test",
            password: "Password123"
        }
    }

        const user = await new createUserDB(userRepositoryMock, configDB).create(request)

        const sut = await new deleteUser(configDB).delete(user.body.data.uniqueID)

        expect(sut.body.data.user).toMatchObject({command: 'DELETE'})
        expect(sut.body.data.user).toMatchObject({rowCount: 1})
        expect(sut.body.data.unique_id).toMatchObject({command: 'DELETE'})
        expect(sut.body.data.user).toMatchObject({rowCount: 1})
        expect(sut).toMatchObject({statusCode: 200})

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