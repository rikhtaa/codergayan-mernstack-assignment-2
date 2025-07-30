import { Request, Response } from 'express'
import { AppDataSource } from '../config/Data_Source'
import logger from '../config/logger'
import { Admin } from '../entity/Admin'
import { Manager } from '../entity/Manager'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

export const createManager = async (req: Request, res: Response) => {
    const adminRepository = AppDataSource.getRepository(Admin)
    const admin = await adminRepository.findOne({
        where: { email: process.env.email },
    })
    if (!admin) {
        logger.error(
            `admin with this ${process.env.email} email doesn't found.`,
        )
        return res.status(404).json({ message: 'Admin not found' })
    }
    const salt = 10
    const hashedPassword = await bcrypt.hash(process.env.password!, salt)
    const manager = {
        firstName: process.env.firstName,
        email: process.env.email,
        password: hashedPassword,
        role: 'manager',
        createdBy: admin,
    }
    const managerRepository = AppDataSource.getRepository(Manager)
    await managerRepository.save(manager)

    res.status(201).json({ message: 'manager has been created' })
}
