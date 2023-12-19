export interface userRepository{
    exits(id: string): Promise<Boolean>
}