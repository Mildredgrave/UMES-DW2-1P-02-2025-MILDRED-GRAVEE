import { Router } from 'express';
import mochilasRoute from './mochilas.route.js';

const router = Router();

router.use("/mochilas", mochilasRoute);

export default router;