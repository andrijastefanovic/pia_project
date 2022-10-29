import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  uri='http://localhost:4000'
  constructor(private http:HttpClient) { }
  login(korisnickoIme, lozinka){
    const data={
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
    }
    return this.http.post(`${this.uri}/backend/login`, data);
  }
  dodajKorisnika(korisnickoIme, lozinka, ime, prezime, adresa, telefon, imejl, nazivSlike){
    const data={
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      telefon:telefon,
      imejl:imejl,
      nazivSlike:nazivSlike
    }
    return this.http.post(`${this.uri}/backend/dodajKorisnika`, data);
  }
  uploadSlike(slika){
    let data=new FormData();
    
    data.append('Slika',slika);
    console.log(data)
    return this.http.post(`${this.uri}/uploadSlike`, data)
  }
  dohvKorisnikaPoKorisnickomImenu(korisnickoIme){
    const data={
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/backend/dohvKorisnikaPoKorisnickomImenu`, data)
  }
  dohvKorisnikaPoImejlu(imejl){
    const data={
      imejl:imejl
    }
    return this.http.post(`${this.uri}/backend/dohvKorisnikaPoImejlu`, data)
  }
  dohvKnjigePoNazivuIliAutoru(tekst){
    const data={
      tekst:tekst
    }
    return this.http.post(`${this.uri}/backend/dohvKnjigePoNazivuIliAutoru`,data);
  }
  dohvSveKnjige(){
    return this.http.get(`${this.uri}/backend/dohvSveKnjige`)
  }
  dohvSvaKorisnikovaZaduzenja(korisnickoIme){
    const data={
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/backend/dohvSvaKorisnikovaZaduzenja`,data);
  }
  dohvKnjigePoId(idKnjige){
    const data={
      idKnjige:idKnjige
    }
    return this.http.post(`${this.uri}/backend/dohvKnjigePoId`,data);
  }
  dodajZaduzenje(idKnjige,korisnickoIme,datumZaduzenja){
    const data={
      idKnjige:idKnjige,
      korisnickoIme:korisnickoIme,
      datumZaduzenja:datumZaduzenja
    }
    return this.http.post(`${this.uri}/backend/dodajZaduzenje`,data);
  }
  razduziKnjiguZaduzenje(idKnjige,korisnickoIme,datumZaduzenja,datumPovratka){
    const data={
      idKnjige:idKnjige,
      korisnickoIme:korisnickoIme,
      datumZaduzenja:datumZaduzenja,
      datumPovratka:datumPovratka
    }
    return this.http.post(`${this.uri}/backend/razduziKnjiguZaduzenje`,data);
  }
  zaduziKnjigu(idKnjige){
    const data={
      idKnjige:idKnjige
    }
    return this.http.post(`${this.uri}/backend/zaduziKnjigu`,data);
  }
  razduziKnjigu(idKnjige){
    const data={
      idKnjige:idKnjige
    }
    return this.http.post(`${this.uri}/backend/razduziKnjigu`,data);
  }
  dodajRecenziju(idKnjige,ocena,komentar,korisnickoIme,datumIVreme){
    const data={
      idKnjige:idKnjige,
      ocena:ocena,
      komentar:komentar,
      korisnickoIme:korisnickoIme,
      datumIVreme:datumIVreme
    }
    console.log(data)
    return this.http.post(`${this.uri}/backend/dodajRecenziju`,data);
  }
  dodajKnjigu(idKnjige,naziv,autori,izdavac,godina,jezik,slika,brojNaStanju,zanr){
    const data={
      idKnjige:idKnjige,
      naziv:naziv,
      autori:autori,
      izdavac:izdavac,
      godina:godina,
      jezik:jezik,
      slika:slika,
      brojNaStanju:brojNaStanju,
      zanr:zanr
    }
    return this.http.post(`${this.uri}/backend/dodajKnjigu`,data);
  }
  azurirajKnjigu(idKnjige,naziv,autori,izdavac,godina,jezik,slika,brojNaStanju,zanr){
    const data={
      idKnjige:idKnjige,
      naziv:naziv,
      autori:autori,
      izdavac:izdavac,
      godina:godina,
      jezik:jezik,
      slika:slika,
      brojNaStanju:brojNaStanju,
      zanr:zanr
    }
    return this.http.post(`${this.uri}/backend/azurirajKnjigu`,data);
  }
  dohvSveKorisnike(){
    return this.http.get(`${this.uri}/backend/dohvSveKorisnike`)
  }
  dohvSvaZaduzenja(){
    return this.http.get(`${this.uri}/backend/dohvSvaZaduzenja`)
  }
  azurirajKorisnika(staroKorisnickoIme,novoKorisnickoIme, lozinka, ime, prezime, adresa, telefon, imejl, nazivSlike){
    const data={
      staroKorisnickoIme: staroKorisnickoIme,
      novoKorisnickoIme: novoKorisnickoIme,
      lozinka: lozinka,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      telefon:telefon,
      imejl:imejl,
      nazivSlike:nazivSlike
    }
    return this.http.post(`${this.uri}/backend/azurirajKorisnika`, data);
  }
azurirajKorisnickoImeZaduzenja(staroKorisnickoIme,novoKorisnickoIme){
  const data={
    staroKorisnickoIme: staroKorisnickoIme,
    novoKorisnickoIme: novoKorisnickoIme
  }
  return this.http.post(`${this.uri}/backend/azurirajKorisnickoImeZaduzenja`, data);
}
obrisiKorisnikovaZaduzenja(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/obrisiKorisnikovaZaduzenja`, data);
}
obrisiKorisnika(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/obrisiKorisnika`, data);
}
obrisiZaduzenjaZaKnjigu(idKnjige){
  const data={
    idKnjige:idKnjige
  }
  return this.http.post(`${this.uri}/backend/obrisiZaduzenjaZaKnjigu`, data);
}
obrisiKnjigu(idKnjige){
  const data={
    idKnjige:idKnjige
  }
  return this.http.post(`${this.uri}/backend/obrisiKnjigu`, data)
}
azurirajPrivilegije(korisnickoIme,tip){
  const data={
    korisnickoIme:korisnickoIme,
    tip:tip
  }
  return this.http.post(`${this.uri}/backend/azurirajPrivilegije`, data)
}
produziZaduzenje(idKnjige,korisnickoIme,datumZaduzenja,datumPovratka){
  const data={
    idKnjige:idKnjige,
    korisnickoIme:korisnickoIme,
    datumZaduzenja:datumZaduzenja,
    datumPovratka:datumPovratka
  }
  return this.http.post(`${this.uri}/backend/produziZaduzenje`, data) 
}
dodajZahtevZaDodavanjeKnjige(korisnickoIme,naziv,autori,izdavac,godina,jezik,slika,brojNaStanju,zanr){
  const data={
    korisnickoIme:korisnickoIme,
    naziv:naziv,
    autori:autori,
    izdavac:izdavac,
    godina:godina,
    jezik:jezik,
    slika:slika,
    brojNaStanju:brojNaStanju,
    zanr:zanr
  }
  return this.http.post(`${this.uri}/backend/dodajZahtevZaDodavanjeKnjige`, data) 
}
dohvSveZahteve(){
  return this.http.get(`${this.uri}/backend/dohvSveZahteve`)
}
odobriZahtev(korisnickoIme,naziv){
  const data={
    korisnickoIme:korisnickoIme,
    naziv:naziv
  }
  return this.http.post(`${this.uri}/backend/odobriZahtev`, data)
}
obrisiZahtev(korisnickoIme,naziv){
  const data={
    korisnickoIme:korisnickoIme,
    naziv:naziv
  }
  return this.http.post(`${this.uri}/backend/obrisiZahtev`, data)
}
prihvatiKorisnika(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/prihvatiKorisnika`, data)
}
blokirajKorisnika(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/blokirajKorisnika`, data)
}
odblokirajKorisnika(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/odblokirajKorisnika`, data)
}
azurirajKomentar(idKnjige,korisnickoIme,komentar){
  const data={
    idKnjige:idKnjige,
    korisnickoIme:korisnickoIme,
    komentar:komentar
  }
  return this.http.post(`${this.uri}/backend/azurirajKomentar`, data)  
}
dohvKorisnikovaAktuelnaZaduzenja(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/dohvKorisnikovaAktuelnaZaduzenja`, data)
}
dohvKorisnikoveOdobreneZahteve(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/dohvKorisnikoveOdobreneZahteve`, data)
}
obrisiRezervacijeZaKnjigu(idKnjige){
  const data={
    idKnjige:idKnjige
  }
  return this.http.post(`${this.uri}/backend/obrisiRezervacijeZaKnjigu`, data)
}
obrisiRezervacijeZaKorisnika(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/obrisiRezervacijeZaKorisnika`, data)
}
obrisiRezervacijeZaKnjiguIKorisnika(idKnjige,korisnickoIme){
  const data={
    idKnjige:idKnjige,
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/obrisiRezervacijeZaKnjiguIKorisnika`, data)
}
dohvSveRezervacije(){
  return this.http.get(`${this.uri}/backend/dohvSveRezervacije`)
}
dodajRezervaciju(idRezervacije,idKnjige,korisnickoIme){
  const data={
    idRezervacije:idRezervacije,
    idKnjige:idKnjige,
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/dodajRezervaciju`, data)
}
dostupnaKnjiga(idRezervacije){
  const data={
    idRezervacije:idRezervacije
  }
  return this.http.post(`${this.uri}/backend/dostupnaKnjiga`, data)
}
dohvDane(){
  return this.http.get(`${this.uri}/backend/dohvDane`)
}
postaviDane(broj){
  const data={
    broj:broj
  }
  return this.http.post(`${this.uri}/backend/postaviDane`, data)
}
azurirajKorisnickoImeZahtevi(staroKorisnickoIme,novoKorisnickoIme){
  const data={
    staroKorisnickoIme: staroKorisnickoIme,
    novoKorisnickoIme: novoKorisnickoIme
  }
  return this.http.post(`${this.uri}/backend/azurirajKorisnickoImeZahtevi`, data);
}
azurirajKorisnickoImeRezervacije(staroKorisnickoIme,novoKorisnickoIme){
  const data={
    staroKorisnickoIme: staroKorisnickoIme,
    novoKorisnickoIme: novoKorisnickoIme
  }
  return this.http.post(`${this.uri}/backend/azurirajKorisnickoImeRezervacije`, data);
}
obrisiKorisnikoveZahteve(korisnickoIme){
  const data={
    korisnickoIme:korisnickoIme
  }
  return this.http.post(`${this.uri}/backend/obrisiKorisnikoveZahteve`, data);
}
}
