import HttpStatusCodes from '../declarations/HttpStatusCodes';
import { IReq, IRes } from './shared/types';
import tokenService from '../services/token-service';
import {Card} from '../models/card';

// Paths
const paths = {
    basePath: '/v2',
    token: '/token',
} as const;

// **** Types **** //

interface ICard {
  save(): ICard;
  card_number: number;
  cvv: number;
  cardType: string;
  expiration_year: string;
  expiration_month: string;
  email: string;
  tokenJwt: string;
}

async function token(req: IReq<ICard>, res: IRes) {
    const { email,card_number,cvv,expiration_year,expiration_month } = req.body;
    const newCard = await tokenService.getJwt(email,card_number,cvv,expiration_year,expiration_month);

    return res.status(HttpStatusCodes.OK).json({newCard});
}

// **** Export default **** //

export default {
    paths,
    token
  } as const;