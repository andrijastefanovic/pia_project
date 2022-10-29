import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Zaduzenje } from '../model/zaduzenje';
import { MyService } from '../my.service';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {
  korisnik:Korisnik;
  zaduzenja:Zaduzenje[];
  zaduzeneKnjige:Knjiga[];

  constructor(private servis:MyService, private ruter:Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    
    this.servis.dohvSvaKorisnikovaZaduzenja(this.korisnik.korisnickoIme).subscribe((zaduzenja:Zaduzenje[])=>{
      this.zaduzenja=zaduzenja;
      let knjige:Knjiga[];
      knjige=Array(this.zaduzenja.length).fill(0);
      for(let i=0;i<this.zaduzenja.length;i++){
        this.servis.dohvKnjigePoId(this.zaduzenja[i].idKnjige).subscribe((knjiga:Knjiga)=>{
          knjige[i]=knjiga;
        })
      }
      this.zaduzeneKnjige=knjige
    })
  }
  detaljiOKnjizi(knjiga){
    localStorage.setItem('knjiga',JSON.stringify(knjiga));
    this.ruter.navigate(['/knjiga'])
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
  sortirajPoNazivu(){
    for(let i=0;i<this.zaduzenja.length-1;i++){
      for(let j=i+1;j<this.zaduzenja.length;j++){
        if(this.zaduzeneKnjige[i].naziv.toString().localeCompare(this.zaduzeneKnjige[j].naziv.toString())>0){
          let tmp1=this.zaduzeneKnjige[i];
          this.zaduzeneKnjige[i]=this.zaduzeneKnjige[j];
          this.zaduzeneKnjige[j]=tmp1;
          let tmp2=this.zaduzenja[i];
          this.zaduzenja[i]=this.zaduzenja[j];
          this.zaduzenja[j]=tmp2

        }
      }

    }
  }
  sortirajPoPrvomAutoru(){
    for(let i=0;i<this.zaduzenja.length-1;i++){
      for(let j=i+1;j<this.zaduzenja.length;j++){
        let autor1=this.zaduzeneKnjige[i].autori[0].ime.split(' ');
        let autorPrezime1=autor1[1];
        let autor2=this.zaduzeneKnjige[j].autori[0].ime.split(' ');
        let autorPrezime2=autor2[1];
        if(autorPrezime1.toString().localeCompare(autorPrezime2.toString())>0){
          let tmp1=this.zaduzeneKnjige[i];
          this.zaduzeneKnjige[i]=this.zaduzeneKnjige[j];
          this.zaduzeneKnjige[j]=tmp1;
          let tmp2=this.zaduzenja[i];
          this.zaduzenja[i]=this.zaduzenja[j];
          this.zaduzenja[j]=tmp2
        }
      }

    }
  }
  sortirajPoDatumuZaduzivanja(){
    for(let i=0;i<this.zaduzenja.length-1;i++){
      for(let j=i+1;j<this.zaduzenja.length;j++){
        let datum1=new Date(this.zaduzenja[i].datumZaduzenja.toString())
        let datum2=new Date(this.zaduzenja[j].datumZaduzenja.toString())
        if(datum1.valueOf()-datum2.valueOf()>0){
          let tmp1=this.zaduzeneKnjige[i];
          this.zaduzeneKnjige[i]=this.zaduzeneKnjige[j];
          this.zaduzeneKnjige[j]=tmp1;
          let tmp2=this.zaduzenja[i];
          this.zaduzenja[i]=this.zaduzenja[j];
          this.zaduzenja[j]=tmp2

        }
      }

    }
  }
  sortirajPoDatumuPovratka(){
    for(let i=0;i<this.zaduzenja.length-1;i++){
      for(let j=i+1;j<this.zaduzenja.length;j++){
        let datum1=new Date(this.zaduzenja[i].datumPovratka.toString())
        let datum2=new Date(this.zaduzenja[j].datumPovratka.toString())
        if(datum1.valueOf()-datum2.valueOf()>0){
          let tmp1=this.zaduzeneKnjige[i];
          this.zaduzeneKnjige[i]=this.zaduzeneKnjige[j];
          this.zaduzeneKnjige[j]=tmp1;
          let tmp2=this.zaduzenja[i];
          this.zaduzenja[i]=this.zaduzenja[j];
          this.zaduzenja[j]=tmp2

        }
      }

    }
  }

}
