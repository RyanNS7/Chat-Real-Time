import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { SendMessageInMemoryChat } from "../../../../../external/DB/in-memory/chat/send-message-in-memory-chat"
import { createUserInMemory } from "../../../../../external/DB/in-memory/user/create-user-in-memory"
import { systemUsers } from "../../../../../external/DB/in-memory/user/db-in-memory"
import { verificationStatus } from "../../../../../domain/entities/verificationStatus"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

const userRepo: userRepository = {
    exits: async (id: string): Promise<verificationStatus> => {
        if(systemUsers.find(user => id === user.id)){
            return {status: true}
        }

        return {status: false}
    }
}

function showingThatUserExists(){
    return userRepositoryMock.exits.mockResolvedValue({status: true})
}

async function createUser(name: string, email: string, password: string){
    
    const infoUser = {
        name,
        email,
        password
    }

    const user = await new createUserInMemory(userRepositoryMock).create(infoUser)

    return user
}

describe("Send Message In Memory Chat", () => {
    it("should be the message must be sent successfully with the creation of the chat due to the first interaction between users", async () => {

        const first_user = await createUser("Ryan", "Ryan_test@test.com", "Password123")
        const second_user = await createUser("Marcela", "Mah_test@test.com", "Password123")

        showingThatUserExists()

        const message = {
            message: "Testando com a criação do chat na hora",
            id_User: first_user.data.body.data.id
        }

        const sut = await new SendMessageInMemoryChat(userRepositoryMock).sendMessage(message, second_user.data.body.data.id)

        expect(sut).toMatchObject({status: true})
    })

    it("should be the message must be sent successfully after checking that users already have a chat created", async () => {

        const message = {
            message: "Envio de Mensagem com o Chat ja criado",
            id_User: systemUsers[0].id
        }

        const sut = await new SendMessageInMemoryChat(userRepositoryMock).sendMessage(message, systemUsers[1].id)

        expect(sut).toMatchObject({status: true})
    })

    it("should be in the user receiving the message does not exist", async () => {

        const message = {
            message: "Envio de Mensagem com o Chat ja criado",
            id_User: systemUsers[0].id
        }

        const sut = await new SendMessageInMemoryChat(userRepo).sendMessage(message, "id_de_teste_para_projeto")

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "The user receiving the message does not exist"})
    })

    it("should be error in the user sending the message does not exist", async () => {

        const message = {
            message: "Envio de Mensagem com o Chat ja criado",
            id_User:  "test_id_user"
        }

        const sut = await new SendMessageInMemoryChat(userRepo).sendMessage(message, systemUsers[0].id)

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "The user sending the message does not exist"})

    })

})