import { Express } from "express"

export function initServer(app: Express){

    app.listen(process.env.SERVER_PORT || 8080, () => {
        console.log("Servidor Iniciado com Sucesso")
    })   

}
