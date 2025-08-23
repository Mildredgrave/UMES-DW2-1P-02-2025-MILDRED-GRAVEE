import { Router } from 'express';
import clientsRoute from './mochilas.route.js';

const router = Router();

router.use("/mochilas", clientsRoute);

export default router;