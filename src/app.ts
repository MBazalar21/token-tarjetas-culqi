import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import HttpStatusCodes from './declarations/HttpStatusCodes';
import { RouteError } from './declarations/classes';
import BaseRouter from './routes/api';
import dotenv from 'dotenv';
import path from 'path';
import commandLineArgs from 'command-line-args';

const options = commandLineArgs([
  {
    name: 'env',
    alias: 'e',
    defaultValue: 'development',
    type: String,
  },
]);
// **** Set the env file **** //
const result2 = dotenv.config({
  path: path.join(__dirname, `../env/${String(options.env)}.env`),
});
if (result2.error) {
  throw result2.error;
}

const app = express();
const port = 3000;

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.get('/', (req : Request, res : Response) => {
  res.send('Inicio proyecto!');
});
app.use('/api', BaseRouter);

mongoose.connect(process.env.MONGODB, {}, 
() => {
  console.log('Conectado a base de datos MONGODB')
})

// Setup error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

app.listen(port, () => {
  return console.log(`Prueba Tecnica - Gateway POS esta funcionando en el puerto ${port}`);
});