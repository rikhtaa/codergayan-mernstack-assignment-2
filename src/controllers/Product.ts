import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../config/Data_Source'
import { productData } from '../types'
import { Product } from '../entity/Product'

export const createProduct = async (
    req: Request<object, object, productData>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const productRepository = AppDataSource.getRepository(Product)
        const productData = req.body
        await productRepository.save(productData)
        return res.status(201).json({ message: 'product created' })
    } catch (err) {
        next(err)
        return
    }
}

export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ message: 'invalid product id' })
        }
        const productRepository = AppDataSource.getRepository(Product)
        const product = await productRepository.findBy({ id })

        if (!product) {
            return res
                .status(401)
                .json({ message: `No product found with this id ${id}` })
        }
        return res.status(201).json(product)
    } catch (err) {
        next(err)
        return
    }
}
export const deleteProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ message: 'invalid product id' })
        }
        const productRepository = AppDataSource.getRepository(Product)
        const product = await productRepository.delete({ id })

        if (!product) {
            return res
                .status(401)
                .json({ message: `No product found with this id ${id}` })
        }
        return res
            .status(201)
            .json({ message: `product with this id ${id} has been deleted.` })
    } catch (err) {
        next(err)
        return
    }
}
