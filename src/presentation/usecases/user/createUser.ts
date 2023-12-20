import { User } from "../../../domain/entities/user/user";
import { userRepository } from "../../../domain/usecases/user/userRepository";


export class CreateUser {

    userProps: userRepository

    constructor(userProps: userRepository){
        this.userProps = userProps
    }

    async create(user: User){
        if(await this.userProps.exits(user.id)){
            return new Error("User already exist")
        }

        if(await this.userProps.create(user)){
            return true
        }

        return false

    }

}