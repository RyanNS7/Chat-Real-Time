import { verificationStatus } from "../../../../../domain/entities/verificationStatus";

export interface inMemoryUserRepository{
    find(): Promise<verificationStatus>
    create(): Promise<verificationStatus>
    delete(): Promise<verificationStatus>
}