import HttpStatusCodes from '../src/declarations/HttpStatusCodes';
import { IReq, IRes } from './shared/types';
// Paths
const paths = {
    basePath: '/v2',
    token: '/token',
} as const;

// **** Types **** //

interface ITarjetaReq {
    email: string;
    card_number: number;
    cvv: number;
    expiration_year: string;
    expiration_month: string;
}

async function token(req: IReq<ITarjetaReq>, res: IRes) {
    console.log('inicio')
    console.log(req.body)
    const { email,card_number,cvv,expiration_year,expiration_month } = req.body;
    // Add jwt to cookie
    // const jwt = await authService.getJwt(email, password);
    // const { key, options } = EnvVars.cookieProps;
    // res.cookie(key, jwt, options);
    // Return
    return res.status(HttpStatusCodes.OK).json({hola:'este es el inicio'});
  }

// **** Export default **** //

export default {
    paths,
    token
  } as const;