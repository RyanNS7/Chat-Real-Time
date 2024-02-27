import { createUserControllers } from "../../../../controllers/user/createUserController";
import { verificationStatus } from "../../../../domain/entities/verificationStatus";
import { systemUsers } from "./db-in-memory";
import { userRepository } from "../../../../domain/usecases/user/userRepository";

interface infoUser {
    name: string,
    email: string,
    password: string
}

export class createUserInMemory{

    userProps: userRepository

    constructor(userProps: userRepository){
        this.userProps = userProps
    }

    async create(infoUser: infoUser): Promise<verificationStatus>{

        const request = {body: {
            name: infoUser.name,
            email: infoUser.email,
            password: infoUser.password 
        }}
    
        const user = await new createUserControllers(this.userProps).create(request)
    
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
}