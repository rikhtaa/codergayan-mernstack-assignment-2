import express from 'express'
import {
    createItem,
    deleteItemById,
    getAllItems,
    getItemById,
    updateItemById,
} from '../controllers/Item'
export const itemRouter = express()

itemRouter.post('/', createItem)
itemRouter.get('/:id', getItemById)
itemRouter.delete('/:id', deleteItemById)
itemRouter.patch('/:id', updateItemById)
itemRouter.get('/', getAllItems)
