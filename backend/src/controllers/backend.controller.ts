import express from 'express'
import Rezervacija from '../model/rezervacija';
import Knjiga from '../model/knjiga';
import Korisnik from '../model/korisnik'
import Zaduzenje from '../model/zaduzenje'
import Zahtev from '../model/zahtev'
import Dani from '../model/dani'
import { ExecOptionsWithBufferEncoding } from 'child_process';


export class BackendController{
    
    login=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        let lozinka=req.body.lozinka;
        Korisnik.findOne({'korisnickoIme':korisnickoIme,'lozinka':lozinka,'obradjen':true},(err,korisnik)=>{
            if(err) console.log(err)
            else res.json(korisnik)
        })
    }
    dodajKorisnika=(req:express.Request, res:express.Response)=>{
        let korisnik=new Korisnik({
            korisnickoIme:req.body.korisnickoIme,
            lozinka:req.body.lozinka,
            ime:req.body.ime,
            prezime:req.body.prezime,
            adresa:req.body.adresa,
            telefon:req.body.telefon,
            imejl:req.body.imejl,
            slika:req.body.nazivSlike,
            obradjen:false,
            tip:'citalac',
            blokiran:false
        })
        console.log(korisnik);
        korisnik.save((err, resp)=>{
            if (err) console.log(err)
            else res.json()
        })
    }
/*    uploadSlike=(req, res)=>{
        res.json()
    }*/
    dohvKorisnikaPoKorisnickomImenu=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        Korisnik.findOne({'korisnickoIme':korisnickoIme}, (err,korisnik)=>{
        if(err) console.log(err)
        else res.json(korisnik)
        })
    }
    dohvKorisnikaPoImejlu=(req:express.Request,res:express.Response)=>{
        let imejl=req.body.imejl;
        Korisnik.findOne({'imejl':imejl}, (err,korisnik)=>{
        if(err) console.log(err)
        else res.json(korisnik)
        })
    }
    dohvKnjigePoNazivuIliAutoru=(req:express.Request,res:express.Response)=>{
        let tekst=req.body.tekst;
        Knjiga.find({$or:[{'naziv': {$regex:tekst}},{'autori.ime':{$regex:tekst}}]},(err,knjige)=>{
            if(err) console.log(err)
            else res.json(knjige);
        })
    }
    dohvSveKnjige=(req:express.Request,res:express.Response)=>{
        Knjiga.find({},(err,knjige)=>{
            if(err) console.log(err)
            else res.json(knjige)
        })
    }
    dohvSvaKorisnikovaZaduzenja=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        Zaduzenje.find({"korisnickoIme":korisnickoIme},(err,zaduzenja)=>{
            if(err) console.log(err)
            else res.json(zaduzenja)
        })
    }
    dohvKnjigePoId=(req:express.Request,res:express.Response)=>{
        let idKnjige=req.body.idKnjige;
        Knjiga.findOne({"idKnjige":idKnjige},(err,knjiga)=>{
            if(err) console.log(err)
            else res.json(knjiga)
        })
    }
    dodajZaduzenje=(req:express.Request,res:express.Response)=>{
        let zaduzenje=new Zaduzenje({
            idKnjige:req.body.idKnjige,
            korisnickoIme:req.body.korisnickoIme,
            datumZaduzenja:req.body.datumZaduzenja,
            datumPovratka:'Knjiga nije vracena',
            produzeno:false
        })
        zaduzenje.save((err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    razduziKnjiguZaduzenje=(req:express.Request,res:express.Response)=>{
    Zaduzenje.findOneAndUpdate({'idKnjige':req.body.idKnjige,'korisnickoIme':req.body.korisnickoIme,'datumZaduzenja':req.body.datumZaduzenja},{$set:{'datumPovratka':req.body.datumPovratka}},(err,resp)=>{
        if(err) console.log(err)
        else res.json()
    })
    }
    zaduziKnjigu=(req:express.Request,res:express.Response)=>{
        Knjiga.findOneAndUpdate({idKnjige:req.body.idKnjige},{$inc:{'brojZaduzivanja':1,'brojNaStanju':-1}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    razduziKnjigu=(req:express.Request,res:express.Response)=>{
        Knjiga.findOneAndUpdate({idKnjige:req.body.idKnjige},{$inc:{'brojNaStanju':1}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    dodajRecenziju=(req:express.Request,res:express.Response)=>{
        console.log(req.body.ocena)
        let recenzija={'ocena':req.body.ocena,'komentar':req.body.komentar,'korisnickoIme':req.body.korisnickoIme,'datumIVreme':req.body.datumIVreme,"azuriran":false}
        Knjiga.findOneAndUpdate({'idKnjige':req.body.idKnjige},{$push:{'recenzije':recenzija}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    dodajKnjigu=(req:express.Request,res:express.Response)=>{
    let knjiga=new Knjiga({
    idKnjige:req.body.idKnjige,
    naziv:req.body.naziv,
    autori:req.body.autori,
    izdavac:req.body.izdavac,
    godina:req.body.godina,
    jezik:req.body.jezik,
    slika:req.body.slika,
    brojZaduzivanja:0,
    brojNaStanju:req.body.brojNaStanju,
    zanr:req.body.zanr,
    recenzije:[]

})        
knjiga.save((err,resp)=>{
    if(err) console.log(err)
    else res.json()
})
    }
    azurirajKnjigu=(req:express.Request,res:express.Response)=>{
        Knjiga.findOneAndUpdate({'idKnjige':req.body.idKnjige},{$set:{'naziv':req.body.naziv,'autori':req.body.autori,'izdavac':req.body.izdavac,'godina':req.body.godina,
    'jezik':req.body.jezik,'slika':req.body.slika,'brojNaStanju':req.body.brojNaStanju,'zanr':req.body.zanr}},(err,resp)=>{
        if(err) console.log(err)
        else res.json()

        })
    }
    dohvSveKorisnike=(req:express.Request,res:express.Response)=>{
        Korisnik.find({},(err,korisnici)=>{
            if(err) console.log(err)
            else res.json(korisnici)
        })
    }
    dohvSvaZaduzenja=(req:express.Request,res:express.Response)=>{
        Zaduzenje.find({},(err,zaduzenja)=>{
            if(err) console.log(err)
            else res.json(zaduzenja)
        })
    }
    dohvKorisnikovaAktuelnaZaduzenja=(req:express.Request,res:express.Response)=>{
        Zaduzenje.find({'korisnickoIme':req.body.korisnickoIme,'datumPovratka':'Knjiga nije vracena'},(err,zaduzenja)=>{
            if(err) console.log(err)
            else res.json(zaduzenja)
        })
    }
    azurirajKorisnika=(req:express.Request,res:express.Response)=>{
        Korisnik.findOneAndUpdate({'korisnickoIme':req.body.staroKorisnickoIme},
        {$set:{'korisnickoIme':req.body.novoKorisnickoIme,'lozinka':req.body.lozinka,'ime':req.body.ime,'prezime':req.body.prezime,'adresa':req.body.adresa,
    'telefon':req.body.telefon,'imejl':req.body.imejl,'slika':req.body.slika}},(err,korisnik)=>{
            if(err) console.log(err)
            else{console.log(korisnik); res.json(korisnik)}
    })
    }
    azurirajKorisnickoImeZaduzenja=(req:express.Request,res:express.Response)=>{
        Zaduzenje.updateMany({'korisnickoIme':req.body.staroKorisnickoIme},{$set:{'korisnickoIme':req.body.novoKorisnickoIme}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    obrisiKorisnikovaZaduzenja=(req:express.Request,res:express.Response)=>{
        Zaduzenje.deleteMany({'korisnickoIme':req.body.korisnickoIme},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    obrisiKorisnika=(req:express.Request,res:express.Response)=>{
        Korisnik.deleteOne({'korisnickoIme':req.body.korisnickoIme},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    obrisiZaduzenjaZaKnjigu=(req:express.Request,res:express.Response)=>{
        Zaduzenje.deleteMany({'idKnjige':req.body.idKnjige},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    obrisiKnjigu=(req:express.Request,res:express.Response)=>{
        Knjiga.deleteOne({'idKnjige':req.body.idKnjige},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    azurirajPrivilegije=(req:express.Request,res:express.Response)=>{
        Korisnik.findOneAndUpdate({"korisnickoIme":req.body.korisnickoIme},{$set:{"tip":req.body.tip}},(err,response)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    produziZaduzenje=(req:express.Request,res:express.Response)=>{
        Zaduzenje.findOneAndUpdate({"idKnjige":req.body.idKnjige,"korisnickoIme":req.body.korisnickoIme,"datumZaduzenja":req.body.datumZaduzenja,"datumPovratka":req.body.datumPovratka,
    },{$set:{"produzeno":true}},(err,resp)=>{
        if(err) console.log(err)
        else res.json()
    })
    }
    dodajZahtevZaDodavanjeKnjige=(req:express.Request,res:express.Response)=>{
        let zahtev=new Zahtev({
            korisnickoIme:req.body.korisnickoIme,
            naziv:req.body.naziv,
            autori:req.body.autori,
            izdavac:req.body.izdavac,
            godina:req.body.godina,
            jezik:req.body.jezik,
            slika:req.body.slika,
            brojNaStanju:req.body.brojNaStanju,
            zanr:req.body.zanr,
            odobren:false
        
        })
        zahtev.save((err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    dohvSveZahteve=(req:express.Request,res:express.Response)=>{
        Zahtev.find({},(err,zahtevi)=>{
            if(err) console.log(err)
            else res.json(zahtevi)
        })
    }
    odobriZahtev=(req:express.Request,res:express.Response)=>{
        Zahtev.findOneAndUpdate({'korisnickoIme':req.body.korisnickoIme,'naziv':req.body.naziv},{$set:{'odobren':true}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    obrisiZahtev=(req:express.Request,res:express.Response)=>{
        Zahtev.deleteMany({'korisnickoIme':req.body.korisnickoIme,'naziv':req.body.naziv},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    prihvatiKorisnika=(req:express.Request,res:express.Response)=>{
        Korisnik.findOneAndUpdate({"korisnickoIme":req.body.korisnickoIme},{$set:{'obradjen':true}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    blokirajKorisnika=(req:express.Request,res:express.Response)=>{
        Korisnik.findOneAndUpdate({'korisnickoIme':req.body.korisnickoIme},{$set:{'blokiran':true}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    odblokirajKorisnika=(req:express.Request,res:express.Response)=>{
        Korisnik.findOneAndUpdate({'korisnickoIme':req.body.korisnickoIme},{$set:{'blokiran':false}},(err,resp)=>{
            if(err) console.log(err)
            else res.json
        })
    }
    azurirajKomentar=(req:express.Request,res:express.Response)=>{
        Knjiga.findOneAndUpdate({'idKnjige':req.body.idKnjige,'recenzije.korisnickoIme':req.body.korisnickoIme},{$set:{'recenzije.$.komentar':req.body.komentar,'recenzije.$.azuriran':true}},(err,knjiga)=>{
            if(err) console.log(err)
            else res.json(knjiga)
        })
    }
    dohvKorisnikoveOdobreneZahteve=(req:express.Request,res:express.Response)=>{
        Zahtev.find({'korisnickoIme':req.body.korisnickoIme,'odobren':true},(err,zahtevi)=>{
            if(err) console.log(err)
            else res.json(zahtevi)
        })
    }
    obrisiRezervacijeZaKnjigu=(req:express.Request,res:express.Response)=>{
        Rezervacija.deleteMany({'idKnjige':req.body.idKnjige},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    obrisiRezervacijeZaKorisnika=(req:express.Request,res:express.Response)=>{
        Rezervacija.deleteMany({'korisnickoIme':req.body.korisnickoIme},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    obrisiRezervacijeZaKnjiguIKorisnika=(req:express.Request,res:express.Response)=>{
        Rezervacija.deleteMany({'idKnjige':req.body.idKnjige,'korisnickoIme':req.body.korisnickoIme},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    dohvSveRezervacije=(req:express.Request,res:express.Response)=>{
        Rezervacija.find((err,rezervacije)=>{
            if(err) console.log(err)
            else res.json(rezervacije)
        })
    }
    dodajRezervaciju=(req:express.Request,res:express.Response)=>{
        let rezervacija=new Rezervacija({
            idRezervacije:req.body.idRezervacije,
            idKnjige:req.body.idKnjige,
            korisnickoIme:req.body.korisnickoIme,
            dostupno:false,
            
        })
        rezervacija.save((err,resp)=>{
            if(err) console.log()
            else res.json()
        })

    }
    dostupnaKnjiga=(req:express.Request,res:express.Response)=>{
        Rezervacija.findOneAndUpdate({'idRezervacije':req.body.idRezervacije},{$set:{'dostupno':true}},(err,resp)=>{
            if(err) console.log(err)
            else{ console.log(resp); res.json()}

        })
    }
    dohvDane=(req:express.Request,res:express.Response)=>{
        Dani.findOne({},(err,dani)=>{
            if(err) console.log(err)
            else res.json(dani)
        }) 
    }
    postaviDane=(req:express.Request,res:express.Response)=>{
        Dani.findOneAndUpdate({},{$set:{'broj':req.body.broj}},(err,resp)=>{
            if(err) console.log(err)
            else {res.json()}

        })
    }
    azurirajKorisnickoImeZahtevi=(req:express.Request,res:express.Response)=>{
        Zahtev.updateMany({'korisnickoIme':req.body.staroKorisnickoIme},{$set:{'korisnickoIme':req.body.novoKorisnickoIme}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    azurirajKorisnickoImeRezervacije=(req:express.Request,res:express.Response)=>{
        Rezervacija.updateMany({'korisnickoIme':req.body.staroKorisnickoIme},{$set:{'korisnickoIme':req.body.novoKorisnickoIme}},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
    obrisiKorisnikoveZahteve=(req:express.Request,res:express.Response)=>{
        Zahtev.deleteMany({"korisnickoIme":req.body.korisnickoIme},(err,resp)=>{
            if(err) console.log(err)
            else res.json()
        })
    }
}