import { sendMessageController } from "../../../../controllers/chat/sendMessageController";
import { chat } from "../../../../domain/entities/chat/chat";
import { verificationStatus } from "../../../../domain/entities/verificationStatus";
import { userRepository } from "../../../../domain/usecases/user/userRepository";
import { createChatUseCase } from "../../../../presentation/usecases/chat/createChatUseCase";
import { findUserConversationsInSystem } from "./find-user-conversations-in-system";
import { inMemoryChatSendMessage, infoMessage } from "./repository/in-memory-chat-repo";
import { userConversationsInSystem } from "./user-conversations-in-memory";

class SendMessageInMemoryChat implements inMemoryChatSendMessage {

    userRepository: userRepository

    constructor(userRepository: userRepository){
        this.userRepository = userRepository
    }

    async sendMessage(infoMessage: infoMessage, otherUserId: string): Promise<verificationStatus>{

        const userSendingMessage = await this.userRepository.exits(infoMessage.id_User)
        const userReceivingTheMessage = await this.userRepository.exits(otherUserId)
        const chat = await new findUserConversationsInSystem().findChat(userSendingMessage.data.id, userReceivingTheMessage.data.id)
        const infoChat: chat = {
            messages: [],
            id_first_user: userSendingMessage.data.id,
            id_second_user: userReceivingTheMessage.data.id

        }

        const sending = await new sendMessageController(this.userRepository).sendMessage({body:{message: infoMessage.message, id_User: infoMessage.id_User}})

        if(chat.status === false){
            const createdChat = await new createChatUseCase(this.userRepository).create(infoChat)
            
            userConversationsInSystem.push(createdChat.data.messages.push(sending.body))

            return {
                data: userConversationsInSystem,
                status: true
            }
        }

        if(chat.status === true){
            userConversationsInSystem.push(chat.data.messages.push(sending.body))

            return {
                data: userConversationsInSystem,
                status: true
            }
        }

        return {
            status: false,
            error: chat.error
        }
    }

}