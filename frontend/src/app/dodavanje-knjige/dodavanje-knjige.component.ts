import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autor } from '../model/autor';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Zanr } from '../model/zanr';
import { MyService } from '../my.service';

@Component({
  selector: 'app-dodavanje-knjige',
  templateUrl: './dodavanje-knjige.component.html',
  styleUrls: ['./dodavanje-knjige.component.css']
})
export class DodavanjeKnjigeComponent implements OnInit {
  korisnik:Korisnik
  idKnjige:Number;
  naziv:String;
  autori:String;
  izdavac:String;
  godina:Number;
  jezik:String;
  slika:File;
  brojNaStanju:Number;
  zanrovi:String;
  zanroviIzabrani:String[];
  zanroviOpcije:String[]
  constructor(private servis:MyService,private ruter:Router) { }
  dodajSliku(e){
    this.slika=e.target.files[0];
  }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    console.log(this.korisnik)
    this.zanroviOpcije=['klasik','krimi','triler','biznis','psihologija','nauka','naucna fantastika','misterija','drama','religija','biografija']
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    this.servis.dohvSveKnjige().subscribe((knjige:Knjiga[])=>{
      knjige=knjige.sort((a:Knjiga,b:Knjiga)=>{return a.idKnjige.valueOf()-b.idKnjige.valueOf()})
      for(let i=0;i<knjige.length;i++){
        if(knjige[i].idKnjige>i+1) {this.idKnjige=i+1;console.log(i+1);console.log(this.idKnjige);return;}
      }
      console.log(knjige.length+1)
      this.idKnjige=knjige.length+1
      console.log(this.idKnjige)
    })
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
  dodajKnjigu(){
    console.log(this.idKnjige);
    let autori=this.autori.split(', ');
    let zanrovi=this.zanrovi.split(', ');
    let nazivSlike:String;
    let autoriNiz:Autor[]=new Array(autori.length).fill(0);
    for(let i=0;i<autori.length;i++){
      let autor=new Autor();
      autor.ime=autori[i];
      autoriNiz[i]=autor
    }
    let zanroviNiz:Zanr[]=new Array(zanrovi.length).fill(0);
    for(let i=0;i<zanrovi.length;i++){
      let zanr=new Zanr();
      zanr.naziv=zanrovi[i];
      zanroviNiz[i]=zanr
    }
    if(this.slika) nazivSlike=this.slika.name;
    else nazivSlike='default2.png';
    this.servis.dodajKnjigu(this.idKnjige,this.naziv,autoriNiz,this.izdavac,this.godina,this.jezik,nazivSlike,this.brojNaStanju,zanroviNiz).subscribe(()=>{
      if(this.slika) this.servis.uploadSlike(this.slika).subscribe(()=>{})
    })
  }
  dodajZahtevZaDodavanjeKnjige(){
    let autori=this.autori.split(', ');
    let nazivSlike:String;
    let autoriNiz:Autor[]=new Array(autori.length).fill(0);
    for(let i=0;i<autori.length;i++){
      let autor=new Autor();
      autor.ime=autori[i];
      autoriNiz[i]=autor
    }
    let zanroviNiz:Zanr[]=new Array(this.zanroviIzabrani.length).fill(0);
    if(this.zanroviIzabrani.length>3){ console.log("Previse knjiga");return;}
    for(let i=0;i<this.zanroviIzabrani.length;i++){
      let zanr=new Zanr();
      zanr.naziv=this.zanroviIzabrani[i];
      zanroviNiz[i]=zanr
    }
    if(this.slika) nazivSlike=this.slika.name;
    else nazivSlike='default2.png';
    this.servis.dodajZahtevZaDodavanjeKnjige(this.korisnik.korisnickoIme,this.naziv,autoriNiz,this.izdavac,this.godina,this.jezik,nazivSlike,this.brojNaStanju,zanroviNiz).subscribe(()=>{
      if(this.slika) this.servis.uploadSlike(this.slika).subscribe(()=>{})
    })

  }

}
