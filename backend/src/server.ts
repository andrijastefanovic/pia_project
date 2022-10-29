import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import backendRouter from './routes/backend.router';
const mul=require('multer');
var bodyParser = require('body-parser')

bodyParser.json()
let st = mul.diskStorage({
    destination: (req, file, callback)=> {
        
      callback(null, '../frontend/src/assets');
    },
    filename: (req, file, callback)=> {
       
      callback(null, file.originalname);
      
    }
  });
let up = mul({ storage: st });

const app = express();
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/bibliotekaProjekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})
const router = express.Router();
router.use('/backend', backendRouter);
app.use('/', router);
app.post('/uploadSlike',up.single('Slika'),(req,res)=>{
    res.send();
})
app.listen(4000, () => console.log(`Express server running on port 4000`));