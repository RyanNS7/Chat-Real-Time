import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { createChat } from "../../../../../external/DB/postgreSQL/chat/createChat"
import { ClientDB } from "../../../../../external/DB/postgreSQL/config/clientDB"
import { config } from "../../../../../external/DB/postgreSQL/config/configDB"
import { createUserDB } from "../../../../../external/DB/postgreSQL/user/createUserDB"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

describe("creating chat", () => {

    it("should be the chat must be created successfully", async() => {

        const user = {
            body: {
                name: "Usuario123",
                email: "Naoemesmo@agoraSIM.com",
                password: "FamousPassword123"
            }
        }

        const another_user = {
            body: {
                name: "AnotherUsuario123",
                email: "Naoefacil@test.com",
                password: "FamousPassword123"
            }
        }

        const userOne = await new createUserDB(userRepositoryMock, configDB).create(user)
        const userTwo = await new createUserDB(userRepositoryMock, configDB).create(another_user)

        const sut = await new createChat(configDB).create(userOne.body.data.uniqueID, userTwo.body.data.uniqueID)

        expect(sut.body.data).toMatchObject({command: "INSERT"})
        expect(sut.body.data).toMatchObject({rowCount: 1})
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