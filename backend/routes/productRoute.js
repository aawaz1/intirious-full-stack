import express from 'express';
const router = express.Router();
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct} from '../controllers/productController.js';
import {admin,protect , } from '../middlewares/authMiddleware.js'

router.route("/").get(getProducts).post(protect,admin,createProduct);
router.route("/:id").get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);



 export default router;