import config from "../config/config";
import jwt from 'jsonwebtoken'


interface Token {
    id: string;
    mail: string;
    exp: number;
    iat: number;
  }

export function extractIdToken(token: string): any {
    const res = jwt.verify(token, config.SECRET_JWT)  as Token
    return res.id
}