
import { user } from './types/userController'
import { createHash, isValidatePassword } from '../utils/bycript'
import { Request, Response } from 'express'
import { UsersService } from '../services/session.service'

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name')
  }
  return nameFromRequest
}

const parseEmail = (emailFromRequest: any): string => {
  if (!isEmail(emailFromRequest)) {
    console.log(emailFromRequest)

    throw new Error('enter valid email')
  }
  return emailFromRequest
}

const isEmail = (string: string): boolean => {
  const patronEmail: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return patronEmail.test(string)
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

export class userController {
  async login (req: Request, res: Response): Promise<any> {
    const { mail, password } = req.body
    const usersService = UsersService.getInstance()
    try {
      const user = await usersService.getUser({ mail, password })

      if (!isValidatePassword(password, user.Items[0].password.S)) {
        return res.send('Contraseña incorrecta')
      }

      return res.json('Usuario logueado')
    } catch (error) {
      console.log(error)
    }
  }

  async register (req: Request, res: Response): Promise<any> {
    const { mail, password, name } = req.body
    const passwordHash = createHash(password)

    const newUser: user = {
      name: parseName(name),
      mail: parseEmail(mail),
      password: passwordHash
    }
    const usersService = UsersService.getInstance()
    try {
      const user = await usersService.getUser({ mail })

      if (user.Count >= 1) {
        return res.send('El usuario ya existe')
      }

      const response = await usersService.postUser(newUser)
      res.send('Usuario creado')
    } catch (error) {
      console.log(error)
    }
  }
}
