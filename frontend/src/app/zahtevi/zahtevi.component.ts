import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Zahtev } from '../model/zahtev';
import { MyService } from '../my.service';

@Component({
  selector: 'app-zahtevi',
  templateUrl: './zahtevi.component.html',
  styleUrls: ['./zahtevi.component.css']
})
export class ZahteviComponent implements OnInit {
  korisnik:Korisnik;
  zahtevi:Zahtev[];
  idKnjige:Number;

  constructor(private servis:MyService,private ruter:Router) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'));
    if(this.korisnik.tip=='citalac') this.ruter.navigate([''])
    this.servis.dohvSveZahteve().subscribe((zahtevi:Zahtev[])=>{
      this.zahtevi=zahtevi;
      this.servis.dohvSveKnjige().subscribe((knjige:Knjiga[])=>{
        knjige=knjige.sort((a:Knjiga,b:Knjiga)=>{return a.idKnjige.valueOf()-b.idKnjige.valueOf()})
        for(let i=0;i<knjige.length;i++){
          if(knjige[i].idKnjige>i+1) {this.idKnjige=i+1;return;}
        }
        this.idKnjige=knjige.length+1
      })
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
  prihvati(z){
    this.servis.odobriZahtev(z.korisnickoIme,z.naziv).subscribe(()=>{
    this.servis.dodajKnjigu(this.idKnjige,z.naziv,z.autori,z.izdavac,z.godina,z.jezik,z.slika,z.brojNaStanju,z.zanr).subscribe(()=>{
      this.ngOnInit()
    })})

  }
  odbij(z){
    this.servis.obrisiZahtev(z.korisnickoIme,z.naziv).subscribe(()=>{
      this.ngOnInit()

    })

  }

}
