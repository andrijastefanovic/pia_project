import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Knjiga = new Schema(
    {
        idKnjige: {
            type: Number
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
        brojZaduzivanja:{
            type:Number
        },
        brojNaStanju:{
            type:Number
        },
        zanr: {
            type: Array
        },
        recenzije:{
            type:Array
        },
        blokiran:{
            type:Boolean
        }
    }
)

export default mongoose.model('Knjiga', Knjiga, 'knjige');