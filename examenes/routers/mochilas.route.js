import { Router } from 'express';
import { 
    createMochilaHandler,
  getMochilasHandler
} from '../controllers/mochilas.controller.js';

const router = Router();
router.get('/', getMochilasHandler);
router.post('/',createMochilaHandler)

export default router;