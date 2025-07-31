import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../config/Data_Source'
import { Item } from '../entity/Item'
import { itemData } from '../types'
import { Product } from '../entity/Product'
export const createItem = async (
    req: Request<object, object, itemData>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { price, productId } = req.body
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
