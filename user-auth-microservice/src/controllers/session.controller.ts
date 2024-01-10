import { user } from "./types/userController";
import { createHash, isValidatePassword } from "../utils/bycript";
import { Request, Response } from "express";
import { UsersService } from "../services/session.service";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { generateToken, verifyToken } from "../utils/jwt";
import { uuid } from 'uuidv4'

export const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error("Incorrect or missing name");
  }
  return nameFromRequest;
};

export const parseEmail = (emailFromRequest: any): string => {
  if (!isEmail(emailFromRequest)) {
    console.log(emailFromRequest);

    throw new Error("enter valid email");
  }
  return emailFromRequest;
};

const isEmail = (string: string): boolean => {
  const patronEmail: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return patronEmail.test(string);
};

const isString = (string: string): boolean => {
  return typeof string === "string";
};

export class userController {
  async login(req: Request, res: Response): Promise<any> {
    const { mail, password } = req.body;
    const secret = config.SECRET_JWT;
    const usersService = UsersService.getInstance();
    try {
      const user = await usersService.getUser({ mail, password });

      if (!isValidatePassword(password, user.Items[0].password.S)) {
        return res.send("Contraseña incorrecta");
      }
            
      const token = jwt.sign(
        {
          mail,
          id: user.id, 
          exp: Date.now() + 60 * 1000,
        },
        secret
      );
      res.cookie("Token", token, { httpOnly: true });

      return res.json(token);
    } catch (error) {
      console.log(error);
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    const { mail, password, name } = req.body;
    const idGenerate = uuid()
    const passwordHash = createHash(password);

    const newUser: user = {
      name: parseName(name),
      mail: parseEmail(mail),
      password: passwordHash,
      id: idGenerate
    };
    const usersService = UsersService.getInstance();
    try {
      const user = await usersService.getUser({ mail });

      if (user.Count >= 1) {
        return res.json("El usuario ya existe");
      }

      const response = await usersService.postUser(newUser);
      res.json("Usuario creado");
    } catch (error) {
      console.log(error);
    }
  }

  async token(req: Request, res: Response): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1]
    console.log(token);
    
    if (token) {
     const response = verifyToken(token)
     if (response != null) {
       const newToken = generateToken(response?.id , response?.mail)       
       res.cookie("Token", newToken, { httpOnly: true });
       console.log(newToken);
       
     }
 }

    res.json("token accepted");
  }
}
