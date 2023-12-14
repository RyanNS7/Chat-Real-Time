import express from "express"

const app = express()



app.listen(3333, (): void => {
    console.log("Servidor Iniciado com Sucesso")
})