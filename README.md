Energotron – interaktivní simulátor české elektrizační soustavy
Energotron je jednoduchá webová aplikace (React + TypeScript), kde vyrovnáváš výrobu a spotřebu elektřiny v ČR. Obsahuje reálné názvy zdrojů (Temelín, Dukovany, Dlouhé Stráně), dětský režim a podporu PWA pro instalaci na telefon.

Živá verze: https://katy-pel.github.io/Energotron/

Repozitář: https://github.com/katy-pel/Energotron

Funkce
Vyrovnávání sítě: drž výkon výroby blízko spotřeby (Δ co nejmenší).

Zdroje: Temelín, Dukovany, Uhlí (Sever/Morava), Plyn CCGT, Voda, Dlouhé Stráně, Fotovoltaika, Vítr.

Dětský režim: zjednodušené ovládání, velké prvky, tipy asistenta.

Události: náhodné výpadky a změny počasí.

PWA: instalace na plochu, základní offline režim.

Jak spustit
Varianta A – GitHub Pages (doporučeno, nic neinstalujete)

V repozitáři otevři Settings → Pages.

V Build and deployment vyber Source: GitHub Actions.

Po commitu se spustí automatický build a nasazení.

Web poběží na: https://katy-pel.github.io/Energotron/

Poznámka: V souboru vite.config.ts musí být base: "/Energotron/".

Varianta B – lokálně (volitelné, pokud máš Node)

Potřebuješ Node 18+.

Nainstaluj závislosti: npm i

Spusť vývojový server: npm run dev

Build: npm run build

Ovládání
Dispečink: posuvníky nastavují cílový výkon zdrojů. Klasické zdroje mají omezenou rychlost změny výkonu (ramp-rate).

Dlouhé Stráně: mohou vyrábět (+MW) nebo čerpat (−MW), mají omezenou kapacitu (SOC).

Dětský režim: přepínač v horním panelu; tlačítko „Asistent: vyrovnat Δ“ navrhne rychlé úpravy.

Struktura projektu
/

package.json

vite.config.ts

index.html

public/

manifest.webmanifest

sw.js

icons/

icon-192.png

icon-512.png

src/

main.tsx

App.tsx

styles.css

pwa.ts

ui/

ControlsPanel.tsx

ChildMode.tsx

Charts.tsx

Score.tsx

EventsFeed.tsx

sim/

types.ts

constants.ts

sources.ts

weather.ts

demand.ts

storage.ts

events.ts

engine.ts

useSim.ts

.github/workflows/ (pokud používáš Actions pro Pages)

Důležité nastavení pro Pages
vite.config.ts: base: "/Energotron/"

index.html: odkazy na manifest a ikony s cestou /Energotron/...

Pokud nasazuješ přes GitHub Actions, po každém commitu proběhne build a nasazení automaticky.

Poznámky k datům a přesnosti
Parametry výkonů a omezení jsou vzdělávací aproximace pro hratelnost, ne oficiální provozní hodnoty. Cílem je ilustrovat rovnováhu mezi zdroji, počasím a poptávkou.

Licence
Volně k použití pro vzdělávací účely. Pokud plánuješ veřejné nasazení pod vlastní značkou, uveď prosím zdroj.

Poděkování
Díky za nápad a testování. Pokud najdeš chybu nebo máš nápad na vylepšení, otevři Issue nebo pošli Pull Request.
