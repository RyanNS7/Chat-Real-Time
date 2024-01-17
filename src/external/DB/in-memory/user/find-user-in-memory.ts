import { verificationStatus } from "../../../../domain/entities/verificationStatus"
import { systemUsers } from "./db-in-memory"

export async function findUserInMemory(id: string): Promise<verificationStatus>{

    const existUser = await systemUsers.find((user) => {
        id === user.id
    })

    if(existUser === undefined){
        return {
            status: false
        }
    }

    return {status: true}

}