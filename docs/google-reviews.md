# Recensioni Google — 1.1.0

Il riquadro `#recensioni`, dopo le sedi, usa `<details>` nativo inizialmente chiuso. I tre collegamenti aprono il modulo Google in una nuova scheda; il sito non raccoglie stelle, testi o credenziali. Non servono script, widget o chiavi API aggiuntivi.

Profili verificati su Google Maps il 6 novembre 2026, a partire dai collegamenti Indicazioni già presenti sul sito:

| Sede | Collegamento esistente | Place ID verificato |
| --- | --- | --- |
| Via Chiana 4 | https://maps.app.goo.gl/3Nrreo1iZU4GfKc77 | `ChIJvTT7DFRhLxMREXdvOw9Dfk0` |
| Piazza Santiago del Cile | https://maps.app.goo.gl/mMeSqHSYEeXbsx6a9 | `ChIJv1vgeFthLxMR4KBzrPThDMk` |
| Viale Maresciallo Pilsudski 138 | https://maps.app.goo.gl/gL9RTUafrTYkaxkHA | `ChIJ79kO44hhLxMRyhvvqJQvclA` |

Formato del collegamento: `https://search.google.com/local/writereview?placeid=PLACE_ID`. Il dominio deve essere `search.google.com`; `www.google.com/local/writereview` restituisce 404.

Verifiche in browser: indirizzi dei tre profili corrispondenti, accesso Google richiesto dal modulo recensione, apertura/chiusura con Invio e Spazio, tre pulsanti con nomi accessibili distinti, nessuna eccedenza orizzontale a 375, 768 e 1280 px, versione e novità nel footer. Non è stata inviata alcuna recensione né effettuato l’accesso a Google.

Versione coerente tra `VERSION`, meta `site-version`, footer e `CHANGELOG.md`. Repository canonico del sito: `matteoawi/fioriepiante-nino.it`, ramo `main`; separato dall’archivio pilot Shopify e dal monorepo florame.ai.
