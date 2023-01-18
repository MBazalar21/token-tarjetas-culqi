import jsonwebtoken from 'jsonwebtoken';
import { RouteError } from '../declarations/classes';
import HttpStatusCodes from '../declarations/HttpStatusCodes';
import { ICardService } from '../interfaces/card'

// Errors
export const errors = {
  unauth: 'Unauthorized',
  tokenNotFound: () => `No se encontro comercio`,
} as const;

// Options
const options = {
  expiresIn: '60000',
};

/**
 * Encrypt data and return jwt.
 */
function sign(data: string | object | Buffer,token: string): Promise<string> {
  if(token !== process.env.TOKEN_COMERCIO){
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      errors.tokenNotFound(),
    );
  }
  return new Promise((res, rej) => {
    jsonwebtoken.sign(data, process.env.TOKEN_COMERCIO, options, (err, token) => {
      return err ? rej(err) : res(token || '');
    });
  });
}

function verify(data: string): Promise<string | ICardService | Object> {
  return new Promise((res, rej) => {
    jsonwebtoken.verify(data, process.env.TOKEN_COMERCIO, (err, card) => {
      return err ? rej(err) : res(card || '');
    });
  });
}

// **** Export default **** //

export default {
  sign,
  verify
} as const;