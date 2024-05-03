import { createEncryption } from "../../../../external/cryptography/hash/createEncryption"


describe("create encryption", () => {
    it("should be encrypted successfully", () => {

        const sut = createEncryption.encrypt("criptografando qualquer tipo de texto")

        expect(sut).toBeDefined()

    })
})