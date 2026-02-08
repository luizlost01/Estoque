import { Router } from "express"; 

import * as productController from "../controller/productController.js"
import { protect } from "../middlewares/authMiddleware.js";

const router = Router()

router.post('/product', protect,productController.create)
router.get('/products', productController.list)
router.put('/product/:id', protect, productController.update)
router.delete('/product/:id', protect, productController.remove)

export default router