import { Router } from "express"; 

import * as productController from "../controller/productController.js"

const router = Router()

router.post('/product', productController.create)
router.get('/products', productController.list)
router.put('/product/:id', productController.update)
router.delete('/product/:id', productController.remove)

export default router