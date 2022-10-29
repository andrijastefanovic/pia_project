import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { MyService } from '../my.service';

@Component({
  selector: 'app-neregistrovan',
  templateUrl: './neregistrovan.component.html',
  styleUrls: ['./neregistrovan.component.css']
})
export class NeregistrovanComponent implements OnInit {
tekst:String;
pretrazeneKnjige:Knjiga[]
  constructor(private servis:MyService, private ruter:Router) { }
  
  ngOnInit(): void {
  }
  pretrazi(){
    this.servis.dohvKnjigePoNazivuIliAutoru(this.tekst).subscribe((knjige:Knjiga[])=>{
      this.pretrazeneKnjige=knjige;
    })
  }

}
