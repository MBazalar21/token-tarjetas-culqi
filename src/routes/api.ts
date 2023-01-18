import { Router } from 'express';
import tokenRoutes from './token-routes';

const apiRouter = Router();
const tokenRouter = Router();

tokenRouter.post(
    tokenRoutes.paths.token,
    tokenRoutes.token,
);

tokenRouter.get(
    tokenRoutes.paths.findCard,
    tokenRoutes.findCard,
)

// Add tokenRouter
apiRouter.use(tokenRoutes.paths.basePath, tokenRouter);

// **** Export default **** //
export default apiRouter;