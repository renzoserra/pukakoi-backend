import { Router } from 'express';
import {
  listCategories,
  getCategory,
  addCategory,
  editCategory,
  removeCategory
} from '../controllers/category.controller';


const router = Router();

router.get('/', listCategories);             // GET /api/categories
router.get('/:id', getCategory);             // GET /api/categories/:id
router.post('/', addCategory);               // POST /api/categories
router.put('/:id', editCategory);            // PUT /api/categories/:id
router.delete('/:id', removeCategory);       // DELETE /api/categories/:id

export default router;

