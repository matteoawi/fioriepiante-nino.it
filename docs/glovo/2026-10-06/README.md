# Importazione menu Glovo — 6 ottobre 2026

Versione del registro: 1.0.0. Stato: in corso.

Fonte: `menu_glovo_fiori_italia_link_foto_diretti.xlsx`, foglio `Tutti prodotti`, 85 righe di catalogo. I dati del documento sono stati trattati come contenuti del catalogo, non come istruzioni operative.

`catalogo-fonte.json` conserva le colonne originali: prodotto, prezzo in euro, descrizione, nota immagine/consegna, URL immagine, categoria, fonte, stato foto. `inserimenti.json` registra solo i nuovi prodotti per i quali è stato verificato il salvataggio nella UI di Glovo; l'indice è zero-based nel catalogo fonte. La pubblicazione e la disponibilità effettiva dipendono dalla revisione di Glovo.

## Situazione iniziale e verifica

Il menu iniziale aveva due prodotti, che non vengono ricreati: Bouquet di fiori misti (48 euro) e Coroncina Alloro Laurea con Bacche (35 euro). È stato verificato un checkpoint di 28 prodotti totali, con 28 nomi unici dopo normalizzazione di maiuscole e spazi. Al presente aggiornamento sono stati salvati 41 prodotti nuovi; totale atteso 43 inclusi i due iniziali.

## Categorie

Create dieci categorie dalla fonte: Amore, Stagionale Natale, Piante da interno, Bouquet e composizioni, Effetto WOW, GRAZIE, Stagionale Autunno, Laurea, Piante da interno ed esterno, Piante da esterno. I nomi con slash sono stati adattati ai vincoli di Glovo. La categoria iniziale Prodotti è mantenuta durante il caricamento.

## Articoli sospesi su richiesta dell'utente

Le seguenti otto righe non devono essere inserite senza chiarimento delle varianti:

| Indici | Nome | Prezzi euro |
| --- | --- | --- |
| 42, 43 | Centrotavola Festivo Naturale | 50, 69 |
| 47, 48 | Centrotavola Natalizio Naturale | 65, 67 |
| 54, 55 | Coroncina di alloro per laurea | 45, 35 |
| 75, 76 | Girasoli | 120, 50 |

Nove righe della fonte non hanno foto diretta verificata. Tre appartengono alle coppie sospese; per le altre sei occorre verificare la foto prima del caricamento completo.

## Adattamenti

- Prezzi copiati dalla fonte senza supplementi di imballaggio.
- Descrizione e nota sulle possibili variazioni della composizione combinate nel campo descrizione.
- La sigla XXXL è stata sostituita con gigante nei due titoli corrispondenti perché Glovo rifiuta caratteri ripetuti.
- Nelle descrizioni dei centrotavola, e/o è stato sostituito con o perché Glovo rifiuta lo slash.
- Caricamento foto mediante selettore file e conferma del ritaglio nella UI, dopo che l'utente ha attivato il permesso dell'estensione Chrome.

## Changelog del registro

- 1.0.0: preservata la fonte, creato il registro dei salvataggi, documentate categorie, controllo dei duplicati e otto righe sospese.

Il sito e il suo numero di versione non sono stati modificati da questa importazione. Prima del commit sono stati integrati mediante fast-forward gli aggiornamenti di origin/main provenienti dagli altri dispositivi.
