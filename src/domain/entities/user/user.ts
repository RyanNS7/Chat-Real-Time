import { verificationStatus } from "../verificationStatus"
import { randomUUID } from "crypto"

export class User {
    readonly id: string
    name: string
    email: string
    password: string

    constructor(name: string, email: string, password: string){
        this.id = randomUUID()
        this.name = name
        this.email = email
        this.password = password
    }

    static create(name: string, email: string, password: string): verificationStatus{
        if(name.length < 3 || name.length > 40){
            return {
                error: "Name must be more than 3 characters and less than 40 required",
                status: false
            }
        }

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
            return {
                error: "Invalid Email",
                status: false
            }
        }

        return {
            data: new User(name, email, password ),
            status: true
        }
    }

}