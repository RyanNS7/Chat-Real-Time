import { verificationStatus } from "../../../../domain/entities/verificationStatus"
import { inMemoryChatUserConversations } from "./repository/in-memory-chat-repo"
import { userConversationsInSystem } from "./user-conversations-in-memory"


export class findUserConversationsInSystem implements inMemoryChatUserConversations{

    async findChat(id: string, otherUserId: string): Promise<verificationStatus>{

        const existChat = userConversationsInSystem.find( chat => chat.id_first_user === id && chat.id_second_user === otherUserId ) 
    
        if(existChat == undefined){
            return {
                status: false
            }
        }
    
        return {
            data: existChat,
            status: true
        }
    }
}