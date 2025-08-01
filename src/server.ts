import express from 'express'
import logger from './config/logger'
import { AppDataSource } from './config/Data_Source'
import { productRouter } from './routes/product'
import { itemRouter } from './routes/item'
import { Config } from './config'
export const app = express()

app.use(express.json())

app.use('/product', productRouter)
app.use('/item', itemRouter)
const startServer = async () => {
    const PORT = Config.PORT
    try {
        await AppDataSource.initialize()
        logger.info('DB connected successfully')
        app.listen(PORT, () => {
            logger.info(`Server started on ${PORT} successfully`)
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error(error.message)
            setTimeout(() => {
                process.exit(1)
            }, 1000)
        }
    }
}
void startServer()
