import { Router } from 'express';
import tokenRoutes from './token-routes';

const apiRouter = Router();
const tokenRouter = Router();

apiRouter.get('/', (req, res) => {
    res.send('Estoy en api!');
});

tokenRouter.post(
    tokenRoutes.paths.token,
    tokenRoutes.token,
);

// Add tokenRouter
apiRouter.use(tokenRoutes.paths.basePath, tokenRouter);

// **** Export default **** //

export default apiRouter;