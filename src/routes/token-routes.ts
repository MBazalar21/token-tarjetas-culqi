import HttpStatusCodes from '../declarations/HttpStatusCodes';
import { IReq, IRes } from './shared/types';
import tokenService from '../services/token-service';
import {ICard} from '../interfaces/card';
// Paths
const paths = {
  basePath: '/v2',
  token: '/token',
  findCard: '/findCard/:id'
} as const;

// **** Types **** //
async function token(req: IReq<ICard>, res: IRes) {
  const { email,card_number,cvv,expiration_year,expiration_month } = req.body;
  let token: string = req.headers.token ? (req.headers.token).toString() : ''
  const newCard = await tokenService.getJwt(email,card_number,cvv,expiration_year,expiration_month,token);
  return res.status(HttpStatusCodes.OK).json({newCard});
}

async function findCard(req: IReq, res: IRes) {
  const id = req.params.id;
  const cardDetail = await tokenService.find(id);
  return res.status(HttpStatusCodes.OK).json({cardDetail});
}

// **** Export default **** //
export default {
  paths,
  token,
  findCard
} as const;