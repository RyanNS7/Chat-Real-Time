import { messages } from "../../entities/chat/messages";

export interface sendMessages{
    send(messages: messages): Promise<Error | messages>
}