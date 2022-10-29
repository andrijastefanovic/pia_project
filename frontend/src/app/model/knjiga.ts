import { Autor } from "./autor";
import { Recenzija } from "./recenzija";
import { Zanr } from "./zanr";

export class Knjiga{
    idKnjige:Number;
    naziv:String;
    autori:Array<Autor>;
    izdavac:String;
    godina:Number;
    jezik:String;
    slika:String;
    brojZaduzivanja:Number;
    brojNaStanju:Number;
    zanr:Array<Zanr>;
    recenzije:Array<Recenzija>;
}