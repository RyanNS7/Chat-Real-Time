import { verificationStatus } from "../../entities/verificationStatus"

export interface userRepository{
    exits(email: string): Promise<verificationStatus>
}