import { verify } from 'jsonwebtoken'

export class VerifyJWT {

    static verification(token: string, secret: any){

        const verifyJWT = verify(token, secret)

        return verifyJWT

    }

}