// Hämtar Skatteverkets normalbelopp för utlandstraktamente för ett år och skriver JSON och CSV.
//   node update.mjs 2026
// Källa: Skatteverkets öppna data (API), samma siffror som på skatteverket.se/utlandstraktamente.
import fs from 'node:fs';
const year = process.argv[2] || String(new Date().getFullYear());
const base = 'https://skatteverket.entryscape.net/rowstore/dataset/70ccea31-b64c-4bf5-84c7-673f04f32505/json';
let url = `${base}?${new URLSearchParams({ 'år': year, _limit: '100' })}`;
const rows = [];
while (url) {
  const r = await (await fetch(url)).json();
  rows.push(...r.results);
  url = r.next || null;
}
// Några rader hänvisar till ett annat land ("Se Myanmar"). De får det landets belopp, och hänvisningen står kvar.
const byName = Object.fromEntries(rows.map((r) => [r['land eller område'], r.normalbelopp]));
const out = rows
  .map((r) => {
    const raw = String(r.normalbelopp).trim();
    const ref = raw.match(/^Se (.+)$/i)?.[1];
    const amount = ref ? Number(byName[ref]) : Number(raw);
    if (!Number.isFinite(amount)) throw new Error(`Kan inte läsa beloppet för ${r['land eller område']}: ${raw}`);
    return { land: r['land eller område'], landskod: r.landskod || null, normalbelopp: amount, ...(ref ? { hänvisning: raw } : {}) };
  })
  .sort((a, b) => a.land.localeCompare(b.land, 'sv'));
if (!out.length) throw new Error(`Inga rader för ${year}`);
fs.writeFileSync(`data/normalbelopp-${year}.json`, JSON.stringify({ år: Number(year), källa: 'Skatteverkets öppna data', hämtad: new Date().toISOString().slice(0, 10), länder: out }, null, 2) + '\n');
fs.writeFileSync(`data/normalbelopp-${year}.csv`, 'land;landskod;normalbelopp\n' + out.map((r) => `${r.land};${r.landskod ?? ''};${r.normalbelopp}`).join('\n') + '\n');
console.log(`${out.length} länder för ${year}`);
