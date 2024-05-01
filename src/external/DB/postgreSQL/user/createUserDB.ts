require('dotenv').config()
import { createUserControllers } from "../../../../controllers/user/createUserController";
import { userRepository } from "../../../../domain/usecases/user/userRepository";
import { httpRequest, httpResponse } from "../../../../http/http";
import { badRequest, created } from "../../../../http/statusCode/statusCode";
import { createEncryption } from "../../../cryptography/hash/createEncryption";
import { CreateJWT } from "../../../cryptography/jwt/createJWT";
import { ClientDB } from "../config/clientDB";
import { config } from "../config/configDB";
import { findUser } from "./findUser";
import { createUniqueID } from "./uniqueID/createUniqueID";
import { v4 as uuidv4 } from 'uuid'
import { findUniqueID } from "./uniqueID/findUniqueID";
import { EndDB } from "../config/endDB";

export class createUserDB {

    userProps: userRepository
    private config: config

    constructor(userProps: userRepository, config: config){
        this.userProps = userProps
        this.config = config
    }
    
    async create(httpRequest: httpRequest): Promise<httpResponse>{

        const client = await new ClientDB(this.config).connection()
        const {body, statusCode} = await new createUserControllers(this.userProps).create(httpRequest)

        if(statusCode === 400){
            return badRequest(body, false)
        }
        
        const encryptedPassword = await createEncryption.encrypt(body.data.password)
        
        const query = {
            text: `INSERT INTO "user" (id_user, email, name, password) VALUES ($1, $2, $3, $4)`,
            values: [ uuidv4() ,body.data.email, body.data.name, encryptedPassword] 
        }

        const find_user = await new findUser(this.config).find(query.values[0])

        if(find_user.statusCode !== 400){
            return badRequest("User already exist", false)
        }

        const userDB = await client.query(query)

        if(userDB.rowCount === 0){
            return badRequest("error when creating user", false)
        }

        const uniqueID = await new createUniqueID(this.config).create(`${query.values[0]}`)

        if(uniqueID.statusCode !== 201){
            return badRequest(uniqueID.body, false)
        }

        const findUniqueId = await new findUniqueID(this.config).find(query.values[0])

        const token = CreateJWT.singJWT(
            {   id: query.values[0],
                name: body.data.name
            }, 
            process.env.JWT_SECRET)

            await new EndDB(this.config).endConnection()

        return created({
            user: {id_user: query.values[0], email: body.data.email, name: body.data.name},
            uniqueID: findUniqueId.body.data.rows[0].id_unique,
            token
        }, true)

    }

}