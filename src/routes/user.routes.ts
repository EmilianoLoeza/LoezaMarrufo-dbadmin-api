import { Router } from 'express';
import { getUsers, getUserById } from '../controllers/user.controller.js';

const router = Router();

router.get('/users', getUsers);
router.get('/userGetId/:id', getUserById);
export default router;
