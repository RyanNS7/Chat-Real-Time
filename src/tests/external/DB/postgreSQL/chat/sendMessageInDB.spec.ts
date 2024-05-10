import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { createChat } from "../../../../../external/DB/postgreSQL/chat/createChat"
import { sendMessageInDB } from "../../../../../external/DB/postgreSQL/chat/sendMessageInDB"
import { ClientDB } from "../../../../../external/DB/postgreSQL/config/clientDB"
import { config } from "../../../../../external/DB/postgreSQL/config/configDB"
import { createUserDB } from "../../../../../external/DB/postgreSQL/user/createUserDB"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const configDB: config = {
    connectionString: process.env.CONNECTION_STRING_TEST_DATABASE
}

function showingThatUserExists(){
    return userRepositoryMock.exits.mockResolvedValue({status: true})
}

describe("sending messages in database", () => {

    it("should be both users are able to send messages successfully", async() => {

        const user = {
            body: {
                name: "Usuario123",
                email: "UltimoEmailDeTeste@test.testado",
                password: "FamousPassword123"
            }
        }

        const another_user = {
            body: {
                name: "AnotherUsuario123",
                email: "AchoQueVaiSerOUltimoMesmo@mesmo.test",
                password: "FamousPassword123"
            }
        }

        const userOne = await new createUserDB(userRepositoryMock, configDB).create(user)
        const userTwo = await new createUserDB(userRepositoryMock, configDB).create(another_user)

        const chat = await new createChat(configDB).create(userOne.body.data.uniqueID, userTwo.body.data.uniqueID)

        const informationsMessage = {
            message: "Criando meu primeiro envio de mensagem para o usuario",
            id_unique_user: userOne.body.data.uniqueID,
            id_unique_another_user: userTwo.body.data.uniqueID
        }

        showingThatUserExists()

        const sut = await new sendMessageInDB(configDB, userRepositoryMock).send(informationsMessage)

        const otherInformationsMessage = {
            message: "Outro Usuario enviando a mensagem tambem",
            id_unique_user: userTwo.body.data.uniqueID,
            id_unique_another_user: userOne.body.data.uniqueID
        }

        const sendingMessageByOtherUser = await new sendMessageInDB(configDB, userRepositoryMock).send(otherInformationsMessage)

        expect(sut).toMatchObject({statusCode: 200})
        expect(sut.body).toBeDefined()
        expect(sendingMessageByOtherUser).toMatchObject({statusCode: 200})
        expect(sendingMessageByOtherUser.body).toBeDefined()

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