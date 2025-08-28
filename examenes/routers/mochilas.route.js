import { Router } from 'express';
import { 
    postMochilaHandler,
  getMochilasHandler
} from '../controllers/mochilas.controller.js';

const router = Router();
router.get('/', getMochilasHandler);
router.post('/',postMochilaHandler)

export default router;