import { User } from "../../../domain/entities/user/user";
import { verificationStatus } from "../../../domain/entities/verificationStatus";
import { userRepository } from "../../../domain/usecases/user/userRepository";


export class CreateUserUseCase {

    userProps: userRepository

    constructor(userProps: userRepository){
        this.userProps = userProps
    }

    async create(user: User): Promise<verificationStatus>{
        if(user.id === undefined){
            return {
                error: "If the 'id' is undefined there was an error in the creation",
                status: false
            }
        }

        if(await this.userProps.exits(user.id)){
            return {
                error: "User already exist",
                status: false
            }
        }

        const userCreated = await User.create(user.name, user.email, user.password)

        if(!userCreated.status){
            return {
                error: userCreated.error,
                status: userCreated.status
            }
        }

        return userCreated
    }

}