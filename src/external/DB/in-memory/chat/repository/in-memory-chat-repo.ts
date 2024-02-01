import { verificationStatus } from "../../../../../domain/entities/verificationStatus";

export interface infoMessage{
    message: string,
    id_User: string
}

export interface inMemoryChatSendMessage{
    sendMessage(infoMessage: infoMessage, otherUserId: string): Promise<verificationStatus>
}

export interface inMemoryChatUserConversations{
    findChat(userId: string, otherUserId: string): Promise<verificationStatus>
}