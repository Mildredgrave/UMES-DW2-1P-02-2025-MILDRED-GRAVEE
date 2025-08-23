import { Router } from 'express';
import { 
  getMochilasHandler
} from '../controllers/mochilas.controller.js';

const router = Router();
router.get('/', getMochilasHandler);

export default router;