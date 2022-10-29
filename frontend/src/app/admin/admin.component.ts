import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Zaduzenje } from '../model/zaduzenje';
import { MyService } from '../my.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  korisnik:Korisnik
  korisnici:Korisnik[]
  zaduzenja:Zaduzenje[]
  knjige:Knjiga[];
  dani:Number;

  constructor(private servis:MyService,private ruter:Router) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('korisnik'));
    if(this.korisnik.tip!='admin') this.ruter.navigate([''])
    this.servis.dohvSveKorisnike().subscribe((korisnici:Korisnik[])=>{
      this.korisnici=korisnici;
      this.servis.dohvSveKnjige().subscribe((knjige:Knjiga[])=>{
        this.knjige=knjige;
        this.servis.dohvSvaZaduzenja().subscribe((zaduzenja:Zaduzenje[])=>{
          this.zaduzenja=zaduzenja;
        })
        
      })
    })

  }
  azurirajKorisnika(i){
    console.log(this.korisnici[i])
    localStorage.setItem('korisnikAzuriranje',JSON.stringify(this.korisnici[i]));
    this.ruter.navigate(['/azuriranjeKorisnika']);

  }
  obrisiKorisnika(i){
    for(let j=0;j<this.zaduzenja.length;j++){
    if(this.zaduzenja[j].datumPovratka=='Knjiga nije vracena'&&this.korisnici[i].korisnickoIme==this.zaduzenja[j].korisnickoIme) return;
    }
    this.servis.obrisiKorisnikovaZaduzenja(this.korisnici[i].korisnickoIme).subscribe(()=>{
      this.servis.obrisiRezervacijeZaKorisnika(this.korisnici[i].korisnickoIme).subscribe(()=>{
        this.servis.obrisiKorisnikoveZahteve(this.korisnici[i].korisnickoIme).subscribe(()=>{
          this.servis.obrisiKorisnika(this.korisnici[i].korisnickoIme).subscribe(()=>{this.ngOnInit()})
          
        })
      })
      
    })
  }
  azurirajKnjigu(i){
    localStorage.setItem('knjigaAzuriranje',JSON.stringify(this.knjige[i]));
    this.ruter.navigate(['/azuriranjeKnjige'])
  }
  obrisiKnjigu(i){
    for(let j=0;j<this.zaduzenja.length;j++){
      if(this.zaduzenja[j].datumPovratka=='Knjiga nije vracena'&&this.knjige[i].idKnjige==this.zaduzenja[j].idKnjige) return;
    }
    this.servis.obrisiZaduzenjaZaKnjigu(this.knjige[i].idKnjige).subscribe(()=>{
      this.servis.obrisiRezervacijeZaKnjigu(this.knjige[i].idKnjige).subscribe(()=>{
        this.servis.obrisiKnjigu(this.knjige[i].idKnjige).subscribe(()=>{
        this.ngOnInit()
      })})
      

    })

  }
  podigniPrivilegije(i){
    if(this.korisnici[i].tip=='citalac'){
      this.servis.azurirajPrivilegije(this.korisnici[i].korisnickoIme,'moderator').subscribe(()=>{
        this.ngOnInit()
      })
    }
    else return;
  }
  spustiPrivilegije(i){
    if(this.korisnici[i].tip=='moderator'){
      this.servis.azurirajPrivilegije(this.korisnici[i].korisnickoIme,'citalac').subscribe(()=>{
        this.ngOnInit()
      })
    }
    else return;

  }
  dodajKnjigu(){
    console.log("DODAJ KNJIGU!")
    this.ruter.navigate(['/dodavanjeKnjige'])
  }
  dodajKorisnika(){
    this.ruter.navigate(['/dodavanjeKorisnika'])
  }
  prihvatiKorisnika(k){
    this.servis.prihvatiKorisnika(k.korisnickoIme).subscribe(()=>{
      this.ngOnInit()
    })
  }
  odbijKorisnika(k){
    this.servis.obrisiKorisnika(k.korisnickoIme).subscribe(()=>{
      this.ngOnInit()
    })
  }
  blokiraj(k){
    this.servis.blokirajKorisnika(k.korisnickoIme).subscribe(()=>{
      this.ngOnInit()
    })
  }
  odblokiraj(k){
    this.servis.odblokirajKorisnika(k.korisnickoIme).subscribe(()=>{
      this.ngOnInit()
    })
  }
  potvrdiBrojDana(){
    this.servis.postaviDane(this.dani).subscribe(()=>{
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
  

}
