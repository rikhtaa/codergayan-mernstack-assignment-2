import express from 'express'
import {
    createItem,
    deleteItemById,
    getAllItems,
    getItemById,
    updateItemById,
} from '../controllers/Item'
import itemValidator from '../validator/create-item'
export const itemRouter = express()

itemRouter.post('/', itemValidator, createItem)
itemRouter.get('/:id', getItemById)
itemRouter.delete('/:id', deleteItemById)
itemRouter.patch('/:id', updateItemById)
itemRouter.get('/', getAllItems)
