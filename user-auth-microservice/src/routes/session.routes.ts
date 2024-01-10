import { Router } from 'express'
import { userController } from '../controllers/session.controller'

const router = Router()
const controller = new userController()

router.post('/register', controller.register)

router.get('/login', controller.login)

router.get('/token', controller.token)

export default router
