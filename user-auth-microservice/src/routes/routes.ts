import Router from 'express'
import { UploadVideoController } from '../controllers/upload-video.controller'
const router = Router()
const controller = new UploadVideoController()

router.route('/upload').post(controller.uploadVideo)
export default router
