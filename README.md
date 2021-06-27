# Infosüsteem

Infosüsteemi loomiseks on kasutatud:
 - Front-end
   - EJS mallikeelt
   - JavaScript
   - Bootstrap
 
 - Back-end
   - Node.js
   - Express.js
   - Passport (kasutaja autentimiseks)
   
Andmebaasina on kasutatud **PostgreSQL'i**


# Nõuded

  - [Node.js](https://nodejs.org/en/download/)
  - [PostgreSQL (kui on soov lokaalselt kasutada)](https://www.postgresql.org/download/)

PostgreSQL Homebrew kaudu:
  - brew install postgresql
  - brew services start postgresql
  
# Juhend
1. Klooni/lae alla repositoorium (repositoorium sisaldab ka SQL dump'i ja `.env` faili vaikesätteid)
2. Käivita koodiredaktori Terminal'is (võib ka mujal, kus võimalik) käsk `npm install` (või lühidalt `npm i`)
3. Seadista `.env` failis omale soovitud Node rakenduse port (vaikimisi: 3000) ja PostgreSQL andmebaasiga seotud sätted:
  - `USER`, kasutaja (vaikimisi: me)
  - `HOST`, host (vaikimisi: localhost)
  - `DATABASE`, andmebaasi nimi (vaikimisi: random)
  - `PASSWORD`, parool (vaikimisi: password)
  - `QUERY_PORT`, PostgreSQL port (vaikimisi: 5432)
4. SQL dump faili integreerimiseks jooksuta käsk `psql -U (USER) (DATABASE) < (dump faili nimi)`, vaikimisi `psql -U me random < dbdump.pgsql`. Kui Windows'is ei tööta `psql` käsk, tuleb selle asemel kasutada `psql.exe`
5. Käivita Node rakendus käsuga `npm start`
6. Ava rakendus veebibrauseris lingiga `localhost:`(valitud Node rakenduse port), vaikimisi `localhost:3000`
7. Infosüsteemi sisse logimiseks registreeri omale sobiv kasutaja (testimiseks loodud) või kasuta andmebaasis olemas olevat kasutajat, `E-mail: test@naide.ee Parool: 12345678`

  - Kontakti kirje lisamiseks klõpsa nupul 'Lisa kontakt' ja sisesta soovitud andmed.
  - 'Lisa kontakt' nupu kõrval on ka otsing, mis töötab ainult tabelis 'Nimi' väljaga.
