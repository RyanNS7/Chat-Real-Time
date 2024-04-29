import { sign } from 'jsonwebtoken'

type infoUser = {
    id: string
    name: string
}

export class CreateJWT {

    static singJWT(infoUser: infoUser, secret: any){
        return sign(infoUser, secret, {expiresIn: 3600})
    }

}