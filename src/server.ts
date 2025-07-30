import express from 'express'
import dotenv from 'dotenv'
import logger from './config/logger'
import { AppDataSource } from './config/Data_Source'
import { Admin } from './entity/Admin'
import bcrypt from 'bcryptjs'
import manager from './routes/manager'
dotenv.config()
export const app = express()

app.use('/managers', manager)
app.use(express.json())
const startServer = async () => {
    const port = process.env.PORT || 5501
    try {
        await AppDataSource.initialize()
        await createAdmin()
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

const createAdmin = async () => {
    try {
        const adminRepository = AppDataSource.getRepository(Admin)
        const checkAdmin = await adminRepository.findOne({
            where: { role: 'admin' },
        })
        const salt = 10
        const hashedPassword = await bcrypt.hash(process.env.password!, salt)
        const userAdmin = {
            firstName: process.env.firstName,
            email: process.env.email,
            password: hashedPassword,
            role: process.env.role,
        }
        if (!checkAdmin) {
            await adminRepository.save(userAdmin)
            logger.info('Admin has been created')
        } else {
            logger.info('Admin already exists')
        }
    } catch (error) {
        logger.error('Failed to create admin:', error)
    }
}
