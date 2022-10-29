import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Dani = new Schema(
    {
        broj: {
            type: Number
        }
    }
)

export default mongoose.model('Dani', Dani, 'dani');