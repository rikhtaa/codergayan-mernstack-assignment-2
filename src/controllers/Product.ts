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
            .json({ message: `product with this id ${id} has been` })
    } catch (err) {
        next(err)
        return
    }
}

export const updateProductById = async (
    req: Request<{ id: string }, object, productData>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ message: 'invalid product id' })
        }
        const { name, description } = req.body

        const productRepository = AppDataSource.getRepository(Product)
        const result = await productRepository.update(id, {
            name,
            description,
        })

        if (result.affected === 0) {
            return res
                .status(404)
                .json({ message: `No product found with this id ${id}` })
        }

        const updatedProduct = await productRepository.findOneBy({ id })

        return res.status(200).json({
            message: `product with this id ${id} has been updated.`,
            updatedProduct,
        })
    } catch (err) {
        next(err)
        return
    }
}
