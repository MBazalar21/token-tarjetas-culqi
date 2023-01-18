import HttpStatusCodes from '../declarations/HttpStatusCodes';
import jwtUtil from '../util/jwt-util';
import { Card } from '../models/card';
import { ICard,ICardService } from '../interfaces/card'
import { RouteError } from '../declarations/classes';
import mongoose from 'mongoose';

export const errors = {
  unauth: 'Unauthorized',
  tokenNotFound: () => `No se encontro token de acceso`,
} as const;
/**
 * Login a user.
 */
async function getJwt(
    email:string,
    card_number:number,
    cvv:number,
    expiration_year:string,
    expiration_month:string,
    token:string
): Promise<ICardService | Object> {
  try {
    if(!token){
      throw new RouteError(
        HttpStatusCodes.UNAUTHORIZED,
        errors.tokenNotFound(),
      );
    }
    const card : ICardService = new Card({ card_number, cvv, expiration_month, expiration_year, email });
    const tokenJwt = await jwtUtil.sign({
      email,
      card_number,
      cvv,
      expiration_year,
      expiration_month,
    },token);
    card.tokenJwt = tokenJwt
    const newCard: ICardService = await card.save();
    return newCard;
  } catch (error) {
    return {
      type : 'error',
      mensaje: error ? error.message : error._message 
    }
  }
}
  
async function find(
  id: string
): Promise<Object> {
  try {
    const objectid = new mongoose.Types.ObjectId(id)
    const findCard = await Card.findOne({
      _id: objectid
    })
    const verificarToken: any = await jwtUtil.verify(findCard.tokenJwt)
    return {
      card_number : verificarToken.card_number,
      expiration_year : verificarToken.expiration_year,
      expiration_month : verificarToken.expiration_month,
      email : verificarToken.email,
    }
  } catch (error) {
    return {
      type : 'error',
      mensaje: error ? (error.message == 'jwt expired' ? 'El usuario excedio el tiempo utilizado con su tarjeta, vuelva intentarlo.' : error.message ) : error._message 
    }
  }
}
// **** Export default **** //
  
export default {
  getJwt,
  find
} as const;