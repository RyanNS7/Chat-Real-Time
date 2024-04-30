import { verificationStatus } from "../../../domain/entities/verificationStatus";
import { userRepository } from "../../../domain/usecases/user/userRepository";
import { config } from "./config/configDB";
import { findUserWithEmail } from "./user/findUserWithEmail";

export class exitsUser implements userRepository{

    private config: config

    constructor(config: config){
        this.config = config
    }

    async exits(email: string): Promise<verificationStatus> {
        const exist = await new findUserWithEmail(this.config).find(email)

        if(exist.statusCode === 200){
            return {status: true}
        }

        return {status: false}
    }
}