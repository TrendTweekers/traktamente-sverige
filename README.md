# Traktamente och milersättning 2026, som öppen data

Skatteverkets belopp för 2026 i maskinläsbar form: normalbelopp för utlandstraktamente för 195 länder och områden, de inrikes beloppen och milersättningen. Fritt att använda i lönesystem, reseräkningar och egna räknare.

| Fil | Innehåll |
|---|---|
| [`data/normalbelopp-2026.json`](data/normalbelopp-2026.json) | Normalbelopp per land, med ISO-landskod |
| [`data/normalbelopp-2026.csv`](data/normalbelopp-2026.csv) | Samma sak som CSV (semikolon) |
| [`data/sverige-2026.json`](data/sverige-2026.json) | Inrikes traktamente, måltidsavdrag och milersättning |

## Så används beloppen

**Utrikes:** en hel dag ger normalbeloppet för det land där den längsta tiden av dagen (06–24) tillbringades. En halv dag och en natt utan betalt boende ger hälften. Fria måltider minskar dagens belopp: frukost 15 %, lunch eller middag 35 %, båda 70 %, alla tre 85 %. Tillbringades avrese- eller hemkomstdagen mest i Sverige gäller de svenska beloppen den dagen.

**Inrikes:** 300 kr för en hel dag och 150 kr för en halv. Avresedagen är hel om resan började före kl 12, hemkomstdagen om den slutade efter kl 19. Fria måltider: frukost 20 %, lunch eller middag 35 %, båda 70 %, alla tre 90 %.

Skattefritt traktamente kräver en övernattning mer än 50 km från både bostaden och det vanliga arbetsstället.

Räkna direkt i webbläsaren: [traktamente](https://kvittoflow.se/traktamente) och [milersättning](https://kvittoflow.se/milersattning) hos [KvittoFlow](https://kvittoflow.se).

## Uppdatera

```
node update.mjs 2027
```

Hämtar ett nytt år från Skatteverkets öppna API.

## Källa

[Skatteverkets öppna data](https://skatteverket.se/omoss/digitalasamarbeten/omvaraoppnadata.4.77f3e230191ef88bf1da7.html) (utlandstraktamenten) och [Utlandstraktamenten för 2026](https://www.skatteverket.se/utlandstraktamente). Fyra rader hänvisar i källan till ett annat land (till exempel "Se Myanmar"); de har fått det landets belopp och hänvisningen står kvar i fältet `hänvisning`.

Kontrollera alltid mot Skatteverket innan beloppen används i lön eller bokföring. Underhålls av [KvittoFlow](https://kvittoflow.se), som bokför kvitton, resor och traktamente i Fortnox.

---

**English:** Swedish Tax Agency (Skatteverket) 2026 per-diem allowances for 195 countries, domestic per-diem and mileage rates, as JSON and CSV. Source: Skatteverket open data.
