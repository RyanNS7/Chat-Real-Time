import { verificationStatus } from "../../../../domain/entities/verificationStatus"
import { systemUsers } from "./db-in-memory"

export class findUserInMemory{

    static async find(id: string): Promise<verificationStatus>{

        const existUser = systemUsers.find( user => user.id === id ) 
    
        if(existUser == undefined){
            return {
                status: false
            }
        }
    
        return {
            data: existUser,
            status: true
        }
    }
}
