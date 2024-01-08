import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import config from './config/config'

const app: Express = express()
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(config.BACK_PORT, () => {
  console.log(
    `server running : http://${config.BACK_HOST}:${config.BACK_PORT}`
  )
})
