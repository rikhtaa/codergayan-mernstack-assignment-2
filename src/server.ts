import express from 'express'
import dotenv from 'dotenv'
import logger from './config/logger'
import { AppDataSource } from './config/Data_Source'

dotenv.config()
const app = express()

app.post('/', (req, res) => {
    res.send('hello')
})
const startServer = async () => {
    const port = process.env.PORT || 5501
    try {
        await AppDataSource.initialize()
        logger.info('DB connected successfully')
        app.listen(port, () => {
            logger.info('Server started successfully')
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error(error.message)
        } else {
            logger.error('AN unknown error occured')
        }

        setTimeout(() => {
            process.exit(1)
        }, 1000)
    }
}
void startServer()
