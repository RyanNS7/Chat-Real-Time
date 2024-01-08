import { httpRequest, httpResponse } from "../../http/http";
import { badRequest, serverError } from "../../http/statusCode/statusCode";


export class sendMessageController {
    async handle(httpRequest: httpRequest): Promise<httpResponse>{

        try {
            if(!httpRequest.body){
                return badRequest(new Error("Body Not Found"))
            }
        } catch (error) {
            return serverError("Server Error")
        }

    }
}