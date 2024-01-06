import { httpResponse } from "../http";

export const ok = (data: any): httpResponse => {
    return {
        statusCode: 200,
        body: data
    }
}

export const created = (data: any): httpResponse => {
    return {
        statusCode: 201,
        body: data
    }
}

export const badRequest = (error: Error): httpResponse => {
    return {
        statusCode: 400,
        body: error.message
    }
}

export const unauthorized = (error: Error): httpResponse => {
    return {
        statusCode: 401,
        body: error.message
    }
}

export const notFound = (error: Error): httpResponse => {
    return {
        statusCode: 404,
        body: error.message
    }
}

export const serverError = (nameError: string): httpResponse => {
    return {
        statusCode: 500,
        body: new Error(nameError)
    }
}