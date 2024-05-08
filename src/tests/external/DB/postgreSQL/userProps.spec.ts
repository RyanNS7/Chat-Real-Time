require('dotenv').config()
import { ClientDB } from "../../../../external/DB/postgreSQL/config/clientDB"
import { config } from "../../../../external/DB/postgreSQL/config/configDB"
import { createUserDB } from "../../../../external/DB/postgreSQL/user/createUserDB"
import { exitsUser } from "../../../../external/DB/postgreSQL/userProps"

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("user props", () => {
    it("", async () => {
        const request = {
            body: {
            name: "User",
            email: "newEmail@test.test",
            password: "Password123"
            }
        }

        const userRepo = await new exitsUser(configDB)

        const userDB = await new createUserDB(userRepo, configDB).create(request)

        const sut = await new exitsUser(configDB).exits(request.body.email)

        expect(sut).toMatchObject({status: true})
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