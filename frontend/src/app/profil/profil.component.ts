import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, BarElement, BarController,CategoryScale} from 'chart.js'
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { MyService } from '../my.service';
import { Knjiga } from '../model/knjiga';
import { Zaduzenje } from '../model/zaduzenje';
import { Dani } from '../model/dani';
Chart.register(
  LinearScale,
  BarElement,
  BarController,
  CategoryScale
)

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
korisnik:Korisnik;
edit:Boolean;
korisnickoIme:String;
staraLozinka:String;
lozinka1:String;
lozinka2:String;
adresa:String;
telefon:String;
imejl:String;
greska:String;
ime:String;
prezime:String;
slika:File;
svaZaduzenja:Zaduzenje[]
sveZaduzeneKnjige:Knjiga[];
dani:Number
  constructor(private servis:MyService, private ruter:Router) { }

  ngOnInit(): void {
    
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.edit=false;
    this.servis.dohvDane().subscribe((dani:Dani)=>{
      this.dani=dani.broj
      this.servis.dohvSveKnjige().subscribe((knjige:Knjiga[])=>{
        this.servis.dohvSvaKorisnikovaZaduzenja(this.korisnik.korisnickoIme).subscribe((zaduzenja:Zaduzenje[])=>{
          let broj=0;
          let zanrovi=new Array(0).fill(0);
          let ukupanBroj=new Array(0).fill(0);
          for(let i=0;i<zaduzenja.length;i++){
            if((this.dani.valueOf()-this.brojDana(zaduzenja[i]))<365){
              broj++;
              for(let j=0;j<knjige.length;j++){
                if(knjige[j].idKnjige==zaduzenja[i].idKnjige){
                  for(let k=0;k<knjige[j].zanr.length;k++){
                  let index=zanrovi.findIndex((zanr)=>{return zanr==knjige[j].zanr[k].naziv});
                  
                  if(index==-1){zanrovi.push(knjige[j].zanr[k].naziv);ukupanBroj.push(1)}
                  ukupanBroj[index]++;
                }
  
                }
              }
    
    
            }
          }
          
          const myChart1 = new Chart('myChart1', {
            type: 'bar',
            data: {
                labels: zanrovi,
                datasets: [{
                    label: 'Broj iznajmljenih knjiga po zanrovima',
                    data: ukupanBroj,
                    backgroundColor: [
                        
                    ],
                    borderColor: [
                       
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        const myChart2 = new Chart('myChart2', {
          type: 'bar',
          data: {
              labels: ['Ukupan broj procitanih knjiga u prethodnih godinu dana'],
              datasets: [{
                  label: 'Ukupan broj procitanih knjiga u prethodnih godinu dana',
                  data: [broj],
                  backgroundColor: [
                      
                  ],
                  borderColor: [
                     
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
    
        })
      })
    })
    
    

    
  }
  dodajSliku(e){
    this.slika=e.target.files[0];
  }
  azuriraj(){
    
    if(this.staraLozinka!=this.korisnik.lozinka){ this.greska="Pogresna lozinka";this.edit=false;return;}
    let korisnickoIme
    if(this.korisnickoIme) korisnickoIme=this.korisnickoIme
    else korisnickoIme=this.korisnik.korisnickoIme;
    let lozinka
    if((this.lozinka1)&&(this.lozinka2)){if(this.lozinka1!=this.lozinka2){ this.greska='Nisu iste lozinke';return;}
  else {
    const reg = new RegExp(/^((^([A-Z])|(^[a-z])(?=.*[A-Z]))(?=.*\d)(?=.*[@$!%*#?&\.])).{7,11}$/);
  if (!reg.test(this.lozinka1.toString())){
    this.greska='Lozinka mora da pocinje slovom, mora da ima 8-12 karaktera, mora da ima bar jedan broj, bar jedno veliko slovo i bar jedan specijalni karakter!';return;
  }
lozinka=this.lozinka1;}}
    else lozinka=this.korisnik.lozinka
    
    let adresa;
    if(this.adresa){
    const reg=new RegExp(/[A-Z][A-Za-z ]+[0-9]+[,][ ][A-Z][A-Za-z ]+/);
    if(!reg.test(this.adresa.toString())){
      this.greska='Adresa nije upisana u odgovarajucem formatu';return;
    }
    adresa=this.adresa;
    }
    else adresa=this.korisnik.adresa;
    let telefon
    if(this.telefon){
      const reg=new RegExp(/[0-9+/ ]+/)
      if(!reg.test(this.telefon.toString())){this.greska='Telefon nije upisan u odgovarajucem formatu';return;}
      else telefon=this.telefon}
    else telefon=this.korisnik.telefon
    let imejl
    if(this.imejl) imejl=this.imejl
    else imejl=this.korisnik.imejl
    let slika
    if(this.slika) slika=this.slika.name
    else slika=this.korisnik.slika
    let ime
    if(this.ime) ime=this.ime
    else ime=this.korisnik.ime
    let prezime
    if(this.prezime) prezime=this.prezime
    else prezime=this.korisnik.prezime
    
    this.servis.azurirajKorisnika(this.korisnik.korisnickoIme,korisnickoIme,lozinka,ime,prezime,adresa,telefon,imejl,slika).subscribe((korisnik:Korisnik)=>{
      localStorage.setItem('korisnik',JSON.stringify(korisnik))
      if(this.slika) this.servis.uploadSlike(this.slika).subscribe(()=>{
        
        this.ngOnInit()
      })
      else{ this.ngOnInit()}
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
    if(zaduzenje.brojDaproduzeno) diffDays+=this.dani.valueOf();
    return diffDays;
  }
  editovanje(){
    if(this.edit) this.edit=false;
    else this.edit=true;
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
