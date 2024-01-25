import { CreateUserUseCase } from "../../presentation/usecases/user/createUserUseCase";
import { httpRequest, httpResponse } from "../../http/http";
import { badRequest, created, serverError } from "../../http/statusCode/statusCode";
import { User } from "../../domain/entities/user/user";
import { userRepository } from "../../domain/usecases/user/userRepository";

export class createUserControllers {

    userProps: userRepository

    constructor(userProps: userRepository){
        this.userProps = userProps
    }

    async create(httpRequest: httpRequest): Promise<httpResponse>{

        try {
            if(!httpRequest.body){
                return badRequest("Body Not Found", false)
            }

            if(!httpRequest.body.email){
                return badRequest("Email Not Found", false)
            }

            if(!httpRequest.body.name){
                return badRequest("Name Not Found", false)
            }

            if(!httpRequest.body.password){
                return badRequest("Password Not Found", false)
            }
        } catch (error) {
            return serverError("Server Error", false)
        }

        const user = await User.create(httpRequest.body.name, httpRequest.body.email, httpRequest.body.password)

        if(user.error){
            return badRequest(user.error, user.status)
        }

        const userCreated = await new CreateUserUseCase(this.userProps).create(user.data)

        if(userCreated.error){
            return badRequest(userCreated.error, userCreated.status)
        }

        return created(userCreated.data, userCreated.status)

    }

}