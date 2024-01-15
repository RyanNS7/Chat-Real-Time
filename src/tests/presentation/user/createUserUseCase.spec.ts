import { userRepository } from "../../../domain/usecases/user/userRepository"
import { CreateUserUseCase } from "../../../presentation/usecases/user/createUserUseCase"
import { User } from "../../../domain/entities/user/user"
import { verificationStatus } from "../../../domain/entities/verificationStatus"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

function userTest(name: string, email: string, password: string): verificationStatus{
    return User.create(name, email, password)
}


describe("Create User Use Case", () => {
    it("should be creation user succesfully", async () => {
        const user = userTest("Ryan", "user_Test@test.com", "Teste12345")

        const sut = await new CreateUserUseCase(userRepositoryMock).create(user.data)
        console.log(sut.data)

        expect(sut).toMatchObject({status: true})
    })
})