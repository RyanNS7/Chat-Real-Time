import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { findUserConversationsInSystem } from "../../../../../external/DB/in-memory/chat/find-user-conversations-in-system"
import { createUserInMemory } from "../../../../../external/DB/in-memory/user/create-user-in-memory"
import { createChatUseCase } from "../../../../../presentation/usecases/chat/createChatUseCase"
import { userConversationsInSystem } from "../../../../../external/DB/in-memory/chat/user-conversations-in-memory"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

function createUser(name: string, email: string, password: string){
    
    const user = {
        name,
        email,
        password
    }

    return user
}

function showingThatUserExists(){
    return userRepositoryMock.exits.mockResolvedValue({status: true})
}

describe("Find User Conversations In System", () => {
    it("should be find conversations in system successfully", async () => {
        const first_user = await new createUserInMemory(userRepositoryMock).create(createUser("Ryan", "RyanTest@Test.com", "Senha12345"))
        const second_user = await new createUserInMemory(userRepositoryMock).create(createUser("Marcela","MarcelaTest@Test.com", "Senha12345" ))

        const chat = {
            messages: [],
            id_first_user: first_user.data.body.data.id,
            id_second_user: second_user.data.body.data.id
        }

        showingThatUserExists()

        const chat_users = await new createChatUseCase(userRepositoryMock).create(chat)
        userConversationsInSystem.push(chat_users.data)

       const sut = await new findUserConversationsInSystem().findChat(first_user.data.body.data.id, second_user.data.body.data.id)

       expect(sut).toMatchObject({status: true})
    })

    it("should be chat not found", async () => {
        const sut = await new findUserConversationsInSystem().findChat("Id-bem-escondido", "Criptografado1231412")

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "Chat not found"})
    })
})