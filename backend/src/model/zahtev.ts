import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zahtev = new Schema(
    {
        korisnickoIme: {
            type: String
        },
        naziv: {
            type: String
        },
        autori:{
            type:Array
        },
        izdavac: {
            type: String
        },
        godina: {
            type: Number
        },
        jezik: {
            type: String
        },
        slika:{
            type:String
        },
        brojNaStanju:{
            type:Number
        },
        zanr: {
            type: Array
        },
        odobren:{
            type:Boolean
        }
    }
)

export default mongoose.model('Zahtev', Zahtev, 'zahtevi');