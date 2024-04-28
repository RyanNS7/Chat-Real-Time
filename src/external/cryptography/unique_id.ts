import { httpResponse } from "../../http/http"
import { badRequest, created } from "../../http/statusCode/statusCode"

export class Unique_ID {

    static creationUniqueID(): httpResponse{

        const unique_id = Math.random().toString(36).substring(2, 9).toUpperCase() 

        if(unique_id.length !== 7){
            return badRequest("failed to create id", false)
        }

        return created(`${unique_id + "#"}`, true)
    }
}