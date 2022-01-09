import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { Context } from "./types";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
    const authorization = context.req.headers['authorization']

    if (!authorization)
        throw new Error(`No 'Authorization' token bearer`)
    try {
        const token = authorization.split(' ')[1]
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
        context.payload = payload as any;
    } catch (err: any) {
        console.log(err);
        throw new Error(err);
    }

    return next();
}