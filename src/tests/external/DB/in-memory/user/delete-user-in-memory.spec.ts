import { createUserInMemory } from "../../../../../external/DB/in-memory/user/create-user-in-memory"
import { userRepository } from "../../../../../domain/usecases/user/userRepository"
import { deleteUserInMemory } from "../../../../../external/DB/in-memory/user/delete-user-in-memory"

async function creatingUser(name: string, email:string, password: string){

    const userRepositoryMock: jest.Mocked<userRepository> = {
        exits: jest.fn()
    }

    return await new createUserInMemory(userRepositoryMock).create({name, email, password})
}

describe("Delete user in in-memory database", () => {
    it("should be delete user in the in-memory database", async () => {
        
        const user = await creatingUser("Ryan", "Test@gmail.com", "Password123")

        const sut = await deleteUserInMemory.delete(user.data.body.data.id)

        expect(sut).toMatchObject({status: true})
    })

    it("should be error when deleting the user because it was not found", async () => {
        
        const user = await creatingUser("Ryan", "Test@gmail.com", "Password")

        const sut = await deleteUserInMemory.delete(user as any)

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "User not found"})
    })
})