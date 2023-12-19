import { messages } from "../../../domain/entities/chat/messages";
import { sendMessages } from "../../../domain/usecases/chat/sendMessages"
import { userRepository } from "../../../domain/usecases/user/userRepository";


export class SendMessageUseCase implements sendMessages{

    userRepository: userRepository

    constructor(propsMessages: sendMessages, userRepository: userRepository){
        this.userRepository = userRepository
    }

    async send(userMessage: messages): Promise<Error | messages>{

        if(await this.userRepository.exits(userMessage.id_User) === false){
            return new Error("User not exists")
        }

        if(userMessage.message.length < 1){
            return new Error("Cannot send empty space")
        }

        if(userMessage.message.length > 100){
            return new Error("Too many characters typed")
        }

        return {
            message: userMessage.message,
            id_User: userMessage.id_User,
            sending_time: userMessage.sending_time
        }
    }

    
}