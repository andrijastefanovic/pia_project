import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AzuriranjeKnjigeComponent } from './azuriranje-knjige/azuriranje-knjige.component';
import { AzuriranjeKorisnikaComponent } from './azuriranje-korisnika/azuriranje-korisnika.component';
import { CitalacComponent } from './citalac/citalac.component';
import { DodavanjeKnjigeComponent } from './dodavanje-knjige/dodavanje-knjige.component';
import { DodavanjeKorisnikaComponent } from './dodavanje-korisnika/dodavanje-korisnika.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { KnjigaComponent } from './knjiga/knjiga.component';
import { LoginComponent } from './login/login.component';
import { NeregistrovanComponent } from './neregistrovan/neregistrovan.component';
import { PocetnaStranaComponent } from './pocetna-strana/pocetna-strana.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';

const routes: Routes = [
  {path:'',component:PocetnaStranaComponent},
  {path:'registracija',component:RegistracijaComponent},
  {path:'neregistrovan',component:NeregistrovanComponent},
  {path:'admin',component:AdminComponent},
  {path:'adminlogin',component:AdminloginComponent},
  {path:'citalac',component:CitalacComponent},
  {path:'profil',component:ProfilComponent},
  {path:'zaduzenja',component:ZaduzenjaComponent},
  {path:'istorijaZaduzivanja',component:IstorijaComponent},
  {path:'knjiga',component:KnjigaComponent},
  {path:'dodavanjeKnjige',component:DodavanjeKnjigeComponent},
  {path:'azuriranjeKnjige',component:AzuriranjeKnjigeComponent},
  {path:'azuriranjeKorisnika',component:AzuriranjeKorisnikaComponent},
  {path:'dodavanjeKorisnika',component:DodavanjeKorisnikaComponent},
  {path:'login',component:LoginComponent},
  {path:'zahtevi',component:ZahteviComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
