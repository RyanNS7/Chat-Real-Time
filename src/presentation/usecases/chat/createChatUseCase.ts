import { chat } from "../../../domain/entities/chat/chat"
import { messages } from "../../../domain/entities/chat/messages"
import { verificationStatus } from "../../../domain/entities/verificationStatus"
import { createChat } from "../../../domain/usecases/chat/createChat"
import { userRepository } from "../../../domain/usecases/user/userRepository"

export class createChatUseCase implements createChat{

    userProps: userRepository

    constructor(userProps: userRepository){
        this.userProps = userProps
    }

    async create(chat: chat): Promise<verificationStatus> {

        const firstUser = await this.userProps.exits(chat.id_first_user)
        const secondUser = await this.userProps.exits(chat.id_second_user)

        if(firstUser.status === false){
            return {
                status: firstUser.status,
                error: firstUser.error
            }
        }

        if(secondUser.status === false){
            return {
                status: secondUser.status,
                error: secondUser.error
            }
        }

        return {
            status: true,
            data: {
                messages: chat.messages,
                id_first_user: chat.id_first_user,
                id_second_user: chat.id_second_user
            }
        }

    }

}