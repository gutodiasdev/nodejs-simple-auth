import 'express-async-errors';
import express, { NextFunction, Response, Request } from 'express';
import { userRouter } from './modules/user/routes';

const app = express();
app.use(express.json());

app.use(userRouter);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: 'Error',
      message: error.message
    });
  }
);

app.listen(3000, () => console.log('Server is running!'));