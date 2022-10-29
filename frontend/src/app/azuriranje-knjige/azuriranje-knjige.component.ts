import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autor } from '../model/autor';
import { Dani } from '../model/dani';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Rezervacija } from '../model/rezervacija';
import { Zaduzenje } from '../model/zaduzenje';
import { Zanr } from '../model/zanr';
import { MyService } from '../my.service';

@Component({
  selector: 'app-azuriranje-knjige',
  templateUrl: './azuriranje-knjige.component.html',
  styleUrls: ['./azuriranje-knjige.component.css']
})
export class AzuriranjeKnjigeComponent implements OnInit {
  knjiga:Knjiga;
  korisnik:Korisnik
  naziv:String;
  autori:String;
  izdavac:String;
  godina:Number;
  jezik:String;
  slika:File;
  brojNaStanju:Number;
  zanrovi:String;
  dani:Number;
  constructor(private servis:MyService,private ruter:Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.knjiga=JSON.parse(localStorage.getItem('knjiga'));
    this.servis.dohvDane().subscribe((dani:Dani)=>{
      this.dani=dani.broj
    })
    if(this.korisnik.tip!='admin') this.ruter.navigate([''])
  }
  dodajSliku(e){
    this.slika=e.target.files[0];
  }
  azurirajKnjigu(){
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
    this.servis.azurirajKnjigu(this.knjiga.idKnjige,this.naziv,autoriNiz,this.izdavac,this.godina,this.jezik,nazivSlike,this.brojNaStanju,zanroviNiz).subscribe(()=>{
      this.servis.dohvKnjigePoId(this.knjiga.idKnjige).subscribe((knjiga:Knjiga)=>{
        
        if(knjiga.brojNaStanju>0){
          let indeksi=new Array(knjiga.brojNaStanju).fill(-1)
          let brojIndeksa=0
          this.servis.dohvSveRezervacije().subscribe((rezervacije:Rezervacija[])=>{
            this.servis.dohvSvaZaduzenja().subscribe((zaduzenja:Zaduzenje[])=>{
             let rezervacijeNiz=rezervacije.sort((a,b)=>{
               return a.idRezervacije.valueOf()-b.idRezervacije.valueOf()
             })
             for(let j=0;j<rezervacijeNiz.length;j++){
               if(rezervacijeNiz[j].idKnjige==knjiga.idKnjige&&indeksi[knjiga.brojNaStanju.valueOf()-1]==-1){
                 let brojTrenutno=0;
                 let nemaPrekoracenja=true;
                 for(let k=0;k<zaduzenja.length;k++){
                   if(zaduzenja[k].korisnickoIme==rezervacijeNiz[j].korisnickoIme&&zaduzenja[k].datumPovratka=='Knjiga nije vracena'&&
                   this.brojDana(zaduzenja[k])<0) nemaPrekoracenja=false;
                   if(zaduzenja[k].korisnickoIme==rezervacijeNiz[j].korisnickoIme&&zaduzenja[k].datumPovratka=='Knjiga nije vracena'&&
                   this.brojDana(zaduzenja[k])>=0) brojTrenutno++;
       
                 }
                 if(nemaPrekoracenja&&brojTrenutno<3){ indeksi[brojIndeksa]=j;brojIndeksa++;}
                 nemaPrekoracenja=true;
               }
             }
             for(let k=0;k<brojIndeksa;k++){
             
               this.servis.dostupnaKnjiga(rezervacijeNiz[indeksi[k].valueOf()].idRezervacije).subscribe(()=>{
                 let datum2=new Date();
                 let year2=datum2.getFullYear().toString();
                 let month2=(datum2.getMonth()+1).toString();
                 let day2=(datum2.getDate()).toString();
                 if(month2.length!=2)month2='0'+month2;
                 if(day2.length!=2)day2='0'+day2;
                 let datumZaduzenja=year2+'-'+month2+'-'+day2;
                 this.servis.dodajZaduzenje(rezervacijeNiz[indeksi[k].valueOf()].idKnjige,rezervacijeNiz[indeksi[k].valueOf()].korisnickoIme,datumZaduzenja).subscribe(()=>{
                  this.servis.zaduziKnjigu(rezervacijeNiz[indeksi[k].valueOf()].idKnjige).subscribe((knjiga:Knjiga)=>{
                    localStorage.setItem('knjiga', JSON.stringify(knjiga))
                    if(this.slika) this.servis.uploadSlike(this.slika).subscribe(()=>{})
                    
                    
                  }) 
                  
                 })
               })
             }
            })
            
             
             
           })
        }
        else{
          if(this.slika) this.servis.uploadSlike(this.slika).subscribe(()=>{})
          

        }

        
        
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
}
