import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../config/Data_Source'
import { Item } from '../entity/Item'
import { itemData } from '../types'
import { Product } from '../entity/Product'
import { validationResult } from 'express-validator'
export const createItem = async (
    req: Request<object, object, itemData>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { price, productId } = req.body

         const errors = validationResult(req)
                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()})
                }
        const productRepository = AppDataSource.getRepository(Product)
        const product = await productRepository.findOneBy({ id: productId })

        if (!product) {
            return res.status(400).json({ message: 'Invlaid ProductId' })
        }
        const itemRepository = AppDataSource.getRepository(Item)
        const item = itemRepository.create({
            price,
            product,
        })
        await itemRepository.save(item)
        return res.status(201).json({ message: 'item created', item })
    } catch (err) {
        next(err)
        return
    }
}

export const getItemById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ message: 'invalid item id' })
        }
        const itemRepository = AppDataSource.getRepository(Item)
        const item = await itemRepository.findOneBy({ id })

        if (!item) {
            return res
                .status(401)
                .json({ message: `No item found with this id ${id}` })
        }
        return res.status(201).json(item)
    } catch (err) {
        next(err)
        return
    }
}

export const deleteItemById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ message: 'invalid item id' })
        }
        const itemRepository = AppDataSource.getRepository(Item)
        const item = await itemRepository.delete({ id })

        if (!item) {
            return res
                .status(401)
                .json({ message: `No item found with this id ${id}` })
        }
        return res
            .status(201)
            .json({ message: `item with this id ${id} has been deleted.` })
    } catch (err) {
        next(err)
        return
    }
}

export const updateItemById = async (
    req: Request<{ id: string }, object, itemData>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            res.status(400).json({ message: 'invalid item id' })
        }
        const { price, productId } = req.body
        const productRepository = AppDataSource.getRepository(Product)
        const product = await productRepository.findOneBy({ id: productId })

        if (!product) {
            res.status(400).json({ message: 'product not found' })
            return
        }

        const itemRepository = AppDataSource.getRepository(Item)
        const result = await itemRepository.update(id, {
            price,
            product,
        })

        if (result.affected === 0) {
            return res
                .status(404)
                .json({ message: `No item found with this id ${id}` })
        }

        const updatedItem = await itemRepository.findOne({
            where: { id },
            relations: ['product'],
        })

        return res.status(200).json({
            message: `item with this id ${id} has been updated.`,
            updatedItem,
        })
    } catch (err) {
        next(err)
        return
    }
}
export const getAllItems = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const itemRepository = AppDataSource.getRepository(Item)
        const allItems = await itemRepository.find()
        return res.status(200).json({ message: 'All Items', allItems })
    } catch (err) {
        next(err)
        return
    }
}
