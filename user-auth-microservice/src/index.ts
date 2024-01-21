import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import config from './config/config'
import routerSession from './routes/session.routes'
import setUpEnviroment from '../database/index'
import cors from 'cors'

const app: Express = express()
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,
}))

app.use('/auth', routerSession)

setUpEnviroment()

app.listen(config.BACK_PORT, () => {
  console.log(
    `server running : http://${config.BACK_HOST}:${config.BACK_PORT}`
  )
})
