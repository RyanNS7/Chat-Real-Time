import { chat } from "../../entities/chat/chat";
import { verificationStatus } from "../../entities/verificationStatus";

export interface createChat {
    create(chat: chat): Promise<verificationStatus>
}