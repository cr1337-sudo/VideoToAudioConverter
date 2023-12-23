import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import VideoRouter from './routes/routes'
import multer from 'multer'
import config from './config/config'
import routerSession from './routes/session.routes'

const app: Express = express()
const storage = multer.memoryStorage()
const upload = multer({ storage })
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/video', upload.single('video'), VideoRouter)

app.use('/api', routerSession)

app.listen(config.BACK_PORT, () => {
  console.log(
    `server running : http://${config.BACK_HOST}:${config.BACK_PORT}`
  )
})
