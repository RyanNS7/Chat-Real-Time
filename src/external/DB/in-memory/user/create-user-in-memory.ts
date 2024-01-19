import { createUserControllers } from "../../../../controllers/user/createUserController";
import { verificationStatus } from "../../../../domain/entities/verificationStatus";
import { findUserInMemory } from "./find-user-in-memory";
import { systemUsers } from "./db-in-memory";

export async function createUserInMemory(name: string, email: string, password: string): Promise<verificationStatus>{

    const request = {body: {
        name,
        email,
        password 
    }}

    const user = await new createUserControllers({exits: findUserInMemory}).create(request)

    if(!user.body.status){
        return { 
            error: user.body.error,
            status: user.body.status
        }
    }

    systemUsers.push(user.body.data)

    return {
        data: user,
        status: true
    }

}