import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export async function ensureAuthenticateClient(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({
            message: "Token Missing."
        })
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub } = verify(token, "019acc25a4e242bb55ad489832ada12d") as IPayload

        req.id_client = sub

        return next()
    } catch(err) {
        return res.status(401).json({
            message: "Invalid Token."
        })
    }
}