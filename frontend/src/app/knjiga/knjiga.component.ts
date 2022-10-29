import { Component, OnInit} from '@angular/core';
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
  selector: 'app-knjiga',
  templateUrl: './knjiga.component.html',
  styleUrls: ['./knjiga.component.css']
})
export class KnjigaComponent implements OnInit {
  korisnik:Korisnik
  knjiga:Knjiga
  knjigeNaZaduzenju:Knjiga[];
  svaZaduzenja:Zaduzenje[]
  ovaKnjigaZaduzena:boolean
  istekaoRok:boolean;
  ocena:Number;
  greska:String;
  greska2:String;
  komentar:String;
  ocenaMoja:String;
  naziv:String;
  autori:String;
  izdavac:String;
  godina:Number;
  jezik:String;
  slika:File;
  brojNaStanju:Number;
  zanrovi:String;
  azurirajRecenziju:Boolean;
  azuriraj:String;
  idRezervacije:number;
  dani:Number

  constructor(private servis:MyService, private ruter:Router) { }
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
  ngOnInit(): void {
    this.servis.dohvDane().subscribe((dani:Dani)=>{
      this.dani=dani.broj
    })
    this.idRezervacije=1;
    this.azurirajRecenziju=false
    this.ovaKnjigaZaduzena=false;
    this.istekaoRok=false;
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.knjiga=JSON.parse(localStorage.getItem('knjiga'));
    this.knjiga.recenzije=this.knjiga.recenzije.sort((a,b)=>{
      let date1=new Date(a.datumIVreme.toString());
      let date2=new Date(b.datumIVreme.toString())
      return date2.valueOf()-date1.valueOf();
    })
    this.servis.dohvSveRezervacije().subscribe((rezervacije:Rezervacija[])=>{
      rezervacije.sort((a,b)=>{
        return b.idRezervacije.valueOf()-a.idRezervacije.valueOf()
      })
      if(rezervacije.length!=0){ this.idRezervacije=rezervacije[0].idRezervacije.valueOf();this.idRezervacije++;}
    })
    this.servis.dohvSvaKorisnikovaZaduzenja(this.korisnik.korisnickoIme).subscribe((zaduzenja:Zaduzenje[])=>{
      this.svaZaduzenja=zaduzenja;
      let brojTrenutnihZaduzenja=0;
      for(let i=0;i<zaduzenja.length;i++){
        if(zaduzenja[i].datumPovratka=='Knjiga nije vracena') brojTrenutnihZaduzenja++;
      }
      this.knjigeNaZaduzenju=Array(brojTrenutnihZaduzenja).fill(0)
      brojTrenutnihZaduzenja=0;
      for(let i=0;i<zaduzenja.length;i++){
        this.servis.dohvKnjigePoId(zaduzenja[i].idKnjige).subscribe((knjiga:Knjiga)=>{
          if(zaduzenja[i].datumPovratka=='Knjiga nije vracena'){this.knjigeNaZaduzenju[brojTrenutnihZaduzenja]=knjiga;
            if(this.knjigeNaZaduzenju[brojTrenutnihZaduzenja].idKnjige==this.knjiga.idKnjige) this.ovaKnjigaZaduzena=true;}
          brojTrenutnihZaduzenja++;
         
        })
        
      }
      for(let i=0;i<this.knjigeNaZaduzenju.length;i++){
        if(this.knjigeNaZaduzenju[i].idKnjige==this.knjiga.idKnjige) this.ovaKnjigaZaduzena=true;
    }
    for(let i=0;i<this.svaZaduzenja.length;i++){
      if(this.svaZaduzenja[i].datumPovratka=='Knjiga nije vracena'){
        if(this.brojDana(this.svaZaduzenja[i].datumZaduzenja)<0) this.istekaoRok=true;
        
      } 
    }
      })
      let ocene:number;
      ocene=-1;
      if(this.knjiga.recenzije.length!=0) ocene++;
      for(let i=0;i<this.knjiga.recenzije.length;i++){
        ocene+=this.knjiga.recenzije[i].ocena.valueOf();
      }
      if(ocene!=-1)this.ocena=ocene/=this.knjiga.recenzije.length;
      
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
  zaduzi(){
    if (this.istekaoRok){
      this.greska='Imate knjigu za koju je istekao rok za vracanje!'
    }
    else if(this.knjigeNaZaduzenju.length>3){
      this.greska='Imate vise od 3 zaduzene knjige!'
    }
    else{
    let datum=new Date();
    let year=datum.getFullYear().toString();
    let month=(datum.getMonth()+1).toString();
    let day=(datum.getDate()).toString();
    if(month.length!=2)month='0'+month;
    if(day.length!=2)day='0'+day;
    let string=year+'-'+month+'-'+day;
    this.servis.dodajZaduzenje(this.knjiga.idKnjige,this.korisnik.korisnickoIme,string).subscribe(()=>{
      this.servis.zaduziKnjigu(this.knjiga.idKnjige).subscribe((knjiga:Knjiga)=>{
        localStorage.setItem('knjiga',JSON.stringify(knjiga))
        console.log("3")
        this.ngOnInit()
      })
    })}
  }
  recenzija(){
    for(let i=0;i<this.knjiga.recenzije.length;i++){
    if(this.knjiga.recenzije[i].korisnickoIme==this.korisnik.korisnickoIme){ this.greska2='Vec ste ostavili recenziju';return}
    }
    let citaoKnjigu=false;
    for(let i=0;i<this.svaZaduzenja.length;i++){
      if(this.svaZaduzenja[i].idKnjige==this.knjiga.idKnjige){
        citaoKnjigu=true;
        let ocenaMoja=Number(this.ocenaMoja)
        if(!this.ocenaMoja||Number(this.ocenaMoja)==0){this.greska2='Unesite ocenu!';return;}
        if(this.komentar.length>1000){this.greska2='Komentar je duzi od 1000 karaktera!';return;}
        if(!this.komentar||this.komentar.length==0){this.greska2='Niste ostavili komentar!';return;}
        this.greska2='';
        let datum=new Date();
      let year=datum.getFullYear().toString();
      let month=(datum.getMonth()+1).toString();
      let day=(datum.getDate()).toString();
      let hour=(datum.getHours()).toString();
      let minutes=(datum.getMinutes()).toString();
      let seconds=(datum.getSeconds()).toString()
      if(month.length!=2)month='0'+month;
      if(day.length!=2)day='0'+day;
      if(hour.length!=2)hour='0'+hour;
      if(minutes.length!=2)minutes='0'+minutes;
      if(seconds.length!=2)seconds='0'+seconds;
      let string=year+'-'+month+'-'+day+" "+hour+":"+minutes+':'+seconds;
      this.servis.dodajRecenziju(this.knjiga.idKnjige,ocenaMoja,this.komentar,this.korisnik.korisnickoIme,string).subscribe(()=>{
        this.servis.dohvKnjigePoId(this.knjiga.idKnjige).subscribe((knjiga:Knjiga)=>{
          
          localStorage.setItem('knjiga',JSON.stringify(knjiga))
          console.log("4")
          this.ngOnInit()
        })})
      }
      
    }
    if(!citaoKnjigu) this.greska2='Ne mozete oceniti knjigu koju niste procitali!';
      
  }
  azuriranjeRecenzije(){
    this.azurirajRecenziju=true;
  }
  potvrdiAzuriranje(m){
    this.servis.azurirajKomentar(this.knjiga.idKnjige,m.korisnickoIme,this.azuriraj).subscribe((knjiga:Knjiga)=>{
     this.servis.dohvKnjigePoId(this.knjiga.idKnjige).subscribe((knjiga:Knjiga)=>{
      localStorage.setItem('knjiga',JSON.stringify(knjiga))
      console.log('5')
      this.ngOnInit()
     }) 
      
      
    })
  }
  rezervisi(){
    this.servis.dodajRezervaciju(this.idRezervacije,this.knjiga.idKnjige,this.korisnik.korisnickoIme).subscribe(()=>{

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
