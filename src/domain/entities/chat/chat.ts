import { messages } from "./messages";

export interface chat {
    messages: messages[]
    id_first_user: string
    id_second_user: string
}