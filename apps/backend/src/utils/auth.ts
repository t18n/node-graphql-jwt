import { sign } from "jsonwebtoken";
import { User } from "../entity/User/User";
import "dotenv/config"
import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('jwt', token, {
        httpOnly: true,
        path: "/refresh_token"
    })
}

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15s'
    })
}

export const createRefershToken = (user: User) => {
    return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d'
    })
}