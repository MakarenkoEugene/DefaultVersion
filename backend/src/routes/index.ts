import express, { Request, Response } from 'express';
import todos from './todos';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('main page!!');
});

router.use('/todos', todos);

export default router;
