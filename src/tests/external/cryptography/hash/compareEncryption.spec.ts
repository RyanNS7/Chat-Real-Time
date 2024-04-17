import { compareEncryption } from "../../../../external/cryptography/hash/compareEncryption"
import { createEncryption } from "../../../../external/cryptography/hash/createEncryption"


describe('compare encryption', () => {
    it("should be compared encryption successfully", async() => {
    
        const password = await createEncryption.encrypt("Password123")

        const sut = await compareEncryption.compare("Password123", password)

        expect(sut.body.status).toBeTruthy()

    })

    it("should be there is an error when comparing the password and encryption", async() => {

        const password = await createEncryption.encrypt("Password123")

        const sut = await compareEncryption.compare("AnotherPassword123", password)

        expect(sut.body.status).toBeFalsy()

    })
})