import { messages } from "../../entities/chat/messages";
import { verificationStatus } from "../../entities/verificationStatus";

export interface sendMessages{
    send(messages: messages): Promise<verificationStatus>
}