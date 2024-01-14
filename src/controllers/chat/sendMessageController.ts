import { httpRequest, httpResponse } from "../../http/http";
import { badRequest, ok, serverError } from "../../http/statusCode/statusCode";
import { SendMessageUseCase } from "../../presentation/usecases/chat/sendMessageUseCase";
import { userRepository } from "../../domain/usecases/user/userRepository";

export class sendMessageController {

    userProps: userRepository

    constructor(userProps: userRepository){
        this.userProps = userProps
    }

    async sendMessage(httpRequest: httpRequest): Promise<httpResponse>{

        try {
            if(!httpRequest.body){
                return badRequest("Body Not Found", false)
            }

            if(!httpRequest.body.message){
                return badRequest("Message Not Found", false)
            }

            if(!httpRequest.body.id_User){
                return badRequest("User ID Not Found", false)
            }
        } catch (error) {
            return serverError("Server Error", false)
        }

        if(await !this.userProps.exits(httpRequest.body.id_User)){
            return badRequest("User does not exist", false)
        }

        const message = {
            message: httpRequest.body.message,
            id_User: httpRequest.body.id_User,
            sending_time: Date.now()
        }

        const sendingMessage = await new SendMessageUseCase(this.userProps).send(message)

        if((sendingMessage.status === false)){
            return badRequest(new Error(sendingMessage.error).message, sendingMessage.status)
        }

        return ok(sendingMessage.data, true)

    }
}