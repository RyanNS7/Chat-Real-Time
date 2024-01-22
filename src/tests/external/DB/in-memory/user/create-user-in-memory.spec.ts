import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { createUserInMemory } from "../../../../../external/DB/in-memory/user/create-user-in-memory"

const userRepositoryMock: jest.Mocked<userRepository> = {
    exits: jest.fn()
}


describe("user creation in the in-memory database", () => {

    it("should be created user in-memory successfully", async () => {

        const user = {
            name: "Ryan",
            email: "Test12345@gmail.com",
            password: "Password123"
        }

        const sut = await new createUserInMemory(userRepositoryMock).create(user)

        expect(sut).toMatchObject({status: true})
        expect(sut).toMatchObject({data: {statusCode: 201}})
    })

    it("should be name user error", async () => {

        const user = {
            name: "",
            email: "Test12345@gmail.com",
            password: "Password123"
        }

        const sut = await new createUserInMemory(userRepositoryMock).create(user)

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "Name Not Found"})
    })

    it("should be email error when creating user", async () => {

        const user = {
            name: "Ryan",
            email: "",
            password: "Password123"
        }

        const sut = await new createUserInMemory(userRepositoryMock).create(user)

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "Email Not Found"})
    })

    it("should be password error when creating user", async () => {

        const user = {
            name: "Ryan",
            email: "Test12345@gmail.com",
            password: ""
        }

        const sut = await new createUserInMemory(userRepositoryMock).create(user)

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "Password Not Found"})
    })
})