![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Arifpratama19/best-national-statistics-site/rank.svg)
![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Arifpratama19/best-national-statistics-site/reward.svg)

# NusaStat — Portal Statistik Indonesia

[make.fun bounty: Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An original national statistics portal for Indonesia. A dashboard of the
country's key indicators — population, GDP, inflation, unemployment, poverty
and human development — with pages for the economy, population, people and
regions, charts drawn by hand in code, and a sortable, searchable table of
all 38 provinces. Every figure is real, dated and sourced from Statistics
Indonesia (BPS), the United Nations and the World Bank.

## Run it

```sh
node serve.ts              # serves app/ at http://localhost:8080
```

Open http://localhost:8080 in a desktop browser or on a phone. The site is
static files under app/ with no build step and no network request.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies app/ and screenshots/ to the output directory and writes
`dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.
