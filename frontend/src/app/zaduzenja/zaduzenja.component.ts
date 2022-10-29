import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dani } from '../model/dani';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Rezervacija } from '../model/rezervacija';
import { Zaduzenje } from '../model/zaduzenje';
import { MyService } from '../my.service';

@Component({
  selector: 'app-zaduzenja',
  templateUrl: './zaduzenja.component.html',
  styleUrls: ['./zaduzenja.component.css']
})
export class ZaduzenjaComponent implements OnInit {
  korisnik:Korisnik;
  zaduzenja:Zaduzenje[];
  zaduzeneKnjige:Knjiga[];
  dani:Number;
  brojTrenutnoZaduzenih:number
  constructor(private servis:MyService, private ruter:Router) { }

  ngOnInit(): void {
    this.brojTrenutnoZaduzenih=0;
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.servis.dohvDane().subscribe((dani:Dani)=>{
      this.dani=dani.broj;
    })
    this.servis.dohvSvaKorisnikovaZaduzenja(this.korisnik.korisnickoIme).subscribe((zaduzenja:Zaduzenje[])=>{
      this.zaduzenja=zaduzenja;
      let knjige:Knjiga[];
      knjige=Array(this.zaduzenja.length).fill(0);
      for(let i=0;i<this.zaduzenja.length;i++){
        if(this.zaduzenja[i].datumPovratka=='Knjiga nije vracena') this.brojTrenutnoZaduzenih++;
        this.servis.dohvKnjigePoId(this.zaduzenja[i].idKnjige).subscribe((knjiga:Knjiga)=>{
          knjige[i]=knjiga;
        })
      }
      this.zaduzeneKnjige=knjige
    })
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
  detaljiOKnjizi(knjiga){
    localStorage.setItem('knjiga',JSON.stringify(knjiga));
    this.ruter.navigate(['/knjiga'])
  }
  produzi(zaduzenje){
    this.servis.produziZaduzenje(zaduzenje.idKnjige,zaduzenje.korisnickoIme,zaduzenje.datumZaduzenja,zaduzenje.datumPovratka).subscribe(()=>{
      this.ngOnInit()
    })
  }
  razduziKnjigu(i){
    let datum=new Date();
    let year=datum.getFullYear().toString();
    let month=(datum.getMonth()+1).toString();
    let day=(datum.getDate()).toString();
    let indeks=-1;
    let nemaPrekoracenja=true
    if(month.length!=2)month='0'+month;
    if(day.length!=2)day='0'+day;
    let datumPovratka=year+'-'+month+'-'+day;
    this.servis.dohvSveRezervacije().subscribe((rezervacije:Rezervacija[])=>{
     this.servis.dohvSvaZaduzenja().subscribe((zaduzenja:Zaduzenje[])=>{
      let rezervacijeNiz=rezervacije.sort((a,b)=>{
        return a.idRezervacije.valueOf()-b.idRezervacije.valueOf()
      })
      for(let j=0;j<rezervacijeNiz.length;j++){
        console.log(rezervacijeNiz[j].idKnjige+" "+indeks+" "+this.zaduzeneKnjige[i].idKnjige)
        if(rezervacijeNiz[j].idKnjige==this.zaduzeneKnjige[i].idKnjige&&indeks==-1){
          let brojTrenutno=0;
          console.log(brojTrenutno)
          for(let k=0;k<zaduzenja.length;k++){
            if(zaduzenja[k].korisnickoIme==rezervacijeNiz[j].korisnickoIme&&zaduzenja[k].datumPovratka=='Knjiga nije vracena'&&
            this.brojDana(zaduzenja[k])<0) nemaPrekoracenja=false;
            if(zaduzenja[k].korisnickoIme==rezervacijeNiz[j].korisnickoIme&&zaduzenja[k].datumPovratka=='Knjiga nije vracena'&&
            this.brojDana(zaduzenja[k])>=0) brojTrenutno++;

          }
          console.log(nemaPrekoracenja);
          console.log(brojTrenutno)
          if(nemaPrekoracenja&&brojTrenutno<3) indeks=j
          nemaPrekoracenja=true;
        }
      }
      if(indeks!=-1){
        this.servis.dostupnaKnjiga(rezervacijeNiz[indeks].idRezervacije).subscribe(()=>{
          let datum2=new Date();
          let year2=datum2.getFullYear().toString();
          let month2=(datum2.getMonth()+1).toString();
          let day2=(datum2.getDate()).toString();
          if(month2.length!=2)month2='0'+month2;
          if(day2.length!=2)day2='0'+day2;
          let datumZaduzenja=year2+'-'+month2+'-'+day2;
          console.log(rezervacijeNiz[indeks].idKnjige+' '+rezervacijeNiz[indeks].korisnickoIme+' '+datumZaduzenja)
          this.servis.dodajZaduzenje(rezervacijeNiz[indeks].idKnjige,rezervacijeNiz[indeks].korisnickoIme,datumZaduzenja).subscribe(()=>{
            this.servis.zaduziKnjigu(rezervacijeNiz[indeks].idKnjige).subscribe((knjiga:Knjiga)=>{
              this.ngOnInit()
            })
            
          })
        })
      }
     })
     
      
      
    })
    this.servis.razduziKnjiguZaduzenje(this.zaduzeneKnjige[i].idKnjige,this.korisnik.korisnickoIme,this.zaduzenja[i].datumZaduzenja,datumPovratka).subscribe(()=>{
      this.servis.razduziKnjigu(this.zaduzeneKnjige[i].idKnjige).subscribe(()=>{})
    })
  }
  vratiNaPocetnu(){
    this.ruter.navigate([''])
  }
  izlogujSe(){
    localStorage.clear()
    this.ruter.navigate([''])
  }
  istorijaZaduzivanja(){
    this.ruter.navigate(['/istorijaZaduzivanja'])
  }
  trenutnaZaduzenja(){
    this.ruter.navigate(['/zaduzenja']);
  }


}
