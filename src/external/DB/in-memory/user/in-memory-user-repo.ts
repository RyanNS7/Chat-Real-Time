import { User } from "../../../../domain/entities/user/user";
import { verificationStatus } from "../../../../domain/entities/verificationStatus";

export interface inMemoryUserRepository{
    find(): Promise<User>
    create(): Promise<verificationStatus>
    delete(): Promise<verificationStatus>
}