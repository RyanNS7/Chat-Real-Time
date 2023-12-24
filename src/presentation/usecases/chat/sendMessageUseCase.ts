import { messages } from "../../../domain/entities/chat/messages";
import { verificationStatus } from "../../../domain/entities/verificationStatus";
import { sendMessages } from "../../../domain/usecases/chat/sendMessages"
import { userRepository } from "../../../domain/usecases/user/userRepository";


export class SendMessageUseCase implements sendMessages{

    userRepository: userRepository

    constructor(propsMessages: sendMessages, userRepository: userRepository){
        this.userRepository = userRepository
    }

    async send(userMessage: messages): Promise<verificationStatus | messages>{

        if((await this.userRepository.exits(userMessage.id_User)).status === false){
            return {
                error: "User not exists",
                status: false
            }
        }

        if(userMessage.message.length < 1){
            return {
                error: "Cannot send empty space",
                status: false
            }
        }

        if(userMessage.message.length > 100){
            return {
                error: "Too many characters typed",
                status: false
            }
        }

        return {
            message: userMessage.message,
            id_User: userMessage.id_User,
            sending_time: userMessage.sending_time,
            status: true
        }
    }

    
}