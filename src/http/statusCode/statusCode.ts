import { httpResponse } from "../http";

export const ok = (data: any, status: boolean): httpResponse => {
    return {
        statusCode: 200,
        body: {
            data,
            status
        }
    }
}

export const created = (data: any, status: boolean): httpResponse => {
    return {
        statusCode: 201,
        body: {
            data,
            status
        }
    }
}

export const badRequest = (error: string, status: boolean): httpResponse => {
    return {
        statusCode: 400,
        body: {
            error,
            status
        }
    }
}

export const unauthorized = (error: string, status: boolean): httpResponse => {
    return {
        statusCode: 401,
        body: {
            error,
            status
        }
    }
}

export const notFound = (error: string, status: boolean): httpResponse => {
    return {
        statusCode: 404,
        body: {
            error,
            status
        }
    }
}

export const serverError = (error: string, status: boolean): httpResponse => {
    return {
        statusCode: 500,
        body: {
            error,
            status
        }
    }
}