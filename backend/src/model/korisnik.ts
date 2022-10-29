import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema(
    {
        korisnickoIme: {
            type: String
        },
        lozinka: {
            type: String
        },
        ime:{
            type:String
        },
        prezime: {
            type: String
        },
        adresa: {
            type: String
        },
        telefon: {
            type: String
        },
        imejl:{
            type:String
        },
        slika:{
            type:String
        },
        obradjen:{
            type:Boolean
        },
        tip: {
            type: String
        },
        blokiran: {
            type:Boolean
        }
    }
)

export default mongoose.model('Korisnik', Korisnik, 'korisnici');