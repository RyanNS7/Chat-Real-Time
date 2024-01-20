
import { createUserControllers } from "../../../controllers/user/createUserController"
import { userRepository } from "../../../domain/usecases/user/userRepository"
import { httpRequest } from "../../../http/http"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}

function showingThatUserExists(){
    return userRepositoryMock.exits.mockResolvedValue({status: true})
}

describe("Send message controller", () => {
    it("should be message sent by controller successfully", async () => {

        const request = {
            body: {
                name: "Ryan",
                email: "Test.email@test.com",
                password: "Password123"
            }
        }

        const sut = await new createUserControllers(userRepositoryMock).create(request)

        expect(sut).toMatchObject({statusCode: 201})
        expect(sut).toMatchObject({body: {status: true}})

    }),

    it("should be error creating user due to name", async () => {

        const request = {
            body: {
                name: "",
                email: "Test.email@test.com",
                password: "Password123"
            }
        }

        const sut = await new createUserControllers(userRepositoryMock).create(request)

        expect(sut).toMatchObject({statusCode: 400})
        expect(sut).toMatchObject({body: {error: 'Name Not Found'}})
    })

    it("should be error creating user due to email", async () => {

        const request = {
            body: {
                name: "Ryan",
                email: "",
                password: "Password123"
            }
        }

        const sut = await new createUserControllers(userRepositoryMock).create(request)

        expect(sut).toMatchObject({statusCode: 400})
        expect(sut).toMatchObject({body: {error: 'Email Not Found'}})
    })

    it("should be error creating user due to password", async () => {

        const request = {
            body: {
                name: "Ryan",
                email: "Test.email@test.com",
                password: ""
            }
        }

        const sut = await new createUserControllers(userRepositoryMock).create(request)

        expect(sut).toMatchObject({statusCode: 400})
        expect(sut).toMatchObject({body: {error: 'Password Not Found'}})
    })

    it("should be error the not found body", async () => {

        const request = {}

        const sut = await new createUserControllers(userRepositoryMock).create(request as any)

        expect(sut).toMatchObject({statusCode: 400})
        expect(sut).toMatchObject({body: {error: 'Body Not Found'}})
    })

    it("should be error in the server", async () => {

        let request;

        const sut = await new createUserControllers(userRepositoryMock).create(request as any)

        expect(sut).toMatchObject({statusCode: 500})
        expect(sut).toMatchObject({body: {error: 'Server Error'}})
    })
})