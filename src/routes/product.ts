import express from 'express'
import { createProduct, getProductById } from '../controllers/Product'
export const productRouter = express()

productRouter.post('/', createProduct)
productRouter.get('/:id', getProductById)
