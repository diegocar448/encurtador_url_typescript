import { prop, Typegoose } from '@typegoose/typegoose';
import { MongooseDocument } from 'mongoose';


export class URL extends Typegoose{
    @prop({ required:true })
    hash: any

    @prop({ required:true })
    originURL: any

    @prop({ required:true })
    shortURL: any
}

export const URLModel = new URL().getModelForClass(URL)