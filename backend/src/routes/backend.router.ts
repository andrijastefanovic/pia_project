import express from 'express';
import { BackendController } from '../controllers/backend.controller';




const backendRouter = express.Router();

backendRouter.route('/login').post(
    (req, res)=> new BackendController().login(req, res)
)
backendRouter.route('/dodajKorisnika').post(
    (req, res)=>new BackendController().dodajKorisnika(req, res)
)
backendRouter.route('/dohvKorisnikaPoKorisnickomImenu').post(
    (req, res)=>new BackendController().dohvKorisnikaPoKorisnickomImenu(req,res)
)
backendRouter.route('/dohvKorisnikaPoImejlu').post(
    (req, res)=>new BackendController().dohvKorisnikaPoImejlu(req,res)
)
backendRouter.route('/dohvKnjigePoNazivuIliAutoru').post(
    (req, res)=>new BackendController().dohvKnjigePoNazivuIliAutoru(req,res)
)
backendRouter.route('/dohvSveKnjige').get(
    (req, res)=>new BackendController().dohvSveKnjige(req,res)
)
backendRouter.route('/dohvSvaKorisnikovaZaduzenja').post(
    (req,res)=>new BackendController().dohvSvaKorisnikovaZaduzenja(req,res)
)
backendRouter.route('/dohvKnjigePoId').post(
    (req,res)=>new BackendController().dohvKnjigePoId(req,res)
)
backendRouter.route('/dodajZaduzenje').post(
    (req,res)=>new BackendController().dodajZaduzenje(req,res)
)
backendRouter.route('/razduziKnjiguZaduzenje').post(
    (req,res)=>new BackendController().razduziKnjiguZaduzenje(req,res)
)
backendRouter.route('/zaduziKnjigu').post(
    (req,res)=>new BackendController().zaduziKnjigu(req,res)
)
backendRouter.route('/razduziKnjigu').post(
    (req,res)=>new BackendController().razduziKnjigu(req,res)
)
backendRouter.route('/dodajRecenziju').post(
    (req,res)=>new BackendController().dodajRecenziju(req,res)
)
backendRouter.route('/dodajKnjigu').post(
    (req,res)=>new BackendController().dodajKnjigu(req,res)
)
backendRouter.route('/azurirajKnjigu').post(
    (req,res)=>new BackendController().azurirajKnjigu(req,res)
)
backendRouter.route('/dohvSveKorisnike').get(
    (req, res)=>new BackendController().dohvSveKorisnike(req,res)
)
backendRouter.route('/dohvSvaZaduzenja').get(
    (req, res)=>new BackendController().dohvSvaZaduzenja(req,res)
)
backendRouter.route('/azurirajKorisnickoImeZaduzenja').post(
    (req,res)=>new BackendController().azurirajKorisnickoImeZaduzenja(req,res)
)
backendRouter.route('/azurirajKorisnika').post(
    (req,res)=>new BackendController().azurirajKorisnika(req,res)
)
backendRouter.route('/obrisiKorisnikovaZaduzenja').post(
    (req,res)=>new BackendController().obrisiKorisnikovaZaduzenja(req,res)
)
backendRouter.route('/obrisiKorisnika').post(
    (req,res)=>new BackendController().obrisiKorisnika(req,res)
)
backendRouter.route('/obrisiZaduzenjaZaKnjigu').post(
    (req,res)=>new BackendController().obrisiZaduzenjaZaKnjigu(req,res)
)
backendRouter.route('/obrisiKnjigu').post(
    (req,res)=>new BackendController().obrisiKnjigu(req,res)
)
backendRouter.route('/azurirajPrivilegije').post(
    (req,res)=>new BackendController().azurirajPrivilegije(req,res)
)
backendRouter.route('/produziZaduzenje').post(
    (req,res)=>new BackendController().produziZaduzenje(req,res)
)
backendRouter.route('/dodajZahtevZaDodavanjeKnjige').post(
    (req,res)=>new BackendController().dodajZahtevZaDodavanjeKnjige(req,res)
)
backendRouter.route('/dohvSveZahteve').get(
    (req,res)=>new BackendController().dohvSveZahteve(req,res)
)
backendRouter.route('/odobriZahtev').post(
    (req,res)=>new BackendController().odobriZahtev(req,res)
)
backendRouter.route('/obrisiZahtev').post(
    (req,res)=>new BackendController().obrisiZahtev(req,res)
)
backendRouter.route('/prihvatiKorisnika').post(
    (req,res)=>new BackendController().prihvatiKorisnika(req,res)
)
backendRouter.route('/blokirajKorisnika').post(
    (req,res)=>new BackendController().blokirajKorisnika(req,res)
)
backendRouter.route('/odblokirajKorisnika').post(
    (req,res)=>new BackendController().odblokirajKorisnika(req,res)
)
backendRouter.route('/azurirajKomentar').post(
    (req,res)=>new BackendController().azurirajKomentar(req,res)
)
backendRouter.route('/dohvKorisnikovaAktuelnaZaduzenja').post(
    (req,res)=>new BackendController().dohvKorisnikovaAktuelnaZaduzenja(req,res)
)
backendRouter.route('/dohvKorisnikoveOdobreneZahteve').post(
    (req,res)=>new BackendController().dohvKorisnikoveOdobreneZahteve(req,res)
)
backendRouter.route('/obrisiRezervacijeZaKnjigu').post(
    (req,res)=>new BackendController().obrisiRezervacijeZaKnjigu(req,res)
)
backendRouter.route('/obrisiRezervacijeZaKorisnika').post(
    (req,res)=>new BackendController().obrisiRezervacijeZaKorisnika(req,res)
)
backendRouter.route('/obrisiRezervacijeZaKnjiguIKorisnika').post(
    (req,res)=>new BackendController().obrisiRezervacijeZaKnjiguIKorisnika(req,res)
)
backendRouter.route('/dohvSveRezervacije').get(
    (req,res)=>new BackendController().dohvSveRezervacije(req,res)
)
backendRouter.route('/dodajRezervaciju').post(
    (req,res)=>new BackendController().dodajRezervaciju(req,res)
)
backendRouter.route('/dostupnaKnjiga').post(
    (req,res)=>new BackendController().dostupnaKnjiga(req,res)
)
backendRouter.route('/dohvDane').get(
    (req,res)=>new BackendController().dohvDane(req,res)
)
backendRouter.route('/postaviDane').post(
    (req,res)=>new BackendController().postaviDane(req,res)
)
backendRouter.route('/azurirajKorisnickoImeZahtevi').post(
    (req,res)=>new BackendController().azurirajKorisnickoImeZahtevi(req,res)
)
backendRouter.route('/azurirajKorisnickoImeRezervacije').post(
    (req,res)=>new BackendController().azurirajKorisnickoImeRezervacije(req,res)
)
backendRouter.route('/obrisiKorisnikoveZahteve').post(
    (req,res)=>new BackendController().obrisiKorisnikoveZahteve(req,res)
)

export default backendRouter;