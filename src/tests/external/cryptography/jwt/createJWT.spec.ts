import { CreateJWT } from "../../../../external/cryptography/jwt/createJWT"
import { v4 as uuidv4 } from 'uuid'

describe("create token JWT", () => {

    it("should be create token JWT successfully", () => {

        const infoUser = {
            id: uuidv4(),
            name: "Username Test"
        }

        const sut = CreateJWT.singJWT(infoUser, "The-secret-is-really-a-secret-so-I-can't-even-talk" )

        expect(sut).toBeDefined()

    })

})