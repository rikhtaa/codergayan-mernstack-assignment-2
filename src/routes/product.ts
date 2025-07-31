import express from 'express'
import {
    createProduct,
    deleteProductById,
    getProductById,
    updateProductById,
} from '../controllers/Product'
export const productRouter = express()

productRouter.post('/', createProduct)
productRouter.get('/:id', getProductById)
productRouter.delete('/:id', deleteProductById)
productRouter.patch('/:id', updateProductById)
