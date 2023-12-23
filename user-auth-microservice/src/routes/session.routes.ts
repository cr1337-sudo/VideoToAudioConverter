import { Router } from 'express'
import { userController } from '../controllers/session.controller'

const router = Router()
const controller = new userController()

router.post('/register', controller.register)

router.get('/users', controller.login)

export default router
