import express from 'express'
import dotenv from 'dotenv'
import logger from './config/logger'
import { AppDataSource } from './config/Data_Source'
import { productRouter } from './routes/product'
dotenv.config()
export const app = express()

app.use(express.json())

app.use('/product', productRouter)
const startServer = async () => {
    const port = process.env.PORT || 5501
    try {
        await AppDataSource.initialize()
        logger.info('DB connected successfully')
        app.listen(port, () => {
            logger.info('Server started on 5501 successfully')
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error(error.message)
        } else {
            logger.error('AN unpppppknown error occured')
        }

        setTimeout(() => {
            process.exit(1)
        }, 1000)
    }
}
void startServer()
