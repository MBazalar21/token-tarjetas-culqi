import express, { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from './declarations/HttpStatusCodes';
import { RouteError } from './declarations/classes';
import BaseRouter from '../routes/api';
const app = express();
const port = 3000;

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Inicio proyecto!');
});

app.use('/api', BaseRouter);

// Setup error handler
app.use((
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    // logger.err(err, true);
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  });
  

app.listen(port, () => {
//   if (err) {
//     return console.error(err);
//   }
  return console.log(`server is listening on ${port}`);
});