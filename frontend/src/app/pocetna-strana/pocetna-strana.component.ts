import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { MyService } from '../my.service';

@Component({
  selector: 'app-pocetna-strana',
  templateUrl: './pocetna-strana.component.html',
  styleUrls: ['./pocetna-strana.component.css']
})
export class PocetnaStranaComponent implements OnInit {
korisnik:Korisnik;
knjige:Knjiga[];
indeks:number;
  constructor(private servis:MyService,private ruter:Router) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
    
    this.servis.dohvSveKnjige().subscribe((knjige:Knjiga[])=>{
      console.log(knjige)
      this.knjige=knjige.sort((a:Knjiga,b:Knjiga)=>{
        return b.brojZaduzivanja.valueOf()-a.brojZaduzivanja.valueOf();
      })
      this.indeks=0;
      console.log(this.korisnik)
    })

  }
  registracija(){
    this.ruter.navigate(['registracija'])
  }
  logovanje(){
    this.ruter.navigate(['login'])
  }
  citalac(){
    this.ruter.navigate(['citalac'])
  }
  currentSlide(i){
    
    this.indeks=i-1;
    console.log(this.indeks)
  }
  trenutnaZaduzenja(){
    this.ruter.navigate(['/zaduzenja']);
  }
  istorijaZaduzivanja(){
    this.ruter.navigate(['/istorijaZaduzivanja'])
  }
  vratiNaPocetnu(){
    this.ruter.navigate([''])
  }
  izlogujSe(){
    localStorage.clear()
    this.ngOnInit()
  }


}
