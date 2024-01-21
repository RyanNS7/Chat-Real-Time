import { findUserInMemory } from "../../../../../external/DB/in-memory/user/find-user-in-memory"
import { createUserInMemory } from "../../../../../external/DB/in-memory/user/create-user-in-memory"
import { userRepository } from "../../../../../domain/usecases/user/userRepository"

async function creatingUser(name: string, email:string, password: string){

    const userRepositoryMock: jest.Mocked<userRepository> = {
        exits: jest.fn()
    }

    return await new createUserInMemory(userRepositoryMock).create({name, email, password})
}

describe("find user in in-memory database", () => {

    it("should be find user in in-memory database successfully", async () => {

        const user = await creatingUser("Ryan", "Test@gmail.com", "Password123")

        const sut = await findUserInMemory.find(user.data.body.data.id)

        expect(sut).toMatchObject({status: true})
        expect(sut.data).toBeDefined()
    })

    it("should be Not find any user", async () => {

        let user;

        const sut = await findUserInMemory.find(user as any)

        expect(sut).toMatchObject({status: false})
    })

})