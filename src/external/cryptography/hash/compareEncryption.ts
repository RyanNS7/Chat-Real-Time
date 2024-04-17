import bcrypt from 'bcrypt'
import { badRequest, ok } from '../../../http/statusCode/statusCode'
import { httpResponse } from '../../../http/http'

export class compareEncryption {

    static async compare (password: string, encryptedPassword: string): Promise<httpResponse>{

        const passwordComparison = await bcrypt.compareSync(password.toString(), encryptedPassword)

        if(passwordComparison === false){
            return badRequest('incorrect password', false)
        }

        return ok(`password confirmed successfully`, true)
    }

}