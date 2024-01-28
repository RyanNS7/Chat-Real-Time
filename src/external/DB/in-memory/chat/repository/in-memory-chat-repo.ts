import { messages } from "../../../../domain/entities/chat/messages";
import { verificationStatus } from "../../../../domain/entities/verificationStatus";

export interface inMemoryChatRepository{
    sendMessage(message: messages): Promise<verificationStatus>
}