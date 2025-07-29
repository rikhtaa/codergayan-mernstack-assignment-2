import express from 'express'
import dotenv from 'dotenv'
import logger from './config/logger'

const app = express()
dotenv.config()

app.post('/', (req, res) => {
    res.send('hello')
})
const port = process.env.PORT || 5501
app.listen(port, () => {
    console.log('server is listening on 5501')
    logger.info('Server started successfully')
})
