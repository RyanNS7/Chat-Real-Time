import { createUserControllers } from "../../../controllers/user/createUserController"
import { userRepository } from "../../../domain/usecases/user/userRepository"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

function request(name: string, email: string, password: string){
    return {
        name,
        email,
        password
    }
}

describe("user creation controller", () => {
    it("should be create controller of the user successfully", async () => {

        const sut = await new createUserControllers(userRepositoryMock).create({body: request("Ryan", "user_Test@test.com", "Teste12345")})

        expect(sut).toMatchObject({body: {status: true}})
        expect(sut).toMatchObject({statusCode: 201})

    })

    it("should be an error if there is no email in the body", async () => {
        const sut = await new createUserControllers(userRepositoryMock).create({body: request("Ryan", "", "Teste12345")})

        expect(sut).toMatchObject({body: {status: false}})
        expect(sut).toMatchObject({statusCode: 400})
        expect(sut).toMatchObject({body: {error: 'Email Not Found'}})

    })

    it("should be an error if there is no name in the body", async () => {
        const sut = await new createUserControllers(userRepositoryMock).create({body: request("", "user_Test@test.com", "Teste12345")})

        expect(sut).toMatchObject({body: {status: false}})
        expect(sut).toMatchObject({statusCode: 400})
        expect(sut).toMatchObject({body: {error: 'Name Not Found'}})

    })

    it("should be an error if there is no password in the body", async () => {
        const sut = await new createUserControllers(userRepositoryMock).create({body: request("Ryan", "user_Test@test.com", "")})

        expect(sut).toMatchObject({body: {status: false}})
        expect(sut).toMatchObject({statusCode: 400})
        expect(sut).toMatchObject({body: {error: 'Password Not Found'}})

    })

    it("should be an error on the server", async () => {

        let request: any;
        const sut = await new createUserControllers(userRepositoryMock).create(request)

        expect(sut).toMatchObject({body: {status: false}})
        expect(sut).toMatchObject({statusCode: 500})
        expect(sut).toMatchObject({body: {error: 'Server Error'}})

    })
})