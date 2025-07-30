import express from 'express'
import { createManager } from '../controllers/manager'
const router = express.Router()
router.post('/', createManager)
export default router
