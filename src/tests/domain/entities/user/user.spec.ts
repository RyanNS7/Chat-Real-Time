import { User } from "../../../../domain/entities/user/user"

describe("Testing User creation", () => {
    it("should be creation user sucessfully", () => {
        const user = User.create("Ryan", "user_Test@test.com", "Password123")

        expect(user).toMatchObject({status: true})
        expect(user.data).toBeDefined()
    })

    it("should be there is an error creation username", () => {
        const user = User.create("", "user_Test@test.com", "Password123")

        expect(user).toMatchObject({status: false})
        expect(user).toMatchObject({error: "Name must be more than 3 characters and less than 40 required"})
    })

    it("should be there is an error creating email", () => {
        const user = User.create("Ryan", "user_Test@", "Password123")

        expect(user).toMatchObject({status: false})
        expect(user).toMatchObject({error: "Invalid Email"})
    })
})