import { User } from "../../../../domain/entities/user/user"

describe("Testing User creation", () => {
    it("should be creation user sucessfully", () => {
        const sut = User.create("Ryan", "user_Test@test.com", "Password123")

        expect(sut).toMatchObject({status: true})
        expect(sut.data).toBeDefined()
    })

    it("should be there is an error creation username", () => {
        const sut = User.create("", "user_Test@test.com", "Password123")

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "Name must be more than 3 characters and less than 40 required"})
    })

    it("should be there is an error creating email", () => {
        const sut = User.create("Ryan", "user_Test@", "Password123")

        expect(sut).toMatchObject({status: false})
        expect(sut).toMatchObject({error: "Invalid Email"})
    })
})