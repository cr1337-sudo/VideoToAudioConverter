import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

interface token {
  id: string;
  mail: string;
  exp: number;
  iat: number;
}

export const verifyToken = (
  token: string
): { id: string; mail: string } | null => {
  const verifiedtoken = jwt.verify(token, config.SECRET_JWT) as token;
  const now = Date.now();
  const limit = verifiedtoken.exp - 20000;
  if (verifiedtoken.exp !== undefined && verifiedtoken.exp < now) {
    throw new Error("Token expirado");
  }
  if (now < limit) return null 
  return { id: verifiedtoken.id, mail: verifiedtoken.mail };
};

export const generateToken = (
  mail: string | undefined,
  id: string | undefined
) => {
  const newToken = jwt.sign(
    {
      id,
      mail,
      exp: Date.now() + 60 * 1000,
    },
    config.SECRET_JWT
  );

  return newToken;
};
