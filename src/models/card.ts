import * as mongoose from 'mongoose';
import * as validator from 'validator';
import {ICard , CardDoc , cardModelInterface} from '../interfaces/card'

const cardSchema = new mongoose.Schema({
  card_number: {
    type: Number,
    validate: {
      validator: function (card_number: number) {
        if (card_number.toString().length < 13 || card_number.toString().length > 16) {
          return false;
        }
        return luhnCheck(card_number);
      },
      message: 'Numero de tarjeta invalido'
    }
  },
  cvv: {
    type: Number,
    validate: {
      validator: function (cvv: number) {
        if (cvv.toString().length < 3 || cvv.toString().length > 4) {
          return false;
        }
        if (cvv === 123) {
          this.cardType = 'Visa or Mastercard'
        } else if (cvv === 4532) {
          this.cardType = 'Amex'
        } else {
          return false;
        }
        return true;
      },
      message: 'CVV Invalido'
    }
  },
  cardType: {
    type: String,
    default: ''
  },
  tokenJwt: {
    type: String,
    default: ''
  },
  expiration_month: {
    type: String,
    validate: {
      validator: function (expiration_month: string) {
        if (expiration_month.length < 1 || expiration_month.length > 2) {
          return false;
        }
        if (!/^(1[0-2]|0[1-9])$/.test(expiration_month)) {
          return false;
        }
        return true;
      },
      message: 'Mes de expiración Invalida'
    }
  },
  expiration_year: {
    type: String,
    validate: {
      validator: function (expiration_year: string) {
        if (expiration_year.length !== 4) {
          return false;
        }
        if (!/^(202[0-8]|202[0-8])$/.test(expiration_year)) {
          return false;
        }
        return true;
      },
      message: 'Año de expiración Invalida'
    }
  },
  email: {
    type: String,
    validate: {
      validator: function (email: string) {
        if (email.length < 5 || email.length > 100) {
          return false;
        }
        if (!validator.isEmail(email)) {
          return false;
        }
        if (!/^(.*@gmail\.com|.*@hotmail\.com|.*@yahoo\.es)$/.test(email)) {
          return false;
        }
        return true;
      },
      message: 'Email Invalido'
    }
  }
});

const luhnCheck = (card_number: number) => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = card_number.toString().length - 1; i >= 0; i--) {
    let digit = parseInt(card_number.toString().charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit = digit % 10 + 1;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return (sum % 10) === 0;
}

cardSchema.statics.build = (attr:ICard) => {
  return new Card(attr)
}

const Card = mongoose.model<CardDoc,cardModelInterface>('Card', cardSchema);

// **** Export default **** //
export { Card };