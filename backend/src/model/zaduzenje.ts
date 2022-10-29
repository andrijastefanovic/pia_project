import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zaduzenje = new Schema(
    {
        idKnjige: {
            type: Number
        },
        korisnickoIme:{
            type: String
        },
        datumZaduzenja: {
            type:String
        },
        datumPovratka:{
            type:String
        },
        produzeno:{
            type:Boolean
        }
    }
)

export default mongoose.model('Zaduzenje', Zaduzenje, 'zaduzenja');