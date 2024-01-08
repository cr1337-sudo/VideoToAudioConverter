import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config/config'

interface token {
  mail: string,
  exp: number,
  iat: number
}

export const verifyToken = (token: string): string | null => {
    const verify = jwt.verify(token, config.SECRET_JWT) as token
    const now = Date.now()    
    const limit = verify.exp - 20000
    
    if (verify.exp !== undefined && verify.exp < now) {
        throw new Error('Token expirado');
      }
    if (now >= limit) return verify.mail
    return null
}

export const generateToken = (mail: string) => {
  const newToken = jwt.sign({
    mail,
    exp: Date.now() + 60 * 1000
  }, config.SECRET_JWT) 

  return newToken
} 