import { User } from "../../../domain/entities/user/user";
import { verificationStatus } from "../../../domain/entities/verificationStatus";
import { userRepository } from "../../../domain/usecases/user/userRepository";


export class CreateUser {

    userProps: userRepository

    constructor(userProps: userRepository){
        this.userProps = userProps
    }

    async create(user: User): Promise<verificationStatus>{
        if(await this.userProps.exits(user.id)){
            return {
                error: "User already exist",
                status: false
            }
        }

        const userCreated = await User.create(user)

        if(!userCreated.status){
            return {
                error: userCreated.error,
                status: userCreated.status
            }
        }

        return userCreated
    }

}