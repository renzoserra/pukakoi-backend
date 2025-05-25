import { Router } from 'express';
import {
  listProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct
} from '../controllers/product.controller';

const router = Router();

router.get('/', listProducts);            // GET /api/products
router.get('/:id', getProduct);           // GET /api/products/:id
router.post('/', addProduct);             // POST /api/products
router.put('/:id', editProduct);          // PUT /api/products/:id
router.delete('/:id', removeProduct);     // DELETE /api/products/:id

export default router;
