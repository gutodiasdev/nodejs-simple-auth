import { Router } from 'express';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import {
  authenticateUserController,
  createUserContoller
} from './controllers';
import { refreshTokenController } from './controllers/RefreshTokenController';

const userRouter = Router();

userRouter.post('/users', createUserContoller.handle);
userRouter.post('/sessions', authenticateUserController.handle);
userRouter.post('/refresh', refreshTokenController.handle);

userRouter.get('/courses', ensureAuthenticated, async (request, response) => {
  return response.json([
    { id: 1, name: 'NodeJS' },
    { id: 2, name: 'ReactJS' },
    { id: 3, name: 'React Native' },
  ]);
});

export { userRouter };