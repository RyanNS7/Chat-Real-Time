import { sendMessageController } from "../../../../controllers/chat/sendMessageController";
import { chat } from "../../../../domain/entities/chat/chat";
import { verificationStatus } from "../../../../domain/entities/verificationStatus";
import { userRepository } from "../../../../domain/usecases/user/userRepository";
import { createChatUseCase } from "../../../../presentation/usecases/chat/createChatUseCase";
import { findUserConversationsInSystem } from "./find-user-conversations-in-system";
import { inMemoryChatSendMessage, infoMessage } from "./repository/in-memory-chat-repo";
import { userConversationsInSystem } from "./user-conversations-in-memory";

export class SendMessageInMemoryChat implements inMemoryChatSendMessage {

    userRepository: userRepository

    constructor(userRepository: userRepository){
        this.userRepository = userRepository
    }

    async sendMessage(infoMessage: infoMessage, otherUserId: string): Promise<verificationStatus>{

        const userSendingMessage = await this.userRepository.exits(infoMessage.id_User)
        const userReceivingTheMessage = await this.userRepository.exits(otherUserId)

        if(userSendingMessage.status === false){
            return {
                error: "The user sending the message does not exist",
                status: false
            }
        }

        if(userReceivingTheMessage.status === false){
            return {
                error: "The user receiving the message does not exist",
                status: false
            }
        }

        const chat = await new findUserConversationsInSystem().findChat(infoMessage.id_User, otherUserId)

        const infoChat: chat = {
            messages: [],
            id_first_user: infoMessage.id_User,
            id_second_user: otherUserId

        }

        const sending = await new sendMessageController(this.userRepository).sendMessage({body:{message: infoMessage.message, id_User: infoMessage.id_User}})

        if(chat.status === false){
            const createdChat = await new createChatUseCase(this.userRepository).create(infoChat)

            await createdChat.data.messages.push(sending.body)

            userConversationsInSystem.push(createdChat.data)

            return {
                data: userConversationsInSystem.find(chat => chat === createdChat.data),
                status: true
            }
        }

        if(chat.status === true){
            userConversationsInSystem.push(chat.data.messages.push(sending.body))

            return {
                data: userConversationsInSystem.find(chatSystem => chatSystem === chat.data),
                status: true
            }
        }

        return {
            status: false,
            error: chat.error
        }
    }

}