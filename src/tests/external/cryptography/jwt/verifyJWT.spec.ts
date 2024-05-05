import { CreateJWT } from '../../../../external/cryptography/jwt/createJWT'
import { VerifyJWT } from '../../../../external/cryptography/jwt/verifyJWT'
import { v4 as uuidv4 } from 'uuid'


const infoUser = {
    id: uuidv4(),
    name: "Username Test"
}

const token = CreateJWT.singJWT(infoUser, "The-secret-is-really-a-secret-so-I-can't-even-talk" )

describe("verify token JWT", () => {

    it("should be verify token JWT successfully", () => {

        const sut = VerifyJWT.verification(token, "The-secret-is-really-a-secret-so-I-can't-even-talk")
        expect(sut).toBeDefined()

    })

})