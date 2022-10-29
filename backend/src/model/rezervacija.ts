import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rezervacija = new Schema(
    {
        idRezervacije: {
            type: Number
        },
        idKnjige: {
            type: Number
        },
        korisnickoIme:{
            type: String
        },
        dostupno:{
            type:Boolean
        }
    }
)

export default mongoose.model('Rezervacija', Rezervacija, 'rezervacije');