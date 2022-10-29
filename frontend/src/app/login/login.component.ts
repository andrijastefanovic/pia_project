import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { MyService } from '../my.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servis:MyService, private ruter:Router) { }
  korisnickoIme:String
  lozinka:String
  greska:String

  ngOnInit(): void {
 
  }

  login(){
this.servis.login(this.korisnickoIme,this.lozinka).subscribe((korisnik:Korisnik)=>{
  if(korisnik){
    this.greska='';
    localStorage.setItem('korisnik',JSON.stringify(korisnik));
  if(korisnik.tip=='citalac'||korisnik.tip=='moderator'||korisnik.tip=='admin') this.ruter.navigate(['/citalac'])
}
else this.greska='Pogresno korisnicko ime ili lozinka'
  })
  }

}
