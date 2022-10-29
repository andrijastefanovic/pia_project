import { Autor } from "./autor";
import { Recenzija } from "./recenzija";
import { Zanr } from "./zanr";

export class Zahtev{
    korisnickoIme:String;
    naziv:String;
    autori:Array<Autor>;
    izdavac:String;
    godina:Number;
    jezik:String;
    slika:String;
    brojNaStanju:Number;
    zanr:Array<Zanr>;
    odobren:Boolean;
}