import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { MyService } from '../my.service';

@Component({
  selector: 'app-azuriranje-korisnika',
  templateUrl: './azuriranje-korisnika.component.html',
  styleUrls: ['./azuriranje-korisnika.component.css']
})
export class AzuriranjeKorisnikaComponent implements OnInit {
korisnikAzuriranje:Korisnik;
korisnik:Korisnik;
korisnickoIme:String;
lozinka1:String;
lozinka2:String;
adresa:String;
telefon:String;
imejl:String;
greska:String;
ime:String;
prezime:String;
slika:File;

  constructor(private servis:MyService,private ruter:Router) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.korisnikAzuriranje=JSON.parse(localStorage.getItem('korisnikAzuriranje'))
    console.log(this.korisnikAzuriranje)
    if(this.korisnik.tip!='admin') this.ruter.navigate([''])

  }
azuriraj(){
const reg1 = new RegExp(/^((^([A-Z])|(^[a-z])(?=.*[A-Z]))(?=.*\d)(?=.*[@$!%*#?&\.])).{7,11}$/);
const reg2=new RegExp(/[0-9+/ ]+/);
const reg3=new RegExp(/[A-Z][A-Za-z ]+[0-9]+[,][ ][A-Z][A-Za-z ]+/)
if (this.lozinka1&&!reg1.test(this.lozinka1.toString())){
  this.greska='Lozinka mora da pocinje slovom, mora da ima 8-12 karaktera, mora da ima bar jedan broj, bar jedno veliko slovo i bar jedan specijalni karakter!';return;
}
if(this.telefon&&!reg2.test(this.telefon.toString())){
  this.greska='Telefon nije upisan u odgovarajucem formatu';return;
}
if(this.adresa&&!reg3.test(this.adresa.toString())){
  this.greska='Adresa nije upisana u odgovarajucem formatu';return;
}
if(this.lozinka1!=this.lozinka2){ this.greska='Lozinke nisu iste!';return;}

  let nazivSlike:String;
  if(this.slika) nazivSlike=this.slika.name;
  else nazivSlike='default.png';
  this.servis.dohvKorisnikaPoKorisnickomImenu(this.korisnickoIme).subscribe((korisnik:Korisnik)=>{
  if (korisnik&&this.korisnikAzuriranje.korisnickoIme!=korisnik.korisnickoIme){this.greska='Korisnicko ime je zauzeto';return;} 
  this.servis.dohvKorisnikaPoImejlu(this.imejl).subscribe((korisnik:Korisnik)=>{
  if(korisnik&&this.korisnikAzuriranje.imejl!=korisnik.imejl){this.greska='Vec postoji nalog sa ovom imejl adresom';return;}
  if(this.korisnikAzuriranje.korisnickoIme!=this.korisnickoIme){
    this.servis.azurirajKorisnickoImeZaduzenja(this.korisnikAzuriranje.korisnickoIme,this.korisnickoIme).subscribe(()=>{})
    this.servis.azurirajKorisnickoImeRezervacije(this.korisnikAzuriranje.korisnickoIme,this.korisnickoIme).subscribe(()=>{})
    this.servis.azurirajKorisnickoImeZahtevi(this.korisnikAzuriranje.korisnickoIme,this.korisnickoIme).subscribe(()=>{})
  }
  console.log(this.korisnikAzuriranje);
  this.servis.azurirajKorisnika(this.korisnikAzuriranje.korisnickoIme,this.korisnickoIme,this.lozinka1,this.ime,this.prezime,this.adresa,this.telefon,this.imejl,nazivSlike).subscribe((korisnik:Korisnik)=>{
  console.log(korisnik)
    this.korisnikAzuriranje=korisnik;
   localStorage.setItem('korisnikAzuriranje',JSON.stringify(this.korisnikAzuriranje))
    if(this.slika)this.servis.uploadSlike(this.slika).subscribe(()=>{
   })
  
  })
})
})

}
dodajSliku(e){
  this.slika=e.target.files[0];
}
vratiNaPocetnu(){
  this.ruter.navigate([''])
}
izlogujSe(){
  localStorage.clear()
  this.ruter.navigate([''])
}
trenutnaZaduzenja(){
  this.ruter.navigate(['/zaduzenja']);
}
istorijaZaduzivanja(){
  this.ruter.navigate(['/istorijaZaduzivanja'])
}
}
