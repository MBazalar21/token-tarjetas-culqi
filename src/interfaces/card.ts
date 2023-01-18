import * as mongoose from 'mongoose';

export interface ICard {
    save(): ICard;
    card_number: number;
    cvv: number;
    cardType: string;
    expiration_year: string;
    expiration_month: string;
    email: string;
    tokenJwt: string;
}

export interface CardDoc  extends mongoose.Document {
    card_number: number;
    cvv: number;
    cardType: string;
    expiration_year: string;
    expiration_month: string;
    email: string;
    tokenJwt: string;
}

export interface cardModelInterface extends mongoose.Model<CardDoc> {
    build(attr: ICard) : CardDoc
}

export interface ICardService {
    [x: string]: any;
    card_number: number;
    cvv: number;
    cardType: string;
    expiration_year: string;
    expiration_month: string;
    email: string;
    tokenJwt: string;
}
