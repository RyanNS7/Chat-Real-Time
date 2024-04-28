import bcrypt from 'bcrypt'

export class createEncryption{

    static async encrypt(password: string): Promise<string>{

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        return hash

    }

}