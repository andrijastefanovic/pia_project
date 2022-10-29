import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dani } from '../model/dani';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Rezervacija } from '../model/rezervacija';
import { Zaduzenje } from '../model/zaduzenje';
import { Zahtev } from '../model/zahtev';
import { Zanr } from '../model/zanr'
import { MyService } from '../my.service';



@Component({
  selector: 'app-citalac',
  templateUrl: './citalac.component.html',
  styleUrls: ['./citalac.component.css']
})
export class CitalacComponent implements OnInit {
  sveKnjige:Knjiga[]
  ocene:Number[]
  izabranaKnjiga:Knjiga
  idIzabraneKnjigeUNizu:Number;
  godine1:Number;
  godine2:Number;
  izdavac:String;
  korisnik:Korisnik;
  tekst:String;
  pretrazeneKnjige:Knjiga[];
  zanrovi:String[];
  izabraniZanrovi:String[];
  zaduzenjeIstice:Boolean;
  zaduzenjeIsteklo:Boolean;
  triKnjigeZaduzene:Boolean;
  dodataKnjiga:Boolean;
  dostupnaKnjiga:Boolean;
  dani:Number;

  constructor(private servis:MyService, private ruter:Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.zaduzenjeIsteklo=false;
    this.zaduzenjeIstice=false;
    this.triKnjigeZaduzene=false;
    this.dodataKnjiga=false;
    this.dostupnaKnjiga=false;
    this.servis.dohvDane().subscribe((dani:Dani)=>{
      this.dani=dani.broj
    })
    this.servis.dohvKorisnikovaAktuelnaZaduzenja(this.korisnik.korisnickoIme).subscribe((zaduzenja:Zaduzenje[])=>{
      if(zaduzenja.length==3) this.triKnjigeZaduzene=true;
      for(let i=0;i<zaduzenja.length;i++){
        if(this.brojDana(zaduzenja[i])>=0&&this.brojDana(zaduzenja[i])<=2) this.zaduzenjeIstice=true
        if(this.brojDana(zaduzenja[i])<0) this.zaduzenjeIsteklo=true


      }
    })
    this.servis.dohvKorisnikoveOdobreneZahteve(this.korisnik.korisnickoIme).subscribe((zahtevi:Zahtev[])=>{
      if(zahtevi.length>0) this.dodataKnjiga=true
    })
    this.servis.dohvSveRezervacije().subscribe((rezervacije:Rezervacija[])=>{
      for(let i=0;i<rezervacije.length;i++){
        if(rezervacije[i].dostupno==true){
          this.dostupnaKnjiga=true;
          this.servis.obrisiRezervacijeZaKnjiguIKorisnika(rezervacije[i].idKnjige,rezervacije[i].korisnickoIme).subscribe(()=>{})        }
      }
    })
    

    this.servis.dohvSveKnjige().subscribe((knjige:Knjiga[])=>{
      this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
      this.sveKnjige=knjige;
      this.zanrovi=Array(0).fill(0)
      let tempOcene:Number[];
      tempOcene=Array(knjige.length).fill(0);
      for(let i=0;i<this.sveKnjige.length;i++){
        for(let k=0;k<this.sveKnjige[i].zanr.length;k++){
        if(!this.zanrovi.includes(this.sveKnjige[i].zanr[k].naziv)){ this.zanrovi.push(this.sveKnjige[i].zanr[k].naziv); }}
        for(let j=0;j<this.sveKnjige[i].recenzije.length;j++){
          tempOcene[i]=tempOcene[i].valueOf()+this.sveKnjige[i].recenzije[j].ocena.valueOf();
        }
        if(this.sveKnjige[i].recenzije.length!=0){
          tempOcene[i]=tempOcene[i].valueOf()/this.sveKnjige[i].recenzije.length;
        }
      }

      
      this.ocene=tempOcene
      let myDate=new Date(Date.now())
      console.log(myDate)
      this.idIzabraneKnjigeUNizu=(myDate.getFullYear()+1)*(myDate.getDay()+1)*(myDate.getDate()+1)%this.sveKnjige.length;
      this.izabranaKnjiga=this.sveKnjige[this.idIzabraneKnjigeUNizu.valueOf()];
    })
   

    }
    detaljiOKnjizi(knjiga){
      if(this.korisnik.blokiran){return;}
      localStorage.setItem('knjiga',JSON.stringify(knjiga));
      this.ruter.navigate(['/knjiga'])
    }
    dodajKnjigu(){
      this.ruter.navigate(['/dodavanjeKnjige']);
    }
    pretrazi(){
      if(!this.tekst) this.tekst=''
      if(this.pretrazeneKnjige){ let len=this.pretrazeneKnjige.length;
      for(let i=0;i<len;i++) this.pretrazeneKnjige.pop()}
      this.servis.dohvKnjigePoNazivuIliAutoru(this.tekst).subscribe((knjige:Knjiga[])=>{
          for(let i=0;i<knjige.length;i++){
            for(let j=0;j<knjige[i].zanr.length;j++){
              if((!this.izabraniZanrovi||this.izabraniZanrovi.includes(knjige[i].zanr[j].naziv))&&(!this.godine1||knjige[i].godina>=this.godine1)
              &&(!this.godine2||knjige[i].godina<=this.godine2)&&(!this.izdavac||this.izdavac==knjige[i].izdavac)){
                if(!this.pretrazeneKnjige){this.pretrazeneKnjige=Array(0).fill(0); this.pretrazeneKnjige.push(knjige[i])}
                else if(!this.pretrazeneKnjige.includes(knjige[i])){this.pretrazeneKnjige.push(knjige[i])}
              }
            }
          }
      })
    }
    trenutnaZaduzenja(){
      this.ruter.navigate(['/zaduzenja']);
    }
    istorijaZaduzivanja(){
      this.ruter.navigate(['/istorijaZaduzivanja'])
    }
    brojDana(zaduzenje){
      let datum=new Date();
      let year=datum.getFullYear().toString();
      let month=(datum.getMonth()+1).toString();
      let day=(datum.getDate()).toString();
      if(month.length!=2)month='0'+month;
      if(day.length!=2)day='0'+day;
      let string=year+'-'+month+'-'+day+'T02:00:00';
      let datum1=new Date(string)
      let datum2=new Date(zaduzenje.datumZaduzenja)
      let diff=datum2.valueOf()-datum1.valueOf()
      let diffDays=Math.ceil(diff / (1000 * 3600 * 24)); 
      diffDays+=this.dani.valueOf();
      if(zaduzenje.produzeno) diffDays+=this.dani.valueOf();
      return diffDays;
    }
    vratiNaPocetnu(){
      this.ruter.navigate([''])
    }
    izlogujSe(){
      localStorage.clear()
      this.ruter.navigate([''])
    }
  }


