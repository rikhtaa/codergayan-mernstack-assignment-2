import express from 'express'
import { createItem } from '../controllers/item'
export const itemRouter = express()

itemRouter.post('/', createItem)
