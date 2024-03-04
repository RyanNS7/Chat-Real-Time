import { User } from "../../../domain/entities/user/user";
import { SendMessageUseCase } from "../../../presentation/usecases/chat/sendMessageUseCase";
import { messages } from "../../../domain/entities/chat/messages";
import { userRepository } from "../../../domain/usecases/user/userRepository";

const user = User.create("Ryan", "user_Test@test.com", "Password123")

function userMessage(message: string, id_User: string): messages{
    return {
        message,
        id_User,
        sending_time: Date.now()
    }
}

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

function showingThatUserExists(){
    return userRepositoryMock.exits.mockResolvedValue({status: true})
}

describe("Send Messages", () => {
    it("should be send message successfully", async () => {

        const message = userMessage("Testando se a mensagem esta indo mesmo", user.data.id)

        await showingThatUserExists()
        const sut = await new SendMessageUseCase(userRepositoryMock).send(message)

        expect(sut).toMatchObject({status: true})
    })

    it("should be message does not have enough characters for send", async () => {

        const message = userMessage("", user.data.id)

        await showingThatUserExists()
        const sut = await new SendMessageUseCase(userRepositoryMock).send(message)

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: 'Cannot send empty space'})
    })

    it("should be exceeded the number of characters allowed for sending the message", async () => {
        const message = userMessage(
            "eu imagino que aqui tem bastante caracteres escritos de uma vez e ainda por cima escrito a mesma mensagem varias vezes repetidamente, eu imagino que aqui tem bastante caracteres escritos de uma vez e ainda por cima escrito a mesma mensagem varias vezes repetidamente", 
            user.data.id)

        await showingThatUserExists()
        const sut = await new SendMessageUseCase(userRepositoryMock).send(message)

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: 'Too many characters typed'})
    })

    it("should be the user does not exist so sending the message was not allowed", async () => {

        await userRepositoryMock.exits.mockResolvedValue({status: false})

        const message = userMessage("Pelo visto esqueceu de passar as informações corretas do usuario", user.data)
        const sut = await new SendMessageUseCase(userRepositoryMock).send(message)

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: 'User not exists'})

    })
})