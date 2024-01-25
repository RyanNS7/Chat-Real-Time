import { verificationStatus } from "../../entities/verificationStatus"

export interface userRepository{
    exits(id: string): Promise<verificationStatus>
}