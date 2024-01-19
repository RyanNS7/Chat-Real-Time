import { verificationStatus } from "../../../../domain/entities/verificationStatus";
import { systemUsers } from "./db-in-memory";
import { findUserInMemory } from "./find-user-in-memory";

export class deleteUserInMemory{

    static async delete(id: string): Promise<verificationStatus>{

        if(!await findUserInMemory.find(id)){
            return{
                error: "User not exists",
                status: false
            }
        }
    
        const index = systemUsers.indexOf((await findUserInMemory.find(id)).data);
    
        if (index !== -1) {
            systemUsers.splice(index, 1);
        }
    
        return {
            status: true
        }
    
    }

}