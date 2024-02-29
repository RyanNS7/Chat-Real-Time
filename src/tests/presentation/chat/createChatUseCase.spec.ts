import { userRepository } from "../../../domain/usecases/user/userRepository"
import { createChatUseCase } from "../../../presentation/usecases/chat/createChatUseCase"
import { verificationStatus } from "../../../domain/entities/verificationStatus"
import { createUserControllers } from "../../../controllers/user/createUserController"

describe("Create Chat Use Case", () => {

    const userRepositoryMock: jest.Mocked<userRepository> = {
        exits: jest.fn()
    }
    
    function showingThatUserExists(){
        return userRepositoryMock.exits.mockResolvedValue({status: true})
    }

    async function userTest(name: string, email: string, password: string): Promise<verificationStatus>{

        const user = await new createUserControllers(userRepositoryMock).create({body: {name, email, password}})

        return {
            data: user.body,
            status: user.body
        }
    }
    
    it("should be created chat successfully", async () => {

        const first_user = await userTest("Ryan", "user.Ryan_Test@test.com", "Teste12345")

        const second_user = await userTest("Marcela", "user.Marcela_Test@test.com", "Teste12345")

        showingThatUserExists()

        const sut = await new createChatUseCase(userRepositoryMock).create({
            messages: [],
            id_first_user: first_user.data.data.id,
            id_second_user: second_user.data.data.id
        })

        
        expect(sut).toMatchObject({status: true})
    })
})