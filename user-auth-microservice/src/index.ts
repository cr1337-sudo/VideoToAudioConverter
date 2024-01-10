import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import config from './config/config'
import routerSession from './routes/session.routes'
import setUpEnviroment from '../database/index'

const app: Express = express()
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routerSession)

setUpEnviroment()

app.listen(config.BACK_PORT, () => {
  console.log(
    `server running : http://${config.BACK_HOST}:${config.BACK_PORT}`
  )
})
