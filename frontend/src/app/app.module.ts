import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NeregistrovanComponent } from './neregistrovan/neregistrovan.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminComponent } from './admin/admin.component';
import { CitalacComponent } from './citalac/citalac.component';
import { ProfilComponent } from './profil/profil.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { KnjigaComponent } from './knjiga/knjiga.component';
import { DodavanjeKnjigeComponent } from './dodavanje-knjige/dodavanje-knjige.component';
import { AzuriranjeKnjigeComponent } from './azuriranje-knjige/azuriranje-knjige.component';
import { AzuriranjeKorisnikaComponent } from './azuriranje-korisnika/azuriranje-korisnika.component';
import { DodavanjeKorisnikaComponent } from './dodavanje-korisnika/dodavanje-korisnika.component';
import { PocetnaStranaComponent } from './pocetna-strana/pocetna-strana.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NeregistrovanComponent,
    RegistracijaComponent,
    AdminloginComponent,
    AdminComponent,
    CitalacComponent,
    ProfilComponent,
    ZaduzenjaComponent,
    IstorijaComponent,
    KnjigaComponent,
    DodavanjeKnjigeComponent,
    AzuriranjeKnjigeComponent,
    AzuriranjeKorisnikaComponent,
    DodavanjeKorisnikaComponent,
    PocetnaStranaComponent,
    ZahteviComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
