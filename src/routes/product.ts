import express from 'express'
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById,
} from '../controllers/Product'
import productValidator from '../validator/create-product'
export const productRouter = express()

productRouter.post('/', productValidator, createProduct)
productRouter.get('/:id', getProductById)
productRouter.delete('/:id', deleteProductById)
productRouter.patch('/:id', updateProductById)
productRouter.get('/', getAllProducts)
