import express, { Express } from "express";
import cors from 'cors'

export function parses(app: Express){

    app.use(cors())
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

}