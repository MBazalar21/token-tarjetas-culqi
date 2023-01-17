import jwtUtil from '../util/jwt-util';
import {Card} from '../models/card';


interface ICard {
  [x: string]: any;
  card_number: number;
  cvv: number;
  cardType: string;
  expiration_year: string;
  expiration_month: string;
  email: string;
  tokenJwt: string;
}

/**
 * Login a user.
 */
async function getJwt(
    email:string,
    card_number:number,
    cvv:number,
    expiration_year:string,
    expiration_month:string
): Promise<ICard | Object> {
    try {
      const card : ICard = new Card({ card_number, cvv, expiration_month, expiration_year, email });
      const tokenJwt = await jwtUtil.sign({
        email,
        card_number,
        cvv,
        expiration_year,
        expiration_month
      });
      card.tokenJwt = tokenJwt
      const newCard: ICard = await card.save();
      console.log(newCard)
      return card;
    } catch (error) {
      console.log(error)
      console.log(error.message)
      console.log(error._message)
      return {
        type : 'error',
        mensaje: error ? error.message : error._message 
      }
    }
  }
  
  
  // **** Export default **** //
  
  export default {
    getJwt,
  } as const;