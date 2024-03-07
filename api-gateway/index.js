const express = require('express')
const httpProxy = require('express-http-proxy')
const morgan = require('morgan')
const config = require('./config')
const app = express()
app.use(morgan('dev'))

app.get('/ping', (req,res)=>{
    return res.json({pong:'pong'})
})

app.use('/mail', httpProxy(`http://${config.notificationService.host}:${config.notificationService.port}`, {
    proxyReqPathResolver: (req) => req.baseUrl + req.url
}))

app.use('/video', httpProxy(`http://${config.convertVideoService.host}:${config.convertVideoService.port}`, {
    proxyReqPathResolver: (req) => req.baseUrl + req.url
}))

app.use('/auth', httpProxy(`http://${config.authService.host}:${config.authService.port}`, {
    proxyReqPathResolver: (req) => req.baseUrl + req.url
}))



app.listen(4000, () => {
    console.error("Server running port 4000")
})