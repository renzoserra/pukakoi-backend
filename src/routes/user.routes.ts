import { Router } from 'express';
import { register, login, changePassword, removeUser } from '../controllers/user.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/:id/password', changePassword);
router.delete('/:id', removeUser);

export default router;
