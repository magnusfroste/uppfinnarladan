# Uppfinnarlådan

Ett pusselspel för barn 4–8 år: kombinera två saker till något nytt, och använd
sedan uppfinningen. Nivåerna blir djupare ju längre man spelar.

## Det som tränas

`A + B = C`, och sedan `C + D = E`. Nivå 1–2 kräver en kombination, nivå 3–6
kräver att det man byggt används i nästa steg, nivå 7 har två grenar som möts
och nivå 8 är tre steg djupt med delar som inte passar alls. Regeln är densamma
hela tiden – bara trädet blir större.

## Filer

    public/index.html      sidan, SEO, JSON-LD, startskärm (injicerad av start_screen.py)
    public/styles.css      layouten, HUD, hyllan
    public/app.js          delarna (ritade i kod), recepten, nivåerna, inmatningen
    public/kort.png        katalogbild 1200×900 (skärmdump från live)
    public/og.png          delningsbild 1200×630
    make_assets.py         ikoner, og.png, manifest, robots, sitemap
    deploy/nginx.conf      statisk servering på 8080

## Köra lokalt

    python3 -m http.server 8441 --directory public

## Ändra nivåer

Recepten ligger i `RECEPT` i `public/app.js` och nivåerna i `NIVÅER` (vilka delar
som ligger på bänken). Antalet prickar i HUD:en räknas fram av
`kvarvarandeSteg()` – lägg till en nivå och prickarna stämmer automatiskt.
Nya delar behöver en ritfunktion i `RITA` och ett namn i `DELAR`.

## Viktigt vid deploy

Hela sajten ligger i `public/`, eftersom `COPY public/ /usr/share/nginx/html/`
annars blandar in sig i nginx förvalda html-katalog och man får
"Welcome to nginx!" på `/`.
